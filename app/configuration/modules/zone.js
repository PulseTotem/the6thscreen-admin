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
        return function ($scope, $element) {

            function aidePlacement(zone, point, cote) {
                var barreV1 = $document[0].body.getElementsByClassName('barre_verticale1');
                var barreV2 = $document[0].body.getElementsByClassName('barre_verticale2');
                var barreH1 = $document[0].body.getElementsByClassName('barre_horizontale1');
                var barreH2 = $document[0].body.getElementsByClassName('barre_horizontale2');
                var res = point;
                for (var i = 0; i < ancres.length; i++) {
                    if ((point > ancres[i] - magnetismeMarge) && (point < ancres[i] + magnetismeMarge)) {
                        res = ancres[i];
                    }
                }
                if (res !== point) {
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
                    } else if (cote === 1) {
                        angular.element(barreH1).css({
                            position: 'absolute',
                            visibility: 'visible',
                            height: res + '%',
                            width: 100 + '%',
                            borderBottomColor: '#0000FF',
                            borderBottomWidth: '1px',
                            borderBottomStyle: 'Solid'
                        });
                    } else if (cote === 2) {
                        angular.element(barreV2).css({
                            position: 'absolute',
                            visibility: 'visible',
                            width: res + '%',
                            height: 100 + '%',
                            borderRightColor: '#0000FF',
                            borderRightWidth: '1px',
                            borderRightStyle: 'Solid'
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
                        angular.element(barreV1).css({
                            visibility: 'hidden'
                        });
                    } else if (cote === 1) {
                        angular.element(barreH1).css({
                            visibility: 'hidden'
                        });
                    } else if (cote === 2) {
                        angular.element(barreV2).css({
                            visibility: 'hidden'
                        });
                    } else {
                        angular.element(barreH2).css({
                            visibility: 'hidden'
                        });
                    }
                }
                return res;
            }

            function deplaceZone(zone, divWidth, divHeight, top, left) {
                var oldPcLeft = parseFloat(zone[0].style.left);
                var oldPcTop = parseFloat(zone[0].style.top);
                var pcTop = (top / divHeight) * 100,
                    pcLeft = (left / divWidth) * 100;
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

            function mup() {
                $document.off('mousemove', mmove);
                $document.off('mouseup', mup);
                var zone_JSON = JSON.stringify($scope.zones);
                //console.log(zone_JSON);
            }

            function mmove($event) {
                $event.preventDefault();
                $event.stopPropagation();
                var div = $event.target;

                var divWidth = div.offsetWidth;
                var divHeight = div.offsetHeight;

                var positionXInDiv = $event.offsetX;
                var positionYInDiv = $event.offsetY;
                deplaceZone($element, divWidth, divHeight, positionYInDiv - Y, positionXInDiv - X);
            }

            var X = 0, Y = 0;
            var newElement = angular.element('<div class="draggable"></div>');
            $element.append(newElement);
            newElement.on('mousedown', function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                var div = $event.target;

                var divWidth = div.offsetWidth;
                var divHeight = div.offsetHeight;

                var positionXInDiv = $event.offsetX;
                var positionYInDiv = $event.offsetY;
                if ($element.attr('drag') === 'true') {
                    $document.on('mouseup', mup);
                    $document.on('mousemove', mmove);
                    X = positionXInDiv - $element[0].offsetLeft;
                    Y = positionYInDiv - $element[0].offsetTop;
                    $scope.showTooltip = true;
                }
            });
        };
    })

    .directive('resize', function ($document, $window, zoneUtil, ancres, magnetisme, magnetismeMarge) {
        return function ($scope, $element) {
            function aidePlacement(zone, point, cote) {
                var barreV1 = $document[0].body.getElementsByClassName('barre_verticale1');
                var barreH2 = $document[0].body.getElementsByClassName('barre_horizontale2');
                var res = point;
                for (var i = 0; i < ancres.length; i++) {
                    if ((point > ancres[i] - magnetismeMarge) && (point < ancres[i] + magnetismeMarge)) {
                        res = ancres[i];
                    }
                }
                if (res !== point) {
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
                        angular.element(barreV1).css({
                            visibility: 'hidden'
                        });
                    } else {
                        angular.element(barreH2).css({
                            visibility: 'hidden'
                        });
                    }
                }
                return res;
            }

            function resize($element, $event) {
                var marginH = 50,
                    marginW = 100,
                    htest = $element[0].offsetTop + marginH,
                    height = $event.pageY > htest ? $event.pageY - $element[0].offsetTop : marginH,
                    wtest = $element[0].offsetLeft + $element[0].offsetWidth - marginW,
                    left = $event.pageX > wtest ? wtest : $event.pageX,
                    width = $element[0].offsetLeft - left + $element[0].offsetWidth,
                    pcWidth = (width / $window.innerWidth) * 100,
                    pcHeight = (height / $window.innerHeight) * 100,
                    pcLeft = (left / $window.innerWidth) * 100;
                var pcTop = parseFloat($element[0].style.top);
                var oldPcLeft = parseFloat($element[0].style.left);
                var oldPcWidth = parseFloat($element[0].style.width);
                var oldPcHeight = parseFloat($element[0].style.height);
                if (magnetisme) {
                    pcLeft = aidePlacement($element, pcLeft, 0);
                    pcHeight = (aidePlacement($element, pcTop + pcHeight, 1)) - pcTop;
                }
                var colision = zoneUtil.colision($scope.zones, $element.attr('numero'));
                var tmpZone = zoneUtil.get($scope.zones, $element.attr('numero'));
                tmpZone.positionFromLeft = pcLeft;
                tmpZone.width = pcWidth;
                tmpZone.height = pcHeight;
                if (magnetisme === false || colision === false) {
                    zoneUtil.update($scope.zones, tmpZone);
                    $element.css({
                        height: pcHeight + '%',
                        left: pcLeft + '%',
                        width: pcWidth + '%'
                    });
                } else if (calculMarge(magnetismeMarge, oldPcLeft, oldPcWidth, oldPcHeight, pcLeft, pcWidth, pcHeight) === false) {
                    tmpZone.positionFromLeft = oldPcLeft;
                    tmpZone.width = oldPcWidth;
                    tmpZone.height = oldPcHeight;
                }
            }

            function calculMarge(magnetisme, oldPcLeft, oldPcWidth, oldPcHeight, pcLeft, pcWidth, pcHeight) {
                if ((between(pcLeft, oldPcLeft, magnetisme)) ||
                    (between(pcWidth, oldPcWidth, magnetisme)) ||
                    (between(pcHeight, oldPcHeight, magnetisme))) {
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

            function mmove($event) {
                $event.preventDefault();

                resize($element, $event);

            }

            function mup() {

                $document.off('mousemove', mmove);
                $document.off('mouseup', mup);
                var zone_JSON = JSON.stringify($scope.zones);
                //ole.log(zone_JSON);
            }

            var newElement = angular.element('<div class="resizable"></div>');
            $element.append(newElement);
            newElement.on('mousedown', function (event) {
                event.preventDefault();
                if ($element.attr('resize') === 'true') {
                    $document.on('mouseup', mup);
                    $document.on('mousemove', mmove);
                    $scope.showTooltip = true;
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
