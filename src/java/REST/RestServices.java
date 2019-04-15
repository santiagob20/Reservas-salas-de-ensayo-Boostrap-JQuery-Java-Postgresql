package REST;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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
        return new OperacionesUsuario().read(u);
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
    @Path("crearReserva")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Respuesta crearReserva(Reserva r) {
        return new OperacionesReservas().create(r);
    }

}
