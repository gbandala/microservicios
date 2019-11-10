//-------------------------------------------------------------------------------------------------------------
//-------Ambientar para probar
//npm install --save express
//npm install --save body-parser
//npm install --save request
//npm init  --- generar el package json con las dependencias
//-------------------------------------------------------------------------------------------------------------
//1.-Requerir librerías y drivers
const express = require('express');
const bodyParser = require('body-parser');
var request = require('request');

//----------------------------------------------------------------------------------------
//2.-Configurar web server y parsee los datos
const app = express();
const port = 8000;
app.use(bodyParser.json());


//----------------------------------------------------------------------------------------
//3.- Definir paths disponibles
app.get('/', (req, res) => { res.send('Servidor activo.... Porfavor use /mathOperations'); });
app.get('/mathOperations/:operation/:num1/:num2', function (req, res) {
  var option = req.params.operation;
  var num1 = parseInt(req.params.num1);
  var num2 = parseInt(req.params.num2);
  console.log('---------------------------------------------------------------');
  console.log(option);
  console.log(num1);
  console.log(num2);
  var result = {
        "Entradas":
          {
            "Operacion": option,
            "Numero1": num1,
            "Numero2": num2
          },
        "Salidas":
          { "Resultado": "" } };

  if (num1 || num2) {
    if (option) {
      switch (option) {
        case "a":
            request('http://localhost:1000/mathOperations/addition/' + num1 + '/' + num2, function (err, body) {
              if (err) { return console.log(err); }
              result.Salidas.Resultado=body.body;
              console.log(result);
              res.setHeader("Operation", "Addition");
              res.setHeader("Status", "OK, parametros validos");
              res.json(result);
            });
          break;
        case "s":
            request('http://localhost:2000/mathOperations/subtraction/' + num1 + '/' + num2, function (err, body) {
              if (err) { return console.log(err); }
              result.Salidas.Resultado=body.body;
              console.log(result);
              res.setHeader("Operation", "Subtraction");
              res.setHeader("Status", "OK, parametros validos");
              res.json(result);
            });
          break;
        case "m":
          request('http://localhost:3000/mathOperations/multiplication/' + num1 + '/' + num2, function (err, body) {
            if (err) { return console.log(err); }
            result.Salidas.Resultado=body.body;
            console.log(result);
            res.setHeader("Operation", "Multiplication");
            res.setHeader("Status", "OK, parametros validos");
            res.json(result);
          });
          break;
        case "d":
            request('http://localhost:4000/mathOperations/division/' + num1 + '/' + num2, function (err, body) {
              if (err) { return console.log(err); }
              result.Salidas.Resultado=body.body;
              console.log(result);
              res.setHeader("Operation", "Division");
              res.setHeader("Status", "OK, parametros validos");
              res.json(result);
            });
          break;
        default:
      }
    }
    console.log('---------------------------------------------------------------');
  }
})


//----------------------------------------------------------------------------------------
//4.- Encender webserver 
app.listen(port, () => {
  console.log('Server Inicializado en el puerto: ' + port);

});
  //----------------------------------------------------------------------------------------