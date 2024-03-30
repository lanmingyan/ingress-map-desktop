// @author         jonatkins
// @name           IITC plugin: Highlight high level portals
// @category       Highlighter
// @version        0.2.1.20240330.064928
// @description    Use the portal fill color to denote high level portals: Purple L8, Red L7, Orange L6

(function () {
  plugin_info = {}
  plugin_info.script = {
    version: '0.2.1',
    name: 'Highlight high level portals',
    description: 'Use the portal fill color to denote high level portals: Purple L8, Red L7, Orange L6'
  }
  plugin_info.buildName = 'dev';
  plugin_info.dateTimeVersion = '2024-03-30-064928';
  plugin_info.pluginId = 'highlight-high-level';

/* exported setup, changelog --eslint */
/* global L */

var changelog = [
  {
    version: '0.2.1',
    changes: ['Version upgrade due to a change in the wrapper: added plugin icon'],
  },
];

// use own namespace for plugin
var highLevel = {};
window.plugin.highlightHighLevel = highLevel;

highLevel.styles = {
  common: {
    fillOpacity: 0.7
  },
  level6: {
    fillColor: 'orange'
  },
  level7: {
    fillColor: 'red'
  },
  level8: {
    fillColor: 'magenta'
  }
};

function highlightHighLevel (data) {
  var portal_level = data.portal.options.data.level;
  if (portal_level === undefined) return;           // continue on 0..8
  var newStyle= L.extend ( {},
    highLevel.styles.common,
    highLevel.styles['level'+portal_level]
  );

  if (newStyle.fillColor) {
    data.portal.setStyle(newStyle);
  }
}

function setup () {
  window.addPortalHighlighter('Higher Level Portals', highlightHighLevel);
}

setup.info = plugin_info; //add the script info data to the function as a property
if (typeof changelog !== 'undefined') setup.info.changelog = changelog;
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
})();

