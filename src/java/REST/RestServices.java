package REST;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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
        System.out.println(u.getUsuario());
        System.out.println(u.getClave());
        return new Respuesta();
    }
    
    @POST
    @Path("registrarUsuario")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Respuesta registrarUsuario(Usuario u) {
        System.out.println(u.getNombre());
        return new Respuesta();
    }
}
