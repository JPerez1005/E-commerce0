$(document).ready(function(){
    
    var funcion;

    verificar_sesion();

    function verificar_sesion() {
        funcion = 'verificar_sesion';
        $.post('../controllers/UsuarioController.php', { funcion }, (response)=> {
            if (response !='') {
                location.href='../index.php';
            }
        })
    }//cuando ya hay una sesion verificada, no se puede volver a iniciar sesion

  $.validator.setDefaults({
    submitHandler: function () {
      let username = $('#username').val();
      let pass = $('#pass').val();
      let nombres = $('#nombres').val();
      let apellidos = $('#apellidos').val();
      let dni = $('#dni').val();
      let email = $('#email').val();
      let telefono = $('#telefono').val();
      funcion = "registrar_usuario";
      $.post('../controllers/UsuarioController.php', {username,pass,nombres,apellidos,dni,email,telefono,funcion},(response)=>{
        response=response.trim();//trim elimina cualquier espacio en la respuesta
        if(response=="success"){
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
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Hubo algún error!!',
                text: 'Por favor verifique su conexión'
              })
              
        }
      })
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
});