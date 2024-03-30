// @author         vita10gy
// @name           IITC plugin: Highlight portals missing resonators
// @category       Highlighter
// @version        0.2.2.20240330.064928
// @description    Use the portal fill color to denote if the portal is missing resonators.

(function () {
  plugin_info = {}
  plugin_info.script = {
    version: '0.2.2',
    name: 'Highlight portals missing resonators',
    description: 'Use the portal fill color to denote if the portal is missing resonators.'
  }
  plugin_info.buildName = 'dev';
  plugin_info.dateTimeVersion = '2024-03-30-064928';
  plugin_info.pluginId = 'highlight-missing-resonators';

/* exported setup, changelog --eslint */
/* global L, TEAM_NONE */

var changelog = [
  {
    version: '0.2.2',
    changes: ['Version upgrade due to a change in the wrapper: added plugin icon'],
  },
];

// use own namespace for plugin
var highlightMissingResonators = {};
window.plugin.highlightMissingResonators = highlightMissingResonators;

highlightMissingResonators.styles = {
  common: {
    fillColor: 'red',
  }
};

function missingResonators (data) {

  if (data.portal.options.team !== TEAM_NONE) {
    var res_count = data.portal.options.data.resCount;

    if (res_count !== undefined && res_count < 8) {
      var fill_opacity = ((8-res_count)/8)*.85 + .15;
      // Hole per missing resonator
      var dash = new Array((8 - res_count) + 1).join('1,4,') + '100,0';

      var params = L.extend({},
        highlightMissingResonators.styles.common,
        {fillOpacity: fill_opacity, dashArray: dash}
      );

      data.portal.setStyle(params);
    }
  }
}

function setup () {
  window.addPortalHighlighter('Portals Missing Resonators', missingResonators);
}

setup.info = plugin_info; //add the script info data to the function as a property
if (typeof changelog !== 'undefined') setup.info.changelog = changelog;
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
})();

