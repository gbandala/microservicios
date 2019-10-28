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
const CalController = require('./controllers/suma');
//----------------------------------------------------------------------------------------
//2.-Configurar web server y parsee los datos
const app = express();
const port = 1000;
app.use(bodyParser.json());


//----------------------------------------------------------------------------------------
//3.- Definir paths disponibles
app.get('/', (req, res) => { res.send('Servidor activo.... Porfavor use /mathOperations'); });
app.get('/mathOperations/addition/:num1/:num2',CalController.AdditionInq);


//----------------------------------------------------------------------------------------
//4.- Encender webserver 
app.listen(port, () => {
  console.log('Server Inicializado... ' );

});
  //----------------------------------------------------------------------------------------