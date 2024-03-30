// @author         jonatkins
// @name           IITC plugin: Disable mouse wheel zoom
// @category       Tweaks
// @version        0.1.1.20240330.064928
// @description    Disable the use of mouse wheel to zoom. The map zoom controls or keyboard are still available.

(function () {
  plugin_info = {}
  plugin_info.script = {
    version: '0.1.1',
    name: 'Disable mouse wheel zoom',
    description: 'Disable the use of mouse wheel to zoom. The map zoom controls or keyboard are still available.'
  }
  plugin_info.buildName = 'dev';
  plugin_info.dateTimeVersion = '2024-03-30-064928';
  plugin_info.pluginId = 'scroll-wheel-zoom-disable';

/* exported setup, changelog --eslint */

var changelog = [
  {
    version: '0.1.1',
    changes: ['Version upgrade due to a change in the wrapper: added plugin icon'],
  },
];

// use own namespace for plugin
window.plugin.scrollWheelZoomDisable = function() {};

window.plugin.scrollWheelZoomDisable.setup = function() {

  window.map.scrollWheelZoom.disable();

};

var setup =  window.plugin.scrollWheelZoomDisable.setup;

setup.info = plugin_info; //add the script info data to the function as a property
if (typeof changelog !== 'undefined') setup.info.changelog = changelog;
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
})();

