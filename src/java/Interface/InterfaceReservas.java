/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Interface;

import Objetos.Reserva;
import Objetos.Respuesta;
import Objetos.Usuario;

/**
 *
 * @author User
 */
public interface InterfaceReservas {

    public Respuesta create(Reserva r);

    public Respuesta read(Usuario u);

    public Respuesta update(Reserva r);

    public Respuesta delete(Reserva r);
    
    public Respuesta showAvailable();
    
    public Respuesta showMoreAvailable(Reserva r);
    
    public Respuesta consultaReservasActivas(Usuario u);
}
