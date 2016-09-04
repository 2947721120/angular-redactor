(function() {
    'use strict';

    /**
     * 用法: <textarea ng-model="content" redactor></textarea>
     *
     *   其他选项:
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

                    // 随着减速机加载状态下VaR暴露范围
                    scope.redactorLoaded = false;

                    var updateModel = function updateModel(value) {
                            // $timeout 避免 $digest 碰撞
                            $timeout(function() {
                                scope.$apply(function() {
                                    ngModel.$setViewValue(value);
                                });
                            });
                        },
                        options = {
                            callbacks: {
                                change: updateModel
                            }
                        },
                        additionalOptions = attrs.redactor ?
                            scope.$eval(attrs.redactor) : {},
                        editor;

                    angular.extend(options, redactorOptions, additionalOptions);

                 //投入超时，避免$消化碰撞。调用render（）
                    //设置初始值。
                    $timeout(function() {
                        editor = element.redactor(options);
                        ngModel.$render();
                    });

                    ngModel.$render = function() {
                        if(angular.isDefined(editor)) {
                            $timeout(function() {
                                element.redactor('code.set', ngModel.$viewValue || '');
                                scope.redactorLoaded = true;
                            });
                        }
                    };
                }
            };
        }]);
})();