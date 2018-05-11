import basicsIntroduction from 'docs/basics/1-introduction.md'

import basicsGettingStartedWithOcular from 'docs/basics/2-getting-started.md'

import gettingStarted from 'docs/getting-started.md'

import referenceBuildYourOwnComponentsPresentingOcularSBaseComponents from 'docs/reference/build-your-own-components/1-presenting-base-components.md'

import referenceBuildYourOwnComponents2AppAppJs from 'docs/reference/build-your-own-components/2-app/1-App.md'

import referenceBuildYourOwnComponents2AppHeaderJs from 'docs/reference/build-your-own-components/2-app/2-Header.md'

import referenceBuildYourOwnComponents2AppTocJs from 'docs/reference/build-your-own-components/2-app/3-Toc.md'

import referenceBuildYourOwnComponents3HomeHomeJs from 'docs/reference/build-your-own-components/3-home/1-Home.md'

import referenceBuildYourOwnComponents3HomeHeroJs from 'docs/reference/build-your-own-components/3-home/2-Hero.md'

import referenceBuildYourOwnComponents3HomeFooterJs from 'docs/reference/build-your-own-components/3-home/3-Footer.md'

import referenceConfigurationReference from 'docs/reference/config-reference.md'


export default [{
  name: "Documentation",
  path: "/docs",
  data: [
    {
      name: "Basics",
      path: "/docs/basics",
      children: [
        {
          fileLocation: "/src/docs/basics/1-introduction.md",
          name: "Introduction",
          markdown: basicsIntroduction
        },
        {
          fileLocation: "/src/docs/basics/2-getting-started.md",
          name: "Getting started with ocular",
          markdown: basicsGettingStartedWithOcular
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
      path: "/docs/reference",
      children: [
        {
          name: "Build your own components",
          path: "/docs/reference/build-your-own-components",
          children: [
            {
              fileLocation: "/src/docs/reference/build-your-own-components/1-presenting-base-components.md",
              name: "Presenting ocular's base components",
              markdown: referenceBuildYourOwnComponentsPresentingOcularSBaseComponents
            },
            {
              name: "2 App",
              path: "/docs/reference/build-your-own-components/2-app",
              children: [
                {
                  fileLocation: "/src/docs/reference/build-your-own-components/2-app/1-App.md",
                  name: "App js",
                  markdown: referenceBuildYourOwnComponents2AppAppJs
                },
                {
                  fileLocation: "/src/docs/reference/build-your-own-components/2-app/2-Header.md",
                  name: "Header js",
                  markdown: referenceBuildYourOwnComponents2AppHeaderJs
                },
                {
                  fileLocation: "/src/docs/reference/build-your-own-components/2-app/3-Toc.md",
                  name: "Toc js",
                  markdown: referenceBuildYourOwnComponents2AppTocJs
                }
              ]
            },
            {
              name: "3 Home",
              path: "/docs/reference/build-your-own-components/3-home",
              children: [
                {
                  fileLocation: "/src/docs/reference/build-your-own-components/3-home/1-Home.md",
                  name: "Home js",
                  markdown: referenceBuildYourOwnComponents3HomeHomeJs
                },
                {
                  fileLocation: "/src/docs/reference/build-your-own-components/3-home/2-Hero.md",
                  name: "Hero js",
                  markdown: referenceBuildYourOwnComponents3HomeHeroJs
                },
                {
                  fileLocation: "/src/docs/reference/build-your-own-components/3-home/3-Footer.md",
                  name: "Footer js",
                  markdown: referenceBuildYourOwnComponents3HomeFooterJs
                }
              ]
            }
          ]
        },
        {
          fileLocation: "/src/docs/reference/config-reference.md",
          name: "Configuration reference",
          markdown: referenceConfigurationReference
        }
      ]
    }
  ]
}];
