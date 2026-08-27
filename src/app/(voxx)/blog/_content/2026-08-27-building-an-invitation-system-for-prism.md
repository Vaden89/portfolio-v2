---
title: Building An Invitation System For Prism
description: Workspace invitation flows look simple until you hit concurrency locks, session mismatches, and token security. Here is how I engineered the multi-tenant invite system for Prism from the ground up.
date: 2026-08-27
slug: building-an-invitation-system-for-prism
tags: ["system-design", "backend", "webdev"]
---

Prism is an open-source alternative to ticket management tools like Linear and Jira, but with a twist: every ticket is given the context needed to understand how a change may affect the codebase. By combining AI agents with vector embeddings, Prism helps teams move beyond simple task tracking and toward more informed, code-aware planning.

I started building Prism because I’ve worked in environments where non-technical people shaped product direction and created tasks for engineering. That works well until a task looks simple on the surface but has hidden implications across the code base. In scenarios like this, even experienced engineers can miss those cascading effects after a long day. Prism is designed to reduce that gap.

But today we are here to talk about how I built out the invitation system for each workspace on prism, cause what’s a task management system without the collaboration.

## Context & Motivation

When building a tool like prism there are a few things you have to consider and one of the major things is collaboration and creating an on-boarding process that is as smooth as possible, but with that comes a few questions; 

- How do you handle security constraints?
- How do you handle invitation expiration?
- How do you handle a linking an account, when the user hasn’t even signed up yet, what if they want to use a different email from the one they were invited on?

## Architecture & Data Modeling

Before we get into it let’s talk about the database structure for work spaces, users and invitations. For the invitation flow there are a few tables concerned with it 

- `workspace: _id, name, description, slug`
- `staff: _id, user_id, workspace_id, role: enum`
- `invitations: _id, workspace_*id, email, token, role, expiresAt`

Each user can belong to multiple work spaces and each workspace can have multiple users, and this relationship is represented by the staff join table which also contains the users meta information regarding that particular workspace ( I thought this to be the cleanest implementation ). 

`invitations` is a table meant to track every invitation sent out by the
admins or owners of a workspace. It lets them keep a record of who's been
invited but hasn't joined yet, so there's no situation where they forget
an invitation was already sent. Invitation records are deleted once the
user accepts them. Having a dedicated table also gave me a nice side
benefit.

## Invitation Delivery & Lifecycle

On the front end, users can bulk-send invitations, entering each person's
email along with the role they'll be assigned. From there, the system picks up the array and, within a transaction, writes the invitation records and generates a unique link to the front-end acceptance page for each one. It then drops each email rendered from an email template into a Redis queue, where a queue worker processes them one by one.

When the email lands in the invitee's inbox, all they have to do is click
a button, and they land on FRONTEND_URL/invite/invitation_id. There
they're shown the details of the invitation and a button to accept it.

## Invitation Expiration

An invitation shouldn’t live forever. A link that’s still valid months after it was sent is a security liability and a large source of confusion for all parties involved, so every invitation on Prism carries a expiration date, when each invitation is created they are assigned an `expiresAt` field typically 7 days after they are created.

The more interesting decision was how to expire them. There were  two approaches I thought up;

- Run a scheduled ( Cron ) Job that would sweep through the invitations table and delete anything past it’s `expiresAt`
- Expire lazily: In this case I’d never need to handle deleting invitation records on a schedule, and instead whenever someone interacts with the invitation, I check if it has passed it’s expiration date, if so I delete the invitation and return an error saying invitation expired.

I went with lazy expiration, because it means that I don’t have any extra compute ( cron jobs ) to maintain, no background worker to check on, and no point in time where an expired invitation can slip through the cracks. The expiry check is cheap and it works for the scale I am currently at, while giving me the option to improve on it as the needs of the application grows.

## Security

Back at the start I asked how you handle security constraints in an invitation system. Here’s how I handled it because "let anyone with a link join a workspace" is not exactly secure in any way given you can’t control who ends up with that link.

### The link is a capability, not an ID

My first instinct was to put the invitation's database id straight into the URL and look records up by it. It's convenient the record already has a unique id, so why do I need anything else? The problem is that a primary key is an identifier, not a secret. If it's at all guessable or enumerable, anyone can walk the space of invitations and read who's been invited where, at what role. So invitations carry a dedicated, random token that's completely decoupled from the primary key, and that token is what goes in the URL:

```jsx
const token = crypto.randomUUID() + crypto.randomUUID();
const invitation = await ctx.db.insert("invitations", {
	orgId: args.workspaceId,
	email,
	token,
	role: invitee.role,
	expiresAt: expiry,
});
```

Two UUIDs' worth of entropy makes the link near impossible to guess, and because the token lives in its own column I can revoke a single invitation by deleting the row without touching anything else. But this logic of "the token is the secret" means that I have to treat it like one. It's fine to send it to the person it belongs to, but I never hand it back out anywhere else. The admin-facing list of pending invites, for example, strips it before returning:

```sql
return invites.map(({ token: _token, ...rest }) => rest);
```

There's no reason for a work-space's settings page to ship live invite tokens to the browser, so it doesn't.

## Edge Case Handling

- **Case A ( Inviting a user, that has already been invited before or is a member of the workspace ):** At the point where an invitation is created we first check if a staff connected to the workspace already exists if so we reject it, if an invitation is being sent to an already invited account we simply delete the old invitation record and create a new one if the previous invitation has expired.
- **Case B ( New User ):** One of the first problems I ran into was dealing with the scenario where a new user was the one being invited, I landed on storing the invitation-id in local storage, routing users not logged in to the registration page with a message saying informing them they need an account before they can accept an invitation, and when they register the function handling routing after a successful registration checks for an invitation-id in local storage and routes to the invitation page based on that ( it also deletes the invitation-id ) from local storage. Now they can accept the invitation and are taken to the dashboard for that workspace. This solution also extended to the case where the invited user was logged out and they needed to log back in ( cause you need to be authenticated to accept an invite ).
- **Case C ( Existing user, but logged in under a different account ):** This was a pretty straight forward problem to solve, since out unique identifier ( token ) was the invitation_id, I could grab the easily grab that details of the invitation and check if the invited user had the same email as the logged in user and if not, I rendered a screen detailing just that.
- **Case D ( An invitation is revoked at the same time the invitee want's to accept ):** I did not have to handle this myself because the database I used handled the concurrency correctly, to handle this normally you would lock the row for update during the transaction, so the revoke and accept operations cannot both commit conflicting changes

```sql
  BEGIN;

  SELECT status
  FROM invitations
  WHERE id = 123
  FOR UPDATE;

  UPDATE invitations
  SET status = 'revoked'
  WHERE id = 123
    AND status = 'pending';

  COMMIT;
```

## Conclusion

Building a production-ready invitation system involves balancing security, concurrency, and user onboarding friction. While this architecture solved the immediate requirements for Prism, there is always room to evolve such as persisting invite context across third-party OAuth flows.

System design is an iterative process of managing trade-offs. I hope walking through my schema decisions, race condition safeguards, and edge cases helps you structure the collaboration layer for your next multi-tenant application.
