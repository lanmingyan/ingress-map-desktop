// @author         vita10gy
// @name           IITC plugin: Hide portal ownership
// @category       Highlighter
// @version        0.2.1.20240330.064928
// @description    Show all portals as neutral, as if uncaptured. Great for creating plans.

(function () {
  plugin_info = {}
  plugin_info.script = {
    version: '0.2.1',
    name: 'Hide portal ownership',
    description: 'Show all portals as neutral, as if uncaptured. Great for creating plans.'
  }
  plugin_info.buildName = 'dev';
  plugin_info.dateTimeVersion = '2024-03-30-064928';
  plugin_info.pluginId = 'highlight-hide-team';

/* exported setup, changelog --eslint */
/* global TEAM_NONE, getMarkerStyleOptions*/

var changelog = [
  {
    version: '0.2.1',
    changes: ['Version upgrade due to a change in the wrapper: added plugin icon'],
  },
];

function hideOwnership (data) {
  var params = getMarkerStyleOptions({team: TEAM_NONE, level: 0});
  data.portal.setStyle(params);
}

function setup () {
  window.addPortalHighlighter('Hide portal ownership', hideOwnership);
}

setup.info = plugin_info; //add the script info data to the function as a property
if (typeof changelog !== 'undefined') setup.info.changelog = changelog;
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
})();

