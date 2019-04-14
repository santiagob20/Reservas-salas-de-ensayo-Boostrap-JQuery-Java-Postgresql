/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Interface;

import Objetos.Reserva;
import Objetos.Respuesta;

/**
 *
 * @author User
 */
public interface InterfaceReservas {

    public Respuesta create(Reserva r);

    public Respuesta read(Reserva r);

    public Respuesta update(Reserva r);

    public Respuesta delete(Reserva r);
}
