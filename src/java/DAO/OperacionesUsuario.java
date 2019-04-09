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
                + "\"identificacion\":\"?\","
                + "\"nombre\":\"?\","
                + "\"apellido\":\"?\","
                + "\"fecha_nacimiento\":\"?\","
                + "\"direccion\":\"?\","
                + "\"telefono\":\"?\","
                + "\"email\":\"?\","
                + "\"usuario\":\"?\","
                + "\"clave\":\"?\"}');";
        
        
        try {
            PreparedStatement ps = cn.conectar().prepareStatement(sql);
            ps.setString(1, u.getIdentificacion());
            ps.setString(2, u.getNombre());
            ps.setString(3, u.getApellido());
            ps.setString(4, String.valueOf(u.getFechaNacimiento()));
            ps.setString(5, u.getDireccionResidencia());
            ps.setString(6, u.getTelefono());
            ps.setString(7, u.getCorreoElectronico());
            ps.setString(8, u.getUsuario());
            ps.setString(9, u.getClave());
            
            ResultSet rs = ps.executeQuery();
            
            while(rs.next()){
                usuario = new Gson().fromJson(rs.getString("sp_usuario_crud"), Usuario.class);
                listaUsuarios.add(usuario);
            }
            rta.setListaUsuarios(listaUsuarios);
            rta.setCodigo(1);
            rta.setDescripcion("Usuario creado correctamente");
            
        } catch (SQLException ex) {
            rta.setCodigo(0);
            rta.setDescripcion("Error al crear usuario: "+ex);
        }
        
        return rta;
    }

    @Override
    public Respuesta read(Usuario u) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
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
