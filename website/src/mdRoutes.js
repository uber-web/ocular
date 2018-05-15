import basicsIntroduction from 'docs/basics/1-introduction.md'
import basicsQuickStart from 'docs/basics/2-getting-started.md'
import referenceBuildYourOwnComponentsPresentingOcularSBaseComponents from 'docs/reference/build-your-own-components/1-presenting-base-components.md'
import referenceBuildYourOwnComponents2AppAppJs from 'docs/reference/build-your-own-components/2-app/1-App.md'
import referenceBuildYourOwnComponents2AppHeaderJs from 'docs/reference/build-your-own-components/2-app/2-Header.md'
import referenceBuildYourOwnComponents2AppTocJs from 'docs/reference/build-your-own-components/2-app/3-Toc.md'
import referenceBuildYourOwnComponents3HomeHomeJs from 'docs/reference/build-your-own-components/3-home/1-Home.md'
import referenceBuildYourOwnComponents3HomeHeroJs from 'docs/reference/build-your-own-components/3-home/2-Hero.md'
import referenceBuildYourOwnComponents3HomeFooterJs from 'docs/reference/build-your-own-components/3-home/3-Footer.md'
import referenceBuildYourOwnComponentsMarkdownComponent from 'docs/reference/build-your-own-components/4-markdown.md'
import referenceBuildYourOwnComponentsSearch from 'docs/reference/build-your-own-components/5-search.md'
import referenceConfiguratingOcularConfigurationReference from 'docs/reference/configurating-ocular/config-reference.md'
import referenceRoutesAndLinksInOcularIntroductionToRoutes from 'docs/reference/routes-and-links-in-ocular/1-introduction.md'
import referenceRoutesAndLinksInOcularDocumentationRoutes from 'docs/reference/routes-and-links-in-ocular/2-documentation-routes.md'
import referenceRoutesAndLinksInOcularCustomPages from 'docs/reference/routes-and-links-in-ocular/3-custom-pages.md'
import referenceRoutesAndLinksInOcularDefaultLinks from 'docs/reference/routes-and-links-in-ocular/4-default-links.md'
import referenceRoutesAndLinksInOcularAdditionalLinks from 'docs/reference/routes-and-links-in-ocular/5-additional-links.md'
import referenceStylingOcularIntroductionToStyling from 'docs/reference/styling-ocular/1-introduction.md'
import referenceStylingOcularTheDefaultStyleModules from 'docs/reference/styling-ocular/2-default-style-modules.md'
import referenceStylingOcularCustomizingFonts from 'docs/reference/styling-ocular/3-customizing-fonts.md'

export default [{
  name: "Documentation",
  path: "/documentation",
  data: [
    {
      name: "Basics",
      path: "basics",
      children: [
        {
          fileLocation: "/src/docs/basics/1-introduction.md",
          name: "Introduction",
          markdown: basicsIntroduction
        },
        {
          fileLocation: "/src/docs/basics/2-getting-started.md",
          name: "Quick start",
          markdown: basicsQuickStart
        }
      ]
    },
    {
      name: "Reference",
      path: "reference",
      children: [
        {
          name: "Build your own components",
          path: "build-your-own-components",
          children: [
            {
              fileLocation: "/src/docs/reference/build-your-own-components/1-presenting-base-components.md",
              name: "Presenting ocular's base components",
              markdown: referenceBuildYourOwnComponentsPresentingOcularSBaseComponents
            },
            {
              name: "App components",
              path: "2-app",
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
              name: "Home components",
              path: "3-home",
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
            },
            {
              fileLocation: "/src/docs/reference/build-your-own-components/4-markdown.md",
              name: "Markdown component",
              markdown: referenceBuildYourOwnComponentsMarkdownComponent
            },
            {
              fileLocation: "/src/docs/reference/build-your-own-components/5-search.md",
              name: "Search",
              markdown: referenceBuildYourOwnComponentsSearch
            }
          ]
        },
        {
          name: "Configurating ocular",
          path: "configurating-ocular",
          children: [
            {
              fileLocation: "/src/docs/reference/configurating-ocular/config-reference.md",
              name: "Configuration reference",
              markdown: referenceConfiguratingOcularConfigurationReference
            }
          ]
        },
        {
          name: "Routes and links in ocular",
          path: "routes-and-links-in-ocular",
          children: [
            {
              fileLocation: "/src/docs/reference/routes-and-links-in-ocular/1-introduction.md",
              name: "Introduction to routes",
              markdown: referenceRoutesAndLinksInOcularIntroductionToRoutes
            },
            {
              fileLocation: "/src/docs/reference/routes-and-links-in-ocular/2-documentation-routes.md",
              name: "Documentation routes",
              markdown: referenceRoutesAndLinksInOcularDocumentationRoutes
            },
            {
              fileLocation: "/src/docs/reference/routes-and-links-in-ocular/3-custom-pages.md",
              name: "Custom pages",
              markdown: referenceRoutesAndLinksInOcularCustomPages
            },
            {
              fileLocation: "/src/docs/reference/routes-and-links-in-ocular/4-default-links.md",
              name: "Default links",
              markdown: referenceRoutesAndLinksInOcularDefaultLinks
            },
            {
              fileLocation: "/src/docs/reference/routes-and-links-in-ocular/5-additional-links.md",
              name: "Additional links",
              markdown: referenceRoutesAndLinksInOcularAdditionalLinks
            }
          ]
        },
        {
          name: "Styling Ocular\n",
          path: "styling-ocular",
          children: [
            {
              fileLocation: "/src/docs/reference/styling-ocular/1-introduction.md",
              name: "Introduction to styling",
              markdown: referenceStylingOcularIntroductionToStyling
            },
            {
              fileLocation: "/src/docs/reference/styling-ocular/2-default-style-modules.md",
              name: "The default style modules",
              markdown: referenceStylingOcularTheDefaultStyleModules
            },
            {
              fileLocation: "/src/docs/reference/styling-ocular/3-customizing-fonts.md",
              name: "Customizing fonts",
              markdown: referenceStylingOcularCustomizingFonts
            }
          ]
        }
      ]
    }
  ]
}];
