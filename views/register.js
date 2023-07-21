$(document).ready(function(){
  var funcion;

  Loader();
  verificar_sesion();
  // setTimeout(verificar_sesion,2000);

  async function verificar_sesion(){
      funcion="verificar_sesion";
      let data = await fetch('../controllers/UsuarioController.php',{
          method:'POST',
          headers:{'Content-Type':'application/x-www-form-urlencoded'},
          body:'funcion='+funcion
      })
      if (data.ok) {

          let response = await data.text();
          try {
              // console.log(productos);
              if (response !='') {//si estamos logueados entonces....
                  location.href='../index.php';
              }
              CloseLoader();
          } catch (error) {
              console.error(error);
              console.log(response);
          }
      } else {
          Swal.fire({
              icon: 'error',
              title: 'Hubo algún error!!',
              text: 'Por favor verifique su conexión '+data.status,
            })
      }
  }//cuando ya hay una sesion verificada, no se puede volver a iniciar sesion

  async function registrarse(username,pass,nombres,apellidos,dni,email,telefono){
    funcion="registrar_usuario";
    let data = await fetch('../controllers/UsuarioController.php',{
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body:'funcion='+funcion+'&&username='+username+'&&pass='+pass+'&&nombres='+nombres+'&&apellidos='+apellidos+'&&dni='+dni+'&&email='+email+'&&telefono='+telefono
    })
    if (data.ok){
        let response = await data.text();
        console.log(response);
        try {
          let respuesta=JSON.parse(response);
          console.log(respuesta);
          if(respuesta.mensaje=="success"){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Registro Exitoso',
                showConfirmButton: false,
                timer: 1500
              }).then(function(){
                $('#form-register').trigger('reset');
                location.href = '../views/login.php'
              })
          }
          CloseLoader();
        } catch (error) {
            console.error(error);
            console.log(respuesta.mensaje);
            Swal.fire({
              icon: 'error',
              title: 'Hubo algún error!!',
              text: 'Por favor verifique su conexión'
            })
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Hubo algún error!!',
            text: 'Por favor verifique su conexión '+data.status,
        })
    }
  }//cuando ya hay una sesion verificada, no se puede volver a iniciar sesion

  $.validator.setDefaults({
    submitHandler: function(){
      let username = $('#username').val();
      let pass = $('#pass').val();
      let nombres = $('#nombres').val();
      let apellidos = $('#apellidos').val();
      let dni = $('#dni').val();
      let email = $('#email').val();
      let telefono = $('#telefono').val();
      Loader('Registrando usuario...');
      registrarse(username,pass,nombres,apellidos,dni,email,telefono);
    }
  });

  // podemos crear reglas en las validaciones
  jQuery.validator.addMethod('usuario_existente',
      function (value, element) {
          let funcion="verificar_usuario";
          let bandera;
          $.ajax({
              type: "POST",
              url: "../controllers/UsuarioController.php",
              data: 'funcion=' + funcion + '&&value=' + value,
              async: false,
              success: function(response){
                  response=response.trim();//trim elimina cualquier espacio en la respuesta
                  if (response=="success") {
                      bandera=false;
                  } else {
                      bandera=true;
                  }
              }
          })
          // console.log(bandera);
          return bandera;
      },
      "*Este usuario ya existe");

  jQuery.validator.addMethod("letras",
      function (value, element) {
        let variable = value.replace(/ /g, "");
        return /^[A-Za-z]+$/.test(variable);
      },
      "Este campo solo permite letras y ya");

  $('#form-register').validate({//este tipo de reglas vienen por defecto
    rules: {
        nombres: {
          required: true,
          letras:true
        },
        apellidos: {
          required: true,
          letras:true
        },
        username: {
            required: true,
            minlength: 5,
            maxlength: 20
        },
        pass: {
            required: true,
            minlength: 5,
            maxlength: 20
        },
        pass_repeat: {
            required: true,
            equalTo: "#pass"
        },
        dni: {
            required: true,
            digits: true,
            minlength: 10,
            maxlength: 10
        },
        email: {
          required: true,
          email: true
        },
        telefono: {
          required: true,
          digits: true,
          minlength: 10,
          maxlength: 10
        },
        password: {
          required: true,
          minlength: 5
        },
        terms: {
          required: true
        },
    },
    messages: {
        nombres:{
            required: "*Este campo es obligatorio"
        },
        apellidos:{
            required: "*Este campo es obligatorio"
        },
        username:{
            required: "*Este campo es obligatorio",
            minlength: "*El username debe ser de minimo 5 caracteres",
            maxlength: "*El username debe ser de maximo 20 caracteres"
        },
        pass:{
            required: "*Este campo es obligatorio",
            minlength: "*El password debe ser de minimo 5 caracteres",
            maxlength: "*El password debe ser de maximo 20 caracteres"
        },
        pass_repeat:{
            required: "*Este campo es obligatorio",
            equalTo: "*el campo de la contraseña no coincide"
        },
        dni:{
            required: "*Este campo es obligatorio",
            digits: "este campo no debe de contener letras",
            minlength: "es un minimo de 10 digitos",
            maxlength: "es un maximo de 10 digitos"
        },
        email: {
          required: "Please enter a email address",
          email: "Please enter a vaild email address"
        },
        telefono: {
            required: "*Este campo es obligatorio",
            digits: "este campo no debe de contener letras",
            minlength: "es un minimo de 10 digitos",
            maxlength: "es un maximo de 10 digitos"
        },
        password: {
          required: "Please provide a password",
          minlength: "Your password must be at least 5 characters long"
        },
        terms: "Please accept our terms"
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
      error.addClass('invalid-feedback');
      element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
        $(element).addClass('is-invalid');
        $(element).removeClass('is-valid');
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).removeClass('is-invalid');
        $(element).addClass('is-valid');
    }
  });

  function Loader(mensaje){
    if (mensaje==''||mensaje==null) {
        mensaje='Cargando datos...';
    }
    Swal.fire({
        position: 'center',
        html: '<i class="fa-solid fa-spinner fa-spin-pulse fa-xl" style="color: #409c8c;"></i>',
        title: mensaje,
        showConfirmButton:false
    })
}

  function CloseLoader(mensaje,tipo){
      if (mensaje==''||mensaje==null) {
          Swal.close();
      } else {
          Swal.fire({
              position: 'center',
              icon: tipo,
              title: mensaje,
              showConfirmButton:false
          })
      }
  }
});