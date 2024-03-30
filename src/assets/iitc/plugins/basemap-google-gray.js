// @author         jacob1123
// @name           IITC plugin: Gray Google map
// @category       Map Tiles
// @version        0.1.5.20240330.064928
// @description    Add a simplified gray Version of Google map tiles as an optional layer.

(function () {
  plugin_info = {}
  plugin_info.script = {
    version: '0.1.5',
    name: 'Gray Google map',
    description: 'Add a simplified gray Version of Google map tiles as an optional layer.'
  }
  plugin_info.buildName = 'dev';
  plugin_info.dateTimeVersion = '2024-03-30-064928';
  plugin_info.pluginId = 'basemap-google-gray';

/* exported setup, changelog --eslint */
/* global L, layerChooser */

var changelog = [
  {
    version: '0.1.5',
    changes: ['Version upgrade due to a change in the wrapper: added plugin icon'],
  },
];

// use own namespace for plugin
var grayGMaps = {};

grayGMaps.addLayer = function () {
  var grayGMapsOptions = {
    maxZoom: 21,
    styles: [
      { featureType: 'landscape.natural', stylers: [{ visibility: 'simplified' }, { saturation: -100 }, { lightness: -80 }, { gamma: 2.44 }] },
      { featureType: 'road', stylers: [{ visibility: 'simplified' }, { color: '#bebebe' }, { weight: 0.6 }] },
      { featureType: 'poi', stylers: [{ saturation: -100 }, { visibility: 'on' }, { gamma: 0.34 }] },
      { featureType: 'water', stylers: [{ color: '#32324f' }] },
      { featureType: 'transit', stylers: [{ visibility: 'off' }] },
      { featureType: 'road', elementType: 'labels', stylers: [{ visibility: 'off' }] },
      { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
      { featureType: 'poi' },
      { featureType: 'landscape.man_made', stylers: [{ saturation: -100 }, { gamma: 0.13 }] },
      { featureType: 'water', elementType: 'labels', stylers: [{ visibility: 'off' }] },
    ]
  };

  var grayGMaps = L.gridLayer.googleMutant(grayGMapsOptions);

  layerChooser.addBaseLayer(grayGMaps, "Google Gray");
};

function setup() {
  grayGMaps.addLayer();
}

setup.info = plugin_info; //add the script info data to the function as a property
if (typeof changelog !== 'undefined') setup.info.changelog = changelog;
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
})();

