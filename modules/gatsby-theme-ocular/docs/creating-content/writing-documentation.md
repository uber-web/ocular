# Writing documentation

## Writing markdown files

Ocular works by organizing a collection of markdown documents and generating web pages based on these documents.

### Titles

`# Main title`
# Main title

`## Title`
## Title

`### Subtitle`
### Subtitle

### Text formatting

`Text in **bold**` (or `Text in __bold__`)
Text in **bold**

`Text in *italics*` (or `Text in _italics_`)
Text in _italics_

`~~striked~~ text`
~~striked~~ text

### Quotes

`> Quote`
> Quote

### Horizontal lines

`---` horizontal rule

---

### Lists

```
1. list item
2. list item
3. list item

---
- list item
- list item
- list item

---
* list item
* list item
* list item
```

1. list item
2. list item
3. list item

---

- list item
- list item
- list item

---

* list item
* list item
* list item


### Tables

```
| column header | column header |
|---------------|---------------|
| table cell | table cell |
```


| column header | column header |
|---------------|---------------|
| table cell | table cell |


### Links

`[Markdown table generator](https://www.tablesgenerator.com/markdown_tables)`

[Markdown table generator](https://www.tablesgenerator.com/markdown_tables)

### Images

`![Vintage uber logo](http://i.imgur.com/YSLXJ9Q.png)`
![Vintage uber logo](http://i.imgur.com/YSLXJ9Q.png)


## Organizing documentation files

The simplest way to proceed is to have one root folder with all documentation files therein. You can then organize files in folder within that root folder. If you host your project on github and you use the /docs folder to store all of your documentation files, then your documentation will also be available within github documentation. This is the default configuration for Ocular.

Specify where the files are in your ocular-config.js file with the DOC_FOLDER property.

Alternatively, you can use the DOC_FOLDERS property and pass an array of several folders.

At the root level of your documentation (so, either in the DOC_FOLDER location, or in one of the DOC_FOLDERS ones), you need to have a "table-of-contents.json" file - more on that in a moment. This describes how your documentation will be organized on the website.

The physical organization of the files (where the markdown files are) and the logical organization of the documentation (how they appear on the website) can be different. You could have all your files in one flat folder and your documentation neatly divided in chapters and parts on your site, or the opposite situation.

When creating links between your documents, you can use:
- links relative to the physical location of your files. So, if they are on the same folder, just the name of the other file.
- links relative to the logical position of your document in the table of contents.
- absolute links.


## Creating a table of contents

### Manual approach



### Automatic approach

### A word on titles