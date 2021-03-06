(function(){

	var calendarController = function($scope){
		
		var current_date = new Date();
		var year_choices = [];
		var current_month = current_date.getMonth();
		var current_year = current_date.getFullYear();
		for (var i = -20; i <= 20; i++){
			year_choices.push(current_year + i);
		}
		$scope.year_choices = year_choices;
		$scope.month_choices = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		$scope.selected_month = current_month;
		$scope.selected_year = current_year;

		$scope.$watch($scope.selected_month, function(){
			console.log('the month changed');
		})

	};
	
	var calendarWeek = function(){

		var dates = [];
		var weeks = [];

	

		var template = "<table><tr ng-repeat='week in weeks'><td>{{ week[0].day}}</td><td>{{ week[1].day}}</td><td>{{ week[2].day}}</td><td>{{ week[3].day}}</td><td>{{ week[4].day}}</td><td>{{ week[5].day}}</td><td>{{ week[6].day}}</td> </tr> </table>";


		return {
			restrict:'E',
			templateUrl: "calendar_directive_template.html",
			scope: true,
			transclude: true,
			controller: function($scope, $element, $attrs){
				
				var current_date = new Date();
				var year_choices = [];
				var current_month = current_date.getMonth();
				var current_year = current_date.getFullYear();
				for (var i = -20; i <= 20; i++){
					year_choices.push(current_year + i);
				}
				$scope.year_choices = year_choices;
				$scope.month_choices = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
				$scope.selected_month = current_month;
				$scope.selected_year = current_year;

				$scope.$watch($scope.selected_month, function(){
					console.log('the month changed');
				})

				init();

				function init(){
					
					makeWeeks(new Date());
				}

				function makeWeeks(date){
					var range = CalendarRange.getMonthlyRange(date).days;
					var number_of_weeks = Math.round(range.length / 7);
					for(var i = 0; i < number_of_weeks; i++){
						weeks[i] = [];
						for(var j = 0; j < 7; j++){
							weeks[i].push(range[(i*7) + j]);
						}
					}
					$scope.weeks = weeks;
					console.log($scope.weeks);
				}
			}
		}
	};

	angular.module('calendarDemoApp', [])
		.directive('calendarWeek', calendarWeek)
		.controller('calendarController', calendarController);
		

}());