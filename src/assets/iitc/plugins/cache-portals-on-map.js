// @author         jonatkins
// @name           IITC plugin: Cache viewed portals on map
// @category       Cache
// @version        0.1.1.20240330.064928
// @description    Cache the details of recently viewed portals and use this to populate the map when possible

(function () {
  plugin_info = {}
  plugin_info.script = {
    version: '0.1.1',
    name: 'Cache viewed portals on map',
    description: 'Cache the details of recently viewed portals and use this to populate the map when possible'
  }
  plugin_info.buildName = 'dev';
  plugin_info.dateTimeVersion = '2024-03-30-064928';
  plugin_info.pluginId = 'cache-portals-on-map';

/* exported setup, changelog --eslint */

var changelog = [
  {
    version: '0.1.1',
    changes: ['Version upgrade due to a change in the wrapper: added plugin icon'],
  },
];

// use own namespace for plugin
window.plugin.cachePortalDetailsOnMap = function() {};

window.plugin.cachePortalDetailsOnMap.MAX_AGE = 12*60*60;  //12 hours max age for cached data

window.plugin.cachePortalDetailsOnMap.portalDetailLoaded = function(data) {
  if (data.success) {
    window.plugin.cachePortalDetailsOnMap.cache[data.guid] = { loadtime: Date.now(), ent: data.ent };
  }
};

window.plugin.cachePortalDetailsOnMap.entityInject = function(data) {
  var maxAge = Date.now() - window.plugin.cachePortalDetailsOnMap.MAX_AGE*1000;

  var ents = [];
  for (var guid in window.plugin.cachePortalDetailsOnMap.cache) {
    if (window.plugin.cachePortalDetailsOnMap.cache[guid].loadtime < maxAge) {
      delete window.plugin.cachePortalDetailsOnMap.cache[guid];
    } else {
      ents.push(window.plugin.cachePortalDetailsOnMap.cache[guid].ent);
    }
  }
  data.callback(ents, 'detailed');
};


window.plugin.cachePortalDetailsOnMap.setup  = function() {

  window.plugin.cachePortalDetailsOnMap.cache = {};

  addHook('portalDetailLoaded', window.plugin.cachePortalDetailsOnMap.portalDetailLoaded);
  addHook('mapDataEntityInject', window.plugin.cachePortalDetailsOnMap.entityInject);
};

var setup =  window.plugin.cachePortalDetailsOnMap.setup;

setup.info = plugin_info; //add the script info data to the function as a property
if (typeof changelog !== 'undefined') setup.info.changelog = changelog;
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
})();

