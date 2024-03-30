// @author         jonatkins
// @name           IITC plugin: Blank map
// @category       Map Tiles
// @version        0.1.4.20240330.064928
// @description    Add a blank map layer - no roads or other features.

(function () {
  plugin_info = {}
  plugin_info.script = {
    version: '0.1.4',
    name: 'Blank map',
    description: 'Add a blank map layer - no roads or other features.'
  }
  plugin_info.buildName = 'dev';
  plugin_info.dateTimeVersion = '2024-03-30-064928';
  plugin_info.pluginId = 'basemap-blank';

/* exported setup, changelog --eslint */
/* global L, layerChooser */

var changelog = [
  {
    version: '0.1.4',
    changes: ['Version upgrade due to a change in the wrapper: added plugin icon'],
  },
];

// use own namespace for plugin
var mapTileBlank = {};

mapTileBlank.addLayer = function () {

  var blankOpt = {attribution: '', maxNativeZoom: 18, maxZoom: 21};
  var blankWhite = new L.TileLayer('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gEFCSU6z3A8pwAAAA1JREFUCNdj+P///38ACfsD/dGDjPAAAAAASUVORK5CYII=', blankOpt);
  var blankBlack = new L.TileLayer('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gEFCQkJSZE2HwAAAAxJREFUCNdjYGBgAAAABAABJzQnCgAAAABJRU5ErkJggg==', blankOpt);

  layerChooser.addBaseLayer(blankWhite, 'Blank Map (White)');
  layerChooser.addBaseLayer(blankBlack, 'Blank Map (Black)');
};

function setup() {
  mapTileBlank.addLayer();
}

setup.info = plugin_info; //add the script info data to the function as a property
if (typeof changelog !== 'undefined') setup.info.changelog = changelog;
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
})();

