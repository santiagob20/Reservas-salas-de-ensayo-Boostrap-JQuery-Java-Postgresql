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
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.UUID;

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
                + "\"identificacion\":\"" + u.getIdentificacion() + "\","
                + "\"nombre\":\"" + u.getNombre() + "\","
                + "\"apellido\":\"" + u.getApellido() + "\","
                + "\"fecha_nacimiento\":\"" + u.getFechaNacimiento() + "\","
                + "\"direccion\":\"" + u.getDireccionResidencia() + "\","
                + "\"telefono\":\"" + u.getTelefono() + "\","
                + "\"email\":\"" + u.getCorreoElectronico() + "\","
                + "\"usuario\":\"" + u.getUsuario() + "\","
                + "\"clave\":\"" + convertirSHA256(u.getClave()) + "\"}');";
        try {
            PreparedStatement ps = cn.conectar().prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                usuario = new Gson().fromJson(rs.getString("sp_usuario_crud"), Usuario.class);
                listaUsuarios.add(usuario);
            }
            rta.setListaUsuarios(listaUsuarios);
            rta.setCodigo(Integer.parseInt(usuario.getCodigo()));
            rta.setDescripcion(usuario.getDescripcion());
        } catch (SQLException ex) {
            rta.setCodigo(Integer.parseInt(usuario.getCodigo()));
            rta.setDescripcionError("Error al crear usuario: " + ex);
        } finally {
            cn.desconectar();
        }
        
        return rta;
    }
    
    @Override
    public Respuesta read(Usuario u) {
        Respuesta rta = new Respuesta();
        Usuario usuario = new Usuario();
        Conexion cn = new Conexion();
        ArrayList<Usuario> listaUsuarios = new ArrayList<>();
        String sql = "select id_usuario\n"
                + ",id_rol\n"
                + ",identificacion\n"
                + ",(nombre||' '||apellido) as nombre\n"
                + ",fecha_nacimiento::text\n"
                + ",direccion_residencia\n"
                + ",correo_electronico\n"
                + ",usuario\n"
                + ",telefono\n"
                + "from app.tbl_usuario "
                + "where id_usuario = ?";
        try {
            PreparedStatement ps = cn.conectar().prepareStatement(sql);
            ps.setInt(1, u.getId_usuario());
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                usuario.setId_usuario(rs.getInt("id_usuario"));
                usuario.setRol(String.valueOf(rs.getInt("id_rol")));
                usuario.setIdentificacion(rs.getString("identificacion"));
                usuario.setNombre(rs.getString("nombre"));
                usuario.setFechaNacimiento(Date.valueOf(rs.getString("fecha_nacimiento")));
                usuario.setDireccionResidencia(rs.getString("direccion_residencia"));
                usuario.setCorreoElectronico(rs.getString("correo_electronico"));
                usuario.setUsuario(rs.getString("usuario"));
                usuario.setTelefono(rs.getString("telefono"));
                listaUsuarios.add(usuario);
            }
            rta.setCodigo(1);
            rta.setDescripcion(usuario.getDescripcion());
            rta.setListaUsuarios(listaUsuarios);
        } catch (SQLException ex) {
            rta.setCodigo(0);
            rta.setDescripcionError("Error al consultar usuario " + ex);
        } finally {
            cn.desconectar();
        }
        return rta;
    }
    
    @Override
    public Respuesta autenticate(Usuario u) {
        Respuesta rta = new Respuesta();
        Usuario usuario = new Usuario();
        Conexion cn = new Conexion();
        ArrayList<Usuario> listaUsuarios = new ArrayList<>();
        String sql = "select app.sp_usuario_crud('{\"operacion\":\"AUTENTICATE\",\"usuario\":\"" + u.getUsuario() + "\",\"clave\":\"" + u.getClave() + "\"}');";
        try {
            PreparedStatement ps = cn.conectar().prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                usuario = new Gson().fromJson(rs.getString("sp_usuario_crud"), Usuario.class);
                listaUsuarios.add(usuario);
            }
            rta.setCodigo(Integer.parseInt(usuario.getCodigo()));
            rta.setDescripcion(usuario.getDescripcion());
            rta.setListaUsuarios(listaUsuarios);
            rta.setIdSession(UUID.randomUUID().toString().replace("-", ""));
            
        } catch (SQLException ex) {
            rta.setCodigo(0);
            rta.setDescripcionError("Er|ror al autenticar " + ex);
        } finally {
            cn.desconectar();
        }
        return rta;
    }
    
    @Override
    public Respuesta update(Usuario u) {
        Respuesta rta = new Respuesta();
        Usuario usuario = new Usuario();
        Conexion cn = new Conexion();
        ArrayList<Usuario> listaUsuarios = new ArrayList<>();
        String sql = "select app.sp_usuario_crud('{\"operacion\":\"UPDATE\","
                + "\"usuario\":\"" + u.getUsuario() + "\","
                + "\"identificacion\":\"" + u.getIdentificacion() + "\","
                + "\"nombre\":\"" + u.getNombre() + "\","
                + "\"apellido\":\"" + u.getApellido() + "\","
                + "\"fecha_nacimiento\":\"" + u.getFechaNacimiento() + "\","
                + "\"direccion\":\"" + u.getDireccionResidencia() + "\","
                + "\"telefono\":\"" + u.getTelefono() + "\","
                + "\"email\":\"" + u.getCorreoElectronico() + "\"}');";
        try {
            PreparedStatement ps = cn.conectar().prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                usuario = new Gson().fromJson(rs.getString("sp_usuario_crud"), Usuario.class);
                listaUsuarios.add(usuario);
            }
            rta.setCodigo(Integer.parseInt(usuario.getCodigo()));
            rta.setDescripcion(usuario.getDescripcion());
            rta.setListaUsuarios(listaUsuarios);
        } catch (SQLException ex) {
            rta.setCodigo(Integer.parseInt(usuario.getCodigo()));
            rta.setDescripcionError("Error al autenticar " + ex);
        } finally {
            cn.desconectar();
        }
        return rta;
    }
    
    @Override
    public Respuesta delete(Usuario u) {
        return null;
    }
    
    public String convertirSHA256(String password) {
        MessageDigest md = null;
        try {
            md = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {            
            e.printStackTrace();
            return null;
        }
        
        byte[] hash = md.digest(password.getBytes());
        StringBuffer sb = new StringBuffer();
        
        for (byte b : hash) {            
            sb.append(String.format("%02x", b));
        }
        
        return sb.toString();
    }
}
