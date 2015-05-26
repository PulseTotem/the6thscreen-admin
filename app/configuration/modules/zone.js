'use strict';

/**
 * @ngdoc overview
 * @name zone
 * @description
 * # zone
 *
 * Zone module of the application.
 */
var app = angular.module('zone', []);

app.value('defaultValue', {
  ancresH: [0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20, 22.5, 25, 27.5, 30, 32.5, 35, 37.5, 40, 42.5, 45, 47.5, 50, 52.5,
    55, 57.5, 60, 62.5, 65, 67.5, 70, 72.5, 75, 77.5, 80, 52.5, 85, 87.5, 90, 92.5, 95, 97.5, 100],
  ancresV: [0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20, 22.5, 25, 27.5, 30, 32.5, 35, 37.5, 40, 42.5, 45, 47.5, 50, 52.5,
    55, 57.5, 60, 62.5, 65, 67.5, 70, 72.5, 75, 77.5, 80, 52.5, 85, 87.5, 90, 92.5, 95, 97.5, 100],
  ancresZH: [],
  ancresZV: [],
  magnetisme: true,
  magnetismeMarge: 0.75,
  heightMin: 5,
  widthMin: 5
});

app.factory('getSize', function ($window) {
  return {
    widthQuarter: function() {
      return $window.innerWidth/4;
    },
    widthHalf: function() {
      return $window.innerWidth/2;
    },
    widthPxToPerct: function(px) {
      return (px / $window.innerWidth) * 100;
    },
    widthPrctToPx: function(prct) {
      return Math.floor(($window.innerWidth/100) * prct);
    },
    getWidth: function() {
      return $window.innerWidth;
    },
    heightQuarter: function() {
      return $window.innerHeight/4;
    },
    heightHalf: function() {
      return $window.innerHeight/2;
    },
    heightPxToPerct: function(px) {
      return (px / $window.innerHeight) * 100;
    },
    heightPrctToPx: function(prct) {
      return Math.floor(($window.innerHeight/100) * prct);
    },
    getHeight: function() {
      return $window.innerHeight;
    }
  }
});

app.factory('zoneUtil', function () {
  // Service logic
  // ...
  function colisionZone(zone1, zone2) {
    var xyZone1 = zone1.getPoints();
    var xyZone2 = zone2.getPoints();
    if (xyZone1[0] < xyZone2[2] && xyZone1[2] > xyZone2[0] && xyZone1[1] < xyZone2[3] && xyZone1[3] > xyZone2[1]){
      return true;
    }else{
      return false;
    }
  }

// Public API here
  return {
    get: function (zones, id) {
      for (var i = 0; i < zones.length; i++) {
        if (zones[i].id == id) {
          return zones[i];
        }
      }
      return undefined;
    },

    colision: function (zones, id) {
      var colision = false;
      for (var i = 0; i < zones.length; i++) {
        if (zones[i].id == id) {
          for (var j = 0; j < zones.length; j++) {
            if (zones[j].id != id) {
              colision = colisionZone(zones[i], zones[j]);
              if (colision == true) {
                break;
              }
            }
          }
        }
      }
      return colision;
    },

    update: function (zones, zone) {
      for (var i = 0; i < zones.length; i++) {
        if (zones[i].id == zone.id) {
          zones[i] = zone;
        }
      }
      return zones;
    },

    suppr: function (zones, id) {
      for (var i = 0; i < zones.length; i++) {
        if (zones[i].id == id) {
          zones.splice(i, 1);
          return zones;
        }
      }
      return zones;
    }
  };
});

app.run(function($rootScope, $document,$window,defaultValue){
  $rootScope.aidePlacementVerticale = function(zone, id, point, cote) {
    var barreV1 = $document[0].body.getElementsByClassName('barre_verticale1');
    var barreV2 = $document[0].body.getElementsByClassName('barre_verticale2');
    var res = point;
    var decalage=0;
    for (var i = 0; i < defaultValue.ancresV.length; i++) {
      if ((point > defaultValue.ancresV[i] - defaultValue.magnetismeMarge) && (point < defaultValue.ancresV[i] + defaultValue.magnetismeMarge)) {
        res = defaultValue.ancresV[i];
      }
    }
    for (i = 1; i < defaultValue.ancresZV.length; i += 2) {
      if ((point > defaultValue.ancresZV[i] - defaultValue.magnetismeMarge) && (point < defaultValue.ancresZV[i] + defaultValue.magnetismeMarge) && (defaultValue.ancresZV[i - 1] !== id)) {
        res = defaultValue.ancresZV[i];
      }
    }
    if (res !== point) {
      decalage = point - res;
      if (cote === 0) {
        angular.element(barreV1).css({
          position: 'absolute',
          visibility: 'visible',
          width: res + '%',
          height: 100 + '%',
          borderRightColor: '#0000FF',
          borderRightWidth: '1px',
          borderRightStyle: 'Solid'
        });
      } else {
        angular.element(barreV2).css({
          position: 'absolute',
          visibility: 'visible',
          width: res + '%',
          height: 100 + '%',
          borderRightColor: '#0000FF',
          borderRightWidth: '1px',
          borderRightStyle: 'Solid'
        });
      }
    }
    else {
      if (cote === 0) {
        angular.element(barreV1).css({
          visibility: 'hidden'
        });
      } else {
        angular.element(barreV2).css({
          visibility: 'hidden'
        });
      }
    }
    return [res, decalage];
  };

  $rootScope.aidePlacementHorizontale = function(zone, id, point, cote) {
    var barreH1 = $document[0].body.getElementsByClassName('barre_horizontale1');
    var barreH2 = $document[0].body.getElementsByClassName('barre_horizontale2');
    var res = point;
    var decalage = 0;
    for (var i = 0; i < defaultValue.ancresH.length; i++) {
      if ((point > defaultValue.ancresH[i] - defaultValue.magnetismeMarge) && (point < defaultValue.ancresH[i] + defaultValue.magnetismeMarge)) {
        res = defaultValue.ancresH[i];
      }
    }
    for (i = 1; i < defaultValue.ancresZH.length; i += 2) {
      if ((point > defaultValue.ancresZH[i] - defaultValue.magnetismeMarge) && (point < defaultValue.ancresZH[i] + defaultValue.magnetismeMarge) && (defaultValue.ancresZH[i - 1] !== id)) {
        res = defaultValue.ancresZH[i];
      }
    }
    if (res !== point) {
      decalage = point - res;
      if (cote === 0) {
        angular.element(barreH1).css({
          position: 'absolute',
          visibility: 'visible',
          height: res + '%',
          width: 100 + '%',
          borderBottomColor: '#0000FF',
          borderBottomWidth: '1px',
          borderBottomStyle: 'Solid'
        });
      } else {
        angular.element(barreH2).css({
          position: 'absolute',
          visibility: 'visible',
          height: res + '%',
          width: 100 + '%',
          borderBottomColor: '#0000FF',
          borderBottomWidth: '1px',
          borderBottomStyle: 'Solid'
        });
      }
    }
    else {
      if (cote === 0) {
        angular.element(barreH1).css({
          visibility: 'hidden'
        });
      } else {
        angular.element(barreH2).css({
          visibility: 'hidden'
        });
      }
    }
    return [res,decalage];
  };

  $rootScope.addAncreH = function(id, newPoint, newPoint1) {
    for (var i = 0; i < defaultValue.ancresZH.length; i += 2) {
      if (defaultValue.ancresZH[i] === id) {
        defaultValue.ancresZH.splice(i, 2);
      }
    }
    defaultValue.ancresZH.push(id);
    defaultValue.ancresZH.push(newPoint);
    defaultValue.ancresZH.push(id);
    defaultValue.ancresZH.push(newPoint1);
  };

  $rootScope.addAncreV = function(id, newPoint, newPoint1) {
    defaultValue.ancresZV.push(id);
    defaultValue.ancresZV.push(newPoint);
    for (var i = 0; i < defaultValue.ancresZV.length; i += 2) {
      if (defaultValue.ancresZV[i] === id) {
        defaultValue.ancresZV.splice(i, 2);
      }
    }
    defaultValue.ancresZV.push(id);
    defaultValue.ancresZV.push(newPoint);
    defaultValue.ancresZV.push(id);
    defaultValue.ancresZV.push(newPoint1);
  };
  $rootScope.cacherAncre = function() {
    var barreH1 = $document[0].body.getElementsByClassName('barre_horizontale1');
    var barreH2 = $document[0].body.getElementsByClassName('barre_horizontale2');
    var barreV1 = $document[0].body.getElementsByClassName('barre_verticale1');
    var barreV2 = $document[0].body.getElementsByClassName('barre_verticale2');
    angular.element(barreH1).css({
      visibility: 'hidden'
    });
    angular.element(barreH2).css({
      visibility: 'hidden'
    });
    angular.element(barreV1).css({
      visibility: 'hidden'
    });
    angular.element(barreV2).css({
      visibility: 'hidden'
    });
  };
});

app.directive('drag', function ($document,$rootScope, $window, zoneUtil, defaultValue) {
  return function ($scope, $element) {
    function deplaceZone($element, $event,clicX, clicY, elLeft,elTop) {
      var id = $element.attr('numero');
      var zone = $element[0];
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
      if (defaultValue.magnetisme === true) {
        var respcRight = $rootScope.aidePlacementVerticale($element, id, pcRight, 1);
        pcRight = respcRight[0];
        var respcBottom = $rootScope.aidePlacementHorizontale($element, id, pcBottom, 1);
        pcBottom = respcBottom[0];
        pcLeft = pcRight - elWidthPourcentage;
        pcTop = pcBottom - elHeightPourcentage;
        var respcLeft = $rootScope.aidePlacementVerticale($element, id, pcLeft, 0);
        pcLeft = respcLeft[0];
        var respcTop = $rootScope.aidePlacementHorizontale($element, id, pcTop, 0);
        pcTop = respcTop[0];
      }
      var tmpZone = zoneUtil.get($scope.zones, id);
      tmpZone.positionFromLeft = pcLeft;
      tmpZone.positionFromTop = pcTop;
      $rootScope.addAncreH(id, pcTop, pcBottom);
      $rootScope.addAncreV(id, pcLeft, pcRight);
      zoneUtil.update($scope.zones, tmpZone);
      $scope.$apply();
    }

    function mup() {
      $document.off('mousemove', mmove);
      $document.off('mouseup', mup);
      //var zone_JSON = JSON.stringify($scope.zones);
      //console.log(zone_JSON);
      $scope.showTooltip = true;
      $rootScope.cacherAncre();
    }

    function mmove($event) {
      $event.preventDefault();
      deplaceZone($element, $event,clicX, clicY, elLeft, elTop);
    }
    var clicX = 0, clicY = 0, elLeft= 0, elTop=0;
    var newElement = angular.element('<div class="draggable"></div>');
    $element.append(newElement);
    newElement.on('mousedown', function ($event) {
      $event.preventDefault();
      if ($element.attr('drag') === 'true') {
        $document.on('mouseup', mup);
        $document.on('mousemove', mmove);
        var fenetreEdition = document.getElementById("zone_edit");
        var fenetreEditionLeft = fenetreEdition.getBoundingClientRect().left;
        var fenetreEditionTop = fenetreEdition.getBoundingClientRect().top;
        clicX = ($event.pageX - fenetreEditionLeft);
        clicY = ($event.pageY - fenetreEditionTop);
        elLeft=$element[0].getBoundingClientRect().left-fenetreEditionLeft;
        elTop=$element[0].getBoundingClientRect().top-fenetreEditionTop;
      }
    });
  };
});

app.directive('resizesw', function ($document,$rootScope, $window, zoneUtil, defaultValue) {
  return function ($scope, $element) {

    function resize($element, $event,clicX,clicY,elLeft,elTop,elWidth,elHeight) {
      var id = $element.attr('numero');
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
      var widthMinVal = (((elLeft+elWidth)/ fenetreEditionWidth) * 100)-defaultValue.widthMin;//divY+minHeightZone
      if (pcLeft<0){
        pcLeft=0;
        pcWidth = (((elLeft+elWidth)) / fenetreEditionWidth) * 100;
      }
      if (pcWidth<defaultValue.widthMin){
        pcLeft=widthMinVal;
        pcWidth=defaultValue.widthMin;
      }
      if (pcHeight<defaultValue.heightMin){
        pcHeight=defaultValue.heightMin;
      }
      var pcBottom=pcTop+pcHeight;
      if (pcBottom>100){
        pcBottom=100;
        pcHeight=100-pcTop;
      }

      var pcRight=pcLeft+pcWidth;
      if (defaultValue.magnetisme === true) {
        var respcLeft = $rootScope.aidePlacementVerticale($element, id, pcLeft, 0);
        pcLeft = respcLeft[0];
        var respcHeight = ($rootScope.aidePlacementHorizontale($element, id, pcTop + pcHeight, 0));
        pcHeight = respcHeight[0] - pcTop;
      }
      var tmpZone = zoneUtil.get($scope.zones, id);
      tmpZone.positionFromLeft = pcLeft;
      tmpZone.height = pcHeight;
      tmpZone.width = pcWidth;
      $rootScope.addAncreH(id, pcTop, pcBottom);
      $rootScope.addAncreV(id, pcRight, pcLeft);
      zoneUtil.update($scope.zones, tmpZone);
      $scope.$apply();
    }

    function mmove($event) {
      $event.preventDefault();

      resize($element, $event,clicX,clicY,elLeft,elTop,elWidth,elHeight);

    }

    function mup() {

      $document.off('mousemove', mmove);
      $document.off('mouseup', mup);
      //var zone_JSON = JSON.stringify($scope.zones);
      //ole.log(zone_JSON);
      $scope.showTooltip = true;
      $rootScope.cacherAncre();
    }
    var clicX = 0,clicY = 0,elLeft= 0,elTop= 0,elWidth= 0,elHeight=0;
    var newElement = angular.element('<div class="resizableSW"></div>');
    $element.append(newElement);
    newElement.on('mousedown', function ($event) {
      event.preventDefault();
      if ($element.attr('resize') === 'true') {
        $document.on('mouseup', mup);
        $document.on('mousemove', mmove);
        var fenetreEdition = document.getElementById("zone_edit");
        var fenetreEditionLeft = fenetreEdition.getBoundingClientRect().left;
        var fenetreEditionTop = fenetreEdition.getBoundingClientRect().top;
        clicX = ($event.pageX - fenetreEditionLeft);
        clicY = ($event.pageY - fenetreEditionTop);
        elLeft=$element[0].getBoundingClientRect().left-fenetreEditionLeft;
        elTop=$element[0].getBoundingClientRect().top-fenetreEditionTop;
        elWidth=$element[0].getBoundingClientRect().width;
        elHeight=$element[0].getBoundingClientRect().height;
      }
    });
  };
});

app.directive('resizese', function ($document,$rootScope, $window, zoneUtil, defaultValue) {
  return function ($scope, $element) {

    function resize($element, $event,clicX,clicY,elLeft,elTop,elWidth,elHeight) {
      var id = $element.attr('numero');
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
      if (pcWidth<defaultValue.widthMin){
        pcWidth=defaultValue.widthMin;
      }
      if (pcHeight<defaultValue.heightMin){
        pcHeight=defaultValue.heightMin;
      }
      if (pcHeight+pcTop>100){
        pcHeight=100-pcTop;
      }
      if (pcWidth+pcLeft>100){
        pcWidth=100-pcLeft;
      }
      var pcRight = pcLeft + pcWidth;

      if (defaultValue.magnetisme === true) {
        var respcRight = $rootScope.aidePlacementVerticale($element, id, pcRight, 0);
        pcRight = respcRight[0];
        pcWidth = pcRight - pcLeft;
        var respcHeight = ($rootScope.aidePlacementHorizontale($element, id, pcTop + pcHeight, 0));
        pcHeight = respcHeight[0] - pcTop;
      }
      var tmpZone = zoneUtil.get($scope.zones, id);
      tmpZone.height = pcHeight;
      tmpZone.width = pcWidth;
      var pcBottom = (pcTop + pcHeight);
      $rootScope.addAncreH(id, pcTop, pcBottom);
      $rootScope.addAncreV(id, pcRight, pcLeft);
      zoneUtil.update($scope.zones, tmpZone);
      $scope.$apply();
    }

    function mmove($event) {
      $event.preventDefault();
      resize($element, $event,clicX,clicY,elLeft,elTop,elWidth,elHeight);
    }

    function mup() {

      $document.off('mousemove', mmove);
      $document.off('mouseup', mup);
      //zone_JSON = JSON.stringify($scope.zones);
      //ole.log(zone_JSON);
      $scope.showTooltip = true;
      $rootScope.cacherAncre();
    }
    var clicX = 0,clicY = 0,elLeft= 0,elTop= 0,elWidth= 0,elHeight=0;
    var newElement = angular.element('<div class="resizableSE"></div>');
    $element.append(newElement);
    newElement.on('mousedown', function ($event) {
      event.preventDefault();
      if ($element.attr('resize') === 'true') {
        $document.on('mouseup', mup);
        $document.on('mousemove', mmove);
        var fenetreEdition = document.getElementById("zone_edit");
        var fenetreEditionLeft = fenetreEdition.getBoundingClientRect().left;
        var fenetreEditionTop = fenetreEdition.getBoundingClientRect().top;
        clicX = ($event.pageX - fenetreEditionLeft);
        clicY = ($event.pageY - fenetreEditionTop);
        elLeft=$element[0].getBoundingClientRect().left-fenetreEditionLeft;
        elTop=$element[0].getBoundingClientRect().top-fenetreEditionTop;
        elWidth=$element[0].getBoundingClientRect().width;
        elHeight=$element[0].getBoundingClientRect().height;
      }
    });
  };
});

app.directive('resizene', function ($document,$rootScope, $window, zoneUtil, defaultValue) {
  return function ($scope, $element) {

    function resize($element, $event,clicX,clicY,elLeft,elTop,elWidth,elHeight) {
      var id = $element.attr('numero');
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
      if(pcWidth<defaultValue.widthMin){
        pcWidth=defaultValue.widthMin;
      }
      if(pcHeight<defaultValue.heightMin){
        pcHeight=defaultValue.heightMin;
        pcTop=((((elTop+elHeight)) / fenetreEditionHeight) * 100)-defaultValue.heightMin;
      }
      if (defaultValue.magnetisme === true) {
        var respcTop = $rootScope.aidePlacementHorizontale($element, id, pcTop, 0);
        pcTop = respcTop[0];
        var respcWidth = ($rootScope.aidePlacementVerticale($element, id, pcLeft + pcWidth, 0));
        pcWidth = respcWidth[0] - pcLeft;
      }
      var tmpZone = zoneUtil.get($scope.zones, id);
      tmpZone.positionFromTop = pcTop;
      tmpZone.height = pcHeight;
      tmpZone.width = pcWidth;
      var pcRight = (pcLeft + pcWidth);
      var pcBottom = (pcTop + pcHeight);
      $rootScope.addAncreH(id, pcTop, pcBottom);
      $rootScope.addAncreV(id, pcRight, pcLeft);
      zoneUtil.update($scope.zones, tmpZone);
      $scope.$apply();
    }

    function mmove($event) {
      $event.preventDefault();

      resize($element, $event,clicX,clicY,elLeft,elTop,elWidth,elHeight);

    }

    function mup() {

      $document.off('mousemove', mmove);
      $document.off('mouseup', mup);
      //zone_JSON = JSON.stringify($scope.zones);
      //ole.log(zone_JSON);
      $scope.showTooltip = true;
      $rootScope.cacherAncre();
    }

    var clicX = 0,clicY = 0,elLeft= 0,elTop= 0,elWidth= 0,elHeight=0;
    var newElement = angular.element('<div class="resizableNE"></div>');
    $element.append(newElement);
    newElement.on('mousedown', function ($event) {
      event.preventDefault();
      if ($element.attr('resize') === 'true') {
        $document.on('mouseup', mup);
        $document.on('mousemove', mmove);
        var fenetreEdition = document.getElementById("zone_edit");
        var fenetreEditionLeft = fenetreEdition.getBoundingClientRect().left;
        var fenetreEditionTop = fenetreEdition.getBoundingClientRect().top;
        clicX = ($event.pageX - fenetreEditionLeft);
        clicY = ($event.pageY - fenetreEditionTop);
        elLeft=$element[0].getBoundingClientRect().left-fenetreEditionLeft;
        elTop=$element[0].getBoundingClientRect().top-fenetreEditionTop;
        elWidth=$element[0].getBoundingClientRect().width;
        elHeight=$element[0].getBoundingClientRect().height;
      }
    });
  };
});

app.directive('resizenw', function ($document,$rootScope, $window, zoneUtil, defaultValue) {
  return function ($scope, $element) {

    function resize($element, $event,clicX,clicY,elLeft,elTop,elWidth,elHeight) {
      var id = $element.attr('numero');
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
      if(pcWidth<defaultValue.widthMin){
        pcWidth=defaultValue.widthMin;
        pcLeft=((((elLeft+elWidth)) / fenetreEditionWidth) * 100)-defaultValue.widthMin;
      }
      if(pcLeft<0){
        pcLeft=0;
        pcWidth= (((elLeft+elWidth)) / fenetreEditionWidth) * 100;
      }
      if(pcTop<0){
        pcTop=0;
        pcHeight= (((elTop+elHeight)) / fenetreEditionHeight) * 100;
      }
      if(pcHeight<defaultValue.heightMin){
        pcHeight=defaultValue.heightMin;
        pcTop=((((elTop+elHeight)) / fenetreEditionHeight) * 100)-defaultValue.heightMin;
      }
      if (defaultValue.magnetisme === true) {
        var respcLeft = $rootScope.aidePlacementVerticale($element, id, pcLeft, 0);
        pcLeft = respcLeft[0];
        var respcTop = ($rootScope.aidePlacementHorizontale($element, id, pcTop, 0));
        pcTop = respcTop[0];
      }
      var tmpZone = zoneUtil.get($scope.zones, id);
      tmpZone.positionFromLeft = pcLeft;
      tmpZone.height = pcHeight;
      tmpZone.positionFromTop = pcTop;
      tmpZone.width = pcWidth;
      var pcRight = (pcLeft + pcWidth);
      var pcBottom = (pcTop + pcHeight);
      $rootScope.addAncreH(id, pcTop, pcBottom);
      $rootScope.addAncreV(id, pcRight, pcLeft);
      zoneUtil.update($scope.zones, tmpZone);
      $scope.$apply();
    }

    function mmove($event) {
      $event.preventDefault();
      resize($element, $event,clicX,clicY,elLeft,elTop,elWidth,elHeight);
    }

    function mup() {
      $document.off('mousemove', mmove);
      $document.off('mouseup', mup);
      //zone_JSON = JSON.stringify($scope.zones);
      //ole.log(zone_JSON);
      $scope.showTooltip = true;
      $rootScope.cacherAncre();
    }

    var clicX = 0,clicY = 0,elLeft= 0,elTop= 0,elWidth= 0,elHeight=0;
    var newElement = angular.element('<div class="resizableNW"></div>');
    $element.append(newElement);
    newElement.on('mousedown', function ($event) {
      event.preventDefault();
      if ($element.attr('resize') === 'true') {
        $document.on('mouseup', mup);
        $document.on('mousemove', mmove);
        var fenetreEdition = document.getElementById("zone_edit");
        var fenetreEditionLeft = fenetreEdition.getBoundingClientRect().left;
        var fenetreEditionTop = fenetreEdition.getBoundingClientRect().top;
        clicX = ($event.pageX - fenetreEditionLeft);
        clicY = ($event.pageY - fenetreEditionTop);
        elLeft=$element[0].getBoundingClientRect().left-fenetreEditionLeft;
        elTop=$element[0].getBoundingClientRect().top-fenetreEditionTop;
        elWidth=$element[0].getBoundingClientRect().width;
        elHeight=$element[0].getBoundingClientRect().height;
      }
    });
  };
});

app.directive('lock', function () {
  return function ($scope, $element) {
    function mdown() {
      var lockElement = $element[0].getElementsByClassName('locked');
      var resizeSWElement = $element[0].getElementsByClassName('resizableSW');
      var resizeSEElement = $element[0].getElementsByClassName('resizableSE');
      var resizeNWElement = $element[0].getElementsByClassName('resizableNW');
      var resizeNEElement = $element[0].getElementsByClassName('resizableNE');
      var dragElement = $element[0].getElementsByClassName('draggable');
      var newLockElement;
      if ($element.attr('lock') === 'true') {
        $element.attr('lock', 'false');
        $element.attr('resize', 'true');
        $element.attr('drag', 'true');
        lockElement[0].remove();
        newLockElement = angular.element('<img class="locked" src="images/unlock.png">');
        $element.append(newLockElement);
        newLockElement.on('mousedown', mdown);
        angular.element(resizeSWElement).css({
          visibility: 'visible'
        });
        angular.element(resizeSEElement).css({
          visibility: 'visible'
        });
        angular.element(resizeNWElement).css({
          visibility: 'visible'
        });
        angular.element(resizeNEElement).css({
          visibility: 'visible'
        });
        angular.element(dragElement).css({
          visibility: 'visible'
        });
      }
      else {
        $element.attr('lock', 'true');
        $element.attr('resize', 'false');
        $element.attr('drag', 'false');
        lockElement[0].remove();
        newLockElement = angular.element('<img class="locked" src="images/lock.png">');
        $element.append(newLockElement);
        newLockElement.on('mousedown', mdown);
        angular.element(resizeSWElement).css({
          visibility: 'hidden'
        });
        angular.element(resizeSEElement).css({
          visibility: 'hidden'
        });
        angular.element(resizeNWElement).css({
          visibility: 'hidden'
        });
        angular.element(resizeNEElement).css({
          visibility: 'hidden'
        });
        angular.element(dragElement).css({
          visibility: 'hidden'
        });
      }
    }

    var newElement;
    if ($element.attr('lock') === 'true') {
      newElement = angular.element('<img class="locked" src="images/lock.png">');
    }
    else {
      newElement = angular.element('<img class="locked" src="images/unlock.png">');
    }
    $element.append(newElement);
    newElement.on('mousedown', mdown);
  };
});

app.directive('magnetisme', function ($document, defaultValue) {
  return function ($scope, $element) {
    function mdown() {
      var magnetElement = $element[0].getElementsByClassName('magnet');
      magnetElement[0].remove();
      var newMagnetElement;
      if (defaultValue.magnetisme === true) {
        defaultValue.magnetisme = false;
        newMagnetElement = angular.element('<img class="magnet" src="images/magnet-off.png">');
      }
      else {
        defaultValue.magnetisme = true;
        newMagnetElement = angular.element('<img class="magnet" src="images/magnet-on.png">');
      }
      $element.append(newMagnetElement);
      newMagnetElement.on('mousedown', mdown);
    }

    var newElement;
    if (defaultValue.magnetisme === true) {
      newElement = angular.element('<img class="magnet" src="images/magnet-on.png">');
    }
    else {
      newElement = angular.element('<img class="magnet" src="images/magnet-off.png">');
    }
    $element.append(newElement);
    newElement.on('mousedown', mdown);
  };
});
