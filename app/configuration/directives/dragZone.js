'use strict';

/**
 * @ngdoc directive
 * @name the6thscreenAdminApp.directive:dragZone
 * @description
 * # dragZone
 */
angular.module('T6SConfiguration')
  .directive('ngDragZone', [ 'zoneUtil', '$document', function(zoneUtil, $document) {
      return {
        priority: -1,
        restrict: 'A',
        link: function(scope, element, attrs){
          function deplaceZone(element, $event,clicX, clicY, elLeft,elTop) {
            var id = attrs.numero;
            var zone = element[0];
            var fenetreEdition = document.getElementById("zone_edit");
            var fenetreEditionWidth = fenetreEdition.getBoundingClientRect().width;
            var fenetreEditionLeft = fenetreEdition.getBoundingClientRect().left;
            var fenetreEditionHeight = fenetreEdition.getBoundingClientRect().height;
            var fenetreEditionTop = fenetreEdition.getBoundingClientRect().top;
            var elWidth=zone.getBoundingClientRect().width;
            var elHeight=zone.getBoundingClientRect().height;
            var newClicX = ($event.pageX - fenetreEditionLeft);
            var newClicY = ($event.pageY - fenetreEditionTop);
            var varX=newClicX - clicX;
            var varY=newClicY- clicY;
            var top = varY+elTop;
            var left = varX+elLeft;
            var pcTop = (top / fenetreEditionHeight) * 100,
              pcLeft = (left / fenetreEditionWidth) * 100;
            var elHeightPourcentage=(elHeight / fenetreEditionHeight) * 100;
            var elWidthPourcentage=(elWidth / fenetreEditionWidth) * 100;
            if (pcTop < 0) {
              pcTop = 0;
            }
            else if (pcTop + elHeightPourcentage > 100) {
              pcTop = 100 - elHeightPourcentage;
            }
            if (pcLeft < 0) {
              pcLeft = 0;
            }
            else if (pcLeft + elWidthPourcentage > 100) {
              pcLeft = 100 - elWidthPourcentage;
            }
            var pcRight = (pcLeft + elWidthPourcentage),
              pcBottom = (pcTop +elHeightPourcentage);
            if (zoneUtil.magnetisme === true) {
              var respcRight = zoneUtil.aidePlacementVerticale(element, id, pcRight, 1);
              pcRight = respcRight[0];
              var respcBottom = zoneUtil.aidePlacementHorizontale(element, id, pcBottom, 1);
              pcBottom = respcBottom[0];
              pcLeft = pcRight - elWidthPourcentage;
              pcTop = pcBottom - elHeightPourcentage;
              var respcLeft = zoneUtil.aidePlacementVerticale(element, id, pcLeft, 0);
              pcLeft = respcLeft[0];
              var respcTop = zoneUtil.aidePlacementHorizontale(element, id, pcTop, 0);
              pcTop = respcTop[0];
            }
            var tmpZone = zoneUtil.get(scope.zones, id);
            tmpZone.positionFromLeft = pcLeft;
            tmpZone.positionFromTop = pcTop;
            zoneUtil.addAncreH(id, pcTop, pcBottom);
            zoneUtil.addAncreV(id, pcLeft, pcRight);
            zoneUtil.update(scope.zones, tmpZone);
            scope.$apply();
          }

          function mup() {
            $document.off('mousemove', mmove);
            $document.off('mouseup',mup);
            //$document.off('mousemove', mmove);
            //$document.off('mouseup', mup);
            //var zone_JSON = JSON.stringify(scope.zones);
            //console.log(zone_JSON);
            scope.showTooltip = true;
            zoneUtil.cacherAncre();
            var tmpZone = zoneUtil.get(scope.zones, id);
            $scope.updateZonePosition(tmpZone);
          }

          function mmove($event) {
            $event.preventDefault();
            deplaceZone(element, $event,clicX, clicY, elLeft, elTop);
          }
          var clicX = 0, clicY = 0, elLeft= 0, elTop=0;
          var newElement = angular.element('<div class="draggable glyphicon glyphicon-move"></div>');
          element.append(newElement);
          newElement.on('mousedown', function ($event) {
            $event.preventDefault();
            if (attrs.ngDragZone === 'true') {
              $document.on('mouseup', mup);
              $document.on('mousemove',mmove);
              //$document.on('mouseup', mup);
              //$document.on('mousemove', mmove);
              var fenetreEdition = document.getElementById("zone_edit");
              var fenetreEditionLeft = fenetreEdition.getBoundingClientRect().left;
              var fenetreEditionTop = fenetreEdition.getBoundingClientRect().top;
              clicX = ($event.pageX - fenetreEditionLeft);
              clicY = ($event.pageY - fenetreEditionTop);
              elLeft=element[0].getBoundingClientRect().left-fenetreEditionLeft;
              elTop=element[0].getBoundingClientRect().top-fenetreEditionTop;
            }
          });
        }
      }
}]);
