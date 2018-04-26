import basics1Introduction from 'docs/basics/1-introduction.md'
import basics2GettingStarted from 'docs/basics/2-getting-started.md'
import referenceConfigReference from 'docs/reference/config-reference.md'

export default [{
  name: "Documentation",
  path: "/docs",
  data: [
    {
      name: "Basics",
      path: "/docs/basics",
      data: [
        {
          fileLocation: "/src/docs/basics/1-introduction.md",
          name: "1 Introduction",
          markdown: basics1Introduction
        },
        {
          fileLocation: "/src/docs/basics/2-getting-started.md",
          name: "2 Getting started",
          markdown: basics2GettingStarted
        }
      ]
    },
    {
      name: "Reference",
      path: "/docs/reference",
      data: [
        {
          fileLocation: "/src/docs/reference/config-reference.md",
          name: "Config reference",
          markdown: referenceConfigReference
        }
      ]
    }
  ]
}];
