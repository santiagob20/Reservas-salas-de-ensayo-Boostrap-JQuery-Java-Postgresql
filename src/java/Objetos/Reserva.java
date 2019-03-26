/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Objetos;

import java.sql.Date;
import java.sql.Time;

/**
 *
 * @author User
 */
public class Reserva {
    private int idReserva;
    private Date fechaReserva;
    private Sala sala;
    private int valorReserva;
    private Time horaInicio;
    private Time horaFin;
    private Usuario usuario;
    private Instrumento instrumento;
    private int pagoRealizado;

    public int getIdReserva() {
        return idReserva;
    }

    public void setIdReserva(int idReserva) {
        this.idReserva = idReserva;
    }

    public Date getFechaReserva() {
        return fechaReserva;
    }

    public void setFechaReserva(Date fechaReserva) {
        this.fechaReserva = fechaReserva;
    }

    public Sala getSala() {
        return sala;
    }

    public void setSala(Sala sala) {
        this.sala = sala;
    }

    public int getValorReserva() {
        return valorReserva;
    }

    public void setValorReserva(int valorReserva) {
        this.valorReserva = valorReserva;
    }

    public Time getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(Time horaInicio) {
        this.horaInicio = horaInicio;
    }

    public Time getHoraFin() {
        return horaFin;
    }

    public void setHoraFin(Time horaFin) {
        this.horaFin = horaFin;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Instrumento getInstrumento() {
        return instrumento;
    }

    public void setInstrumento(Instrumento instrumento) {
        this.instrumento = instrumento;
    }

    public int getPagoRealizado() {
        return pagoRealizado;
    }

    public void setPagoRealizado(int pagoRealizado) {
        this.pagoRealizado = pagoRealizado;
    }
}
