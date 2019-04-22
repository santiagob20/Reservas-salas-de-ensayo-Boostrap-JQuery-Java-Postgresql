/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Objetos;

import java.util.ArrayList;

/**
 *
 * @author User
 */
public class Respuesta {
    private int codigo;
    private String descripcion;
    private String descripcionError;
    private String idSession;
    private ArrayList<Reserva> listaReservas;
    private ArrayList<Banda> listaBandas;
    private ArrayList<Usuario> listaUsuarios;
    private ArrayList<Sala> listaSalas;
    private ArrayList<Equipo> listaEquipos;
    private ArrayList<Rol> listaRoles;
    private ArrayList<Instrumento> listaIntrumentos;
    private ArrayList<Accesorio> listaAccesorios;
    private ArrayList<Calendario> listaHorarios;

    public int getCodigo() {
        return codigo;
    }

    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDescripcionError() {
        return descripcionError;
    }

    public void setDescripcionError(String descripcionError) {
        this.descripcionError = descripcionError;
    }

    public ArrayList<Reserva> getListaReservas() {
        return listaReservas;
    }

    public void setListaReservas(ArrayList<Reserva> listaReservas) {
        this.listaReservas = listaReservas;
    }

    public ArrayList<Banda> getListaBandas() {
        return listaBandas;
    }

    public void setListaBandas(ArrayList<Banda> listaBandas) {
        this.listaBandas = listaBandas;
    }

    public ArrayList<Usuario> getListaUsuarios() {
        return listaUsuarios;
    }

    public void setListaUsuarios(ArrayList<Usuario> listaUsuarios) {
        this.listaUsuarios = listaUsuarios;
    }

    public ArrayList<Sala> getListaSalas() {
        return listaSalas;
    }

    public void setListaSalas(ArrayList<Sala> listaSalas) {
        this.listaSalas = listaSalas;
    }

    public ArrayList<Equipo> getListaEquipos() {
        return listaEquipos;
    }

    public void setListaEquipos(ArrayList<Equipo> listaEquipos) {
        this.listaEquipos = listaEquipos;
    }

    public ArrayList<Rol> getListaRoles() {
        return listaRoles;
    }

    public void setListaRoles(ArrayList<Rol> listaRoles) {
        this.listaRoles = listaRoles;
    }

    public ArrayList<Instrumento> getListaIntrumentos() {
        return listaIntrumentos;
    }

    public void setListaIntrumentos(ArrayList<Instrumento> listaIntrumentos) {
        this.listaIntrumentos = listaIntrumentos;
    }

    public ArrayList<Accesorio> getListaAccesorios() {
        return listaAccesorios;
    }

    public void setListaAccesorios(ArrayList<Accesorio> listaAccesorios) {
        this.listaAccesorios = listaAccesorios;
    }

    public ArrayList<Calendario> getListaHorarios() {
        return listaHorarios;
    }

    public void setListaHorarios(ArrayList<Calendario> listaHorarios) {
        this.listaHorarios = listaHorarios;
    }

    public String getIdSession() {
        return idSession;
    }

    public void setIdSession(String idSession) {
        this.idSession = idSession;
    }
    
    
}
