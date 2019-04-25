
'use strict';

require('zone.js/dist/zone-node'); // Server specific version of Zone.js

const express = require('express');
const ngUniversal = require('@nguniversal/express-engine');
//The server bundle is loaded here, it's why you don't want a changing hash in it 
const appServer = require('./dist-server/main.bundle');

function angularRouter(req, res) {
  res.render('index', { req, res, providers: [{ provide: 'serverUrl', 
    useValue: `${req.protocol}://${req.get('host')}` }]
  });
}

/* 
//Server-side rendering
function angularRouter(req, res) {
  res.render('index', { req, res }); // Server-side rendering
}
*/

const app = express();

/* Root route before static files, or it will serve a static index.html, without pre-rendering */
app.get('/', angularRouter);
/* Serve the static files generated by the CLI (index.html, CSS? JS, assets...) */
app.use(express.static(`${__dirname}/dist`));
/* Configure Angular Express engine */
app.engine('html', ngUniversal.ngExpressEngine({ bootstrap: appServer.AppServerModuleNgFactory }));
app.set('view engine', 'html');
app.set('views', 'dist');
/* Direct all routes to index.html, where Angular will take care of routing */
app.get('*', angularRouter);
app.listen(3000, () => { console.log(`Listening on http://localhost:3000`); });


/*
// require: Trae la librería express del npm.
var express = require('express');
// Se invoca la función (de la variable express) y se almacena en la variable app.
var app = express();

// Define el home de la página y que función se va a ejecutar.
// La función tiene como parámetro el request y el response.
app.get('/', function (req, res) {
  res.send('Este es el home');
  console.log("Página de inicio...")
})

app.get('/cursos', function (req, res) {
  res.send('Estos son los cursos');
  console.log("Página de cursos");
})

// Correr el servidor con el puerto 8989.
app.listen(8989);

var app=angular.module("app",[]);
    
app.controller("SeguroController",['$scope','$log','$http',function($scope,$log,$http) {
  var config={
    method:"GET",
    url:"datos.json"
  }
   
  var response=$http(config);
    
}]);
*/
