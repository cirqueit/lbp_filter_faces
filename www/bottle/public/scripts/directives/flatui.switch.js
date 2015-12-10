(function() {
  return angular.module('flatuiApp.directives').directive('flatuiSwitch', function() {
    return {
      restrict: 'AE',
      templateUrl: "views/flatui-switch-template.html",
      replace: true,
      scope: {
        model: '=',
        disabled: '@',
        square: '@',
        onLabel: '@',
        offLabel: '@'
      },
      compile: function(element, attrs) {
        if (attrs.onLabel === void 0) {
          attrs.onLabel = 'ON';
        }
        if (attrs.offLabel === void 0) {
          attrs.offLabel = 'OFF';
        }
        if (attrs.disabled === void 0) {
          attrs.disabled = false;
        } else {
          attrs.disabled = true;
        }
        if (attrs.square === void 0) {
          return attrs.square = false;
        } else {
          return attrs.square = true;
        }
      }
    };
  });
})();

//# sourceMappingURL=../../maps/directives/flatui.switch.js.map