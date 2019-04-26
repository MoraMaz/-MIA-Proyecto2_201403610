var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var dao = require("./conexion.js");

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

router.post('/login', function(request, response){
    var correo = request.query.correo;
    var clave = request.query.clave;
    var sql = "SELECT COUNT(*) AS LOGIN FROM A_USUARIO WHERE correo =:coreo AND clave =:clave";
    dao.open(sql, [correo, clave], false, response);
    response.end;
});

router.get('/usuarios', function(request, response){
    var sql = "SELECT * FROM A_USUARIO";
    dao.open(sql, [], false, response);
})

router.get('/producto', function(request, response){
    var opc = parseInt(request.query.opc);
    switch (opc) {
        case 1:
            sql = "SELECT * FROM PRODUCTO";
            dao.open(sql, [], false, response);
            break;
        case 2:
            sql = "SELECT * FROM PRODUCTO WHERE cod =:cod";
            var cod = parseInt(requiest.query.cod);
            dao.open(sql, [cod], false, response);
            break;
        case 3:
            sql = "INSERT INTO PRODUCTO(nombre,pu,fecfab) VALUES(:nombre,:pu,TO_DATE(:fecfab,'DDMMYYYY'))";
            var nombre = request.query.nombre;
            var pu = parseFloat(request.query.pu);
            var fecfab = request.query.fecfab;
            console.log(fecfab);
            dao.open(sql, [nombre, pu, fecfab], true, response);
            break;
        case 4:
            sql = "DELETE FROM PRODUCTO WHERE cod=:cod";
            var cod = parseFloat(request.query.cod);
            dao.open(sql, [cod], true, response);
            break;
        default:
            response.contentType('application/json').status(200);
            response.send(JSON.stringify("Opcion no valida."));
            break;
    }
    response.end;
});

app.use(router);

app.listen(3000, function(){
    console.log("Servidor Web - http://localhost:3000");
});