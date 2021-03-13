// Access to Static Website Data
export {
  default as WebsiteConfigConsumer
} from './src/react/components/website-config';

// Layout Components
export {
  default as TopLevelLayout
} from './src/react/templates/top-level-layout';

export {default as Header} from './src/react/components/header';
// export {default as Footer} from './src/components/layout/footer.jsx';

export {
  default as TableOfContents
} from './src/react/components/table-of-contents';

export {default as InfoPanel} from './src/react/components/info-panel';

// ENABLES REDEFINING DOCUMENTATION.JSX
export * from './src/react/styled/typography';
export {default as Markdown} from './src/react/components/markdown';

// TODO
// - don't export templates from components
// - templates should import components from this file
// - we can have separate exports from these
export {default as Home} from './src/react/templates/home';
