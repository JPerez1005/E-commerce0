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

    async function login(user,pass){
        funcion="login";
        let data = await fetch('../controllers/UsuarioController.php',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:'funcion='+funcion+'&&user='+user+'&&pass='+pass
        })
        if (data.ok) {

            let response = await data.text();
            try {
                let respuesta=JSON.parse(response);
                // console.log(productos);
                if (respuesta.mensaje == 'usuario logueado') {
                    toastr.success('*se inicio sesion correctamente!');
                    location.href='../index.php';
                }else if(respuesta.mensaje=='error'){
                    toastr.error('*usuario o contraseña erroneos!');
                }
                CloseLoader();
            } catch (error) {
                console.error(error);
                console.log(respuesta.mensaje);
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Hubo algún error!!',
                text: 'Por favor verifique su conexión '+data.status,
              })
        }
    }//cuando ya hay una sesion verificada, no se puede volver a iniciar sesion

    $('#form-login').submit(e=>{
        // --------------capturamos variables
        // capturamos la variable usuario del formulario
        let user=$('#user').val();
        // capturamos la contraseña del formulario
        let pass=$('#pass').val();
        // console.log(user + ' ' + pass);
        Loader('Iniciando Sesion...');
        // mando la información al controlador
        login(user,pass);

        // prevenimos valores por defecto
        e.preventDefault();
    })

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
})