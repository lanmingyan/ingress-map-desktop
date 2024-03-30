// @author         jonatkins
// @name           IITC plugin: Highlight portals with ornaments
// @category       Highlighter
// @version        0.2.2.20240330.064928
// @description    Use the portal fill color to denote portals with additional 'ornament' markers. e.g. Anomaly portals

(function () {
  plugin_info = {}
  plugin_info.script = {
    version: '0.2.2',
    name: 'Highlight portals with ornaments',
    description: 'Use the portal fill color to denote portals with additional 'ornament' markers.'
  }
  plugin_info.buildName = 'dev';
  plugin_info.dateTimeVersion = '2024-03-30-064928';
  plugin_info.pluginId = 'highlight-ornaments';

/* exported setup, changelog --eslint */

var changelog = [
  {
    version: '0.2.2',
    changes: ['Version upgrade due to a change in the wrapper: added plugin icon'],
  },
];

// use own namespace for plugin
var highlightOrnaments = {};
window.plugin.highlightOrnaments = highlightOrnaments;

highlightOrnaments.styles = {
  common: {
    fillColor: 'red',
    fillOpacity: 0.75
  }
};

function ornamentshighlight (data) {
  var d = data.portal.options.data;
  if (d.ornaments && d.ornaments.length > 0) {

    // TODO? match specific cases of ornament name and/or portals with multiple ornaments, and highlight in different colours?

    var params = highlightOrnaments.styles.common;
    data.portal.setStyle(params);
  }
}

function setup () {
  window.addPortalHighlighter('Ornaments (anomaly portals)', ornamentshighlight);
}

setup.info = plugin_info; //add the script info data to the function as a property
if (typeof changelog !== 'undefined') setup.info.changelog = changelog;
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
})();

