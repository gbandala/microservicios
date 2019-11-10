# Microservicios

_Implementación con Node Js, Express, MVC_

### Pre-requisitos 📋

_Que cosas necesitarás_

```
Framework Node Js
Docker
Editor de código (Visual Code)
Git
Postman
Cuenta en dockerHub
Cuenta en GitHub
```
### Crear estrucutura de todo el servicio de tarea

_Debe crear una estructura de carpetas independientes para que pueden ser desplegadas cada una de las aplicaciones, no se detallan todos los pasos de programación se asume que tiene un conocimiento ligero de node js y postman_


_Estructura general_

```
Servicio-Composite
    serviciocomposite
    serviciodivide
    serviciomultiplica
    serviciosuma
    servicioresta
```

_Estructura inicial de cada servicio_

```
serviciosuma
    controllers
        suma.js
    app.js
```

_Estructura inicial del composite_

```
serviciocomposite
    app.js
```

### Crear el servicio suma ⚙️

_Un ejemplo sencillo de una operación suma, exponiendo una API, se le pasarán 2 parámetros path params (requeridos), funcionará con un controller donde estará la función de sumar, se valida que los parámetros no estén vacíos y regresa el resultado de la operación. De esta manera repetirá para cada servicio_

_API get_

```javascript
app.get('/mathOperations/addition/:num1/:num2',CalController.AdditionInq);
```

_En el controller el archivo suma.js_

```javascript
exports.AdditionInq = function (req, res) {....};
```
_Resumen de cada servicio_

> * Crear el código de controller
> * Crear el código del api e invocar el controller
> * Instalar las librerías eje. npm install express body-parser
> * Hacer el npm init para documentar cada servicio
> * Editar el package.json en la línea script: "start":"node app.js"
> * Ejecutar eje. node app.js y en su defecto corregir errores
> * Validar en postman la URL con los parámetros eje localhost: 1000/...
> * Validar logs en el servidor de la ejecución


### Crear el servicio composite ⚙️

_Un ejemplo de un servicio que puede hacer la coreografía de otros servicios_

_Llamado a uno de los servicios de división, no hay localhost, porque crearemos una imagen con un dominio y un puerto expuesto, pero solo de forma interna, aqui no hay controller solo el app.js que orquesta_

_app.js_

```javascript
app.get('/mathOperations/:operation/:num1/:num2', function (req, res) {...});

```

```javascript
request('http://division:4000/mathOperations/division/' + num1 + '/' + num2, function (err, body) {....});
// para probar el composite sera necesario hacer cambios en la URL de nombre del server a localhost 
//y un puerto para cada operacion
request('http://localhost:1000/mathOperations/addition/' + num1 + '/' + num2, function (err, body) {....});
request('http://localhost:2000/mathOperations/subtraction/' + num1 + '/' + num2, function (err, body) {....});
request('http://localhost:3000/mathOperations/multiplication/' + num1 + '/' + num2, function (err, body) {....});
request('http://localhost:4000/mathOperations/division/' + num1 + '/' + num2, function (err, body) {....});

//iniciar cada servicio (las 4 operaciones) y el orquestador
//despues de probar el local regresar los valores en el app.js del composite
//para no hacer estos cambios, pero sera necesario ejecutar node app2.js del composite


```

## Crear la imagen del servicio suma ⚙️

_Validado que funciona el servicio, se puede crear una imagen docker_

_Crear Dockerfile_

```Dockerfile
FROM  node:9-slim
RUN mkdir /src
WORKDIR /src
COPY  package*.json ./
RUN npm install
COPY . .
CMD ["npm","start"]
```

_Crear .dockerignore para no considerar la carpeta librerías (drivers)_

```
node_modules
```

_serviciosuma_

```
serviciosuma
    controllers
        suma.js
    app.js
    package.json
    package-lock.json
    Dockerfile
    .dockerignore
```

_Crear Imagen Docker_

```Dockerfile
docker build -t ms-addition .
```

_Validar la Imagen Docker_

```Dockerfile
docker images
```
_Resumen para cada servicio_

> * Validar en postman que funciona el servicio
> * Para probar el composite ejecutar el app2.js del código
> * Crear el Dockerfile y .dockerignore
> * Crear la imagen y validarla
> * Hacer el npm init para documentar el servicio
> * La única estrutura diferente es la del serviciocomposite sin controller

### Orquestar los servicios 🔩

_Una vez creadas las imagenes con los servicios validados, los vamos a orquestar_

_Resumen_

> * Crear la red domain.calculus
> * Crear el docker-compose.yml, instrucciones de armado de los contenedores
> * Correr el docker-compose.yml
> * Validar la existencia de la red domain.calculus
> * Validar la existencia de los contenedores
> * Validar los logs de cada contenedor si están encendidos
> * Validar en Postman el puerto expuesto (Dockerfile) de composite
> * Solo el composite está expuesto
> * Validar que no tienen accesos a los otros servicios
> * Revisar los logs después de cada operación de los contenedores involucrados

_Crear docker-compose.yml al nivel del proyecto_

```
Servicio-Composite
    serviciocomposite
    serviciodivide
    serviciomultiplica
    serviciosuma
    servicioresta
    docker-compose.yml
```

```yml
version: '3'

#Declarar los servicios
#Cada servicio con la imagen ya creada
#expose para comunicacion interna (este puerto debe ser el mismo que se declaro en cada 
#api llamada dentro del app del composite) y ports para exponer al exterior
#depends_on para ligar conexion entre contenedores
#Crear la red domain.calculus antes de ligarlos
#networks para agrupar los contenedores y solo se comuniquen entre esa red
services:
  addition:
    container_name: addition
    image: ms-addition
    expose:
      - '1000'
    networks:
      - domain.calculus       
  subtraction:
    container_name: subtraction
    image: ms-subtraction
    expose:
      - '2000'    
    networks:
      - domain.calculus                    
  multiplication:
    container_name: multiplication
    image: ms-multiplication
    expose:
      - '3000'
    networks:
      - domain.calculus      
  division:
    container_name: division
    image: ms-division
    expose:
      - '4000'
    networks:
      - domain.calculus      
  composite:
    container_name: composite
    image:  ms-composite
    ports:
      - '5000:1000'
    networks:
      - domain.calculus      
    depends_on:
      - multiplication
      - division
      - addition
      - subtraction
networks:
  domain.calculus:
    external: true
```

_Crear la red domain.calculus, es decir personalizarla_

```Dockerfile
docker network create domain.calculus
```

_Validar la existencia de la nueva red_

```Dockerfile
docker network ls
```

_Crear los contenedores al correo yml_

```Dockerfile
docker-compose up -d
```

_Validar la creación_

```Dockerfile
docker ps
```

_Validar la red con los contenedores_

```Dockerfile
docker network inspect domain.calculus
```

_Probar si están encendidos los contenedores, debe mostrar mensajes en cada servidor_

```Dockerfile
docker logs composite
docker logs multiplication
docker logs addition
docker logs subtraction
docker logs division
```

_Cómo probarlo, una letra para la operación y números enteros_

```
operation: 
m - multiplicación
a - suma
d - división num1 > num 2
s - resta num1 > num 2
```

_Probar en postman el servicio composite, el expuesto_

```javascript
localhost:5000/mathOperations/:operation/:num1/:num2
```

_Validar que no se pueda entrar a los servicios que no son composite_

```javascript
localhost:1000/mathOperations/addition/:num1/:num2
localhost:2000/mathOperations/subtraction/:num1/:num2
localhost:3000/mathOperations/multiplication/:num1/:num2
localhost:4000/mathOperations/division/:num1/:num2

addition:1000/mathOperations/addition/:num1/:num2
subtraction:2000/mathOperations/subtraction/:num1/:num2
multiplication:3000/mathOperations/multiplication/:num1/:num2
division:4000/mathOperations/division/:num1/:num2
```


## Referencias utiles para el diseño de Microservicios 🛠️

_Microservicios es mas que contenedores, debes considerar domain drive design_

* [Arcitura](https://patterns.arcitura.com/soa-patterns/design_patterns/overview) - Patrones de arquitectura
* [Swagger](http://petstore.swagger.io/) - Swagger
* [API](https://apievangelist.com) - Artículos de API
* [Patrones](http://apistylebook.com/) - Guias de diseño de API
* [SOA](https://publications.opengroup.org/white-papers/soa) - Open group de SOA
* [Microservicios](https://martinfowler.com/articles/microservices.html) - Microservicios Martin Fowler
* [IFX](https://bms.ifxforum.org/rel2_4/content/contents.jsp) -  IFX standard
* [BIAN](https://bian.org/servicelandscape/) -  BIAN Lansdcape
* [DDD](https://martinfowler.com/tags/domain%20driven%20design.html) -  Domain Drive Design Martin Fowler


## Autor ✒️

* **Gabriel Bandala** - *Versión Inicial* - [gbandala](https://github.com/gbandala/)



