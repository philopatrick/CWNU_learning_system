# Markdown Complete Guide

## What Markdown Is

Markdown is a lightweight plain-text writing format. You write normal text with a small set of symbols such as `#`, `*`, `-`, and `` ` `` to describe structure and meaning.

A Markdown file usually uses the `.md` extension, which is why people often say "an md file."

Markdown is popular because it gives you two things at the same time:

- text that stays easy to read in raw form
- formatting that can be converted into HTML, PDFs, slides, documentation pages, README files, notes, and wikis

In simple terms:

- raw Markdown is what you type
- rendered Markdown is what a tool shows after parsing it

## Why Markdown Exists

Markdown solves a common problem: rich formatting is useful, but heavy formatting tools can make writing harder.

Compared with word processors, Markdown is:

- faster to type
- easier to version with Git
- better for documentation and technical writing
- portable across tools and platforms
- durable because it is plain text

## The Core Mental Model

Markdown is not a programming language. It is a text markup format.

Think of it as:

1. you write plain text with lightweight syntax
2. a parser reads that syntax
3. the parser turns it into structured output, usually HTML

Example:

```md
# My Title

This is **important** and this is *emphasized*.
```

This usually renders as:

- a level-1 heading
- a paragraph
- bold text around "important"
- italic text around "emphasized"

## Markdown Flavors

There is no single perfectly identical Markdown everywhere.

Common flavors include:

- CommonMark: a more standardized base
- GitHub Flavored Markdown (GFM): CommonMark plus tables, task lists, and more
- Markdown in static site generators: often supports extra extensions
- note-taking app Markdown: may add custom syntax for links, callouts, math, or diagrams

Important rule:

- basic syntax is widely portable
- advanced features may differ by platform

If you want maximum compatibility, stay close to basic Markdown plus widely supported GFM features.

## Basic Structure Rules

Markdown follows a few important habits:

- blank lines often separate blocks
- indentation matters in some cases, especially lists and code blocks
- many symbols only work when placed in the right position
- plain text that is not special syntax remains plain text

## Headings

Use `#` at the start of a line.

```md
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
```

Guidelines:

- use one `#` for the page title
- keep heading levels in order
- do not jump from `#` to `####` unless there is a real structure reason

## Paragraphs and Line Breaks

A paragraph is just normal text separated by a blank line.

```md
This is the first paragraph.

This is the second paragraph.
```

A single line break inside a paragraph usually does not create a visible new line in rendered output.

If you need a line break, common options are:

- end the line with two spaces
- use HTML like `<br>`
- start a new paragraph if that is acceptable

## Emphasis

```md
*italic*
_italic_
**bold**
__bold__
***bold italic***
```

Best practice:

- prefer `*italic*` and `**bold**` for consistency

## Lists

Unordered lists use `-`, `*`, or `+`.

```md
- item one
- item two
- item three
```

Ordered lists use numbers:

```md
1. first
2. second
3. third
```

Notes:

- many parsers will renumber lists automatically
- consistent indentation is important
- nested lists require indentation and are where beginners most often make mistakes

## Links

Inline link syntax:

```md
[OpenAI](https://openai.com)
```

Structure:

- text inside `[]` is what the reader sees
- URL inside `()` is where the link goes

## Images

Images look like links with a leading `!`.

```md
![Alt text](./images/example.png)
```

Important:

- alt text should describe the image
- image support depends on the rendering environment

## Code

Inline code uses backticks:

```md
Use `npm install` to install dependencies.
```

Code blocks use triple backticks:

````md
```js
const message = "Hello, Markdown";
console.log(message);
```
````

The language label after the opening backticks helps syntax highlighting.

## Blockquotes

Use `>` at the start of a line.

```md
> Markdown is for readable plain-text formatting.
```

This is often used for:

- quotes
- callouts
- notes

## Horizontal Rules

Use three or more hyphens, asterisks, or underscores on a line by themselves.

```md
---
```

## Tables

Tables are common in GitHub Flavored Markdown.

```md
| Syntax | Meaning |
| --- | --- |
| `#` | heading |
| `-` | list item |
| `` `code` `` | inline code |
```

Notes:

- table alignment can vary by renderer
- tables are convenient, but they are not part of original Markdown everywhere

## Task Lists

Task lists are also common in GitHub Flavored Markdown.

```md
- [x] done
- [ ] not done
```

These are useful for:

- issue tracking
- TODO lists
- project progress

## Escaping Special Characters

If you want Markdown symbols to display literally, escape them with a backslash.

```md
\*this will show literal asterisks\*
```

This matters when writing about Markdown syntax itself.

## HTML Inside Markdown

Many renderers allow raw HTML inside Markdown.

Example:

```md
<details>
  <summary>Click to expand</summary>
  Hidden content here.
</details>
```

Use this carefully:

- it can improve layout
- it reduces portability
- some platforms sanitize or block certain HTML tags

## File Types and Naming

Common naming patterns:

- `README.md`
- `CONTRIBUTING.md`
- `CHANGELOG.md`
- `notes.md`
- `guide.md`

Markdown files are plain text, so they work well with:

- Git
- code editors
- search tools
- static site generators

## A Small Cheat Sheet

```md
# Title
## Section

Normal paragraph text.

- bullet
- bullet

1. numbered
2. numbered

[Link](https://example.com)
![Image](./img.png)

`inline code`

```js
console.log("code block");
```

> blockquote
```

## Example: Raw Markdown and Meaning

```md
# Learning Markdown

Markdown makes writing docs easier.

## Why it helps

- readable in plain text
- simple to learn
- easy to convert to HTML

Use `**bold**` for strong emphasis.
```

Meaning:

- `# Learning Markdown` is the document title
- the next line is a paragraph
- `## Why it helps` starts a new section
- the `-` lines form a list
- the text inside backticks is code-style text
- the `**bold**` syntax becomes bold when rendered

## Best Practices

- keep one top-level title per document
- use headings to create a clear outline
- prefer short sections over giant text walls
- use fenced code blocks with language labels
- use descriptive link text instead of vague text like "click here"
- write alt text for images
- keep indentation consistent in lists
- avoid unnecessary HTML unless the platform requires it
- test the rendered result if formatting matters

## Common Beginner Mistakes

- forgetting blank lines between sections
- mixing tabs and spaces in nested lists
- breaking list indentation
- using too many heading levels
- forgetting to close code fences
- assuming every Markdown platform supports the same features
- writing raw URLs where descriptive links would be clearer

## How Markdown Relates to HTML

Markdown usually becomes HTML.

Examples:

- `# Title` becomes an `<h1>`
- a paragraph becomes a `<p>`
- `**bold**` often becomes `<strong>`
- a list becomes `<ul>` or `<ol>`
- a fenced code block becomes `<pre><code>`

This is why Markdown is widely used on the web.

## When Markdown Is a Good Choice

Markdown is excellent for:

- README files
- technical documentation
- class notes
- blog drafts
- issue templates
- knowledge bases
- slide content pipelines

Markdown is less ideal when you need:

- pixel-perfect layout
- advanced typography control
- complex page design
- spreadsheet-like editing

## How To Learn Markdown Fast

1. learn headings, paragraphs, lists, links, and code blocks first
2. practice by writing one short document every day
3. preview the rendered output while editing
4. add tables, task lists, and quotes after the basics feel natural
5. learn your platform's specific Markdown flavor

## Final Summary

Markdown is a simple way to add structure to plain text.

If you understand these ideas, you already understand the foundation:

- Markdown is plain text with lightweight syntax
- `.md` is the common file extension
- a parser converts Markdown into rendered output, often HTML
- the most important elements are headings, paragraphs, lists, links, images, quotes, and code
- different platforms support different extensions, so compatibility matters

Once those basics are clear, the rest is mostly repetition and practice.
