function probarValidarNombre() {
    console.assert(validarNombre("") === 'el nombre debe tener al menos un caracter', 
        'validar nombre no funciono con un string vacio');
    console.assert(
      validarNombre(
          '111111111111111111111111111111111111111111111111111111111111111111111111111111111111111') ===
      'el nombre debe contener maximo 50 caracteres',
      'Validar nombre no validó que el nombre sea menor a 50 caracteres',
   
  );
    console.assert(validarNombre('123') === 'el campo nombre solo acepta letras','validarNombre no funciona cuando ingresan caracteres que no son letras');
 // happypath o caso feliz
    console.assert(validarNombre('Ivan') === '', 'validarNombre fallo con un nombre valido');

}

function probarValidarCiudad(){
    console.assert(validarCiudad("") === 'El campo ciudad no puede estar vacio',
    'validar ciudad no funciono con un string vacio');
    console.assert(validarCiudad('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa') 
     === 'El campo ciudad no puede contener mas de 50 caracteres',
     'Validar ciudad no valido que sea menor a 50 caracteres');
    console.assert(validarCiudad('Mendoza') === "", 'validarCiudad fallo con un nombre de ciudad valido');
}

function probarValidarDescripcionRegalo(){
    console.assert(validarDescripcionRegalo('')=== 'La descripcion del regalo no puede estar vacia',
    'validarDescripcionRegalo no funciono con un string vacio');
    console.assert(validarDescripcionRegalo("12345678901234567890aaa1234567890")==='La descripcion debe tener menos de 30 caracteres','validacionDescripcionRegalo fallo en controlar menos de 20 caracteres');
    console.assert(validarDescripcionRegalo('Una bicicleta') === "" , 'validarDescripcionRegalo falla con un caso valido');
    console.assert(validarDescripcionRegalo('ñ') === 'el campo descripcion solo puede contener numeros y letras y espacios', 'validar descripcion falla en chequear que solo tenga numeros, letras y espacios');
   }

function probarValidarComportamiento(){
    console.assert(validarComportamiento("") === 'El campo comportamiento no puede estar vacio',
    'validarComportamiento fallo en campo vacio');
    console.assert(validarComportamiento('bueno') === "", 'fallaValidarComportamiento en el caso feliz');
}

probarValidarNombre();
probarValidarCiudad();
probarValidarDescripcionRegalo();
probarValidarComportamiento();

 

/*
La idea de las pruebas unitarias es escribir código que nos permita
saber que el código funciona. Si bien existe el testing manual, y siempre
uno lo va testeando, pero las PRUEBAS UNITARIAS las escribimos para nuestros
compañeros y para nuestros yo futura. Si el día de mañana alguien rompe
algo en el código, va a saltar el error. Si algo dependía de esa función
y alguien lo rompió, si no teníamos pruebas automatizadas, vamos a estar
horas y horas debuggeando.

A partir de ahora, además de escribir las tareas normales, vamos a esribir
pruebas para esos códigos
*/




/*
function sumar(a,b){
    return a+b;
}

console.assert(sumar(1,2) ===3 , "1 + 2 no dio 3");

*/




/*
Qué hace console.assert() ??? básicamente se fija que las cosas sean iguales, ej:
console.assert(1===1)
undefined

no me tira error

console.assert(1===2,"1no es igual a 2")
VM2527:1 Assertion failed: 1no es igual a 2
(anonymous) @ VM2527:1
undefined

La idea es que cada cosa que hagamos ir escribiendo una prueba

*/
