/**
 *  Point of contact for Vimeography Blueprint
 *
 *  ie: import { Player } from 'vimeography-blueprint';
 *
 */

import Player from './components/Player.vue';
import Lightbox from './components/Lightbox.vue';
import Search from './components/Search.vue';
import Filters from './components/Filters.vue';
import DownloadLink from './components/DownloadLink.vue';

import PagingControls from './components/Paging'
import storeModules from './store';
import Mixins from './mixins';

export default { Player, Lightbox, Search, Filters, DownloadLink, PagingControls, storeModules, Mixins };
