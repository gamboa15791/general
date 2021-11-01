function showUserInfo(){
  let usuario = JSON.parse(localStorage.getItem('usuario'));
    let htmlUserInfoToAppend = "";
    
    htmlUserInfoToAppend += ` 

    <div name='lista de usuario'>
    <dl >
    <dt>Información de usuario</dt>
    <dd>Nombre: <span id="userName"></span></dd>
    <dd>Apellido: <span id="userLastName"></span> </dd>
    <dd>Edad; <span id="userAge"> </dd>
    <dd>Teléfono:<span id="userPhone"> </dd>
    <dd>Mail: <span id="userMail"></dd>
    </dl>
  </div> <br>

  
      <div class="container">
        <div class="row text-center text-lg-left pt-2" id="">

        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalScrollable">
  Editar información
</button> <br>

       </div>
        
        
      </div>

    `

    document.getElementById("userInfo").innerHTML = htmlUserInfoToAppend;
    document.getElementById('userName').innerHTML = usuario.nombre;
    document.getElementById('userLastName').innerHTML = usuario.apellido;
    document.getElementById('userAge').innerHTML = usuario.edad;
    document.getElementById('userPhone').innerHTML = usuario.phone;
    document.getElementById('userMail').innerHTML = usuario.mail;
}

function editUserInfo() {
  let usuario = JSON.parse(localStorage.getItem('usuario'));
  
  let newUserName = document.getElementById('newUserName').value;
  let newUserLastName = document.getElementById('newUserLastName').value;
  let newUserAge = document.getElementById('newUserAge').value;
  let newUserPhone = document.getElementById('newUserPhone').value;
  let newUserMail = document.getElementById('newUserMail').value;

if ( newUserName.trim() !== '') {
  usuario.nombre = newUserName ;
}
  if ( newUserLastName.trim() !== '') {
    usuario.apellido = newUserLastName;
  }
  if ( newUserAge.trim() !== '') {
    usuario.edad = newUserAge;
  }
  if ( newUserPhone.trim() !== '') {
    usuario.phone = newUserPhone;
  }
  if ( newUserMail.trim() !== '') {
    usuario.mail = newUserMail;
  }
  
 localStorage.setItem('usuario', JSON.stringify(usuario));
 location.href = 'my-profile.html';
}

function previewPhoto(){
let previewPhoto = document.getElementById("photo");
let file = document.querySelector('input[type=file]').files[0];

let reader = new FileReader(); //instancia de objeto
//constructor
//construirAuto (int puerta, int ruedas, float tMotor)
//autito = new construirAuto()

reader.onloadend = function(){

previewPhoto.src = reader.result;
// abajo muestra la ruta de la foto
// document.getElementById('contenido').innerHTML = reader.result

}

if (file) {
  reader.readAsDataURL(file);
 
} else {
  previewPhoto.src = "logousuario.png";
}

}

function guardarFoto() {
  let usuario = JSON.parse(localStorage.getItem('usuario'));
  let previewPhoto = document.getElementById("photo");

  usuario.imagen = previewPhoto.src;

  localStorage.setItem('usuario', JSON.stringify(usuario));
    alert ( "Foto guardada")

}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  let usuario = JSON.parse(localStorage.getItem('usuario'));
  let previewPhoto = document.getElementById("photo");

  if (usuario !== null) {
    showUserInfo(); 
  
  }else{
    location.href = 'login.html';
  }

  if(usuario.imagen !== ""){

    document.getElementById('foto').src = usuario.imagen;

    }else {
      previewPhoto.src = "logousuario.png";
    }

    

});