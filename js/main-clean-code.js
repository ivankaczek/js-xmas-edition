function validarNombre(nombre){
    
    if (nombre.length === 0) {
        return 'el nombre debe tener al menos un caracter';
    }
    if(nombre.length >= 50) {
        return 'el nombre debe contener maximo 50 caracteres';
    }
    if(!/^[a-z]+$/i.test(nombre)){
        return 'el campo nombre solo acepta letras';
    }
    
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

   manejarErrores(errores);
   //console.log(errores);

    event.preventDefault();
}

function manejarErrores(errores){
    errorNombre = errores.nombre;
    errorCiudad = errores.ciudad;
    errorDescripcionRegalo = errores.descripcionRegalo;

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
        $form['descripcion-regalo'].className = "error";
    } else {
        $form['descripcion-regalo'].className = "";
    }
}

/*
function manejarErrores(errores){
    
   
    
    errorNombre = errores.nombre;
    errorCiudad = errores.ciudad;
    errorDescripcionRegalo = errores.descripcionRegalo;

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
*/


const $form = document.querySelector('#carta-a-santa');
$form.onsubmit = validarFormulario;