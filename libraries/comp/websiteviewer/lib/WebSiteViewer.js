var AbstractComponent = require('kevoree-entities').AbstractComponent;
var http = require('http');

/**
 * Kevoree component
 * @type {WebSiteViewer}
 */
var WebSiteViewer = AbstractComponent.extend({
    toString: 'WebSiteViewer',
    tdef_version: 1,

    dic_url: { optional: false },

    construct: function () {
        this.onUpdate = function () { /* noop */ };
    },

    update: function (done) {
        this.onUpdate();
        done();
    },

    /**
     * this method is called by the Browser Runtime in order to retrieve
     * this component AngularJS UI controller
     */
    uiController: function () {
        return ['$scope', '$timeout', '$sce', 'instance', function ($scope, $timeout, $sce, instance) {
            $scope.url = $sce.trustAsResourceUrl(instance.dictionary.getString('url'));
            instance.onUpdate = function () {
                $timeout(function () {
                    $scope.url = $sce.trustAsResourceUrl(instance.dictionary.getString('url'));
                });
            };
        }];
    }
});

module.exports = WebSiteViewer;
