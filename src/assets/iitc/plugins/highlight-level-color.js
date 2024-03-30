// @author         vita10gy
// @name           IITC plugin: Highlight portals by level color
// @category       Highlighter
// @version        0.2.1.20240330.064928
// @description    Use the portal fill color to denote the portal level by using the game level colors.

(function () {
  plugin_info = {}
  plugin_info.script = {
    version: '0.2.1',
    name: 'Highlight portals by level color',
    description: 'Use the portal fill color to denote the portal level by using the game level colors.'
  }
  plugin_info.buildName = 'dev';
  plugin_info.dateTimeVersion = '2024-03-30-064928';
  plugin_info.pluginId = 'highlight-level-color';

/* exported setup, changelog --eslint */
/* global COLORS_LVL */

var changelog = [
  {
    version: '0.2.1',
    changes: ['Version upgrade due to a change in the wrapper: added plugin icon'],
  },
];

function highlightLevelColor (data) {
  var portal_level = data.portal.options.data.level;
  if (portal_level !== undefined) {
    var opacity = .6;
    data.portal.setStyle({fillColor: COLORS_LVL[portal_level], fillOpacity: opacity});
  }
}

function setup () {
  window.addPortalHighlighter('Level Color', highlightLevelColor);
}

setup.info = plugin_info; //add the script info data to the function as a property
if (typeof changelog !== 'undefined') setup.info.changelog = changelog;
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
})();

