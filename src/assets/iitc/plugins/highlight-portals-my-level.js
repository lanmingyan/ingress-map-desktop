// @author         vita10gy
// @name           IITC plugin: Highlight portals by my level
// @category       Highlighter
// @version        0.2.1.20240330.064928
// @description    Use the portal fill color to denote if the portal is either at and above, or at and below your level.

(function () {
  plugin_info = {}
  plugin_info.script = {
    version: '0.2.1',
    name: 'Highlight portals by my level',
    description: 'Use the portal fill color to denote if the portal is either at and above, or at and below your level.'
  }
  plugin_info.buildName = 'dev';
  plugin_info.dateTimeVersion = '2024-03-30-064928';
  plugin_info.pluginId = 'highlight-portals-my-level';

/* exported setup, changelog --eslint */
/* global PLAYER */

var changelog = [
  {
    version: '0.2.1',
    changes: ['Version upgrade due to a change in the wrapper: added plugin icon'],
  },
];

function belowMyLevel (data) {
  colorLevel(true,data);
}

function aboveMyLevel (data) {
  colorLevel(false,data);
}

function colorLevel (below,data) {
  var portal_level = data.portal.options.level;

  // as portal levels can never be higher than L8, clamp the player level to this for highlight purposes
  var player_level = Math.min(PLAYER.level,8);

  var opacity = .6;
  if ((below && portal_level <= player_level) ||
     (!below && portal_level >= player_level)) {
    data.portal.setStyle({fillColor: 'red', fillOpacity: opacity});
  }
}

function setup () {
  window.addPortalHighlighter('Below My Level', belowMyLevel);
  window.addPortalHighlighter('Above My Level', aboveMyLevel);
}

setup.info = plugin_info; //add the script info data to the function as a property
if (typeof changelog !== 'undefined') setup.info.changelog = changelog;
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
})();

