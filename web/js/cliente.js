$(document).ready(inicio);

function inicio() {
    //INICIO LOCALIDADES
    //skipInicio();

    //PRUEBA CALENDARIO ---------------------------------------------------------------------------------------------
    //calendarioReservas();
    $("#btnBuscarRangoCalendario").click(busquedaRangoFechasCalendario);
    $("#anteriorFechaCalendario").click(function () {
        alert("anteriorFechaCalendario");
    });
    $("#siguienteFechaCalendario").click(function () {
        alert("siguienteFechaCalendario");
    });


    //OPCIONES DE USUARIO ---------------------------------------------------------------------------------------------
    $("#btnIniciarSesion").click(clickInicioSesion);
    $("#cerrarSesionUsuario").click(clickCerrarSesion);
    $("#perfilUsuario").click(function () {
        //CLASES PARA LANZAR UN MODAL XL
        $('#modalInformativo').addClass('bd-example-modal-xl');
        $('#modal-dialog').addClass('modal-xl');
        innerModalInformativo("perfilUsuario", "perfilUsuario", "perfilUsuario", true);
    });
    $("#configuracionUsuario").click(function () {
        innerModalInformativo("configuracionUsuario", "configuracionUsuario", "configuracionUsuario", false);
    });


    //REGISTRO DE USUARIO ---------------------------------------------------------------------------------------------
    $("#registroUsuario").click(function () {
        $("#loginModal").modal('hide');
        $("#registroModal").modal('show');
    });
    $("#btnRegistrarUsuario").click(clickRegistroUsuario);

    //CONTACTENOS ------------------------------------------------------------------------------------------------------
    $("#pagContactenosClick").click(function () {
        $("#pagInicio").hide();
        $("#pagContactenos").show();
    });
    $("#btnEnviarDatosContactenos").click(clickContactoUsuarioApp);

    //EVALUO DE LA SESION ACTIVA 
    if (localStorage.getItem("idSession") !== null) {
        skip();
        usuarioSesionIniciada(dataUsuario.usuario);
        $("#cuevaDeLaCebra").show();
    } else {
        skip();
    }
}

var server = 'http://localhost:9591/';
var server2 = '';
var dataUsuario = '';

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
            if (rta.codigo === 1) {
                dataUsuario = rta.listaUsuarios[0];
                //ALMACENAMOS EL ID DE SESION Y EL USUARIO EN EL LOCALSTORAGE
                localStorage.setItem("idSession", Math.floor(1e9 + (Math.random() * 9e9)));
                localStorage.setItem("usuarioLogueado", dataUsuario.usuario);
                localStorage.setItem("dataUsuario", JSON.stringify(dataUsuario));
                usuarioSesionIniciada();
            } else {
                alert(rta.descripcionError);
                window.location = server + "Riff/index.html";
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}
function clickCerrarSesion() {
    localStorage.removeItem('idSession');
    localStorage.removeItem('usuarioLogueado');
    localStorage.removeItem('dataUsuario');
    window.location = server + "Riff/index.html";
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
        url: server + "Riff/app/restServices/envioFormularioContactenos",
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
    //$("#inicioLocalidades").show();
}
function skip() {
    $("#inicioLocalidades").hide();
    $("#pagContactenos").hide();
    $("#pagCalendarioPrueba").hide();
    $("#cuevaDeLaCebra").hide();
}
function usuarioSesionIniciada() {
    $("#usuarioSesionIniciada").removeAttr("hidden");
    $("#inicioSesionUsuario").attr("hidden", true);
    document.getElementById("usuarioSesionIniciada").innerHTML = null;
    $("#usuarioSesionIniciada").append('<i class="fa fa-user"></i>  ' + localStorage.getItem("usuarioLogueado") +
            '<span class="d-lg-none">' +
            '<span class="badge badge-pill badge-primary"></span>' +
            '</span>');
}
function innerModalInformativo(header, body, footer, xlModal) {
    //HEADER
    document.getElementById('headerModalInformativo').innerHTML = null;
    document.getElementById('headerModalInformativo').innerHTML = header;

    //BODY
    document.getElementById('bodyModalInofrmativo').innerHTML = null;
    document.getElementById('bodyModalInofrmativo').innerHTML = body;

    //FOOTER
    document.getElementById('footerModalInformativo').innerHTML = null;
    document.getElementById('footerModalInformativo').innerHTML = footer;

    //REMOVEMOS LAS CLASES PARA EL MODAL XL
    if (!xlModal) {
        $('#modalInformativo').removeClass('bd-example-modal-xl');
        $('#modal-dialog').removeClass('modal-xl');
    }

    $("#modalInformativo").modal('show');
}
function localidadSelect(id) {
    alert(id);
}

// CALENDARIO ---------------------------------------------------------------------------------------------
function calendarioReservas() {
    let establecimiento = '';
    let sala = '';
    let fechaInicial = '';
    let fechaFinal = '';
    $.ajax({
        url: server + "Riff/app/restServices/calendarioReserva",
        data: JSON.stringify({

        }),
        type: 'POST',
        async: false,
        cache: false,
        contentType: 'application/json',
        success: function (respuesta) {
            console.log(respuesta);
        },
        error: function (error) {
            console.log(error);
        }
    });


    let diasSemana = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'];
    let columnas = '<tr>' +
            '<th class="grilla grillaEncabezado">Hora</th>';
    for (let index = 0; index < 7; index++) {
        columnas += '<th class="grilla grillaEncabezado">' + diasSemana[index] + '</th>';
    }
    $("#calendario").append(columnas);

    for (var i = 8; i <= 23; i++) {
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
    alert(id);
}
function busquedaRangoFechasCalendario() {
    alert($("#txtfechaInicialCalendario").val());
    alert($("#txtfechaFinalCalendario").val());
}