import _basicsIntroduction from '1-introduction.md'
import _basicsQuickStart from '2-getting-started.md'
import _referenceBuildYourOwnComponentsPresentingOcularSBaseComponents from 'build-your-own-components/1-presenting-base-components.md'
import _referenceBuildYourOwnComponents2AppAppJs from 'build-your-own-components/2-app/1-App.md'
import _referenceBuildYourOwnComponents2AppHeaderJs from 'build-your-own-components/2-app/2-Header.md'
import _referenceBuildYourOwnComponents2AppTocJs from 'build-your-own-components/2-app/3-Toc.md'
import _referenceBuildYourOwnComponents3HomeHomeJs from 'build-your-own-components/3-home/1-Home.md'
import _referenceBuildYourOwnComponents3HomeHeroJs from 'build-your-own-components/3-home/2-Hero.md'
import _referenceBuildYourOwnComponents3HomeFooterJs from 'build-your-own-components/3-home/3-Footer.md'
import _referenceBuildYourOwnComponentsMarkdownComponent from 'build-your-own-components/4-markdown.md'
import _referenceBuildYourOwnComponentsSearch from 'build-your-own-components/5-search.md'
import _referenceConfiguratingOcularConfigurationReference from 'configurating-ocular/config-reference.md'
import _referenceRoutesAndLinksInOcularIntroductionToRoutes from 'routes-and-links-in-ocular/1-introduction.md'
import _referenceRoutesAndLinksInOcularDocumentationRoutes from 'routes-and-links-in-ocular/2-documentation-routes.md'
import _referenceRoutesAndLinksInOcularCustomPages from 'routes-and-links-in-ocular/3-custom-pages.md'
import _referenceRoutesAndLinksInOcularDefaultLinks from 'routes-and-links-in-ocular/4-default-links.md'
import _referenceRoutesAndLinksInOcularAdditionalLinks from 'routes-and-links-in-ocular/5-additional-links.md'
import _referenceStylingOcularIntroductionToStyling from 'styling-ocular/1-introduction.md'
import _referenceStylingOcularTheDefaultStyleModules from 'styling-ocular/2-default-style-modules.md'
import _referenceStylingOcularCustomizingFonts from 'styling-ocular/3-customizing-fonts.md'

export default [{
  name: "Documentation",
  path: "/documentation",
  data: [
    {
      fileLocation: "/src/docs/1-introduction.md",
      name: "Introduction",
      markdown: _basicsIntroduction
    },
    {
      fileLocation: "/src/docs/2-getting-started.md",
      name: "Quick start",
      markdown: _basicsQuickStart
    },
    {
      fileLocation: "/src/docs/1-presenting-base-components.md",
      name: "Presenting ocular's base components",
      markdown: _referenceBuildYourOwnComponentsPresentingOcularSBaseComponents
    },
    {
      name: "2 App",
      path: "2-app",
      children: [
        {
          fileLocation: "/src/docs/2-app/1-App.md",
          name: "App js",
          markdown: _referenceBuildYourOwnComponents2AppAppJs
        },
        {
          fileLocation: "/src/docs/2-app/2-Header.md",
          name: "Header js",
          markdown: _referenceBuildYourOwnComponents2AppHeaderJs
        },
        {
          fileLocation: "/src/docs/2-app/3-Toc.md",
          name: "Toc js",
          markdown: _referenceBuildYourOwnComponents2AppTocJs
        }
      ]
    },
    {
      name: "3 Home",
      path: "3-home",
      children: [
        {
          fileLocation: "/src/docs/3-home/1-Home.md",
          name: "Home js",
          markdown: _referenceBuildYourOwnComponents3HomeHomeJs
        },
        {
          fileLocation: "/src/docs/3-home/2-Hero.md",
          name: "Hero js",
          markdown: _referenceBuildYourOwnComponents3HomeHeroJs
        },
        {
          fileLocation: "/src/docs/3-home/3-Footer.md",
          name: "Footer js",
          markdown: _referenceBuildYourOwnComponents3HomeFooterJs
        }
      ]
    },
    {
      fileLocation: "/src/docs/4-markdown.md",
      name: "Markdown component",
      markdown: _referenceBuildYourOwnComponentsMarkdownComponent
    },
    {
      fileLocation: "/src/docs/5-search.md",
      name: "Search",
      markdown: _referenceBuildYourOwnComponentsSearch
    },
    {
      fileLocation: "/src/docs/config-reference.md",
      name: "Configuration reference",
      markdown: _referenceConfiguratingOcularConfigurationReference
    },
    {
      fileLocation: "/src/docs/1-introduction.md",
      name: "Introduction to routes",
      markdown: _referenceRoutesAndLinksInOcularIntroductionToRoutes
    },
    {
      fileLocation: "/src/docs/2-documentation-routes.md",
      name: "Documentation routes",
      markdown: _referenceRoutesAndLinksInOcularDocumentationRoutes
    },
    {
      fileLocation: "/src/docs/3-custom-pages.md",
      name: "Custom pages",
      markdown: _referenceRoutesAndLinksInOcularCustomPages
    },
    {
      fileLocation: "/src/docs/4-default-links.md",
      name: "Default links",
      markdown: _referenceRoutesAndLinksInOcularDefaultLinks
    },
    {
      fileLocation: "/src/docs/5-additional-links.md",
      name: "Additional links",
      markdown: _referenceRoutesAndLinksInOcularAdditionalLinks
    },
    {
      fileLocation: "/src/docs/1-introduction.md",
      name: "Introduction to styling",
      markdown: _referenceStylingOcularIntroductionToStyling
    },
    {
      fileLocation: "/src/docs/2-default-style-modules.md",
      name: "The default style modules",
      markdown: _referenceStylingOcularTheDefaultStyleModules
    },
    {
      fileLocation: "/src/docs/3-customizing-fonts.md",
      name: "Customizing fonts",
      markdown: _referenceStylingOcularCustomizingFonts
    }
  ]
}];
