var AbstractComponent = require('kevoree-entities').AbstractComponent;

/**
 * Kevoree component
 * @type {MsgSender}
 */
var MsgSender = AbstractComponent.extend({
    toString: 'MsgSender',
    tdef_version: 1,

    out_send: function () {},

    /**
     * this method is called by the Browser Runtime in order to retrieve
     * this component AngularJS UI controller
     */
    uiController: function () {
        return ['$scope', 'instance', function ($scope, instance) {
            $scope.message = null;
            $scope.send = function () {
                instance.out_send($scope.message);
                $scope.message = null;
            };

            $scope.keypressHandler = function (event) {
                if (event.which === 13) {
                    $scope.send();
                }
            };
        }];
    }
});

module.exports = MsgSender;
