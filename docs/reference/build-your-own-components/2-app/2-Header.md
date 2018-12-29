# Header.js

The Header is a component that appears on all of your pages. 
By default, it appears as a top bar that contains a drop down menu on the left, and a series of links on the right. 

Both of these parts can be configured through the right options in your config file.

## Drop-down menu

The drop-down menu on the top left is a way for your site to quickly link to other similar sites, for instance, if you're writing documentation for a library which is part of a family of libraries. 

You can specify these sites using the PROJECTS options in the config file. PROJECTS has to be an object where keys are the names to be displayed and the values are the addresses for the links.

## Links

The links in the top-right part fall in three sections: 

- Documentation trees,
- Other pages in your ocular app,
- External links,
- GitHub site.

### Documentation trees

Documentation files in ocular can be arranged in separate, indpendent trees. Each of these trees has its own table of contents. The header has links to the first page of each of these trees. For more information, see documentation on routes.

### Additional links

On top of documentation links, you can have links to other pages in your ocular app. These links are defined in the jsRoutes file - see the documentation on routes for more information. These links redirect your user to components within your application, which will still be shown as parts of the App component - they will have a Header and a Toc parts. 

### External links

In addition, you can have links to _external_ pages. These are bona fide links which will take users outside of your ocular web app. These links can be listed in the ADDITIONAL_LINKS part of your config file. ADDITIONAL_LINKS is an array of objects with a _name_ property (label of the link) and _href_ property (url destination of links.)

### GitHub link

If you specified a GitHub organization / project when initializing your project, or if you've filled the corresponding entries in the config file (PROJECT_NAME, PROJECT_ORG, PROJECT_URL) then a link to that repository on GitHub will also be available here along with the count of stargazers.
