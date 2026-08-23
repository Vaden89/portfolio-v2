---
title: "Full-Text Search: A Practical Guide in PostgreSQL & Node.js"
description: ""
date: 2026-08-21
slug: full-text-search-a-practical-guide-in-postgresql-node-js
tags: []
---

Full-text search is a technique used to analyze strings, documents, or entire database columns to deliver **flexible and intelligent search results**. Instead of relying on string matching, full-text search looks at **context**, **synonyms**, and **word variations**.

So while a regular SQL query might match only `"run"`, a full-text search can also match `"running"`, `"ran"`, or `"runner"` depending on the configuration, this gives a wider range of results as more words with differing contexts are matched. It also helps when words are slightly misspelled.

Full-text search is supported by many databases including **PostgreSQL**, **MySQL**, **MongoDB**, and specialized engines like **Elastic-search** and **Meilisearch**.

In this article, we focus on **PostgreSQL full-text search** using **TypeORM + Node.js**.

## Benefits of full-text search

1. **Search Large Bodies of text quickly**:   If you have large text fields, like blog posts, recipes, product descriptions, user chats, or comments, full-text search lets you efficiently check which documents contain certain words.
    
    Example: Search for `"chicken"` → return all recipes that mention chicken *anywhere* in the text.
    
2. **Better and more flexible search results**: Full-text search handles imperfections in queries:
    - Typing `"run shoes"` can still match `"running shoes"`
    - Searching `"comput"` can match `"computer"` and `"computing"`
    
    This dramatically improves user experience on e-commerce, blogs, dashboards, and enterprise search tools cause we all can make mistakes while spelling we should not be met with ( no records found ) because we didn't missed one letter.
    

## When to use full-text search?

1. You want flexibility, not exact matches; Searching products, users, notes, events, or blog posts where partial matches are okay.
2. When you want to index large bodies of text and return results based on if a certain word or keyword is contained within that body of text ( returning a list of recipes that contain chicken).

## Setting up full-text search in typeorm + postgres + nodejs

Below is an example using a simple `Recipe` entity that supports searching on both the `name` and `description` fields.

1. Create the Recipe Entity

```jsx
@Entity()
export class Recipe {
	@PrimaryGeneratedColumn()
	id: number;
	
	@Index({fulltext: true})
	@Column("varchar")
	name: string;
	
	@Index({fulltext: true})
	@Column("varchar")
	description: string;
}
```

2. Query the database using a the typeorm query-builder to return data based on the provided search query

```jsx
async function searchRecipes(searchQuery: string) {
  return dataSource
    .getRepository(Recipe)
    .createQueryBuilder("recipe")
    .where(`
      to_tsvector('english', recipe.name || ' ' || recipe.description)
      @@ plainto_tsquery('english', :query)
    `)
    .setParameter("query", searchQuery)
    .getMany();
}

```

In raw SQL this would look something like this 

```sql
SELECT *
FROM recipe 
WHERE to_tsvector(name || " " || description) @@ to_tsquery("Chicken");
```

This will then return all the recipes with chicken in it's description or name.

## Wrap up
I wrote this article cause I was curious how I'd search something that I couldn't spell correctly and I'd still get results relevant to what I was looking for, and a lot of people don't know about this feature and use simple string matching instead, and I hope this guide has helped you understand how to use full-text search works and you can implement it today in your own projects to give your users a better search experience, that's less punishing to their mistakes.
