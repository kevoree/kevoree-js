var KevoreeCore        = require('kevoree-core'),
  kevoree              = require('kevoree-library').org.kevoree,
  KevoreeBrowserLogger = require('./lib/KevoreeBrowserLogger'),
  HTTPBootstrapper     = require('./lib/BrowserBootstrapper');

var log = new KevoreeBrowserLogger('Runtime');

// init core objects
var kevoreeCore = new KevoreeCore(__dirname, log),
  jsonLoader    = new kevoree.loader.JSONModelLoader(),
  bootstrapper  = new HTTPBootstrapper(__dirname);

// init DOM objects
var startBtn = $('#start-btn'),
  deployBtn  = $('#deploy-btn'),
  nodeName   = $('#node-name'),
  started    = false,
  deployed   = false,
  deploying  = false;

kevoreeCore.on('started', function () {
  log.info("KevoreeCore started");
  started = true;
  startBtn.addClass("disabled");
  deployBtn.removeClass("disabled");
});

kevoreeCore.on('deployed', function (err) {
  deploying = false;
  deployed = true;
  deployBtn.popover('hide');
  deployBtn.removeClass("disabled");
  log.info("KevoreeCore deployed");
});

kevoreeCore.on('stopped', function (err) {
  log.info("KevoreeCore stopped");
  started = deployed = deploying = false;
  startBtn.removeClass("disabled");
});

kevoreeCore.on('error', function (err) {
  log.error(err.message);
  deploying = deployed = false;
  deployBtn.popover('hide');
  deployBtn.removeClass("disabled");
  try {
    // try to stop Kevoree Core on error
    kevoreeCore.stop();
  } catch (err) {
    started = deployed = deploying = false;
  }
});

kevoreeCore.on('rollback', function () {
  log.info('Rollback succeed');
})

// set Kevoree bootstrapper
kevoreeCore.setBootstrapper(bootstrapper);

// set KevoreeUI bootstrap command
kevoreeCore.setUICommand(function (ui, callback) {
  try {
    var tabName = 'tab'+(parseInt(Math.random()*1000));
    $('#tabs-li').append('<li id="'+tabName+'_li"><a href="#'+tabName+'" data-toggle="tab">'+ui.getName()+'</a></li>');
    $('#tabs-content').append('<div class="tab-pane" id="'+tabName+'"><div id="'+tabName+'_root" class="well"></div></div>');
    var rootDiv = document.querySelector('#'+tabName+'_root');
    rootDiv.createShadowRoot = rootDiv.createShadowRoot || rootDiv.webkitCreateShadowRoot;
    ui.on('nameChanged', function (name) {
      $('#'+tabName+' a').html(name);
    });
    ui.setRoot(rootDiv.createShadowRoot());
    ui.setDestroyCmd(function () {
      var tabLi = document.querySelector('#'+tabName+'_li');
      tabLi.parentNode.removeChild(tabLi);
      rootDiv.parentNode.removeChild(rootDiv);
    });
    return callback();

  } catch (err) {
    console.error(err);
    return callback(err);
  }
});

// start Kevoree Core button clicked
startBtn.on('click', function () {
  if (!started) {
    try {
      var nodename = nodeName.val() || "node0";
      kevoreeCore.start(cleanString(nodename));
      nodeName.prop('disabled', 'disabled');
    } catch (err) {
      log.error(err.message);
    }
  }
});

// deploy button clicked
deployBtn.on('click', function () {
  if (started) {
    if (!deploying) {
      if (!deployed) {
        try {
          deploying = true;
          deployBtn.addClass("disabled");
          deployBtn.popover({
            html: true,
            content: deployPopoverContent,
            placement: 'bottom',
            trigger: 'manual'
          });
          deployBtn.popover('show');

          $.ajax({
            type: 'POST',
            url: 'bootstrap',
            data: {nodename: kevoreeCore.getNodeName()},
            success: function (data) {
              try {
                var loader = new kevoree.loader.JSONModelLoader();
                console.log(loader);
                kevoreeCore.deploy(loader.loadModelFromString(data.model).get(0));
              } catch (err) {
                log.error(err.message);
                deploying = false;
                deployBtn.removeClass('disabled');
                deployBtn.popover('hide');
              }
            },
            error: function (err) {
              console.log(err);
              log.error('Unable to retrieve bootstrap model from server. Deploy aborted.<br/>Reason: '+err.responseText);
              deploying = false;
              deployBtn.removeClass('disabled');
              deployBtn.popover('hide');
            }
          });
        } catch (err) {
          log.error(err.message);
        }
      } else {
        log.warn("Model is already deployed.");
      }
    } else {
      log.warn("Already trying to deploy model, please wait...");
    }
  } else {
    log.warn("Can't deploy model: you must start Kevoree Runtime first.");
  }
});

var deployPopoverContent = function deployPopoverContent() {
  return  '<small>Please wait while deploying...</small>' +
    '<div class="progress progress-striped active" style="margin-bottom: 0px">'+
    '<div class="progress-bar progress-bar-info"  role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>' +
    '</div>';
}

var cleanString = function cleanString(str) {
  str = str.replace(/\s/g, '');
  str = str.replace(/[^\w\d]/g, '');
  return str;
}