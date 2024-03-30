// @author         breunigs
// @name           IITC plugin: Scale bar
// @category       Controls
// @version        0.1.2.20240330.064928
// @description    Show scale bar on the map.

(function () {
  plugin_info = {}
  plugin_info.script = {
    version: '0.1.2',
    name: 'Scale bar',
    description: 'Show scale bar on the map.'
  }
  plugin_info.buildName = 'dev';
  plugin_info.dateTimeVersion = '2024-03-30-064928';
  plugin_info.pluginId = 'scale-bar';

/* exported setup, changelog --eslint */

var changelog = [
  {
    version: '0.1.2',
    changes: ['Version upgrade due to a change in the wrapper: added plugin icon'],
  },
];

// use own namespace for plugin
var scaleBar = {};
window.plugin.scaleBar = scaleBar;

// Before you ask: yes, I explicitely turned off imperial units. Imperial units
// are worse than Internet Explorer 6 whirring fans combined. Upgrade to the metric
// system already.
scaleBar.options = { imperial: false };

scaleBar.mobileOptions = { position: 'bottomright', maxWidth: 100 };

scaleBar.desktopOptions = { position: 'topleft', maxWidth: 200 };

function moveToEdge (ctrl) {
  var $el = $(ctrl.getContainer());
  var $corner = $el.parent();
  var pos = ctrl.getPosition();
  if (pos.indexOf('top') !== -1) {
    $corner.prepend($el);
  } else if (pos.indexOf('bottom') !== -1) {
    $corner.append($el);
    $corner.find('.leaflet-control-attribution').appendTo($corner); // make sure that attribution control is on very bottom
  }
}

function setup () {
  var options = L.extend({}, window.isSmartphone() ? scaleBar.mobileOptions : scaleBar.desktopOptions, scaleBar.options);
  scaleBar.control = L.control.scale(options).addTo(window.map);
  // wait other controls to initialize (should be initialized last)
  setTimeout(function () { moveToEdge(scaleBar.control); });
}
setup.priority = 'low';
setup.info = plugin_info; //add the script info data to the function as a property
if (typeof changelog !== 'undefined') setup.info.changelog = changelog;
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
})();

