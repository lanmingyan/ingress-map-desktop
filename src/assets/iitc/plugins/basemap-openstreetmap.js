// @author         jonatkins
// @name           IITC plugin: OpenStreetMap.org map
// @category       Map Tiles
// @version        0.1.4.20240330.064928
// @description    Add the native OpenStreetMap.org map tiles as an optional layer.

(function () {
  plugin_info = {}
  plugin_info.script = {
    version: '0.1.4',
    name: 'OpenStreetMap.org map',
    description: 'Add the native OpenStreetMap.org map tiles as an optional layer.'
  }
  plugin_info.buildName = 'dev';
  plugin_info.dateTimeVersion = '2024-03-30-064928';
  plugin_info.pluginId = 'basemap-openstreetmap';

/* exported setup, changelog --eslint */
/* global L, layerChooser */

// use own namespace for plugin
var mapOpenStreetMap = {};
window.plugin.mapOpenStreetMap = mapOpenStreetMap;

var changelog = [
  {
    version: '0.1.4',
    changes: ['Version upgrade due to a change in the wrapper: added plugin icon'],
  },
  {
    version: '0.1.3',
    changes: ['Update OSM tile provider', 'Add CyclOSM tiles', 'Expose config'],
  },
];

// https://wiki.openstreetmap.org/wiki/Raster_tile_providers

// Common options
var osmOpt = {
  attribution: 'Map data © OpenStreetMap contributors',
  maxNativeZoom: 18,
  maxZoom: 21,
};

mapOpenStreetMap.LAYERS = [
  {
    name: 'OpenStreetMap',
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    options: Object.assign({}, osmOpt),
  },
  {
    name: 'Humanitarian',
    url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    options: Object.assign({}, osmOpt),
  },
  {
    name: 'CyclOSM',
    url: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
    options: Object.assign({}, osmOpt),
  },
];

function setup() {
  // OpenStreetMap tiles - we shouldn't use these by default - https://wiki.openstreetmap.org/wiki/Tile_usage_policy
  // "Heavy use (e.g. distributing an app that uses tiles from openstreetmap.org) is forbidden without prior permission from the System Administrators"

  for (var entry of mapOpenStreetMap.LAYERS) {
    var layer = new L.TileLayer(entry.url, entry.options);
    layerChooser.addBaseLayer(layer, entry.name);
  }
}

setup.info = plugin_info; //add the script info data to the function as a property
if (typeof changelog !== 'undefined') setup.info.changelog = changelog;
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
})();

