/*
si yo pongo en el querySelector('[name=nombre]') entre corchetes
o sea que esto me devuelve cualquier elemento (no importa si es un input,
    un submit, un p, un lo que sea), a condición que tenga un atributo
    particular, en este caso, que tenga name=nombre.

    Ejemplo: document.querySelector('[name=nombre]') significa: 'dame cualquier
    elemento que tenga un atributo de tipo name = nombre

Otro tema son los radio-buttons, ya que allí tenemos 'o una opción o la otra'
<p> Creo que este año he sido
            <input type="radio" value="muy_bueno" name="comportamiento"> Muy bueno
            <input type="radio" value="bueno" name="comportamiento"> Bueno
            <input type="radio" value="maso" name="comportamiento" checked> Mas o menos.</p>

Lo de recién es el pedacito html de la pagina. Ahí vemos que tenemos 3 inputs type="radio", cada uno
tiene un value diferente, pero tienen el mismo 'name'. Por eso sólo deja elegir uno ó el otro.
Si tuvieran diferente name se pueden elegir todos
Resumen: los type="radio" se agrupan por name

    document.querySelectorAll('[name=comportamiento]')
devuelve
    NodeList(3) [input, input, input]

entonces yo de esos radio buttons tendría que recorrer cada uno de los 3 inputs y fijarme cuál
está chequeado. Entonces vamos a usar otra cosa. El formulario tiene un nombre
 <form method="post" name="formulario" id="carta-a-santa">

usando
    document.formulario.comportamiento
devuelve
    RadioNodeList(3) [input, input, input, value: 'maso']

document.formulario funciona SOLAMENTE porque el form tiene name="formulario"
o lo que es exactamente lo mismo:

usando
    document.querySelector('#carta-a-santa').comportamiento
devuelve
    RadioNodeList(3) [input, input, input, value: 'maso']

ahí estaría diciendo "devolveme los items dentro del formulario(que lo puedo buscar por su name o por su 
    id que a su vez tengan name comportamiento". Entonces me devuelve un RadioNodeList. 
    Algo importante de saber es que un radioNodeList tiene como propiedad .value que es devolverte
    el value del que esté chequeado. Por eso no es un simple nodeList sino un radioNodeList
Hasta ahora habíamos trabajado sólo con node list. 

y si a esa línea le agrego .value directamente me devuelve sólo el que está seleccionado

document.querySelector('#carta-a-santa').comportamiento.value
'maso'

Entonces básicamente esta es una propiedad de los FORMULARIOS donde vos podés hacer .propiedad
o sea, traerte una propiedad con el punto

Ejemplo

document.querySelector('#carta-a-santa').nombre.value
'Ivan'

Otro ejemplo

document.querySelector('#carta-a-santa').ciudad.value
'Mendoza'

document.querySelector('#carta-a-santa').comportamiento[2]
<input type=​"radio" value=​"maso" name=​"comportamiento" checked>​
document.querySelector('#carta-a-santa').comportamiento[2].checked
true



*/

// Estamos haciendo $form.esteName.value; 
// vemos la importancia del atributo 'name', que nos permite traernos facilmente las cosas


/*
const $form = document.querySelector('#carta-a-santa');
const nombre = $form.nombre.value;
console.log(nombre);
const ciudad = $form.ciudad.value;
console.log(ciudad);
const comportamiento = $form.comportamiento.value;

// revisando el html vas a ver que 'maso' está seleccionado por default
console.log(comportamiento);

// por un tema de objetos, para traernos name con - lo tenemos que poner con entre llaves y comillas
// simples y si el punto

const descripcionRegalo = $form['descripcion-regalo'].value;
console.log(descripcionRegalo);
*/


//const nombre = document.querySelector('[name=nombre]').value;

function validarNombre(nombre){
    // 1ra condicion: que tenga más de un caractér o sea nombre.length >= 1
    if (nombre.length === 0) {
        return 'el nombre debe tener al menos un caracter';
    }
    if(nombre.length >= 50) {
        return 'el nombre debe contener maximo 50 caracteres';
    }
    if(!/^[a-z]+$/i.test(nombre)){
        return 'el campo nombre solo acepta letras';
    }
    // si no hay error devuelvo un string vacio
    return '';
}

function validarCiudad(ciudad){
    if(ciudad.length === 0) {
        return 'El campo ciudad no puede estar vacio';
    }
    if(ciudad.length >= 50) {
        return 'El campo ciudad no puede contener mas de 50 caracteres';
    }
    return '';
}

function validarComportamiento(comportamiento){
    if(comportamiento.length === 0) {
        return 'El campo comportamiento no puede estar vacio';
    }
    return '';
}

function validarDescripcionRegalo(descripcionRegalo){
     // acepto letras numeros coma punto (lo tengo que escapar) guion bajo y espacios
    
    if(descripcionRegalo.length === 0) {
        return 'La descripcion del regalo no puede estar vacia';
    }
    if(!/^[a-z0-9 ]+$/i.test(descripcionRegalo)){
        return 'el campo descripcion solo puede contener numeros y letras y espacios';
    }
    if(descripcionRegalo.length >= 30) {
        return 'La descripcion debe tener menos de 30 caracteres';
    }
   
    return '';
}
/*
console.log('sigue una regex');
console.log(/abc/.test("abcde"));
console.log(/abc/.test("abxcde"));
*/


/// VALIDAR FORMULARIO 
//con $form.nameTanto llamamos al que tiene name=nameTanto
//const comportamiento = $form.comportamiento.value;
        // basicamente no hay que validar comportamiento porque en un radioButton siempre
        // hay algo elegido
        //const errorComportamiento = validarComportamiento(comportamiento);

function validarFormulario(event){
    const $form = document.querySelector('#carta-a-santa');
    
    const nombre = $form.nombre.value;
    const ciudad = $form.ciudad.value;
    const descripcionRegalo = $form['descripcion-regalo'].value;
    
    const errorNombre = validarNombre(nombre);
    const errorCiudad = validarCiudad(ciudad);
    const errorDescripcionRegalo = validarDescripcionRegalo(descripcionRegalo);
    
    const errores = {
        nombre: errorNombre,
        ciudad: errorCiudad,
        descripcionRegalo: errorDescripcionRegalo
    }

    //console.log(errores);
    //  si miras en la consola el console.log de arriba vas a ver que errores
    // es un OBJETO que describe con strings los errores en el formulario

    //manejarErrores([errorNombre,errorCiudad,errorDescripcionRegalo]);
    // voy a cambiar el array anterior por el objeto Errores

    manejarErrores(errores);


    event.preventDefault();
    
}


/*
Funcion Manejar Errores
-----------------------
Estoy infiriendo que lo que hay en la primer posición es el error del nombre.
Así como está codeado abajo es complicado porque sí o sí tengo que pasar los errores
en un determinado orden, o sea la posición 0 es error del nombre, la 1 el comportamiento, etc...
Lo malo es que TENGO QUE ASUMIR QUE ME VAN A PASAR LOS ERRORES EN ORDEN. La función se vuelve
muy específica, porque ya no se trata de 'manejar errores' sino de 'manejar errores en este orden'
Y acá viene el tema OBJETOS porque para resolver esto, nos proponen DEFINIR UN OBJETO que describa
los errores de otra manera
*/
function manejarErrores(errores){

    /*
    si fuera un array lo definíamos como sigue
    errorNombre = errores[0];
    errorCiduad = errores[1];
    errorDescripcionRegalo = errores[2];
    pero ahora lo cambiamos por un objeto
    */
    errorNombre = errores.nombre;
    errorCiudad = errores.ciudad;
    errorDescripcionRegalo = errores.descripcionRegalo;

    // acá lo que dice es "si el error tiene caracteres, cambia la clase a "error"
    if(errorNombre) {
            $form.nombre.className = "error";
    } else {
            $form.nombre.className = "";
    }

    if(errorCiudad) {
        $form.ciudad.className = "error";
    } else {
        $form.ciudad.className = "";
    }

    if(errorDescripcionRegalo) {
        $form['descipcion-regalo'].className = "error";
    } else {
        $form['descripcion-regalo'].className = "";
    }
}

/*
Fijate que en CSS estamos diciendo que cuando class = "error"
entonces se activa un border de 2 px en rojo 


.error {
    border: 2px solid red;
}

Después lo que vamos a ver es que un objeto en realidad puede tener varias clases
por eso después vamos a utilizar classList.add pero por ahora no.
Cuando usamos className vamos a 'pisar' o sobreescribir todas las clases

*/


/*
Cuál es la idea ahora? Cambiar la funcion manejar errores para que sea más mantenible
El objetivo de la funcion manejar errores es que nosotros seamos libres de agregar 20
campos más al formulario, y de eso sólo tengamos que especificar la validación y que a su vez
la funcion manejarErrores sea capaz de tomar cualquier cantidad de errores, ir al formulario,
y pintarlos de rojo si son incorrectos.

Volvamos a la funcion validarFormulario y definamos a errores como un objeto

*/

const $form = document.querySelector('#carta-a-santa');
$form.onsubmit = validarFormulario;

/* Justo aquí arriba hay una funcion de callback, porque nunca estamos ejecutando
validarFormulario();

Sino que es el navegador el que está haciendo la llamada a la funcion
pasandosela como una propiedad del formulario
*/

/*
Objetos en JavaScript
---------------------

{}  eso es un objeto vacío

Veamos un objeto que describe una persona:

{
    nombre: 'Ivan',
    apellido: 'Tkaczek'
}

Vemos que la sintaxis es atributo, dos puntos, valor, separado por comas.
Nada más. A esto se le llama 'llave-valor' porque en este caso 'nombre' es la
llave e 'Ivan' es el valor que tiene esa llave. En inglés, 'key'-'value'
Tener en cuenta que cuando la llave tiene un guión hay que ponerla entre comillas
dobles
Sigue input-output en la consola


{
    nombre: 'Ivan',
    apellido: 'Tkaczek',
    "fecha-nacimiento" : '24-01-1985'
}
{nombre: 'Ivan', apellido: 'Tkaczek', fecha-nacimiento: '24-01-1985'}

const persona = {
    nombre: 'Ivan',
    apellido: 'Tkaczek',
    "fecha-nacimiento" : '24-01-1985'
}

persona
{nombre: 'Ivan', apellido: 'Tkaczek', fecha-nacimiento: '24-01-1985'}

Vemos que es muy sencillo crear un objeto en JS

persona.nombre
'Ivan'

Como vemos puedo llamar un atributo con el punto, o bien pasandole un STRING
con ese atributo, mejor llamado NOMBRE DE LA LLAVE
 como si fuese la posicion de un array, entre corchetes. Ejemplo:

persona['apellido']
'Tkaczek'

persona["fecha-nacimiento"]
'24-01-1985'

Entonces ahora se entiende que 'formulario' es un OBJETO, de name="formulario"
y que a su vez tiene un atributo que a su vez también es un objeto, cuya 
llave tiene un nombre, que aquí también se llama nombre. Entonces name="nombre"
es la llave para el objeto, de tipo input que es el siguiente:
<input type="text" name="nombre" id="nombre" value="Fabricio">

Creo que ahora me queda más claro la diferencia entre el id y el name
'name' es la llave del objeto, y el id es un identificador para buscarlo que no
debería ser repetido.

A los objetos fácilmente puede asignarsele nuevos atributos o propiedades. Ej:

persona.profesion = 'programador'
'programador'

persona 
{nombre: 'Ivan', apellido: 'Tkaczek', fecha-nacimiento: '24-01-1985', profesion: 'programador'}

Puedo facilmente borrar una propiedad haciendo 

delete persona.profesion
true
persona 
{nombre: 'Ivan', apellido: 'Tkaczek', fecha-nacimiento: '24-01-1985'}

Hasta ahora hemos puesto sólo strings, pero los objetos adentro pueden tener 
cualquier cosa. 

Vamos con algo más complejo: Definimos un objeto (JSON significa JavaScript Object Notation)

const miObjeto = {
p1: "hola",
p2: function(){console.log("hola soy propiedad 2"); },
p3: 123,
p4: {
    p5: "Hola propiedad 5"
},
p6: [{p7: "Hola propiedad 7"}]
}
undefined

miObjeto.p1
'hola'

miObjeto.p2
ƒ (){console.log("hola soy propiedad 2"); }

miObjeto.p3
123

miObjeto.p4
{p5: 'Hola propiedad 5'}

miObjeto.p4.p5
'Hola propiedad 5'

miObjeto.p6
[{…}]

miObjeto.p6[0]
{p7: 'Hola propiedad 7'}

miObjeto.p6[0].p7
'Hola propiedad 7'

// como mi objeto.p2 es una funcion la puedo ejecutar con la sintaxis p2().
// la consola dice undefined porque la funcion no devuelve nada. Hizo un return 'undefined'
miObjeto.p2()
VM898:3 hola soy propiedad 2
undefined

miObjeto
{p1: 'hola', p3: 123, p4: {…}, p6: Array(1), p2: ƒ}

Una cosa interesante de los objetos es que hay una forma de agarrar solamente los key
o solamente los values

errores = {nombre : "error en nombre", ciudad: "error en ciudad"};
{nombre: 'error en nombre', ciudad: 'error en ciudad'}

Object.keys(errores)
(2) ['nombre', 'ciudad']

Object.values(errores)
(2) ['error en nombre', 'error en ciudad']

Fijate que nos devuelve un array o bien con las llaves, o bien con los valores

Ejemplo de forEach en la consola

[2,3,6].forEach(function(n){console.log(2*n*n+5*n-10);})
La consola muestra:
 8
 23
 92



*/



// onsubmit es una propiedad del objeto form que ESPERA UNA FUNCION.
// porque cuando hacemos submit se ejecuta $form.onsubmit(); o sea que eso es un placeholder para
// la funcion validarFormulario, que a su vez crea un evento, que lo llevó a que hicieran
// click en ese formulario. Con el event.preventDefault(); el formulario nunca se envia


/*
Lo recalcamos de nuevo para fijarlo en la memoria:
una formulario es un OBJETO
El que escribió html y js definió que los objetos formularios tienen una PROPIEDAD que es 
el ONSUBMIT
y que esa propiedad está esperando el nombre de una función que vamos a codear nosotros.
por eso acepta directamente el nombre de la funcion
$form.onsubmit = validarFormulario;

y por eso ni ponemos los paréntesis

No solo hace un submit, sino que ademas genera un evento

y se puede 'matar' el envento con 
function validarFormulario(event) {
    TODO
    event.preventDefault();
}
*/

/*
Tema de entrevista:

Event Bubbling
--------------
Si miramos el index.html de este proyecto, el input con el nombre está adentro de un <p> que a su vez
está adentro de un <form> que a su vez está adentro de un <section> que a su vez está dentro de un <body>
que a su vez está dentro de un <html>. Entonces la idea del event bubbling es que cuando hacemos click en
el input, estamos haciendo click en todas las ramas 'padre' de ese input. 

Con el event.preventDefault() lo que hacemos es que al validar el formulario NO SIGA SUBIENDO ese evento,
no se siga propagando el evento submit. 

Cuando se hace click en el button, primero sucede eso y luego se va subiendo hasta avisarle al formulario
'te hicieron click'. Por eso el preventDefault(); en el botón o bien el return false, hace que uno 'mate'
el evento antes de que se envíe. Hacerlo en el formulario es lo mismo, porque hasta que no salga del formulario,
entonces este formulario no se va a enviar. 



*/



/*
regex

para chequear que algo CONTENGA la cadena 'abc' hago
/abc/.test("abcde")

para chequear que algo COMIENZA con la cadena 'abc' hago
/^abc/.test("abcde")

Analicemos algo más complejo:
const contieneSoloLetras = /^[A-z]+$/.test(valor);

[A-z]   significa 'que contenga caracteres entre A y z
+       significa que haya uno o más

/^abc[0-9]+/.test('abc123456789')
true

Arriba dice (evaluar si la cadena comienza con 'abc' y luego tiene uno o más
numeros)

si pongo un * en vez del + significa que funciona con ningun numero tambien

si solo quiero un numero despues pongo esa cantidad entre llaves
/^abc[0-9]{1}/.test('abc')
false

/^abc[0-9]{1}/.test('abc1')
true

/^abc[0-9]{1}/.test('abca')
false

¿y si quiero que luego de abc haya un rango de entre 3 y 4 numeros?

/^abc[0-9]{3,4}/.test('abcabcabc')
false

/^abc[0-9]{3,4}/.test('abc12abcabc')
false

/^abc[0-9]{3,4}/.test('abc123abcabc')
true

y lo que venga despues no pasa nada, no me cambia el asunto

Cuando quiero que TERMINE AHI le pongo en simbolo $

/^abc[0-9]{3,4}$/.test('abc123abcabc')
false

da falso porque no terminó después del 3r o 4to numero

/^abc[0-9]{3,4}$/.test('abc1234')
true

ese da true porque arranco con abc y luego hizo 3 o 4 numeros y listo

es clave que yo entienda que /abc/ es un OBJETO de expresion regular
y tiene acceso a distintos metodos. Uno de ellos es .test();

/[a-z]+/i       significa NO ME IMPORTA case sensitive (la i después de la /)

/[a-z]+ [a-z]+/i.test('ivan')
false
/[a-z]+ [a-z]+/i.test('ivan tkaczek')
true

lo anterior esta diciendo 'que contenga letras, espacio y letras


*/
// fucntion validarDescripcionRegalo

/*
Cómo se utiliza el forEach

hay una forma sencilla sin declarar una funcion callback

numeros
(4) [2, 5, 6, 7]
numeros.forEach(element => console.log(ardilla(element)));
VM2671:1 4
VM2671:1 13
VM2671:1 16
VM2671:1 19
undefined

ahí no hay callback function, simplemente dijimos, 'para cada elemento hace esto'

Otra manera de utilizarla es pasar una funcion como parametro

const $inputs = document.querySelectorAll('input')
undefined
$inputs.forEach(function(input){
    console.log(input);
});

lo de arriba se puede 'leer' así:

"para cada elemento input del 'objeto' o array o nodeList llamado $input
ejecuta una funcion que es console.log(input) "

la consola devuelve:
VM2941:2 <input type=​"text" name=​"nombre" id=​"nombre" value=​"Fabricio" class=​"error">​
VM2941:2 <input type=​"radio" value=​"muy_bueno" name=​"comportamiento">​
VM2941:2 <input type=​"radio" value=​"bueno" name=​"comportamiento">​
VM2941:2 <input type=​"radio" value=​"maso" name=​"comportamiento" checked>​
undefined

Ahora hagamos lo mismo pero imprimamos el .value

$inputs.forEach(function(input){
    console.log(input.value);
});
VM3019:2 1111
VM3019:2 muy_bueno
VM3019:2 bueno
VM3019:2 maso
undefined



*/