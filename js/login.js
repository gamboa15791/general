/* Se usa la función verificar para comprobar que el ingreso de la información no esté vacío*/
function verificar() {

    /*creamos un array vacio para incluir en orden la info asociada a dato */
    let usuario = {};

    /* Creamos la variable dato que será igual a lo que ingresemos en el campo con id user*/
    let dato = document.getElementById('user');
    let password = document.getElementById('password');

    /*realizo la condición de la verificación, extrayendo el valor de la variable dato  
    y quitando los espacios antes y despues con ".trim()" */
    if (dato.value.trim() === ''|| password.value.trim() === '' ) {

        alert('Algún campo está vacío');
    }
    else {
        location.href = 'index.html';
        usuario.nombre = dato.value; // guarda en 'usuario' el elemento 'nombre' con valor 'lo escrito en dato'
        usuario.estado = 'Conectado'; //estado del usuario
        usuario.passwordUser= password.value;
        usuario.edad = '';
        usuario.mail = '';
        usuario.phone = '';
        usuario.apellido = '';
        usuario.imagen='';
        localStorage.setItem('usuario', JSON.stringify(usuario));
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


document.addEventListener("DOMContentLoaded", function (e) {



});
