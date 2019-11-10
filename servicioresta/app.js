//-------------------------------------------------------------------------------------------------------------
//-------Ambientar para probar
//npm install --save express
//npm install --save body-parser
//npm install --save nodemon
//npm init  --- generar el package json con las dependencias
//-------Editar el package json en scripts , insertar linea "start": "nodemon app.js", --- para arrancar la api 
//npm run start ---valido el arranque

//-------------------------------------------------------------------------------------------------------------
//1.-Requerir librerías y drivers
const express = require('express');
const bodyParser = require('body-parser');
const CalController = require('./controllers/resta');
//----------------------------------------------------------------------------------------
//2.-Configurar web server y parsee los datos
const app = express();
const port = 2000;
app.use(bodyParser.json());


//----------------------------------------------------------------------------------------
//3.- Definir paths disponibles
app.get('/', (req, res) => { res.send('Servidor activo.... Porfavor use /mathOperations'); });
app.get('/mathOperations/subtraction/:num1/:num2', CalController.SubtractionInq);


//----------------------------------------------------------------------------------------
//4.- Encender webserver 
app.listen(port, () => {
  console.log('Server subtraction Inicializado en el puerto: ' + port);

});
  //----------------------------------------------------------------------------------------