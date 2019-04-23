$(document).ready(inicio);

function inicio() {
    $(this).scrollTop(0);
    obtenerMiPosicion();

    //OPCIONES DE USUARIO ---------------------------------------------------------------------------------------------
    $("#btnIniciarSesion").click(clickInicioSesion);
    $("#cerrarSesionUsuario").click(clickCerrarSesion);
    $("#perfilUsuario").click(accesoPerfilUsuario);

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
    $("#btnBuscarRangoCalendario").click(busquedaRangoFechasCalendario);


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
var fechaCalendario = new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear();

function clickInicioSesion() {
    $("#btnIniciarSesion").hide();
    spinerLoading("Login");
    let usuario = $("#usuarioSesion").val();
    let password = getSha256($("#passwordSesion").val());
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
            $("#btnIniciarSesion").show();
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
    localStorage.removeItem('PosicionUser');
    window.location = server + "Riff/index.html";
}
function clickRegistroUsuario() {
    $("#btnRegistrarUsuario").hide();
    spinerLoading("Registro");
    let identificacion = $("#txtIdentificacion").val();
    let nombres = $("#txtNombres").val();
    let apellidos = $("#txtApellidos").val();
    let fechaNacimiento = new Date($("#fechaNacimiento").val());
    let direccionResidencia = $("#txtDireccion").val();
    let telefono = $("#txtTelefono").val();
    let correoElectronico = $("#txtCorreoElectronico").val();
    let usuario = $("#txtUsuario").val();
    let password = $("#txtPassword").val();
    // VALIDAR DATOS DE CADA CAMPO (SE DEBEN LLENAR TODOS LOS CAMPOS)
    if (identificacion !== '' && nombres !== '' &&
            apellidos !== '' && fechaNacimiento !== '' &&
            direccionResidencia !== '' && telefono !== '' &&
            correoElectronico !== '' && usuario !== '' && password !== '') {
        $.ajax({
            url: server + "Riff/app/restServices/crearUsuario",
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
                if (rta.codigo === 1) {
                    $("#registroModal").modal("hide");
                    innerModalInformativo("<b>Registro de usuario</b>",
                            "el usuario se ha registrado correctamente.<br><br>Por favor inicie sesión.",
                            "", false);
                    $("#loginModal").modal("show");
                } else {
                    innerModalInformativo("<b>Registro de Usuario</b>",
                            "<p style='color: red;'>" + rta.descripcionError + "</p>",
                            "", false);
                }
                $("#btnRegistrarUsuario").show();
            },
            error: function (error) {
                console.log(error.status);
            }
        });
    } else {
        innerModalInformativo("<b>Registro de Usuario</b>",
                "<p style='color: red;'>Por favor llenar el formulario completo.</p>",
                "", false);
    }
}
function clickContactoUsuarioApp() {
    let nombreContacto = $("#nombreContactenos").val();
    let emailContacto = $("#emailContactenos").val();
    let telefonoContacto = $("#telefonoContactenos").val();
    let cajaMensajeContacto = $("#cajaMensajeContactenos").val();
    $.ajax({
        url: server + "Riff/app/restServices/contactanosRiff",
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
            if (respuesta.codigo === 1) {
                innerModalInformativo("Mensaje enviado",
                        respuesta.descripcion + "<br><br>En breve nos contactaremos contigo.",
                        "", false);
            } else {
                innerModalInformativo("Error al enviar el mensaje",
                        respuesta.descripcionError,
                        "", false);
            }
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

    $("#cardsSalas").hide();

    $("#pagMapa").show();
}
function getSha256(ascii) {
    function rightRotate(value, amount) {
        return (value >>> amount) | (value << (32 - amount));
    }
    var mathPow = Math.pow;
    var maxWord = mathPow(2, 32);
    var lengthProperty = 'length';
    var i, j;
    var result = '';
    var words = [];
    var asciiBitLength = ascii[lengthProperty] * 8;
    var hash = getSha256.h = getSha256.h || [];
    var k = getSha256.k = getSha256.k || [];
    var primeCounter = k[lengthProperty];
    var isComposite = {};
    for (var candidate = 2; primeCounter < 64; candidate++) {
        if (!isComposite[candidate]) {
            for (i = 0; i < 313; i += candidate) {
                isComposite[i] = candidate;
            }
            hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
            k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
        }
    }
    ascii += '\x80';
    while (ascii[lengthProperty] % 64 - 56)
        ascii += '\x00';
    for (i = 0; i < ascii[lengthProperty]; i++) {
        j = ascii.charCodeAt(i);
        if (j >> 8)
            return;
        words[i >> 2] |= j << ((3 - i) % 4) * 8;
    }
    words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
    words[words[lengthProperty]] = (asciiBitLength);

    for (j = 0; j < words[lengthProperty]; ) {
        var w = words.slice(j, j += 16);
        var oldHash = hash;
        hash = hash.slice(0, 8);
        for (i = 0; i < 64; i++) {
            var i2 = i + j;
            var w15 = w[i - 15], w2 = w[i - 2];
            var a = hash[0], e = hash[4];
            var temp1 = hash[7]
                    + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25))
                    + ((e & hash[5]) ^ ((~e) & hash[6]))
                    + k[i]
                    + (w[i] = (i < 16) ? w[i] : (
                            w[i - 16]
                            + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3))
                            + w[i - 7]
                            + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))
                            ) | 0
                            );
            var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22))
                    + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));

            hash = [(temp1 + temp2) | 0].concat(hash);
            hash[4] = (hash[4] + temp1) | 0;
        }
        for (i = 0; i < 8; i++) {
            hash[i] = (hash[i] + oldHash[i]) | 0;
        }
    }
    for (i = 0; i < 8; i++) {
        for (j = 3; j + 1; j--) {
            var b = (hash[i] >> (j * 8)) & 255;
            result += ((b < 16) ? 0 : '') + b.toString(16);
        }
    }
    return result;
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
function spinerLoading(id) {
    document.getElementById("spinnerLoading" + id).innerHTML = null;
    $("#spinnerLoading" + id).append("<div class='d-flex justify-content-center'>" +
            "<div class='spinner-grow text-dark' role='status'>" +
            "<span class='sr-only'>Loading...</span>" +
            "</div>" +
            "</div>");
}

// CALENDARIO ---------------------------------------------------------------------------------------------
function calendarioReservas(id) {
    document.getElementById("calendario").innerHTML = null;
    var establecimiento = id.split("-")[0];
    let sala = id.split("-")[1];
    $.ajax({
        url: server + "Riff/app/restServices/verHorarios",
        type: 'GET',
        async: false,
        cache: false,
        contentType: 'application/json',
        success: function (rta) {
            if (rta.codigo === 1) {
                let listaDataCalendario = rta.listaHorarios;
                let arrCalendario = [];
                let fecha;
                let objCal;
                for (var i = 0; i < 7; i++) {
                    let arrDisponibilidad = [];
                    switch (establecimiento) {
                        case "cuevaCebra":
                            switch (sala) {
                                case "amatista":
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h8).cuevaCebra["1"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h9).cuevaCebra["1"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h10).cuevaCebra["1"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h11).cuevaCebra["1"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h12).cuevaCebra["1"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h13).cuevaCebra["1"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h14).cuevaCebra["1"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h15).cuevaCebra["1"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h16).cuevaCebra["1"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h17).cuevaCebra["1"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h18).cuevaCebra["1"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h19).cuevaCebra["1"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h20).cuevaCebra["1"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h21).cuevaCebra["1"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h22).cuevaCebra["1"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h23).cuevaCebra["1"]);
                                    fecha = listaDataCalendario[i].fecha;
                                    objCal = {
                                        fecha: fecha,
                                        arrHorarios: arrDisponibilidad
                                    };
                                    arrCalendario.push(objCal);
                                    break;
                                case "bohio":
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h8).cuevaCebra["2"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h9).cuevaCebra["2"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h10).cuevaCebra["2"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h11).cuevaCebra["2"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h12).cuevaCebra["2"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h13).cuevaCebra["2"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h14).cuevaCebra["2"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h15).cuevaCebra["2"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h16).cuevaCebra["2"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h17).cuevaCebra["2"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h18).cuevaCebra["2"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h19).cuevaCebra["2"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h20).cuevaCebra["2"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h21).cuevaCebra["2"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h22).cuevaCebra["2"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h23).cuevaCebra["2"]);
                                    fecha = listaDataCalendario[i].fecha;
                                    objCal = {
                                        fecha: fecha,
                                        arrHorarios: arrDisponibilidad
                                    };
                                    arrCalendario.push(objCal);
                                    break;
                                case "miles":
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h8).cuevaCebra["3"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h9).cuevaCebra["3"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h10).cuevaCebra["3"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h11).cuevaCebra["3"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h12).cuevaCebra["3"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h13).cuevaCebra["3"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h14).cuevaCebra["3"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h15).cuevaCebra["3"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h16).cuevaCebra["3"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h17).cuevaCebra["3"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h18).cuevaCebra["3"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h19).cuevaCebra["3"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h20).cuevaCebra["3"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h21).cuevaCebra["3"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h22).cuevaCebra["3"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h23).cuevaCebra["3"]);
                                    fecha = listaDataCalendario[i].fecha;
                                    objCal = {
                                        fecha: fecha,
                                        arrHorarios: arrDisponibilidad
                                    };
                                    arrCalendario.push(objCal);
                                    break;
                            }
                            break;
                    }
                }
                printCalendario(arrCalendario);
            } else {

            }
            function printCalendario(calendario) {
                console.log(calendario);
                let columnas = '<tr><th class="grilla grillaEncabezado">Hora</th>';
                //COLUMNAS
                for (let index = 0; index < 7; index++) {
                    columnas += '<th class="grilla grillaEncabezado">' + calendario[index].fecha + '</th>';
                }
                $("#calendario").append(columnas);
                //FILAS
                for (var i = 0; i <= 15; i++) {
                    let columnasData = '<tr><th class="grilla ui-widget-content">' + (i + 8) + '</th>';
                    //COLUMNAS
                    for (var j = 0; j < 7; j++) {
                        if (calendario[j].arrHorarios[i].estado === 'ocupado') {
                            columnasData += '<th id="Ya reservado, favor selecione otro horario." onclick="alert(this.id)" style="background-color: #DE0000CC;color: white;" class="grilla ui-widget-content">' +
                                    calendario[j].arrHorarios[i].estado + '</th>';
                        } else {
                            columnasData += '<th id="' + (i + 8) + "/" + calendario[j].fecha +
                                    '" onclick="reservarFechaHora(this.id)" class="grilla ui-widget-content">' +
                                    calendario[j].arrHorarios[i].estado + '</th>';
                        }
                    }
                    $("#calendario").append(columnasData);
                }
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}
function verMasFechasCalendario(id) {
    fechaCalendario = editar_fecha(fechaCalendario, "+7", "d");
    let fechaFormato = fechaCalendario.split("-")[2] + "-" + fechaCalendario.split("-")[1] + "-" + fechaCalendario.split("-")[0];
    console.log(fechaFormato);
    document.getElementById("calendario").innerHTML = null;
    var establecimiento = id.split("-")[0];
    let sala = id.split("-")[1];
    $.ajax({
        url: server + "Riff/app/restServices/verMasHorarios",
        data: JSON.stringify({
            fechaReserva: fechaFormato
        }),
        type: 'POST',
        async: false,
        cache: false,
        contentType: 'application/json',
        success: function (rta) {
            if (rta.codigo === 1) {
                let listaDataCalendario = rta.listaHorarios;
                let arrCalendario = [];
                let fecha;
                let objCal;
                for (var i = 0; i < 7; i++) {
                    let arrDisponibilidad = [];
                    switch (establecimiento) {
                        case "cuevaCebra":
                            switch (sala) {
                                case "amatista":
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h8).cuevaCebra["1"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h9).cuevaCebra["1"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h10).cuevaCebra["1"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h11).cuevaCebra["1"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h12).cuevaCebra["1"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h13).cuevaCebra["1"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h14).cuevaCebra["1"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h15).cuevaCebra["1"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h16).cuevaCebra["1"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h17).cuevaCebra["1"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h18).cuevaCebra["1"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h19).cuevaCebra["1"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h20).cuevaCebra["1"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h21).cuevaCebra["1"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h22).cuevaCebra["1"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h23).cuevaCebra["1"]);
                                    fecha = listaDataCalendario[i].fecha;
                                    objCal = {
                                        fecha: fecha,
                                        arrHorarios: arrDisponibilidad
                                    };
                                    arrCalendario.push(objCal);
                                    break;
                                case "bohio":
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h8).cuevaCebra["2"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h9).cuevaCebra["2"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h10).cuevaCebra["2"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h11).cuevaCebra["2"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h12).cuevaCebra["2"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h13).cuevaCebra["2"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h14).cuevaCebra["2"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h15).cuevaCebra["2"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h16).cuevaCebra["2"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h17).cuevaCebra["2"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h18).cuevaCebra["2"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h19).cuevaCebra["2"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h20).cuevaCebra["2"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h21).cuevaCebra["2"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h22).cuevaCebra["2"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h23).cuevaCebra["2"]);
                                    fecha = listaDataCalendario[i].fecha;
                                    objCal = {
                                        fecha: fecha,
                                        arrHorarios: arrDisponibilidad
                                    };
                                    arrCalendario.push(objCal);
                                    break;
                                case "miles":
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h8).cuevaCebra["3"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h9).cuevaCebra["3"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h10).cuevaCebra["3"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h11).cuevaCebra["3"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h12).cuevaCebra["3"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h13).cuevaCebra["3"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h14).cuevaCebra["3"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h15).cuevaCebra["3"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h16).cuevaCebra["3"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h17).cuevaCebra["3"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h18).cuevaCebra["3"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h19).cuevaCebra["3"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h20).cuevaCebra["3"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h21).cuevaCebra["3"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h22).cuevaCebra["3"]);
                                    arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h23).cuevaCebra["3"]);
                                    fecha = listaDataCalendario[i].fecha;
                                    objCal = {
                                        fecha: fecha,
                                        arrHorarios: arrDisponibilidad
                                    };
                                    arrCalendario.push(objCal);
                                    break;
                            }
                            break;
                    }
                }
                printCalendario(arrCalendario);
            } else {

            }
            function printCalendario(calendario) {
                console.log(calendario);
                let columnas = '<tr><th class="grilla grillaEncabezado">Hora</th>';
                //COLUMNAS
                for (let index = 0; index < 7; index++) {
                    columnas += '<th class="grilla grillaEncabezado">' + calendario[index].fecha + '</th>';
                }
                $("#calendario").append(columnas);
                //FILAS
                for (var i = 0; i <= 15; i++) {
                    let columnasData = '<tr><th class="grilla ui-widget-content">' + (i + 8) + '</th>';
                    //COLUMNAS
                    for (var j = 0; j < 7; j++) {
                        if (calendario[j].arrHorarios[i].estado === 'ocupado') {
                            columnasData += '<th id="Ya reservado, favor selecione otro horario." onclick="alert(this.id)" style="background-color: #DE0000CC;color: white;" class="grilla ui-widget-content">' +
                                    calendario[j].arrHorarios[i].estado + '</th>';
                        } else {
                            columnasData += '<th id="' + (i + 8) + "/" + calendario[j].fecha +
                                    '" onclick="reservarFechaHora(this.id)" class="grilla ui-widget-content">' +
                                    calendario[j].arrHorarios[i].estado + '</th>';
                        }
                    }
                    $("#calendario").append(columnasData);
                }
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}
function verMenosFechasCalendario(id) {
    fechaCalendario = editar_fecha(fechaCalendario, "-7", "d");
    let fechaFormato = fechaCalendario.split("-")[2] + "-" + fechaCalendario.split("-")[1] + "-" + fechaCalendario.split("-")[0];
    console.log(fechaFormato);
    document.getElementById("calendario").innerHTML = null;
    var establecimiento = id.split("-")[0];
    let sala = id.split("-")[1];
    $.ajax({
        url: server + "Riff/app/restServices/verMasHorarios",
        data: JSON.stringify({
            fechaReserva: fechaFormato
        }),
        type: 'POST',
        async: false,
        cache: false,
        contentType: 'application/json',
        success: function (rta) {
            if (rta.codigo === 1) {
                let listaDataCalendario = rta.listaHorarios;
                let arrCalendario = [];
                let fecha;
                let objCal;
                if (listaDataCalendario.length > 0) {
                    for (var i = 0; i < 7; i++) {
                        let arrDisponibilidad = [];
                        switch (establecimiento) {
                            case "cuevaCebra":
                                switch (sala) {
                                    case "amatista":
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h8).cuevaCebra["1"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h9).cuevaCebra["1"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h10).cuevaCebra["1"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h11).cuevaCebra["1"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h12).cuevaCebra["1"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h13).cuevaCebra["1"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h14).cuevaCebra["1"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h15).cuevaCebra["1"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h16).cuevaCebra["1"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h17).cuevaCebra["1"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h18).cuevaCebra["1"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h19).cuevaCebra["1"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h20).cuevaCebra["1"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h21).cuevaCebra["1"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h22).cuevaCebra["1"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h23).cuevaCebra["1"]);
                                        fecha = listaDataCalendario[i].fecha;
                                        objCal = {
                                            fecha: fecha,
                                            arrHorarios: arrDisponibilidad
                                        };
                                        arrCalendario.push(objCal);
                                        break;
                                    case "bohio":
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h8).cuevaCebra["2"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h9).cuevaCebra["2"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h10).cuevaCebra["2"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h11).cuevaCebra["2"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h12).cuevaCebra["2"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h13).cuevaCebra["2"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h14).cuevaCebra["2"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h15).cuevaCebra["2"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h16).cuevaCebra["2"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h17).cuevaCebra["2"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h18).cuevaCebra["2"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h19).cuevaCebra["2"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h20).cuevaCebra["2"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h21).cuevaCebra["2"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h22).cuevaCebra["2"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h23).cuevaCebra["2"]);
                                        fecha = listaDataCalendario[i].fecha;
                                        objCal = {
                                            fecha: fecha,
                                            arrHorarios: arrDisponibilidad
                                        };
                                        arrCalendario.push(objCal);
                                        break;
                                    case "miles":
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h8).cuevaCebra["3"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h9).cuevaCebra["3"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h10).cuevaCebra["3"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h11).cuevaCebra["3"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h12).cuevaCebra["3"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h13).cuevaCebra["3"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h14).cuevaCebra["3"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h15).cuevaCebra["3"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h16).cuevaCebra["3"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h17).cuevaCebra["3"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h18).cuevaCebra["3"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h19).cuevaCebra["3"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h20).cuevaCebra["3"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h21).cuevaCebra["3"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h22).cuevaCebra["3"]);
                                        arrDisponibilidad.push(JSON.parse(listaDataCalendario[i].h23).cuevaCebra["3"]);
                                        fecha = listaDataCalendario[i].fecha;
                                        objCal = {
                                            fecha: fecha,
                                            arrHorarios: arrDisponibilidad
                                        };
                                        arrCalendario.push(objCal);
                                        break;
                                }
                                break;
                        }
                    }
                    printCalendario(arrCalendario);
                } else {
                    alert("No puede hacer reservas anteriores al día de hoy.");
                }
            } else {
                //ERROR AL CONSULTAR LA DATA
            }
            function printCalendario(calendario) {
                console.log(calendario);
                let columnas = '<tr><th class="grilla grillaEncabezado">Hora</th>';
                //COLUMNAS
                for (let index = 0; index < 7; index++) {
                    columnas += '<th class="grilla grillaEncabezado">' + calendario[index].fecha + '</th>';
                }
                $("#calendario").append(columnas);
                //FILAS
                for (var i = 0; i <= 15; i++) {
                    let columnasData = '<tr><th class="grilla ui-widget-content">' + (i + 8) + '</th>';
                    //COLUMNAS
                    for (var j = 0; j < 7; j++) {
                        if (calendario[j].arrHorarios[i].estado === 'ocupado') {
                            columnasData += '<th id="Ya reservado, favor selecione otro horario." onclick="alert(this.id)" style="background-color: #DE0000CC;color: white;" class="grilla ui-widget-content">' +
                                    calendario[j].arrHorarios[i].estado + '</th>';
                        } else {
                            columnasData += '<th id="' + (i + 8) + "/" + calendario[j].fecha +
                                    '" onclick="reservarFechaHora(this.id)" class="grilla ui-widget-content">' +
                                    calendario[j].arrHorarios[i].estado + '</th>';
                        }
                    }
                    $("#calendario").append(columnasData);
                }
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}
function editar_fecha(fecha, intervalo, dma, separador) {
    var separador = separador || "-";
    var arrayFecha = fecha.split(separador);
    var dia = arrayFecha[0];
    var mes = arrayFecha[1];
    var anio = arrayFecha[2];

    var fechaInicial = new Date(anio, mes - 1, dia);
    var fechaFinal = fechaInicial;
    if (dma === "m" || dma === "M") {
        fechaFinal.setMonth(fechaInicial.getMonth() + parseInt(intervalo));
    } else if (dma === "y" || dma === "Y") {
        fechaFinal.setFullYear(fechaInicial.getFullYear() + parseInt(intervalo));
    } else if (dma === "d" || dma === "D") {
        fechaFinal.setDate(fechaInicial.getDate() + parseInt(intervalo));
    } else {
        return fecha;
    }
    dia = fechaFinal.getDate();
    mes = fechaFinal.getMonth() + 1;
    anio = fechaFinal.getFullYear();

    dia = (dia.toString().length === 1) ? "0" + dia.toString() : dia;
    mes = (mes.toString().length === 1) ? "0" + mes.toString() : mes;

    return dia + "-" + mes + "-" + anio;
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
function accesoPerfilUsuario() {

    let dataUsuario = consultaDataPerfilUsuario();
    //CLASES PARA LANZAR UN MODAL XL 
//    $('#modalInformativo').addClass('bd-example-modal-xl');
//    $('#modal-dialog').addClass('modal-xl');

    //CLASES PARA LANZAR UN MODAL LG
//    $('#modalInformativo').addClass('bd-example-modal-lg');
//    $('#modal-dialog').addClass('modal-lg');
    innerModalInformativo(
            "Perfil de usuario",
            "<div class='container'>" +
            "<div class='row'>" +
            "<div class='col-lg-6'>" +
            "<img src='imagenes/Logo/logo_riff_blanco.png' style='width: 121px;margin: 10% 0% 0% 33%;'/>" +
            "</div>" +
            "<div class='col-lg-6'>" +
            "<p style='font-size: 22px; font-weight: bolder; margin: 14% 36%;'>Usuario: </p>" +
            "<p style='font-size: 19px; margin: 14% 36%;'>" + dataUsuario.usuario + "</p>" +
            "</div>" +
            "</div>" +
            "<br>" +
            "<hr>" +
            "<div class='row'>" +
            "<div class='col-lg-6'>" +
            "<b>Nombres y apellidos: </b><p> " + dataUsuario.nombre + "</p>" +
            "<b>Fecha de nacimiento: </b><p> " + dataUsuario.fechaNacimiento + "</p>" +
            "<b>Direccion de residencia: </b><p> " + dataUsuario.direccionResidencia + "</p>" +
            "</div>" +
            "<div class='col-lg-6'>" +
            "<b>Teléfono: </b><p> " + dataUsuario.telefono + "</p>" +
            "<b>Correo Electronico: </b><p style='font-size: 14px;'> " + dataUsuario.correoElectronico + "</p>" +
            "</div>" +
            "</div>" +
            "</div>",
            "", false);

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
function consultaDataPerfilUsuario() {
    let idUsuario = JSON.parse(localStorage.getItem("dataUsuario")).id_usuario;
    let dataUsuario;
    $.ajax({
        url: server + "Riff/app/restServices/consultarUsuario",
        data: JSON.stringify({
            id_usuario: idUsuario
        }),
        type: "POST",
        async: false,
        cache: false,
        contentType: "application/json",
        success: function (respuesta) {
            if (respuesta.codigo === 1) {
                dataUsuario = respuesta.listaUsuarios[0];
            } else {
                innerModalInformativo("<p style='color:red'>Error al consultar</p>",
                        respuesta.descripcionError,
                        "", false);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
    return dataUsuario;
}

// MAPA ------------------------------------------------------------------------------------------------
function cargarMapa() {
    var x = document.getElementById("demo");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }

    function showPosition(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        //Posicion en Corferias
//        var lat = 4.630132;
//        var lon = -74.089984;
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

// FUNCIONALIDADES SITIOS  -----------------------------------------------------------------------------------------
function envioFormularioContacto(id) {
    let nombreContacto = $("#nombreContactenosSitio" + id).val();
    let emailContacto = $("#emailContactenosSitio" + id).val();
    let telefonoContacto = $("#telefonoContactenosSitio" + id).val();
    let mensajeContacto = $("#cajaMensajeContactenosSitio" + id).val();

    $.ajax({
        url: server + "Riff/app/restServices/contactanosCueva",
        data: JSON.stringify({
            nombre: nombreContacto,
            correoElectronico: emailContacto,
            mensajeContactenos: mensajeContacto
        }),
        type: 'POST',
        cache: false,
        async: false,
        contentType: 'application/json',
        success: function (respuesta) {
            if (respuesta.codigo === 1) {
                innerModalInformativo("Mensaje enviado",
                        respuesta.descripcion + "<br><br>En breve nos contactaremos contigo.",
                        "", false);
            } else {
                innerModalInformativo("Error al enviar el mensaje",
                        respuesta.descripcionError,
                        "", false);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}