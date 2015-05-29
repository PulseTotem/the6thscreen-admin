'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.factory:backendSocket
 * @description
 * # backendSocket Factory
 * Factory of the the6thscreenAdminApp
 */
angular.module('T6SConfiguration')
  .factory('zoneUtil', function () {
    var zoneUtil = {
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
    };

    zoneUtil.getSize = function ($window) {
      return {
        widthQuarter: function () {
          return $window.innerWidth / 4;
        },
        widthHalf: function () {
          return $window.innerWidth / 2;
        },
        widthPxToPerct: function (px) {
          return (px / $window.innerWidth) * 100;
        },
        widthPrctToPx: function (prct) {
          return Math.floor(($window.innerWidth / 100) * prct);
        },
        getWidth: function () {
          return $window.innerWidth;
        },
        heightQuarter: function () {
          return $window.innerHeight / 4;
        },
        heightHalf: function () {
          return $window.innerHeight / 2;
        },
        heightPxToPerct: function (px) {
          return (px / $window.innerHeight) * 100;
        },
        heightPrctToPx: function (prct) {
          return Math.floor(($window.innerHeight / 100) * prct);
        },
        getHeight: function () {
          return $window.innerHeight;
        }
      }
    };

    zoneUtil.colisionZone = function colisionZone(zone1, zone2) {
      var xyZone1 = zone1.getPoints();
      var xyZone2 = zone2.getPoints();
      if (xyZone1[0] < xyZone2[2] && xyZone1[2] > xyZone2[0] && xyZone1[1] < xyZone2[3] && xyZone1[3] > xyZone2[1]){
        return true;
      }else{
        return false;
      }
    };

    zoneUtil.get = function (zones, id) {
      for (var i = 0; i < zones.length; i++) {
        if (zones[i].id == id) {
          return zones[i];
        }
      }
      return undefined;
    };

    zoneUtil.colision = function (zones, id) {
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
    };

    zoneUtil.update = function (zones, zone) {
      for (var i = 0; i < zones.length; i++) {
        if (zones[i].id == zone.id) {
          zones[i] = zone;
        }
      }
      return zones;
    };

    zoneUtil.suppr = function (zones, id) {
      for (var i = 0; i < zones.length; i++) {
        if (zones[i].id == id) {
          zones.splice(i, 1);
          return zones;
        }
      }
      return zones;
    };

    zoneUtil.aidePlacementVerticale = function(zone, id, point, cote) {
      var barreV1 = document.getElementById('barreV1');
      var barreV2 = document.getElementById('barreV2');
      var res = point;
      var decalage=0;
      for (var i = 0; i < zoneUtil.ancresV.length; i++) {
        if ((point > zoneUtil.ancresV[i] - zoneUtil.magnetismeMarge) && (point < zoneUtil.ancresV[i] + zoneUtil.magnetismeMarge)) {
          res = zoneUtil.ancresV[i];
        }
      }
      for (i = 1; i < zoneUtil.ancresZV.length; i += 2) {
        if ((point > zoneUtil.ancresZV[i] - zoneUtil.magnetismeMarge) && (point < zoneUtil.ancresZV[i] + zoneUtil.magnetismeMarge) && (zoneUtil.ancresZV[i - 1] !== id)) {
          res = zoneUtil.ancresZV[i];
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

    zoneUtil.aidePlacementHorizontale = function(zone, id, point, cote) {
      var barreH1 = document.getElementById('barreH1');
      var barreH2 = document.getElementById('barreH2');
      var res = point;
      var decalage = 0;
      for (var i = 0; i < zoneUtil.ancresH.length; i++) {
        if ((point > zoneUtil.ancresH[i] - zoneUtil.magnetismeMarge) && (point < zoneUtil.ancresH[i] + zoneUtil.magnetismeMarge)) {
          res = zoneUtil.ancresH[i];
        }
      }
      for (i = 1; i < zoneUtil.ancresZH.length; i += 2) {
        if ((point > zoneUtil.ancresZH[i] - zoneUtil.magnetismeMarge) && (point < zoneUtil.ancresZH[i] + zoneUtil.magnetismeMarge) && (zoneUtil.ancresZH[i - 1] !== id)) {
          res = zoneUtil.ancresZH[i];
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

    zoneUtil.addAncreH = function(id, newPoint, newPoint1) {
      for (var i = 0; i < zoneUtil.ancresZH.length; i += 2) {
        if (zoneUtil.ancresZH[i] === id) {
          zoneUtil.ancresZH.splice(i, 2);
        }
      }
      zoneUtil.ancresZH.push(id);
      zoneUtil.ancresZH.push(newPoint);
      zoneUtil.ancresZH.push(id);
      zoneUtil.ancresZH.push(newPoint1);
    };

    zoneUtil.addAncreV = function(id, newPoint, newPoint1) {
      zoneUtil.ancresZV.push(id);
      zoneUtil.ancresZV.push(newPoint);
      for (var i = 0; i < zoneUtil.ancresZV.length; i += 2) {
        if (zoneUtil.ancresZV[i] === id) {
          zoneUtil.ancresZV.splice(i, 2);
        }
      }
      zoneUtil.ancresZV.push(id);
      zoneUtil.ancresZV.push(newPoint);
      zoneUtil.ancresZV.push(id);
      zoneUtil.ancresZV.push(newPoint1);
    };

    zoneUtil.cacherAncre = function() {
      var barreH1 = document.getElementById('barreH1');
      var barreH2 = document.getElementById('barreH2');
      var barreV1 = document.getElementById('barreV1');
      var barreV2 = document.getElementById('barreV2');
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
    return zoneUtil;
});
