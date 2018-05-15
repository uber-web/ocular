# Documentation routes

The correspondance between url paths and documentation files is described in the file __/src/mdRoutes.js__. You can have Ocular generate this file automatically; the second half of this page will explain how this file work if you want to create it by hand or modify it.

## The quick way

### ocular build-docs

In your Ocular folder, type

```
ocular build-docs
``` 

in the CLI and this will create a mdRoutes file based on the contents of the __/src/docs/__ folder. Each markdown (.md) file will become an entry in the table of content, grouped hierarchically by folders. 

### controlling order and names of entries in the table of contents

By default, the items in the table of contents will be ordered alphabetically based on the corresponding file names. The name displayed in the table of contents will also be deduced of the file name - it will be the file name, sentence cased. For instance, getting-started.md will become "Getting started". The same goes for groups of documents - an entry will be created in the table of contents based on a folder name and positioned accordingly, based on the position of the folder name in alphabetical order. 

To control the position of a specific entry in the table of contents, you can change its file name, for instance by adding numbers in the beginning (ie 01-getting-started.md instead of getting-started.md). You can also change the display name of that entry. 

For individual files, ```ocular build-docs``` will use the title of the document if there's one on the first line, that is: if there's anything preceded with any number of # characters in the first line. 

For folders, you can add a file named TITLE (in all caps, with no extension) in the folder and its contents will be used as custom title for this folder.

## Documentation routes in detail

### Documentation trees

In Ocular, documentation pages are organized in Trees. Each tree forms an independent hierarchy of documentation. 

Each node of the documentation tree has:

- a __name__, which is how it will be presented in the table of content;
- a __path__, which is the url suffix that this node corresponds to;
- then, either a __document__ or children - other nodes. 

When accessing a node from a tree, either from its url path or from the table of contents, the table of contents for that tree is going to be displayed on the left. That table of contents doesn't go beyond a given tree (ie it won't show nodes of other documentation trees)

### Anatomy of mdRoutes.js

There's 2 halves in __/src/mdRoutes.js__. 
In the first part, you have to import every markdown file that will be used in the table of contents.

```
import gettingStarted from 'docs/intro/01-getting-started.md;
```

In the second part, you are exporting a JSON object that describes all of the documentation trees.

```
export default [
  {
    name: 'Documentation',
    path: '/documentation',
    children: [
      {
        name: 'Introduction',
        path: 'intro',
        children: [
          {
            name: 'Getting started',
            fileLocation: '/src/docs/intro/01-getting-started.md',
            markdown: gettingStarted
          },
          ...
        ]
      }
    ]
  },
  ...
]
```

#### Imports

There's really nothing rocket science here, we're just importing all these files from their locations and giving them a unique name.
Assuming your files are somewhere in '/src/docs/' the path you will put in the from clause starts with 'docs'.
This import statement assigns the content of a markdown file to the corresponding variable as a string.

#### Exports

What is being exported is an array of one or several objects.
Each item in the array corresponds to a documentation tree. There doesn't need to be more than one, but there can be as many as needed.

These objects correspond to a node in the tree. They can be as simple as a simple node (just one documentation file in the tree) or elaborate hierarchies. 

There are two types of nodes: internal nodes (i.e. those which have children) and leaves (those who don't and correspond to one individual document).

##### Internal nodes

All internal nodes have the following properties:

- name (String): how this node will be displayed in the table of content.  
- path (String): the url of this node and all of its descendants will include this string. This doesn't represent the full url suffix for this node, simply an incremental string that will be added to it. 
- children (array of nodes): the various children of this node, which will be either internal nodes or leaves.

In the above example, the first internal node has '/documentation' as path. It's also the root node. The url suffix '/documentation' will correspond to that node. 
Its first child has 'intro' as path. The url suffix corresponding to that node is '/documentation/intro'.

The build-docs script, if used, adds a fullPath property that corresponds to the url suffix, but it is provided for legibility purposes only and is not used internally. 

##### Leaf nodes

Leaf nodes have the following properties:

- name (String): how this node will be displayed in the table of content. Same as for internal nodes.
- markdown (String, optional): a string in markdown format that will be rendered when this node is selected either through its url or through the table of contents. 
- component (React component, optional): instead of a markdown string, you can have instead a custom React component. That's one of the ways to have a custom component inside the hierarchy of a table of content. You can also embed a react component in a markdown document, and even have nothing else in that document.
- fileLocation (String, optional): this is for projects hosted on GitHub. You have the option of providing the full path of the corresponding markdown file, relative to the Ocular folder (if your documentation files are in /src/docs, the fileLocation will start with '/src/docs/' as in the example above). Specifying a full path gives your users the possibility to edit documentation files on GitHub directly, and create a pull request as a result. 

Leaf nodes do not have a path property. The url suffix is obtained from that of their parent, to which is added a slug-case version of their name. In this example, the url suffix corresponding to the leaf node described will be /documentation/intro/getting-started. 
