(function() {
  return angular.module('flatuiApp.directives').directive("flatuiRadio", function() {
    return {
      restrict: "AE",
      templateUrl: "views/flatui-radio-template.html",
      replace: true,
      scope: {
        model: "=",
        label: "=",
        value: "=",
        required: "=",
        name: "=",
        disabled: '@'
      },
      compile: function(element, attrs) {
        if (attrs.disabled === void 0) {
          return attrs.disabled = false;
        } else {
          return attrs.disabled = true;
        }
      }
    };
  });
})();

//# sourceMappingURL=../../maps/directives/flatui.radio.js.map