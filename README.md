# Two NodeJs, One Graphql Subscription

Supuesto en el que un servidor Node Js necesita suscribirse a otro servidor nodejs, mediante Graphql y Websockets, y la subscripcion necesita ser filtrada.

## Estructura

### Servidor 1

El servidor 1 actua como servidor que recibe un fichero como respuesta a un determinado resultado de la suscripción:

```
---> app.js
---> services
-----------> resolvers.js
------------------------> extension: extension del fichero/imagen a subir
-----------> typedefs.js
```


### Servidor 2

El servidor 2 actua como servidor que necesita estar suscrito a los cambios que ocurran en el servidor 2. En este encontramos:

```
---> app.js
---> services
-----------> client.js
---------------------> wsUrl: graphql websocket url
---------------------> graphqlUri: graphql url
-----------> router.js
---------------------> fileRoute: ruta del fichero
```


## Instalar

Para instalar las dependencias de cada servidor dirigete a su correspondiente carpeta e ingresa en la terminal: npm install o  yarn install

## Arrancar

Para arrancar cada servidor dirigete a su correspondiente carpeta e ingresa en la terminal: npm run dev o  yarn run dev

## Api

El servidor 1 inicia en el puerto 4000 y el servidor 2 en el 5000. Ambas subscripciones inician al arrancar el servidor 2.

### Servidor 1

```
---> query{
        testHola(userName:String!){
            result
        }
    },
---> query{ 
    (ATENTION: esta query sirve para subir ficheros o imagenes y este string tiene que ser un base64 string)
        getBackToTheServer(data:String! ){
            result
        }
    },
---> query{
        test2{
            result
        }
    },
---> Subscription {
        subTest(userName: String!){
            result
        },
    }
```

### Servidor 2

```
---> localhost:5000/api/hola 
(ATENTION: Las suscripciones solo se activan si el name en el raw son test o test2)
----------------> raw {
    "name": "test"
}
----------------> Result{
    "data": {
        "testHola": {
            "result": "hola {{name}}"
        }
    }
}
---> localhost:5000/api/hola2
----------------> Result{
    "data": {
        "testHola": {
            "result": "hola"
        }
    }
}
---> subscription si name es test
----------------> Result console.log(
    The sub filtered for the name test results with:{"subTest":{"result":"test","__typename":"Hola"}}and triggered the upload of a file
)
---> subscription si name es test2
----------------> Result console.log(
    The sub filtered for the name test results with:{"subTest":{"result":"test2","__typename":"Hola"}}
)

```

