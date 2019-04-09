/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DAO;

import Conexion.Conexion;
import Interface.InterfaceUsuario;
import Objetos.Respuesta;
import Objetos.Usuario;
import com.google.gson.Gson;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Santiagob20
 */
public class OperacionesUsuario implements InterfaceUsuario {

    @Override
    public Respuesta create(Usuario u) {
        Respuesta rta = new Respuesta();
        Conexion cn = new Conexion();
        Usuario usuario = new Usuario();
        ArrayList<Usuario> listaUsuarios = new ArrayList<>();

        String sql = "select app.sp_usuario_crud('{"
                + "\"operacion\":\"CREATE\","
                + "\"id_rol\":1,"
                + "\"identificacion\":\""+u.getIdentificacion()+"\","
                + "\"nombre\":\""+u.getNombre()+"\","
                + "\"apellido\":\""+u.getApellido()+"\","
                + "\"fecha_nacimiento\":\""+u.getFechaNacimiento()+"\","
                + "\"direccion\":\""+u.getDireccionResidencia()+"\","
                + "\"telefono\":\""+u.getTelefono()+"\","
                + "\"email\":\""+u.getCorreoElectronico()+"\","
                + "\"usuario\":\""+u.getUsuario()+"\","
                + "\"clave\":\""+u.getClave()+"\"}');";

        try {
            PreparedStatement ps = cn.conectar().prepareStatement(sql);

            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                usuario = new Gson().fromJson(rs.getString("sp_usuario_crud"), Usuario.class);
                listaUsuarios.add(usuario);
            }
            rta.setListaUsuarios(listaUsuarios);
            rta.setCodigo(1);
            rta.setDescripcion("Usuario creado correctamente");

        } catch (SQLException ex) {
            rta.setCodigo(0);
            rta.setDescripcion("Error al crear usuario: " + ex);
        }

        return rta;
    }

    @Override
    public Respuesta read(Usuario u) {
        Respuesta rta = new Respuesta();
        Usuario usuario = new Usuario();
        Conexion cn = new Conexion();
        ArrayList<Usuario> listaUsuarios = new ArrayList<>();
        String sql = "select app.sp_usuario_crud('{\"operacion\":\"AUTENTICATE\",\"usuario\":\""+u.getUsuario()+"\",\"clave\":\""+u.getClave()+"\"}');";
        
        try {
            PreparedStatement ps = cn.conectar().prepareStatement(sql);

            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                usuario = new Gson().fromJson(rs.getString("sp_usuario_crud"), Usuario.class);
                listaUsuarios.add(usuario);
            }
            rta.setCodigo(1);
            rta.setDescripcion("Respuesta de autenticacion correcta");
            rta.setListaUsuarios(listaUsuarios);

        } catch (SQLException ex) {
            rta.setCodigo(0);
            rta.setDescripcion("Error al autenticar " + ex);
        }

        return rta;
    }

    @Override
    public Respuesta update(Usuario u) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Respuesta delete(Usuario u) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
