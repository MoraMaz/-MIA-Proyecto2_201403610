/*function HelloController($scope) {
    $scope.greeting = 'hello';
}

var myApp = angular.module('myApp',[]);
*/

/*myApp.controller('HttpController',function($scope, $http){
    $scope.greeting = 'hello';
    $http.post('192.168.0.11:3000/login', ).then(
        function successCallback(response) { }, 
        function errorCallback(response) { }
    );
});
*/
/*
var modulo = angular.module('miApp', []);

modulo.factory('saludoService', function () {
     	
    var saludoSvc = {};

    saludoSvc.getFecha = function () {
        var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        var fecha = new Date(); //Obtenemos la fecha de hoy
        var mes = fecha.getMonth(); //El mes a partir del objeto fecha
        return 'Hoy es ' + fecha.getDate() + ' de ' + meses[mes] + ' del ' + fecha.getFullYear(); //Devolvemos un string que devoverá el día, el mes (en castellano) y el año
    }
      
    saludoSvc.getHora = function () { //Esta funcion devolverá la hora
        return new Date().toTimeString();
    }
    
    return  saludoSvc;

});
 
modulo.controller('controladorTiempo', function ($scope, saludoService) {
    //Llamamos la funcioens del servicio y asignamos los valores que devuelve a la variable $scope para poder sacarlos en la vista
    $scope.fecha = saludoService.getFecha();
    $scope.hora = saludoService.getHora();

});
*/
