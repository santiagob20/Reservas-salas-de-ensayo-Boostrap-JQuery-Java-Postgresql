/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DAO;

import Conexion.Conexion;
import Objetos.Respuesta;
import Interface.InterfaceReservas;
import Objetos.Calendario;
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
                + "\"id_usuario\":" + r.getIdUsuario() + ","
                + "\"id_precio\":" + r.getIdPrecio() + ","
                + "\"id_sala\":" + r.getIdSala() + ","
                + "\"fecha_reserva\":\"" + r.getFechaReserva() + "\","
                + "\"\"hora_inicio\":\"" + r.getHoraInicio() + "\","
                + "\"\"hora_fin\":\"" + r.getHoraFin() + "\","
                + "\"pago_realizado\":0,"
                + "\"detalles\":\"N/A\"}');";
        try {
            PreparedStatement ps = c.conectar().prepareStatement(sql);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                reserva = new Gson().fromJson(rs.getString("sp_reserva_crud"), Reserva.class);
                listaReservas.add(reserva);
            }
            rta.setCodigo(Integer.parseInt(reserva.getCodigo()));
            rta.setDescripcion(reserva.getDescripcion());
        } catch (SQLException ex) {
            rta.setCodigo(Integer.parseInt(reserva.getCodigo()));
            rta.setDescripcionError("Error al crear reserva: " + ex);
        } finally {
            c.desconectar();
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

    @Override
    public Respuesta showAvailable() {
        Respuesta rta = new Respuesta();
        ArrayList<Calendario> listaHorarios = new ArrayList<>();
        Conexion cn = new Conexion();
        String sql = "SELECT fecha\n" +
                        ",h_08::text\n" +
                        ", h_09::text\n" +
                        ", h_10::text\n" +
                        ", h_11::text\n" +
                        ", h_12::text\n" +
                        ", h_13::text\n" +
                        ", h_14::text\n" +
                        ", h_15::text\n" +
                        ", h_16::text\n" +
                        ", h_17::text\n" +
                        ", h_18::text\n" +
                        ", h_19::text\n" +
                        ", h_20::text\n" +
                        ", h_21::text\n" +
                        ", h_22::text\n" +
                        ", h_23::text\n" +
                        "FROM app.vst_calendario;";

        try {
            PreparedStatement ps = cn.conectar().prepareStatement(sql);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                Calendario horario = new Calendario();
                horario.setFecha(rs.getDate("fecha"));
                horario.set8(rs.getString("h_08"));
                horario.set9(rs.getString("h_09"));
                horario.set10(rs.getString("h_10"));
                horario.set11(rs.getString("h_11"));
                horario.set12(rs.getString("h_12"));
                horario.set13(rs.getString("h_13"));
                horario.set14(rs.getString("h_14"));
                horario.set15(rs.getString("h_15"));
                horario.set16(rs.getString("h_16"));
                horario.set17(rs.getString("h_17"));
                horario.set18(rs.getString("h_18"));
                horario.set19(rs.getString("h_19"));
                horario.set20(rs.getString("h_20"));
                horario.set21(rs.getString("h_21"));
                horario.set22(rs.getString("h_22"));
                horario.set23(rs.getString("h_23"));
                listaHorarios.add(horario);
            }
            rta.setCodigo(1);
            rta.setDescripcion("Consulta de horarios exitosa");
            rta.setListaHorarios(listaHorarios);
        } catch (SQLException ex) {
            rta.setCodigo(0);
            rta.setDescripcionError("Error al consultar horarios, "+ex);
        } finally {
            cn.desconectar();
        }

        return rta;
    }

}
