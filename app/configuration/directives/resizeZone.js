'use strict';

/**
 * @ngdoc directive
 * @name the6thscreenAdminApp.directive:dragZone
 * @description
 * # dragZone
 */
angular.module('T6SConfiguration')
  .directive('ngResizeZone', [ 'zoneUtil', '$document', function(zoneUtil, $document) {
    return {
      priority: -1,
      restrict: 'A',
      link: function(scope, element, attrs){
        function getEditZone() {
          return document.getElementById("zone_edit");
        };

        function getEditZoneRect() {
          return getEditZone().getBoundingClientRect();
        };

        function ratio(valeur, rapport) {
          return (valeur / rapport) * 100;
        }

        function resize(element, $event, clicX, clicY, elLeft, elTop, elWidth, elHeight, sens) {
          var id = attrs.numero;

          var newClicX = ($event.pageX - getEditZoneRect().left);
          var newClicY = ($event.pageY - getEditZoneRect().top);

          var varX = newClicX - clicX;
          var varY = newClicY - clicY;

          var left = elLeft;
          var top = elTop;
          var width = elWidth;
          var height = elHeight;

          if (sens == 'SW') {
            left = elLeft + varX;
            width = elWidth - varX;
            height = elHeight + varY;
          }
          if (sens == 'SE') {
            width = elWidth + varX;
            height = elHeight + varY;
          }
          if (sens == 'NE') {
            top = elTop + varY;
            left = elLeft;
            width = elWidth + varX;
            height = elHeight - varY;
          }
          if (sens == 'NW') {
            top = elTop + varY;
            left = elLeft + varX;
            width = elWidth - varX;
            height = elHeight - varY;
          }

          var pcWidth = ratio(width, getEditZoneRect().width), //convertir px en %
            pcHeight = ratio(height, getEditZoneRect().height), //convertir px en %
            pcLeft = ratio(left, getEditZoneRect().width), //convertir px en %
            pcTop = ratio(top, getEditZoneRect().height);

          var ratioWidthMin = ratio(elLeft+elWidth, getEditZoneRect().width);
          var widthMinVal = ratioWidthMin - zoneUtil.widthMin; //divY+minHeightZone

          if (pcLeft < 0) {
            pcLeft = 0;
            pcWidth = ratioWidthMin;
          }

          if (pcWidth < zoneUtil.widthMin) {
            pcLeft = widthMinVal;
            pcWidth = zoneUtil.widthMin;
          }

          if (pcHeight < zoneUtil.heightMin) {
            pcHeight = zoneUtil.heightMin;
          }

          var pcBottom = pcTop+pcHeight;

          if (pcBottom > 100){
            pcBottom = 100;
            pcHeight = 100-pcTop;
          }

          if (pcHeight + pcTop > 100){
            pcHeight = 100 - pcTop;
          }
          if (pcWidth + pcLeft > 100){
            pcWidth = 100 - pcLeft;
          }

          var pcRight = pcLeft + pcWidth;

          if (zoneUtil.magnetisme) {
            if (sens == 'SW') {
              var respcLeft = zoneUtil.aidePlacementVerticale(element, id, pcLeft, 0);
              pcLeft = respcLeft[0];
              var respcHeight = (zoneUtil.aidePlacementHorizontale(element, id, pcTop + pcHeight, 0));
              pcHeight = respcHeight[0] - pcTop;
            }
            if (sens == 'SE') {
              var respcRight = zoneUtil.aidePlacementVerticale(element, id, pcRight, 0);
              pcRight = respcRight[0];
              pcWidth = pcRight - pcLeft;
              var respcHeight = (zoneUtil.aidePlacementHorizontale(element, id, pcTop + pcHeight, 0));
              pcHeight = respcHeight[0] - pcTop;
            }
            if (sens == 'NW') {
              var respcLeft = zoneUtil.aidePlacementVerticale(element, id, pcLeft, 0);
              pcLeft = respcLeft[0];
              var respcTop = (zoneUtil.aidePlacementHorizontale(element, id, pcTop, 0));
              pcTop = respcTop[0];
            }
            if (sens == 'NE') {
              var respcTop = zoneUtil.aidePlacementHorizontale(element, id, pcTop, 0);
              pcTop = respcTop[0];
              var respcWidth = (zoneUtil.aidePlacementVerticale(element, id, pcLeft + pcWidth, 0));
              pcWidth = respcWidth[0] - pcLeft;
            }
          }

          var tmpZone = zoneUtil.get(scope.zones, id);
          tmpZone.positionFromLeft = pcLeft;
          tmpZone.positionFromTop = pcTop;

          tmpZone.height = pcHeight;
          tmpZone.width = pcWidth;
          zoneUtil.addAncreH(id, pcTop, pcBottom);
          zoneUtil.addAncreV(id, pcRight, pcLeft);
          zoneUtil.update(scope.zones, tmpZone);
          scope.$apply();
        }

        function bindResizeWithElement(newElement, sens) {
          newElement.on('mousedown', function ($event) {
            $event.preventDefault();
            if (attrs.ngResizeZone === 'true') {

              var clicX = ($event.pageX - getEditZoneRect().left);
              var clicY = ($event.pageY - getEditZoneRect().top);

              var elRect = element[0].getBoundingClientRect();
              var elLeft = elRect.left - getEditZoneRect().left;
              var elTop = elRect.top - getEditZoneRect().top;
              var elWidth = elRect.width;
              var elHeight = elRect.height;

              var mousemove = function ($event) {
                $event.preventDefault();
                resize(element, $event, clicX, clicY, elLeft, elTop, elWidth, elHeight, sens);
              };

              var mouseup = function () {
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
                //zone_JSON = JSON.stringify(scope.zones);
                //ole.log(zone_JSON);
                scope.showTooltip = true;
                zoneUtil.cacherAncre();
              };

              $document.on('mouseup', mouseup);
              $document.on('mousemove',mousemove);
            }
          });
        }


        //var clicX = 0,clicY = 0,elLeft= 0,elTop= 0,elWidth= 0,elHeight=0;

        var newElementSW = angular.element('<div class="resizableSW"></div>');
        element.append(newElementSW);
        bindResizeWithElement(newElementSW, 'SW');

        var newElementSE = angular.element('<div class="resizableSE"></div>');
        element.append(newElementSE);
        bindResizeWithElement(newElementSE, 'SE');

        var newElementNE = angular.element('<div class="resizableNE"></div>');
        element.append(newElementNE);
        bindResizeWithElement(newElementNE, 'NE');

        var newElementNW = angular.element('<div class="resizableNW"></div>');
        element.append(newElementNW);
        bindResizeWithElement(newElementNW, 'NW');
      }
    }
  }]);
