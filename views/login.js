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

    $('#form-login').submit(e=>{
        funcion='login';
        // --------------capturamos variables
        // capturamos la variable usuario del formulario
        let user=$('#user').val();
        // capturamos la contraseña del formulario
        let pass=$('#pass').val();
        // console.log(user + ' ' + pass);
        // mando la información al controlador
        $.post('../controllers/UsuarioController.php', {user,pass,funcion},
        /*La respuest se almacena en response*/(response)=>{
            console.log(response);
            if (response == 'usuario logueado') {
                toastr.success('*se inicio sesion correctamente!');
                location.href='../index.php';
            }else{
                toastr.error('*usuario o contraseña erroneos!');
            }
        })

        // prevenimos valores por defecto
        e.preventDefault();
    })

})