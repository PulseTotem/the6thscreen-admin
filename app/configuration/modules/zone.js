'use strict';

/**
 * @ngdoc overview
 * @name zone
 * @description
 * # zone
 *
 * Zone module of the application.
 */
angular.module('zone', [])

    .constant('magnetismeMarge', 0.1)
    .value('ancres', [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100])
    .value('magnetisme', true)
  .factory('zoneUtil', function () {
    // Service logic
    // ...
    function colisionZone(zone1, zone2) {
      var xyZone1 = [zone1.positionFromLeft, zone1.positionFromTop, zone1.width, zone1.height];
      var xyZone2 = [zone2.positionFromLeft, zone2.positionFromTop, zone2.width, zone2.height];
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
  })
    .directive('drag', function ($document, $window, zoneUtil, ancres, magnetisme, magnetismeMarge) {
      return {
        scope: false,
        link: function ($scope, $element) {

          function aidePlacement(zone, point, cote) {
            var res = point;
            for (var i = 0; i < ancres.length; i++) {
              if ((point > ancres[i] - magnetismeMarge) && (point < ancres[i] + magnetismeMarge)) {
                res = ancres[i];
              }
            }
            if (res !== point) {
              if (cote === 0) {
                $scope.barreV1_visible = true;
                $scope.barreV1_width = res;
                $scope.barreV1_height = 100;
              } else if (cote === 1) {
                console.log("Visible !")
                $scope.barreH1_visible = true;
                $scope.barreH1_width = 100;
                $scope.barreH1_height = res;
              } else if (cote === 2) {
                $scope.barreV2_visible = true;
                $scope.barreV2_width = res;
                $scope.barreV2_height = 100;
              } else {
                $scope.barreH2_visible = true;
                $scope.barreH2_width = 100;
                $scope.barreH2_height = res;
              }
            }
            else {
              if (cote === 0) {
                $scope.barreV1_visible = false;
              } else if (cote === 1) {
                $scope.barreH1_visible = false;
              } else if (cote === 2) {
                $scope.barreV2_visible = false;
              } else {
                $scope.barreH2_visible = false;
              }
            }
            return res;
          }

          function deplaceZone(zone, top, left) {
            var oldPcLeft = parseFloat(zone[0].style.left);
            var oldPcTop = parseFloat(zone[0].style.top);
            var pcTop = (top / $('#zone_edit').innerHeight()) * 100,
              pcLeft = (left / $('#zone_edit').innerWidth()) * 100;

            if (pcTop < 0) {
              pcTop = 0;
            }
            else if (pcTop + parseFloat(zone[0].style.height) > 100) {
              pcTop = 100 - parseFloat(zone[0].style.height);
            }
            if (pcLeft < 0) {
              pcLeft = 0;
            }
            else if (pcLeft + parseFloat(zone[0].style.width) > 100) {
              pcLeft = 100 - parseFloat(zone[0].style.width);
            }
            var aide = true;
            if (aide) {
              var pcRight = (pcLeft + parseFloat(zone[0].style.width)),
                pcBottom = (pcTop + parseFloat(zone[0].style.height));
              pcRight = aidePlacement(zone, pcRight, 2);
              pcBottom = aidePlacement(zone, pcBottom, 3);
              pcLeft = pcRight - parseFloat(zone[0].style.width);
              pcTop = pcBottom - parseFloat(zone[0].style.height);
              pcLeft = aidePlacement(zone, pcLeft, 0);
              pcTop = aidePlacement(zone, pcTop, 1);
            }
            var tmpZone = zoneUtil.get($scope.zones, zone.attr('numero'));
            tmpZone.positionFromLeft = pcLeft;
            tmpZone.positionFromTop = pcTop;

            var colision = zoneUtil.colision($scope.zones, zone.attr('numero'));
            if (magnetisme === false || colision === false) {
              zoneUtil.update($scope.zones, tmpZone);
              zone.css({
                position: 'absolute',
                top: pcTop + '%',
                left: pcLeft + '%'
              });
            } else if (calculMarge(magnetismeMarge, oldPcLeft, oldPcTop, pcLeft, pcTop) === false) {
              tmpZone.positionFromLeft = oldPcLeft;
              tmpZone.positionFromTop = oldPcTop;
            }
          }

          function calculMarge(magnetisme, oldPcLeft, oldPcTop, pcLeft, pcTop) {
            if ((between(pcLeft, oldPcLeft, magnetisme)) ||
              (between(pcTop, oldPcTop, magnetisme))) {
              return true;
            } else {
              return false;
            }

          }

          function between(x, x1, delta) {
            if ((x > x1 - delta) && (x < x1 + delta)) {
              return true;
            } else {
              return false;
            }
          }

          function mup($event) {
            //$event.preventDefault();
            $event.stopPropagation();
            $document.off('mousemove', mmove);
            $document.off('mouseup', mup);
            var zone_JSON = JSON.stringify($scope.zones);
            //console.log(zone_JSON);
          }

          function mmove($event) {
            //$event.preventDefault();
            $event.stopPropagation();


            deplaceZone($element, $event.pageY - Y, $event.pageX - X);
          }

          var X = 0, Y = 0;
          var newElement = angular.element('<div class="draggable"></div>');
          $element.append(newElement);
          newElement.on('mouseclick', function ($event) {
            $event.stopPropagation();
          });
          newElement.on('mousedown', function ($event) {
            //$event.preventDefault();
            $event.stopPropagation();

            if ($element.attr('drag') === 'true') {
              $document.on('mouseup', mup);
              $document.on('mousemove', mmove);
              X = $event.pageX - $element[0].offsetLeft;
              Y = $event.pageY - $element[0].offsetTop;
              $scope.showTooltip = true;
            }
          });
        }
      }
    })
    .directive('resize', function ($document, $window, zoneUtil, ancres, magnetisme, magnetismeMarge) {
    return function ($scope, $element) {

      function resize($element, $event) {
        var id = $element.attr('numero');
        var marginH = 50;
        var marginW = 50;
        var elOffsetTop = $element[0].getBoundingClientRect().top;
        var elOffsetLeft = $element[0].getBoundingClientRect().left;
        var elOffsetWidth = $element[0].getBoundingClientRect().width;
        var elOffsetHeight = $element[0].getBoundingClientRect().height;
        console.log("Div width:"+elOffsetWidth+" | div height : "+elOffsetHeight);

        var htest = elOffsetTop + marginH,
          height = $event.pageY > htest ? $event.pageY - elOffsetTop : marginH,
          wtest = elOffsetLeft + elOffsetWidth - marginW,
          left = $event.pageX > wtest ? wtest : $event.pageX,
          width = elOffsetLeft - left + elOffsetWidth,
          pcWidth = (width / $('#zone_edit').innerWidth()) * 100,
          pcHeight = (height / $('#zone_edit').innerHeight()) * 100,
          pcLeft = (left / $('#zone_edit').innerWidth()) * 100;
        console.log("Htest : "+htest+" | height : "+height+" | pcHeight : "+pcHeight+" | pageY : "+$event.pageY+" | offsetTop : "+$element[0].offsetTop);
        console.log($element[0].getBoundingClientRect().top);
        var pcTop = parseFloat($element[0].style.top);
        /*if (defaultValue.magnetisme === true) {
          var respcLeft = $rootScope.aidePlacementVerticale($element, id, pcLeft, 0);
          pcLeft = respcLeft[0];
          var respcHeight = ($rootScope.aidePlacementHorizontale($element, id, pcTop + pcHeight, 0));
          pcHeight = respcHeight[0] - pcTop;
        }*/
        var tmpZone = zoneUtil.get($scope.zones, id);
        tmpZone.positionFromLeft = pcLeft;
        tmpZone.width = pcWidth;
        tmpZone.height = pcHeight;
        var pcRight = (pcLeft + pcWidth),
          pcBottom = (pcTop + pcHeight);
        //$rootScope.addAncreH(id, pcTop, pcBottom);
        //$rootScope.addAncreV(id, pcRight, pcLeft);
        zoneUtil.update($scope.zones, tmpZone);
        $scope.$apply();
      }

      function mmove($event) {
        $event.preventDefault();

        resize($element, $event);

      }

      function mup() {

        $document.off('mousemove', mmove);
        $document.off('mouseup', mup);
        //var zone_JSON = JSON.stringify($scope.zones);
        //ole.log(zone_JSON);
        $scope.showTooltip = true;
        //$rootScope.cacherAncre();
      }

      var newElement = angular.element('<div class="resizable"></div>');
      $element.append(newElement);
      newElement.on('mousedown', function (event) {
        event.preventDefault();
        if ($element.attr('resize') === 'true') {
          $document.on('mouseup', mup);
          $document.on('mousemove', mmove);
        }
      });
    };
    })
    .directive('lock', function ($document) {
        return function ($scope, $element) {
            function mdown($event) {
                var lockElement = $element[0].getElementsByClassName('locked');
                var resizeElement = $element[0].getElementsByClassName('resizable');
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
                    angular.element(resizeElement).css({
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
                    angular.element(resizeElement).css({
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
    })
;
