const AbstractComponent = require('kevoree-entities/lib/AbstractComponent');

/**
 * Kevoree component
 * @type {MsgSender}
 */
const MsgSender = AbstractComponent.extend({
  toString: 'MsgSender',
  tdef_version: 1,

  out_send() {},

  /**
   * this method is called by the Browser Runtime in order to retrieve
   * this component AngularJS UI controller
   */
  uiController() {
    return ['$scope', 'instance', ($scope, instance) => {
      $scope.message = null;
      $scope.send = function onSend() {
        instance.out_send($scope.message);
        $scope.message = null;
      };

      $scope.keypressHandler = (event) => {
        if (event.which === 13) {
          $scope.send();
        }
      };
    }];
  }
});

module.exports = MsgSender;
