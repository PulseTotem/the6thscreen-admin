angular.module('T6SAdmin')
  .controller('T6SAdmin.EditInfoTypeCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', function ($scope, $routeParams, backendSocket, callbackManager) {
    backendSocket.userIsLogin(function() {
      backendSocket.on('InfoTypeDescription', function(response) {
        callbackManager(response, function (infoType) {
            $scope.infoType = infoType;
          },
          function (fail) {
            console.error(fail);
          }
        );
      });

      backendSocket.emit('RetrieveInfoTypeDescription', { 'infoTypeId': $routeParams.infoTypeId});
    });

    $scope.saveAttribute = function (element, value) {
      var data = { "id" : $scope.infoType.id, "method": element, "value": value };
      backendSocket.emit("UpdateInfoTypeDescription", data);
    };
  }]);
