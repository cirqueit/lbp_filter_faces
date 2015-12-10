var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

(function() {
  return angular.module('flatuiApp.controllers').controller('FlatUICtrl', [
    '$scope', '$http', '$interval', function($scope, $http, $interval) {
      $scope.false_positives = [];
      $scope.images = [];
      $scope.display = [];
      $scope.start = 0;
      $scope.end = 0;
      $scope.size = 0;
      $scope.img_rows = 8;
      $scope.range = 12 * $scope.img_rows;
      $scope.ready = 0;
      $scope.run = 0;
      $scope.time = 4000;
      $scope.isize = 80;
      $scope.log = 0;
      $scope.show = function() {
        if ($scope.log === 0) {
          return $scope.log = 1;
        } else {
          return $scope.log = 0;
        }
      };
      $scope.dec = function() {
        if ($scope.run === 1) {
          if (($scope.start - $scope.range) >= 0) {
            $scope.start = $scope.start - $scope.range;
          } else {
            $scope.start = 0;
          }
          return $scope.update();
        }
      };
      $scope.inc = function() {
        if ($scope.run === 1) {
          if (($scope.start + $scope.range) < $scope.size) {
            $scope.start = $scope.start + $scope.range;
          } else {
            $scope.start = 0;
          }
          return $scope.update();
        }
      };
      $scope.update = function() {
        if (($scope.start + $scope.range) < $scope.size) {
          $scope.end = $scope.start + $scope.range;
        } else {
          $scope.end = $scope.size;
        }
        if ($scope.ready) {
          return $scope.display = $scope.images.slice($scope.start, $scope.end);
        }
      };
      $scope.toggle = function() {
        if ($scope.run === 1) {
          return $scope.run = 0;
        } else {
          return $scope.run = 1;
        }
      };
      $scope.bad = function(img) {
        return indexOf.call($scope.false_positives, img) >= 0;
      };
      $scope.flag = function(img) {
        if (indexOf.call($scope.false_positives, img) >= 0) {
          return $scope.false_positives = $scope.false_positives.filter(function(e) {
            return e !== img;
          });
        } else {
          return $scope.false_positives.push(img);
        }
      };
      $scope.save = function() {
        var res;
        res = $http.post('/', $scope.false_positives);
        res.success(function(data, status, headers, config) {
          return console.log('SUCCESS:' + data);
        });
        return res.error(function(data, status, headers, config) {
          return console.log('ERROR:' + data);
        });
      };
      $http.get('assets/images.json').success(function(data) {
        $scope.images = data;
        $scope.size = $scope.images.length;
        $scope.ready = 1;
        $scope.run = 1;
        return $scope.update();
      });
    }
  ]);
})();

//# sourceMappingURL=../../maps/controllers/flatui.ctrl.js.map