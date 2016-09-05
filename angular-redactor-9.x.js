(function() {
    'use strict';

    /**
     * usage: <textarea ng-model="content" redactor></textarea>
     *
     *    additional options:
     *      redactor: hash (pass in a redactor options hash)
     *
     */

    var redactorOptions = {};

    angular.module('angular-redactor', [])
        .constant('redactorOptions', redactorOptions)
        .directive('redactor', ['$timeout', function($timeout) {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, element, attrs, ngModel) {

                    //暴露范围与VAR的主编负载状态
                    scope.redactorLoaded = false;

                    var updateModel = function updateModel(value) {
                            // $timeout to avoid $digest collision
                            $timeout(function() {
                                scope.$apply(function() {
                                    ngModel.$setViewValue(value);
                                });
                            });
                        },
                        options = {
                            changeCallback: updateModel
                        },
                        additionalOptions = attrs.redactor ?
                            scope.$eval(attrs.redactor) : {},
                        editor;

                    angular.extend(options, redactorOptions, additionalOptions);

                    // 防止碰撞与更改回调的常数值
                    if(!angular.isUndefined(redactorOptions.changeCallback)) {
                        options.changeCallback = function() {
                            updateModel.call(this);
                            redactorOptions.changeCallback.call(this);
                        }
                    }

                   //投入超时，避免$消化碰撞。调用render（）来
                     //设置的初始值。
                    $timeout(function() {
                        editor = element.redactor(options);
                        ngModel.$render();
                    });

                    ngModel.$render = function() {
                        if(angular.isDefined(editor)) {
                            $timeout(function() {
                                element.redactor('set', ngModel.$viewValue || '');
                                scope.redactorLoaded = true;
                            });
                        }
                    };
                }
            };
        }]);
})();

