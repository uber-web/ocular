import _basicsIntroduction from 'docs/basics/1-introduction.md'
import _basicsQuickStart from 'docs/basics/2-getting-started.md'
import _referenceBuildYourOwnComponentsPresentingOcularSBaseComponents from 'docs/reference/build-your-own-components/1-presenting-base-components.md'
import _referenceBuildYourOwnComponents2AppAppJs from 'docs/reference/build-your-own-components/2-app/1-App.md'
import _referenceBuildYourOwnComponents2AppHeaderJs from 'docs/reference/build-your-own-components/2-app/2-Header.md'
import _referenceBuildYourOwnComponents2AppTocJs from 'docs/reference/build-your-own-components/2-app/3-Toc.md'
import _referenceBuildYourOwnComponents3HomeHomeJs from 'docs/reference/build-your-own-components/3-home/1-Home.md'
import _referenceBuildYourOwnComponents3HomeHeroJs from 'docs/reference/build-your-own-components/3-home/2-Hero.md'
import _referenceBuildYourOwnComponents3HomeFooterJs from 'docs/reference/build-your-own-components/3-home/3-Footer.md'
import _referenceBuildYourOwnComponentsMarkdownComponent from 'docs/reference/build-your-own-components/4-markdown.md'
import _referenceBuildYourOwnComponentsSearch from 'docs/reference/build-your-own-components/5-search.md'
import _referenceConfiguratingOcularConfigurationReference from 'docs/reference/configurating-ocular/config-reference.md'
import _referenceRoutesAndLinksInOcularIntroductionToRoutes from 'docs/reference/routes-and-links-in-ocular/1-introduction.md'
import _referenceRoutesAndLinksInOcularDocumentationRoutes from 'docs/reference/routes-and-links-in-ocular/2-documentation-routes.md'
import _referenceRoutesAndLinksInOcularCustomPages from 'docs/reference/routes-and-links-in-ocular/3-custom-pages.md'
import _referenceRoutesAndLinksInOcularDefaultLinks from 'docs/reference/routes-and-links-in-ocular/4-default-links.md'
import _referenceRoutesAndLinksInOcularAdditionalLinks from 'docs/reference/routes-and-links-in-ocular/5-additional-links.md'
import _referenceStylingOcularIntroductionToStyling from 'docs/reference/styling-ocular/1-introduction.md'
import _referenceStylingOcularTheDefaultStyleModules from 'docs/reference/styling-ocular/2-default-style-modules.md'
import _referenceStylingOcularCustomizingFonts from 'docs/reference/styling-ocular/3-customizing-fonts.md'

export default [{
  name: "Documentation",
  path: "/documentation",
  data: [
    {
      name: "Basics",
      path: "basics",
      children: [
        {
          fileLocation: "/website/src/docs/basics/1-introduction.md",
          name: "Introduction",
          markdown: _basicsIntroduction
        },
        {
          fileLocation: "/website/src/docs/basics/2-getting-started.md",
          name: "Quick start",
          markdown: _basicsQuickStart
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
              fileLocation: "/website/src/docs/reference/build-your-own-components/1-presenting-base-components.md",
              name: "Presenting ocular's base components",
              markdown: _referenceBuildYourOwnComponentsPresentingOcularSBaseComponents
            },
            {
              name: "App components",
              path: "2-app",
              children: [
                {
                  fileLocation: "/website/src/docs/reference/build-your-own-components/2-app/1-App.md",
                  name: "App js",
                  markdown: _referenceBuildYourOwnComponents2AppAppJs
                },
                {
                  fileLocation: "/website/src/docs/reference/build-your-own-components/2-app/2-Header.md",
                  name: "Header js",
                  markdown: _referenceBuildYourOwnComponents2AppHeaderJs
                },
                {
                  fileLocation: "/website/src/docs/reference/build-your-own-components/2-app/3-Toc.md",
                  name: "Toc js",
                  markdown: _referenceBuildYourOwnComponents2AppTocJs
                }
              ]
            },
            {
              name: "Home components",
              path: "3-home",
              children: [
                {
                  fileLocation: "/website/src/docs/reference/build-your-own-components/3-home/1-Home.md",
                  name: "Home js",
                  markdown: _referenceBuildYourOwnComponents3HomeHomeJs
                },
                {
                  fileLocation: "/website/src/docs/reference/build-your-own-components/3-home/2-Hero.md",
                  name: "Hero js",
                  markdown: _referenceBuildYourOwnComponents3HomeHeroJs
                },
                {
                  fileLocation: "/website/src/docs/reference/build-your-own-components/3-home/3-Footer.md",
                  name: "Footer js",
                  markdown: _referenceBuildYourOwnComponents3HomeFooterJs
                }
              ]
            },
            {
              fileLocation: "/website/src/docs/reference/build-your-own-components/4-markdown.md",
              name: "Markdown component",
              markdown: _referenceBuildYourOwnComponentsMarkdownComponent
            },
            {
              fileLocation: "/website/src/docs/reference/build-your-own-components/5-search.md",
              name: "Search",
              markdown: _referenceBuildYourOwnComponentsSearch
            }
          ]
        },
        {
          name: "Configurating ocular",
          path: "configurating-ocular",
          children: [
            {
              fileLocation: "/website/src/docs/reference/configurating-ocular/config-reference.md",
              name: "Configuration reference",
              markdown: _referenceConfiguratingOcularConfigurationReference
            }
          ]
        },
        {
          name: "Routes and links in ocular",
          path: "routes-and-links-in-ocular",
          children: [
            {
              fileLocation: "/website/src/docs/reference/routes-and-links-in-ocular/1-introduction.md",
              name: "Introduction to routes",
              markdown: _referenceRoutesAndLinksInOcularIntroductionToRoutes
            },
            {
              fileLocation: "/website/src/docs/reference/routes-and-links-in-ocular/2-documentation-routes.md",
              name: "Documentation routes",
              markdown: _referenceRoutesAndLinksInOcularDocumentationRoutes
            },
            {
              fileLocation: "/website/src/docs/reference/routes-and-links-in-ocular/3-custom-pages.md",
              name: "Custom pages",
              markdown: _referenceRoutesAndLinksInOcularCustomPages
            },
            {
              fileLocation: "/website/src/docs/reference/routes-and-links-in-ocular/4-default-links.md",
              name: "Default links",
              markdown: _referenceRoutesAndLinksInOcularDefaultLinks
            },
            {
              fileLocation: "/website/src/docs/reference/routes-and-links-in-ocular/5-additional-links.md",
              name: "Additional links",
              markdown: _referenceRoutesAndLinksInOcularAdditionalLinks
            }
          ]
        },
        {
          name: "Styling Ocular\n",
          path: "styling-ocular",
          children: [
            {
              fileLocation: "/website/src/docs/reference/styling-ocular/1-introduction.md",
              name: "Introduction to styling",
              markdown: _referenceStylingOcularIntroductionToStyling
            },
            {
              fileLocation: "/website/src/docs/reference/styling-ocular/2-default-style-modules.md",
              name: "The default style modules",
              markdown: _referenceStylingOcularTheDefaultStyleModules
            },
            {
              fileLocation: "/website/src/docs/reference/styling-ocular/3-customizing-fonts.md",
              name: "Customizing fonts",
              markdown: _referenceStylingOcularCustomizingFonts
            }
          ]
        }
      ]
    }
  ]
}];
