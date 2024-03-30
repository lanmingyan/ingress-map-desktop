// @author         johnd0e
// @name           IITC plugin: Kartverket.no maps (Norway)
// @category       Map Tiles
// @version        0.2.3.20240330.064928
// @description    Add Kartverket.no map layers.

(function () {
  plugin_info = {}
  plugin_info.script = {
    version: '0.2.3',
    name: 'Kartverket.no maps (Norway)',
    description: 'Add Kartverket.no map layers.'
  }
  plugin_info.buildName = 'dev';
  plugin_info.dateTimeVersion = '2024-03-30-064928';
  plugin_info.pluginId = 'basemap-kartverket';

/* exported setup, changelog --eslint */
/* global L, layerChooser */

var changelog = [
  {
    version: '0.2.3',
    changes: ['Version upgrade due to a change in the wrapper: added plugin icon'],
  },
];

// use own namespace for plugin
var mapKartverket = {};

mapKartverket.setup = function () {

  L.TileLayer.Kartverket = L.TileLayer.extend({

    baseUrl: 'https://opencache{s}.statkart.no/gatekeeper/gk/gk.open_gmaps?'
           + 'layers={layer}&zoom={z}&x={x}&y={y}',

    options: {
      maxNativeZoom: 18,
      attribution: '&copy; <a href="http://kartverket.no">Kartverket</a>',
      subdomains: ['', '2', '3']
    },

    mappings: {
      kartdata2: 'topo4',
      matrikkel_bakgrunn: 'matrikkel_bakgrunn2',
      norgeskart_bakgrunn: 'topo4',
      sjo_hovedkart2: 'sjokartraster',
      toporaster: 'toporaster3',
      topo2: 'topo4',
      topo2graatone: 'topo4graatone'
    },

    layers: {
      matrikkel_bakgrunn2:'Matrikkel bakgrunn',
      topo4:              'Topografisk norgeskart',
      topo4graatone:      'Topografisk norgeskart gråtone',
      europa:             'Europakart',
      toporaster3:        'Topografisk norgeskart, raster',
      sjokartraster:      'Sjøkart hovedkartserien',
      norges_grunnkart:   'Norges Grunnkart',
      norges_grunnkart_graatone: 'Norges grunnkart gråtone',
      egk:                'Europeiske grunnkart',
      terreng_norgeskart: 'Terreng',
      havbunn_grunnkart:  'Havbunn grunnkart',
      bakgrunnskart_forenklet: null
    },

    initialize: function (layer, options) {
      if (typeof this.layers[layer] === 'undefined') {
        if (this.mappings[layer]) {
          layer = this.mappings[layer];
        } else {
          throw new Error('Unknown layer "' + layer + '"');
        }
      }

      L.TileLayer.prototype.initialize.call(this, this.baseUrl, options);
      this.options.layer = layer;
      this._name = this.layers[layer] || layer;
    }

  });

  L.tileLayer.kartverket = function (layer, options) {
    return new L.TileLayer.Kartverket(layer, options);
  };

  L.tileLayer.kartverket.getLayers = function () {
    return L.extend({},L.TileLayer.Kartverket.prototype.layers);
  };

  var l, layer;
  for (layer in L.tileLayer.kartverket.getLayers()) {
    l = L.tileLayer.kartverket(layer);
    layerChooser.addBaseLayer(l, l._name);
  }
};

function setup() {
  mapKartverket.setup();
}

setup.info = plugin_info; //add the script info data to the function as a property
if (typeof changelog !== 'undefined') setup.info.changelog = changelog;
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
})();

