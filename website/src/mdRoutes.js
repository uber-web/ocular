import basics1Introduction from 'docs/basics/1-introduction.md'
import basics2GettingStarted from 'docs/basics/2-getting-started.md'
import gettingStarted from 'docs/getting-started.md'
import referenceBuildYourOwnComponents1PresentingBaseComponents from 'docs/reference/build-your-own-components/1-presenting-base-components.md'
import referenceBuildYourOwnComponents2AppAndRelatedComponents1App from 'docs/reference/build-your-own-components/2-app-and-related-components/1-App.md'
import referenceBuildYourOwnComponents2AppAndRelatedComponents2Header from 'docs/reference/build-your-own-components/2-app-and-related-components/2-Header.md'
import referenceBuildYourOwnComponents2AppAndRelatedComponents3Toc from 'docs/reference/build-your-own-components/2-app-and-related-components/3-Toc.md'
import referenceBuildYourOwnComponents3HomeAndRelatedComponents1Home from 'docs/reference/build-your-own-components/3-home-and-related-components/1-Home.md'
import referenceBuildYourOwnComponents3HomeAndRelatedComponents2Hero from 'docs/reference/build-your-own-components/3-home-and-related-components/2-Hero.md'
import referenceBuildYourOwnComponents3HomeAndRelatedComponents3Footer from 'docs/reference/build-your-own-components/3-home-and-related-components/3-Footer.md'
import referenceConfigReference from 'docs/reference/config-reference.md'

export default [{
  name: "Documentation",
  path: "/docs",
  data: [
    {
      name: "Basics",
      children: [
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
      fileLocation: "/src/docs/getting-started.md",
      name: "Getting started",
      markdown: gettingStarted
    },
    {
      name: "Reference",
      children: [
        {
          name: "Build your own components",
          children: [
            {
              fileLocation: "/src/docs/reference/build-your-own-components/1-presenting-base-components.md",
              name: "1 Presenting base components",
              markdown: referenceBuildYourOwnComponents1PresentingBaseComponents
            },
            {
              name: "2 App and related components",
              children: [
                {
                  fileLocation: "/src/docs/reference/build-your-own-components/2-app-and-related-components/1-App.md",
                  name: "1 App",
                  markdown: referenceBuildYourOwnComponents2AppAndRelatedComponents1App
                },
                {
                  fileLocation: "/src/docs/reference/build-your-own-components/2-app-and-related-components/2-Header.md",
                  name: "2 Header",
                  markdown: referenceBuildYourOwnComponents2AppAndRelatedComponents2Header
                },
                {
                  fileLocation: "/src/docs/reference/build-your-own-components/2-app-and-related-components/3-Toc.md",
                  name: "3 Toc",
                  markdown: referenceBuildYourOwnComponents2AppAndRelatedComponents3Toc
                }
              ]
            },
            {
              name: "3 Home and related components",
              children: [
                {
                  fileLocation: "/src/docs/reference/build-your-own-components/3-home-and-related-components/1-Home.md",
                  name: "1 Home",
                  markdown: referenceBuildYourOwnComponents3HomeAndRelatedComponents1Home
                },
                {
                  fileLocation: "/src/docs/reference/build-your-own-components/3-home-and-related-components/2-Hero.md",
                  name: "2 Hero",
                  markdown: referenceBuildYourOwnComponents3HomeAndRelatedComponents2Hero
                },
                {
                  fileLocation: "/src/docs/reference/build-your-own-components/3-home-and-related-components/3-Footer.md",
                  name: "3 Footer",
                  markdown: referenceBuildYourOwnComponents3HomeAndRelatedComponents3Footer
                }
              ]
            }
          ]
        },
        {
          fileLocation: "/src/docs/reference/config-reference.md",
          name: "Config reference",
          markdown: referenceConfigReference
        }
      ]
    }
  ]
}];
