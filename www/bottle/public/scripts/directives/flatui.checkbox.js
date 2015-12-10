(function() {
  return angular.module('flatuiApp.directives').directive("flatuiCheckbox", function() {
    return {
      restrict: "AE",
      templateUrl: "views/flatui-checkbox-template.html",
      replace: true,
      scope: {
        model: "=",
        label: "=",
        value: "=",
        required: "=",
        name: "=",
        disabled: "@"
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

//# sourceMappingURL=../../maps/directives/flatui.checkbox.js.map