package REST;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import DAO.OperacionesContacto;
import DAO.OperacionesLog;
import DAO.OperacionesReservas;
import DAO.OperacionesUsuario;
import Objetos.Reserva;
import Objetos.Respuesta;
import Objetos.Usuario;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author User
 */
@Path("restServices")
public class RestServices {

    @POST
    @Path("inicioSesionUsuario")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Respuesta inicioSesionUsuario(Usuario u) {
        return new OperacionesUsuario().autenticate(u);
    }

    @POST
    @Path("envioFormularioContactenos")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Respuesta envioFormularioContactenos(Usuario u) {
        System.out.println(u.getNombre());
        System.out.println(u.getCorreoElectronico());
        System.out.println(u.getMensajeContactenos());
        return new Respuesta();
    }

    @POST
    @Path("crearUsuario")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Respuesta crearUsuario(Usuario u) {
        return new OperacionesUsuario().create(u);
    }

    @POST
    @Path("editarUsuario")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Respuesta editarUsuario(Usuario u) {
        return new OperacionesUsuario().update(u);
    }

    @POST
    @Path("consultarUsuario")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Respuesta consultarUsuario(Usuario u) {
        return new OperacionesUsuario().read(u);
    }

    @POST
    @Path("crearReserva")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Respuesta crearReserva(Reserva r) {
        return new OperacionesReservas().create(r);
    }

    //FUNCIONES RESERVA
    @GET
    @Path("verHorarios")
    @Produces({MediaType.APPLICATION_JSON})
    public Respuesta verHorarios() {
        return new OperacionesReservas().showAvailable();
    }

    @POST
    @Path("verMasHorarios")
    @Produces({MediaType.APPLICATION_JSON})
    public Respuesta verMasHorarios(Reserva r) {
        return new OperacionesReservas().showMoreAvailable(r);
    }

    @POST
    @Path("contactanosRiff")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Respuesta contactanosRiff(Usuario u) {
        return new OperacionesContacto().contactoRiff(u);
    }

    @POST
    @Path("contactanosCueva")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Respuesta contactanosCueva(Usuario u) {
        return new OperacionesContacto().contactoLaCueva(u);
    }

    @POST
    @Path("consultarHistoricoReservas")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Respuesta consultarHistoricoReservas(Usuario u) {
        return new OperacionesReservas().read(u);
    }

    @POST
    @Path("consultarReservasActivas")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Respuesta consultarReservasActivas(Usuario u) {
        return new OperacionesReservas().consultaReservasActivas(u);
    }

    @POST
    @Path("insertarLog")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Respuesta insertarLog(Usuario u) {
        return new OperacionesLog().create(u);
    }

    @POST
    @Path("validarSesion")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Respuesta validarSesion(Usuario u) {
        return new OperacionesLog().validarSesion(u);
    }
}
