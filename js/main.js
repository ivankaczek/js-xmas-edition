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

function validarDescripcionRegalo(descripcionRegalo){
    if(descripcionRegalo.length === 0) {
        return 'La descripcion del regalo no puede estar vacia';
    }
    return '';
}

// fucntion validarDescripcionRegalo