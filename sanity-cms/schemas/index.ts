import blockContent from './blockContent'
import faithArticle from './faithArticle'
import {childrensMinistry, youthMinistry} from './ministry'
import siteSettings from './siteSettings'
import smallGroup from './smallGroup'
import statement from './statement'
import teamMember from './teamMember'
import upcomingEvent from './upcomingEvent'

// The dataset also holds documents of types with no schema here (aboutUs,
// churchValue, homepageContent, mission, author, category, post), left from
// earlier versions of the site. The Studio hides them; they're kept on
// purpose, so don't delete them without a backup.
export const schemaTypes = [
  blockContent,
  upcomingEvent,
  statement,
  teamMember,
  smallGroup,
  faithArticle,
  siteSettings,
  youthMinistry,
  childrensMinistry,
]
