$(document).ready(inicio);

function inicio() {
    $(this).scrollTop(0);
    obtenerMiPosicion();

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

    // MAPA ----------------------------------------------------------------------------------------------------------
    $("#mapaRiff").click(accesoMapaRiff);

    // LISTADO SALAS DE ENSAYO ----------------------------------------------------------------------------------------------------------
    $("#listadoSalasEnsayo").click(accesolistadoSalasEnsayo);

    //PRUEBA CALENDARIO ---------------------------------------------------------------------------------------------
    //calendarioReservas();
    $("#btnBuscarRangoCalendario").click(busquedaRangoFechasCalendario);
    $("#anteriorFechaCalendario").click(function () {
        alert("anteriorFechaCalendario");
    });
    $("#siguienteFechaCalendario").click(function () {
        alert("siguienteFechaCalendario");
    });

    //CONTACTENOS ------------------------------------------------------------------------------------------------------
    $("#pagContactenosAcceso").click(accesoContactenos);
    $("#btnEnviarDatosContactenos").click(clickContactoUsuarioApp);

    //EVALUO DE LA SESION ACTIVA 
    if (localStorage.getItem("idSession") !== null) {
        skip();
        accesoMapaRiff();
        usuarioSesionIniciada(dataUsuario.usuario);
    } else {
        skipInicio();
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
    $("#img-div-inicio").hide();
    $("#bienvenido-div-inicio").hide();
    $("#img-div-inicio").fadeIn(3000);
    $("#bienvenido-div-inicio").fadeIn(3000);
    $("#container-text-inicio").hide();
    $("#container-text-inicio").delay(1000).slideDown("slow");

    $("#footerAplicacion").hide();
    $("#mainNav").hide();
    $("#cuerpoPaginaRiff").hide();

    $("#inicioRiff").show();
}
function skip() {
    $("#footerAplicacion").show();
    $("#mainNav").show();
    $("#cuerpoPaginaRiff").show();

    $("#inicioRiff").hide();
    $("#pagInicio").hide();
    $("#cardsSitios").hide();
    $("#pagContactenos").hide();
    //SITIOS
    $("#pagSitios").hide();
    $("#cuevaDeLaCebra").hide();

    $("#pagCalendarioPrueba").hide();
    $("#cardsSalas").hide();

    $("#pagMapa").show();
}
function usuarioSesionIniciada() {
    $("#usuarioSesionIniciada").removeAttr("hidden");
    $("#inicioSesionUsuario").attr("hidden", true);
    document.getElementById("usuarioSesionIniciada").innerHTML = null;
    $("#usuarioSesionIniciada").append('<i class="fa fa-user"></i>  ' + localStorage.getItem("usuarioLogueado") +
            '<span class="d-lg-none">' +
            '<span class="badge badge-pill badge-primary"></span>' +
            '</span>');
    $("#loginModal").modal('hide');
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

// ACCESO ---------------------------------------------------------------------------------------------
function accesoInicio() {
    cargarMapa();
    skip();
    $("#pagMapa").show();
}
function accesoMapaRiff() {
    accesoInicio();
}
function accesoSitios(id, ubicacion) {
    skip();
    //Limpia el breadcrumb
    document.getElementById("breadcrumbSitios").innerHTML = null;
    //Agrega un breadcrumb personalizado
    switch (ubicacion) {
        case "mapa":
            $("#breadcrumbSitios").append(" <li class='breadcrumb-item'>" +
                    "<a href='#' onclick='accesoInicio()'>Inicio</a>" +
                    "</li>" +
                    "<li class='breadcrumb-item' ><a class='breadcrumbSegundoNivel' onclick='accesoMapaRiff()'>Mapa</a></li>" +
                    "<li class='breadcrumb-item active'>La Cueva de la cebra</li>");
            break;
        case "cardListado":
            $("#breadcrumbSitios").append(" <li class='breadcrumb-item'>" +
                    "<a href='index.html'>Inicio</a>" +
                    "</li>" +
                    "<li class='breadcrumb-item' ><a class='breadcrumbSegundoNivel' onclick='accesolistadoSalasEnsayo()'>Listado Sitios</a></li>" +
                    "<li class='breadcrumb-item active'>La Cueva de la cebra</li>");
            break;
    }
    $("#pagMapa").hide();
    $("#" + id).show();
    $("#pagSitios").show();
}
function accesoSalas(id, ubicacion) {
    $(this).scrollTop(0);
    skip();
    //Limpia el breadcrumb
    document.getElementById("breadcrumbSalas").innerHTML = null;
    //Agrega un breadcrumb personalizado
    $("#breadcrumbSalas").append(" <li class='breadcrumb-item'>" +
            "<a href='#' onClick='accesoInicio();'>Inicio</a>" +
            "</li>" +
            "<li class='breadcrumb-item' ><a class='breadcrumbSegundoNivel' onclick='accesoSitios('cuevaDeLaCebra', 'mapa')'>La Cueva de la cebra</a></li>" +
            "<li class='breadcrumb-item active'>Salas de ensayo</li>");
    $("#pagMapa").hide();
    $("#cardsSalas").show();
    $("#" + id).show();
}
function accesolistadoSalasEnsayo() {
    skip();
    calcularDistancias();
    $("#pagMapa").hide();
    $("#cardsSitios").show();
}
function accesoContactenos() {
    skip();
    $("#pagMapa").hide();
    $("#pagContactenos").show();
}

// MAPA ------------------------------------------------------------------------------------------------
function cargarMapa() {
    var x = document.getElementById("demo");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }

    function showPosition(position) {
//        var lat = position.coords.latitude;
//        var lon = position.coords.longitude;
        //Posicion en Corferias
        var lat = 4.630132;
        var lon = -74.089984;
        latlon = new google.maps.LatLng(lat, lon);
        mapholder = document.getElementById('mapholder');
        mapholder.style.height = 'auto';
        mapholder.style.width = '100%';
        var myOptions = {
            center: latlon, zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL}
        };
        var map = new google.maps.Map(document.getElementById("mapholder"), myOptions);
        var marker = new google.maps.Marker({
            position: latlon,
            map: map,
            title: "Usted esta aqui"
        });
//        var popup = new google.maps.InfoWindow({content: 'Posicion Actual'});
//        popup.open(map, marker);
        marker.addListener('click', function canchacall() {

        });

        //MARCADO PARA CADA SALA
        var place = new google.maps.LatLng(4.632132, -74.099984);
        var marker1 = new google.maps.Marker({
            position: place
//            , title: 'La cueva de la Cebra'
            , map: map
            , icon: src = "imagenes/Logo/marker_reserv50_50.png"
        });
        var popup = new google.maps.InfoWindow({content: 'La Cueva de la Cebra'});
        popup.open(map, marker1);
        marker1.addListener('click', function () {
            accesoSitios("cuevaDeLaCebra", "mapa");
        });
    }

    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                x.innerHTML = "Denegada la peticion de Geolocalización en el navegador."
                break;
            case error.POSITION_UNAVAILABLE:
                x.innerHTML = "La información de la localización no esta disponible."
                break;
            case error.TIMEOUT:
                x.innerHTML = "El tiempo de petición ha expirado."
                break;
            case error.UNKNOWN_ERROR:
                x.innerHTML = "Ha ocurrido un error desconocido."
                break;
        }
    }
}
function obtenerMiPosicion() {
    let vecPosicion = {
        latitud: 0,
        longitud: 0
    };
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            vecPosicion.latitud = position.coords.latitude;
            vecPosicion.longitud = position.coords.longitude;
            localStorage.setItem("PosicionUser", JSON.stringify(vecPosicion));
        });
    }

}
function distanciaKMCoordenadasTierra(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;
    var dLat = degreesToRadians(lat2 - lat1);
    var dLon = degreesToRadians(lon2 - lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    function degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    }
    return earthRadiusKm * c;
}

// CARD SITIOS -----------------------------------------------------------------------------------------
function calcularDistancias() {
    let posicionCueva = [4.632132, -74.099984];
    let posicionPakarny = [4.624101, -74.074366];
    let posicionElToke = [4.689083, -74.061597];

    //UBICACION CORFERIAS
    let lat = 4.630132;
    let lon = -74.089984;
//    let lat = JSON.parse(localStorage.getItem("PosicionUser")).latitud;
//    let lon = JSON.parse(localStorage.getItem("PosicionUser")).longitud;
// DISTANCIA AL A CUEVA
    document.getElementById("distanciaUsuarioCueva").innerHTML = "A <b>" +
            distanciaKMCoordenadasTierra(lat, lon, posicionCueva[0], posicionCueva[1]).toFixed(2) +
            " KM</b>, de su posición aproximadamente.";
    //DISTANCIA A PAKARNY
    document.getElementById("distanciaUsuarioPakarny").innerHTML = "A <b>" +
            distanciaKMCoordenadasTierra(lat, lon, posicionPakarny[0], posicionPakarny[1]).toFixed(2) +
            " KM</b>, de su posición aproximadamente.";
    //DISTANCIA AL TOKE
    document.getElementById("distanciaUsuarioElToke").innerHTML = "A <b>" +
            distanciaKMCoordenadasTierra(lat, lon, posicionElToke[0], posicionElToke[1]).toFixed(2) +
            " KM</b>, de su posición aproximadamente.";
}