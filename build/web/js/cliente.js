$(document).ready(inicio);

function inicio() {

    //INICIO DE SESION
    $("#btnIniciarSesion").click(clickInicioSesion);

    //REGISTRO DE USUARIO
    $("#registroUsuario").click(function () {
        $("#loginModal").modal('hide');
        $("#registroModal").modal('show');
    });
    $("#btnRegistrarUsuario").click(clickRegistroUsuario);

    //CONTACTENOS
    $("#pagContactenosClick").click(function () {
        $("#pagInicio").hide();
        $("#pagContactenos").show();
    });
    $("#btnEnviarDatosContactenos").click(clickContactoUsuarioApp);


    skip();
}

function clickInicioSesion() {
    let usuario = $("#usuarioSesion").val();
    let password = $("#passwordSesion").val();
    $.ajax({
        url: "http://localhost:8080/Riff/app/restServices/inicioSesionUsuario",
        data: JSON.stringify({
            usuario: usuario,
            clave: password
        }),
        type: "POST",
        async: false,
        cache: false,
        contentType: "application/json",
        success: function (rta) {
            console.log(rta);
        },
        error: function (err) {
            console.log(err);
        }
    });
}
function clickRegistroUsuario() {
    let identificacion = $("#txtIdentificacion").val();
    let nombres = $("#txtNombres").val();
    let apellidos = $("#txtApellidos").val();
    let fechaNacimiento = $("#fechaNacimiento").val();
    let direccionResidencia = $("#txtDireccion").val();
    let telefono = $("#txtTelefono").val();
    let correoElectronico = $("#txtCorreoElectronico").val();
    let usuario = $("#txtUsuario").val();
    let password = $("#txtPassword").val();
    let nombreBanda = $("#txtNombreBanda").val();
    let genero = $("#txtGenero").val();
    // VALIDAR DATOS DE CADA CAMPO
    $.ajax({
        url: "http://localhost:8080/Riff/app/restServices/registrarUsuario",
        data: JSON.stringify({
            identificacion: identificacion,
            nombre: nombres,
            apellido: apellidos,
            fechaNacimiento: fechaNacimiento,
            direccionResidencia: direccionResidencia,
            telefono: telefono,
            correoElectronico: correoElectronico,
            usuario: usuario,
            clave: password
        }),
        type: 'POST',
        async: false,
        cache: false,
        contentType: 'application/json',
        success: function (rta) {
            console.log(rta);
        },
        error: function (error) {
            console.log(error);
        }
    });
}
function clickContactoUsuarioApp() {
    let nombreContacto = $("#nombreContactenos").val();
    let emailContacto = $("#emailContactenos").val();
    let cajaMensajeContacto = $("#cajaMensajeContactenos").val();
    $.ajax({
        url: "http://localhost:8080/Riff/app/restServices/envioFormularioContactenos",
        data: JSON.stringify({
            nombre: nombreContacto,
            correoElectronico: emailContacto,
            mensajeContactenos: cajaMensajeContacto
        }),
        type: 'POST',
        cache: false,
        async: false,
        contentType: 'application/json',
        success: function (respuesta) {
            console.log(respuesta);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

// FUNCIONES GENERALES -------------------------------------------------
function skip() {
    $("#pagContactenos").hide();
}
function innerModalInformativo(header, body, footer) {
    //HEADER
    document.getElementById('headerModalInformativo').innerHTML = null;
    document.getElementById('headerModalInformativo').innerHTML = header;

    //BODY
    document.getElementById('bodyModalInofrmativo').innerHTML = null;
    document.getElementById('bodyModalInofrmativo').innerHTML = body;

    //FOOTER
    document.getElementById('footerModalInformativo').innerHTML = null;
    document.getElementById('footerModalInformativo').innerHTML = footer;

    $("#modalInformativo").modal('show');
}

