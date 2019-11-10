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
const CalController = require('./controllers/multiplica');
//----------------------------------------------------------------------------------------
//2.-Configurar web server y parsee los datos
const app = express();
const port = 3000;
app.use(bodyParser.json());


//----------------------------------------------------------------------------------------
//3.- Definir paths disponibles
app.get('/', (req, res) => { res.send('Servidor activo.... Porfavor use /mathOperations'); });
app.get('/mathOperations/multiplication/:num1/:num2', CalController.MultiplicationInq);
//----------------------------------------------------------------------------------------
//4.- Encender webserver 
app.listen(port, () => {
  console.log('Server multiplication inicializado en el puerto: ' + port);

});
  //----------------------------------------------------------------------------------------