//-------------------------------------------------------------------------------------------------------------
//-------Ambientar para probar
//npm install --save express
//npm install --save body-parser
//npm init  --- generar el package json con las dependencias

//-------------------------------------------------------------------------------------------------------------
//1.-Requerir librerías y drivers
const express = require('express');
const bodyParser = require('body-parser');
const CalController = require('./controllers/divide');
//----------------------------------------------------------------------------------------
//2.-Configurar web server y parsee los datos
const app = express();
const port = 4000;
app.use(bodyParser.json());


//----------------------------------------------------------------------------------------
//3.- Definir paths disponibles
app.get('/', (req, res) => { res.send('Servidor activo.... Porfavor use /mathOperations'); });
app.get('/mathOperations/division/:num1/:num2', CalController.DivisionInq);

//----------------------------------------------------------------------------------------
//4.- Encender webserver 
app.listen(port, () => {
  console.log('Server division Inicializado en el puerto: ' + port);

});
  //----------------------------------------------------------------------------------------