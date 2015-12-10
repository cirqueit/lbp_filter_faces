do ->
    angular.module('flatuiApp.controllers')
        .controller('FlatUICtrl', ['$scope', '$http', '$interval', ($scope, $http, $interval) ->

            $scope.false_positives = []
            $scope.images = []
            $scope.display = []
            $scope.start = 0
            $scope.end = 0
            $scope.size = 0
            $scope.img_rows = 8
            $scope.range = 12*$scope.img_rows
            $scope.ready = 0
            $scope.run = 0
            $scope.time = 4000
            $scope.isize = 80
            $scope.log = 0


            $scope.show = ->
                # console.log($scope.false_positives)
                if $scope.log == 0
                    $scope.log = 1
                else
                    $scope.log = 0


            $scope.dec = ->
                if $scope.run == 1
                    if ($scope.start - $scope.range) >= 0
                        $scope.start = $scope.start - $scope.range
                    else
                        $scope.start = 0
                    $scope.update()


            $scope.inc = ->
                if $scope.run == 1
                    if ($scope.start + $scope.range) < $scope.size
                        $scope.start = $scope.start + $scope.range
                    else
                        $scope.start = 0
                    $scope.update()


            $scope.update = ->
                if ($scope.start + $scope.range) < $scope.size
                    $scope.end = ($scope.start + $scope.range)
                else
                    $scope.end = $scope.size
                if $scope.ready
                    $scope.display = $scope.images[$scope.start...$scope.end]

            $scope.toggle = ->
                if $scope.run == 1
                    $scope.run = 0
                else
                    $scope.run = 1


            $scope.bad = (img) ->
                return img in $scope.false_positives


            $scope.flag = (img) ->
                if img in $scope.false_positives
                    $scope.false_positives = $scope.false_positives.filter (e) -> e != img
                else
                    $scope.false_positives.push(img)


            $scope.save = ->
                res = $http.post('/', $scope.false_positives)
                res.success((data, status, headers, config) ->
                    console.log('SUCCESS:' + data)
                )
                res.error((data, status, headers, config) ->
                    console.log('ERROR:' + data)
                )


            $http.get('assets/images.json').success((data) ->
            # $http.get('assets/non.json').success((data) ->
                    $scope.images = data
                    $scope.size = $scope.images.length
                    $scope.ready = 1
                    $scope.run = 1
                    $scope.update()
                    # $interval($scope.inc, $scope.time)
            )

            return
        ])
