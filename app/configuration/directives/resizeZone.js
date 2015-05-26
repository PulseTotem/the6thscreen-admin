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
        function resizeSW(element, $event,clicX,clicY,elLeft,elTop,elWidth,elHeight) {
          var id = element.attr('numero');
          var fenetreEdition = document.getElementById("zone_edit");
          var fenetreEditionWidth = fenetreEdition.getBoundingClientRect().width;
          var fenetreEditionLeft = fenetreEdition.getBoundingClientRect().left;
          var fenetreEditionHeight = fenetreEdition.getBoundingClientRect().height;
          var fenetreEditionTop = fenetreEdition.getBoundingClientRect().top;
          var newClicX = ($event.pageX - fenetreEditionLeft);
          var newClicY = ($event.pageY - fenetreEditionTop);
          var varX=newClicX - clicX;
          var varY=newClicY- clicY;
          var left = elLeft+varX;
          var width = elWidth-varX;
          var height = (elHeight+varY);

          var pcWidth = (width / fenetreEditionWidth) * 100, //convertir px en %
            pcHeight = (height / fenetreEditionHeight) * 100,//convertir px en %
            pcLeft = (left / fenetreEditionWidth) * 100,//convertir px en %
            pcTop = (elTop / fenetreEditionHeight) * 100;
          var widthMinVal = (((elLeft+elWidth)/ fenetreEditionWidth) * 100)-zoneUtil.widthMin;//divY+minHeightZone
          if (pcLeft<0){
            pcLeft=0;
            pcWidth = (((elLeft+elWidth)) / fenetreEditionWidth) * 100;
          }
          if (pcWidth<zoneUtil.widthMin){
            pcLeft=widthMinVal;
            pcWidth=zoneUtil.widthMin;
          }
          if (pcHeight<zoneUtil.heightMin){
            pcHeight=zoneUtil.heightMin;
          }
          var pcBottom=pcTop+pcHeight;
          if (pcBottom>100){
            pcBottom=100;
            pcHeight=100-pcTop;
          }

          var pcRight=pcLeft+pcWidth;
          if (zoneUtil.magnetisme === true) {
            var respcLeft = zoneUtil.aidePlacementVerticale(element, id, pcLeft, 0);
            pcLeft = respcLeft[0];
            var respcHeight = (zoneUtil.aidePlacementHorizontale(element, id, pcTop + pcHeight, 0));
            pcHeight = respcHeight[0] - pcTop;
          }
          var tmpZone = zoneUtil.get(scope.zones, id);
          tmpZone.positionFromLeft = pcLeft;
          tmpZone.height = pcHeight;
          tmpZone.width = pcWidth;
          zoneUtil.addAncreH(id, pcTop, pcBottom);
          zoneUtil.addAncreV(id, pcRight, pcLeft);
          zoneUtil.update(scope.zones, tmpZone);
          scope.$apply();
        }

        function mmoveSW($event) {
          $event.preventDefault();

          resizeSW(element, $event,clicX,clicY,elLeft,elTop,elWidth,elHeight);

        }

        function mupSW() {

          $document.off('mousemove', mmoveSW);
          $document.off('mouseup',mupSW);
          //var zone_JSON = JSON.stringify(scope.zones);
          //ole.log(zone_JSON);
          scope.showTooltip = true;
          zoneUtil.cacherAncre();
        }

        function resizeSE(element, $event,clicX,clicY,elLeft,elTop,elWidth,elHeight) {
          var id = element.attr('numero');
          var fenetreEdition = document.getElementById("zone_edit");
          var fenetreEditionWidth = fenetreEdition.getBoundingClientRect().width;
          var fenetreEditionLeft = fenetreEdition.getBoundingClientRect().left;
          var fenetreEditionHeight = fenetreEdition.getBoundingClientRect().height;
          var fenetreEditionTop = fenetreEdition.getBoundingClientRect().top;
          var newClicX = ($event.pageX - fenetreEditionLeft);
          var newClicY = ($event.pageY - fenetreEditionTop);
          var varX=newClicX - clicX;
          var varY=newClicY- clicY;
          var width = elWidth+varX;
          var height = (elHeight+varY);
          var pcWidth = (width / fenetreEditionWidth) * 100,
            pcTop = (elTop / fenetreEditionHeight) * 100,
            pcLeft = (elLeft / fenetreEditionWidth) * 100,
            pcHeight = (height / fenetreEditionHeight) * 100;
          if (pcWidth<zoneUtil.widthMin){
            pcWidth=zoneUtil.widthMin;
          }
          if (pcHeight<zoneUtil.heightMin){
            pcHeight=zoneUtil.heightMin;
          }
          if (pcHeight+pcTop>100){
            pcHeight=100-pcTop;
          }
          if (pcWidth+pcLeft>100){
            pcWidth=100-pcLeft;
          }
          var pcRight = pcLeft + pcWidth;

          if (zoneUtil.magnetisme === true) {
            var respcRight = zoneUtil.aidePlacementVerticale(element, id, pcRight, 0);
            pcRight = respcRight[0];
            pcWidth = pcRight - pcLeft;
            var respcHeight = (zoneUtil.aidePlacementHorizontale(element, id, pcTop + pcHeight, 0));
            pcHeight = respcHeight[0] - pcTop;
          }
          var tmpZone = zoneUtil.get(scope.zones, id);
          tmpZone.height = pcHeight;
          tmpZone.width = pcWidth;
          var pcBottom = (pcTop + pcHeight);
          zoneUtil.addAncreH(id, pcTop, pcBottom);
          zoneUtil.addAncreV(id, pcRight, pcLeft);
          zoneUtil.update(scope.zones, tmpZone);
          scope.$apply();
        }

        function mmoveSE($event) {
          $event.preventDefault();
          resizeSE(element, $event,clicX,clicY,elLeft,elTop,elWidth,elHeight);
        }

        function mupSE() {

          $document.off('mousemove', mmoveSE);
          $document.off('mouseup', mupSE);
          //zone_JSON = JSON.stringify(scope.zones);
          //ole.log(zone_JSON);
          scope.showTooltip = true;
          zoneUtil.cacherAncre();
        }

        function resizeNE(element, $event,clicX,clicY,elLeft,elTop,elWidth,elHeight) {
          var id = element.attr('numero');
          var fenetreEdition = document.getElementById("zone_edit");
          var fenetreEditionWidth = fenetreEdition.getBoundingClientRect().width;
          var fenetreEditionLeft = fenetreEdition.getBoundingClientRect().left;
          var fenetreEditionHeight = fenetreEdition.getBoundingClientRect().height;
          var fenetreEditionTop = fenetreEdition.getBoundingClientRect().top;
          var newClicX = ($event.pageX - fenetreEditionLeft);
          var newClicY = ($event.pageY - fenetreEditionTop);
          var varX=newClicX - clicX;
          var varY=newClicY- clicY;
          var top = elTop+varY;
          var left = elLeft;
          var width = elWidth+varX;
          var height = (elHeight-varY);

          var pcWidth = (width / fenetreEditionWidth) * 100,
            pcLeft = (left / fenetreEditionWidth) * 100,
            pcHeight = (height / fenetreEditionHeight) * 100,
            pcTop = (top / fenetreEditionHeight) * 100;
          if(pcWidth+pcLeft>100){
            pcWidth=100-pcLeft;
          }
          if(pcTop<0){
            pcTop=0;
            pcHeight= (((elTop+elHeight)) / fenetreEditionHeight) * 100;
          }
          if(pcTop<0){
            pcTop=0;
            pcHeight= (((elTop+elHeight)) / fenetreEditionHeight) * 100;
          }
          if(pcWidth<zoneUtil.widthMin){
            pcWidth=zoneUtil.widthMin;
          }
          if(pcHeight<zoneUtil.heightMin){
            pcHeight=zoneUtil.heightMin;
            pcTop=((((elTop+elHeight)) / fenetreEditionHeight) * 100)-zoneUtil.heightMin;
          }
          if (zoneUtil.magnetisme === true) {
            var respcTop = zoneUtil.aidePlacementHorizontale(element, id, pcTop, 0);
            pcTop = respcTop[0];
            var respcWidth = (zoneUtil.aidePlacementVerticale(element, id, pcLeft + pcWidth, 0));
            pcWidth = respcWidth[0] - pcLeft;
          }
          var tmpZone = zoneUtil.get(scope.zones, id);
          tmpZone.positionFromTop = pcTop;
          tmpZone.height = pcHeight;
          tmpZone.width = pcWidth;
          var pcRight = (pcLeft + pcWidth);
          var pcBottom = (pcTop + pcHeight);
          zoneUtil.addAncreH(id, pcTop, pcBottom);
          zoneUtil.addAncreV(id, pcRight, pcLeft);
          zoneUtil.update(scope.zones, tmpZone);
          scope.$apply();
        }

        function mmoveNE($event) {
          $event.preventDefault();

          resizeNE(element, $event,clicX,clicY,elLeft,elTop,elWidth,elHeight);

        }

        function mupNE() {

          $document.off('mousemove', mmoveNE);
          $document.off('mouseup', mupNE);
          //zone_JSON = JSON.stringify(scope.zones);
          //ole.log(zone_JSON);
          scope.showTooltip = true;
          zoneUtil.cacherAncre();
        }

        function resizeNW(element, $event,clicX,clicY,elLeft,elTop,elWidth,elHeight) {
          var id = element.attr('numero');
          var fenetreEdition = document.getElementById("zone_edit");
          var fenetreEditionWidth = fenetreEdition.getBoundingClientRect().width;
          var fenetreEditionLeft = fenetreEdition.getBoundingClientRect().left;
          var fenetreEditionHeight = fenetreEdition.getBoundingClientRect().height;
          var fenetreEditionTop = fenetreEdition.getBoundingClientRect().top;
          var newClicX = ($event.pageX - fenetreEditionLeft);
          var newClicY = ($event.pageY - fenetreEditionTop);
          var varX=newClicX - clicX;
          var varY=newClicY- clicY;
          var top = elTop+varY;
          var left = elLeft+varX;
          var width = elWidth-varX;
          var height = (elHeight-varY);

          var pcWidth = (width / fenetreEditionWidth) * 100,
            pcHeight = (height / fenetreEditionHeight) * 100,
            pcLeft = (left / fenetreEditionWidth) * 100,
            pcTop = (top / fenetreEditionHeight) * 100;
          if(pcWidth<zoneUtil.widthMin){
            pcWidth=zoneUtil.widthMin;
            pcLeft=((((elLeft+elWidth)) / fenetreEditionWidth) * 100)-zoneUtil.widthMin;
          }
          if(pcLeft<0){
            pcLeft=0;
            pcWidth= (((elLeft+elWidth)) / fenetreEditionWidth) * 100;
          }
          if(pcTop<0){
            pcTop=0;
            pcHeight= (((elTop+elHeight)) / fenetreEditionHeight) * 100;
          }
          if(pcHeight<zoneUtil.heightMin){
            pcHeight=zoneUtil.heightMin;
            pcTop=((((elTop+elHeight)) / fenetreEditionHeight) * 100)-zoneUtil.heightMin;
          }
          if (zoneUtil.magnetisme === true) {
            var respcLeft = zoneUtil.aidePlacementVerticale(element, id, pcLeft, 0);
            pcLeft = respcLeft[0];
            var respcTop = (zoneUtil.aidePlacementHorizontale(element, id, pcTop, 0));
            pcTop = respcTop[0];
          }
          var tmpZone = zoneUtil.get(scope.zones, id);
          tmpZone.positionFromLeft = pcLeft;
          tmpZone.height = pcHeight;
          tmpZone.positionFromTop = pcTop;
          tmpZone.width = pcWidth;
          var pcRight = (pcLeft + pcWidth);
          var pcBottom = (pcTop + pcHeight);
          zoneUtil.addAncreH(id, pcTop, pcBottom);
          zoneUtil.addAncreV(id, pcRight, pcLeft);
          zoneUtil.update(scope.zones, tmpZone);
          scope.$apply();
        }

        function mmoveNW($event) {
          $event.preventDefault();
          resizeNW(element, $event,clicX,clicY,elLeft,elTop,elWidth,elHeight);
        }

        function mupNW() {
          $document.off('mousemove', mmoveNW);
          $document.off('mouseup', mupNW);
          //zone_JSON = JSON.stringify(scope.zones);
          //ole.log(zone_JSON);
          scope.showTooltip = true;
          zoneUtil.cacherAncre();
        }


        var clicX = 0,clicY = 0,elLeft= 0,elTop= 0,elWidth= 0,elHeight=0;
        var newElement = angular.element('<div class="resizableSW"></div>');
        element.append(newElement);
        newElement.on('mousedown', function ($event) {
          $event.preventDefault();
          if (attrs.ngResizeZone === 'true') {
            $document.on('mouseup', mupSW);
            $document.on('mousemove',mmoveSW);
            var fenetreEdition = document.getElementById("zone_edit");
            var fenetreEditionLeft = fenetreEdition.getBoundingClientRect().left;
            var fenetreEditionTop = fenetreEdition.getBoundingClientRect().top;
            clicX = ($event.pageX - fenetreEditionLeft);
            clicY = ($event.pageY - fenetreEditionTop);
            elLeft=element[0].getBoundingClientRect().left-fenetreEditionLeft;
            elTop=element[0].getBoundingClientRect().top-fenetreEditionTop;
            elWidth=element[0].getBoundingClientRect().width;
            elHeight=element[0].getBoundingClientRect().height;
          }
        });

        var newElement = angular.element('<div class="resizableSE"></div>');
        element.append(newElement);
        newElement.on('mousedown', function ($event) {
          $event.preventDefault();
          if (attrs.ngResizeZone === 'true') {
            $document.on('mouseup', mupSE);
            $document.on('mousemove',mmoveSE);
            var fenetreEdition = document.getElementById("zone_edit");
            var fenetreEditionLeft = fenetreEdition.getBoundingClientRect().left;
            var fenetreEditionTop = fenetreEdition.getBoundingClientRect().top;
            clicX = ($event.pageX - fenetreEditionLeft);
            clicY = ($event.pageY - fenetreEditionTop);
            elLeft=element[0].getBoundingClientRect().left-fenetreEditionLeft;
            elTop=element[0].getBoundingClientRect().top-fenetreEditionTop;
            elWidth=element[0].getBoundingClientRect().width;
            elHeight=element[0].getBoundingClientRect().height;
          }
        });

        var newElement = angular.element('<div class="resizableNE"></div>');
        element.append(newElement);
        newElement.on('mousedown', function ($event) {
          $event.preventDefault();
          if (attrs.ngResizeZone === 'true') {
            $document.on('mouseup', mupNE);
            $document.on('mousemove',mmoveNE);
            var fenetreEdition = document.getElementById("zone_edit");
            var fenetreEditionLeft = fenetreEdition.getBoundingClientRect().left;
            var fenetreEditionTop = fenetreEdition.getBoundingClientRect().top;
            clicX = ($event.pageX - fenetreEditionLeft);
            clicY = ($event.pageY - fenetreEditionTop);
            elLeft=element[0].getBoundingClientRect().left-fenetreEditionLeft;
            elTop=element[0].getBoundingClientRect().top-fenetreEditionTop;
            elWidth=element[0].getBoundingClientRect().width;
            elHeight=element[0].getBoundingClientRect().height;
          }
        });

        var newElement = angular.element('<div class="resizableNW"></div>');
        element.append(newElement);
        newElement.on('mousedown', function ($event) {
          $event.preventDefault();
          if (attrs.ngResizeZone === 'true') {
            $document.on('mouseup', mupNW);
            $document.on('mousemove',mmoveNW);
            var fenetreEdition = document.getElementById("zone_edit");
            var fenetreEditionLeft = fenetreEdition.getBoundingClientRect().left;
            var fenetreEditionTop = fenetreEdition.getBoundingClientRect().top;
            clicX = ($event.pageX - fenetreEditionLeft);
            clicY = ($event.pageY - fenetreEditionTop);
            elLeft=element[0].getBoundingClientRect().left-fenetreEditionLeft;
            elTop=element[0].getBoundingClientRect().top-fenetreEditionTop;
            elWidth=element[0].getBoundingClientRect().width;
            elHeight=element[0].getBoundingClientRect().height;
          }
        });
      }
    }
  }]);
