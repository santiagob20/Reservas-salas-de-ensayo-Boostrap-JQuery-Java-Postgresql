/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DAO;

import Conexion.Conexion;
import Objetos.Respuesta;
import Interface.InterfaceReservas;
import Objetos.Reserva;
import com.google.gson.Gson;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author User
 */
public class OperacionesReservas implements InterfaceReservas {

    @Override
    public Respuesta create(Reserva r) {
        Respuesta rta = new Respuesta();
        Conexion c = new Conexion();
        Reserva reserva = new Reserva();
        ArrayList<Reserva> listaReservas = new ArrayList<>();
        String sql = "select app.sp_reserva_crud('"
                + "{\"operacion\":\"CREATE\","
                + "\"id_usuario\":"+r.getIdUsuario()+","
                + "\"id_precio\":"+r.getIdPrecio()+","
                + "\"id_sala\":"+r.getIdSala()+","
                + "\"fecha_reserva\":\""+r.getFechaReserva()+"\","
                + "\"\"hora_inicio\":\""+r.getHoraInicio()+"\","
                + "\"\"hora_fin\":\""+r.getHoraFin()+"\","
                + "\"pago_realizado\":0,"
                + "\"detalles\":\"N/A\"}');";
        try {
            PreparedStatement ps = c.conectar().prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            
            while(rs.next()){
                    reserva = new Gson().fromJson(rs.getString("sp_reserva_crud"), Reserva.class);
                    listaReservas.add(reserva);
            }
            rta.setCodigo(Integer.parseInt(reserva.getCodigo()));
            rta.setDescripcion(reserva.getDescripcion());
        } catch (SQLException ex) {
            rta.setCodigo(Integer.parseInt(reserva.getCodigo()));
            rta.setDescripcion("Error al crear reserva: "+ex);
        }
        return rta;
    }

    @Override
    public Respuesta read(Reserva r) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Respuesta update(Reserva r) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Respuesta delete(Reserva r) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
