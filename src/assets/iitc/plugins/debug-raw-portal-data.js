// @author         jonatkins
// @name           IITC plugin: Debug: Raw portal JSON data
// @category       Portal Info
// @version        0.2.5.20240330.064928
// @description    Developer debugging aid: Add a link to the portal details to show the raw data of a portal.

(function () {
  plugin_info = {}
  plugin_info.script = {
    version: '0.2.5',
    name: 'Debug: Raw portal JSON data',
    description: 'Developer debugging aid: Add a link to the portal details to show the raw data of a portal.'
  }
  plugin_info.buildName = 'dev';
  plugin_info.dateTimeVersion = '2024-03-30-064928';
  plugin_info.pluginId = 'debug-raw-portal-data';

/* exported setup, changelog --eslint */

var changelog = [
  {
    version: '0.2.5',
    changes: ['Added human readable timestamp for portal links and fields'],
  },
];

// use own namespace for plugin
window.plugin.rawdata = function() {};

window.plugin.rawdata.setupCallback = function() {
    addHook('portalDetailsUpdated', window.plugin.rawdata.addLink);
}

window.plugin.rawdata.addLink = function(d) {
  $('.linkdetails').append('<aside><a onclick="window.plugin.rawdata.showPortalData(\''+window.selectedPortal+'\')" title="Display raw data of the portal">Raw Data</a></aside>');
}

window.plugin.rawdata.showPortalData = function(guid) {
  if (!window.portals[guid]) {
    console.warn ('Error: failed to find portal details for guid '+guid+' - failed to show debug data');
    return;
  }


  var data = window.portals[guid].options.data;
  var ts = window.portals[guid].options.timestamp;

  var title = 'Raw portal data: ' + (data.title || '<no title>');

  var body = `<b>Portal GUID</b>: <code>${guid}</code><br />
              <b>Entity timestamp</b>: <code>${ts}</code> - ${window.unixTimeToDateTimeString(ts, true)}<br />
              <b>Portal map data</b>: <pre>${JSON.stringify(data, null, 2)}</pre>`;

  var details = portalDetail.get(guid);
  if (details) {
    body += '<b>Portal details:</b><pre>'+JSON.stringify(details,null,2)+'</pre>';
  }


  body += '<p><b>Links referencing this portal</b></p>';
  var haslinks = false;
  var linkGuids = getPortalLinks(guid);
  $.each(linkGuids.in.concat(linkGuids.out), function(i,lguid) {
    var l = window.links[lguid];
    var ld = l.options.data;
    body += `<b>Link GUID</b>: <code>${l.options.guid}</code><br />
             <b>Entity timestamp</b>: <code>${ld.timestamp}</code> - ${window.unixTimeToDateTimeString(ld.timestamp, true)}<br />
             <pre>${JSON.stringify(ld, null, 2)}</pre>`;
    haslinks = true;
  });

  if (!haslinks) body += '<p>No links to/from this portal</p>';

  body += '<p><b>Fields referencing this portal</b></p>';
  var hasfields = false;
  var fieldGuids = getPortalFields(guid);
  $.each(fieldGuids, function(i,fguid) {
    var f = window.fields[fguid];
    var fd = f.options.data;
    body += `<b>Field guid</b>: <code>${f.options.guid}</code><br />
             <b>Entity timestamp</b>: <code>${fd.timestamp}</code> - ${window.unixTimeToDateTimeString(fd.timestamp, true)}<br />
             <pre>${JSON.stringify(fd, null, 2)}</pre>`;
    hasfields = true;
  });
  if (!hasfields) body += '<p>No fields linked to this portal</p>';

  dialog({
    title: title,
    html: body,
    id: 'dialog-rawdata',
    width: 'auto',
    dialogClass: 'ui-dialog-rawdata',
  });
}

var setup = function () {
  window.plugin.rawdata.setupCallback();
}

setup.info = plugin_info; //add the script info data to the function as a property
if (typeof changelog !== 'undefined') setup.info.changelog = changelog;
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
})();

