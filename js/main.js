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

console.log('sigue una regex');
console.log(/abc/.test("abcde"));
console.log(/abc/.test("abxcde"));

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