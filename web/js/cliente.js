$(document).ready(inicio);

function inicio() {
    //INICIO LOCALIDADES
//    skipInicio();

    //PRUEBA CALENDARIO
    calendarioReservas();

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

var server = 'http://localhost:8080/';
var server2 = '';

function clickInicioSesion() {
    let usuario = $("#usuarioSesion").val();
    let password = $("#passwordSesion").val();
    $.ajax({
        url: server + "Riff/app/restServices/inicioSesionUsuario",
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
        url: server + "Riff/app/restServices/registrarUsuario",
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
function skipInicio() {
    $("#footerAplicacion").hide();
    $("#mainNav").hide();
    $(".content-wrapper").hide();
}
function skip() {
    $("#inicioLocalidades").hide();
    $("#pagInicio").hide();
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
function localidadSelect(id) {
    alert(id);
}

// CALENDARIO ---------------------------------------------------------------------------------------------
function calendarioReservas() {
    let diasSemana = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'];
    let columnas = '<tr>' +
            '<th class="grilla grillaEncabezado">Hora</th>';
    for (let index = 0; index < 7; index++) {
        columnas += '<th class="grilla grillaEncabezado">' + diasSemana[index] + '</th>';
    }
    $("#calendario").append(columnas);

    for (var i = 0; i <= 23; i++) {
        let filas = '<tr>' +
                '<th id="' + i + 'Dia" class="grilla ui-widget-content">' + (i) + '</th>' +
                '<th id="' + i + 'Lun" onclick="reservarFechaHora(this.id)" class="grilla ui-widget-content"></th>' +
                '<th id="' + i + 'Mar" onclick="reservarFechaHora(this.id)" class="grilla ui-widget-content"></th>' +
                '<th id="' + i + 'Mie" onclick="reservarFechaHora(this.id)" class="grilla ui-widget-content"></th>' +
                '<th id="' + i + 'Jue" onclick="reservarFechaHora(this.id)" class="grilla ui-widget-content"></th>' +
                '<th id="' + i + 'Vie" onclick="reservarFechaHora(this.id)" class="grilla ui-widget-content"></th>' +
                '<th id="' + i + 'Sab" onclick="reservarFechaHora(this.id)" class="grilla ui-widget-content"></th>' +
                '<th id="' + i + 'Dom" onclick="reservarFechaHora(this.id)" class="grilla ui-widget-content"></th>';
        $("#calendario").append(filas);
    }
}
function reservarFechaHora(id) {
    alert(id)
}