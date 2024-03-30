// @author         johnd0e
// @name           IITC plugin: Remove extra layers
// @category       Layer
// @version        0.1.1.20240330.064928
// @description    Remove 'Artifacts', 'Beacons' and 'Frackers' from layerChooser (still keeping them on map)

(function () {
  plugin_info = {}
  plugin_info.script = {
    version: '0.1.1',
    name: 'Remove extra layers',
    description: 'Remove 'Artifacts', 'Beacons' and 'Frackers' from layerChooser (still keeping them on map)'
  }
  plugin_info.buildName = 'dev';
  plugin_info.dateTimeVersion = '2024-03-30-064928';
  plugin_info.pluginId = 'remove-extra-layers';

/* exported setup, changelog --eslint */

var changelog = [
  {
    version: '0.1.1',
    changes: ['Version upgrade due to a change in the wrapper: added plugin icon'],
  },
];

// use own namespace for plugin
var removeExtraLayers = {};
window.plugin.remove = removeExtraLayers;

removeExtraLayers.names = ['Artifacts', 'Beacons', 'Frackers'];

function setup () {
  removeExtraLayers.names.forEach(function (name) {
    window.layerChooser.removeLayer(name, {keepOnMap: true});
  });
}

/* exported setup */

setup.info = plugin_info; //add the script info data to the function as a property
if (typeof changelog !== 'undefined') setup.info.changelog = changelog;
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
})();

