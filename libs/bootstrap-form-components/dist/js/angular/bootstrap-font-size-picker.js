angular.module('risevision.widget.common.fontsizepicker', [])
  .directive('fontSizePicker', ['$log', function ($log) {
    return {
      restrict: 'E',
      scope: false,
      replace: true,
      require: '?ngModel',
      link: function ($scope, elm, attrs, ngModel) {

        //initialize only if not yet initialized
        if (!elm.data('plugin_fontSizePicker')) {
          elm.fontSizePicker({
            "font-size": "18"
          });

          var picker = elm.data('plugin_fontSizePicker');
        }

        if (ngModel) {
          ngModel.$render = function () {
            if(ngModel.$modelValue) {
              picker.setFontSize(ngModel.$modelValue);
            }
          };
        }

        $scope.$on('collectAdditionalParams', function () {
          $log.debug('Collecting params from', attrs.id);
          if (ngModel) {
            ngModel.$setViewValue(picker.getFontSize());
          }
        });
      }
    };
  }]);
