/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Interface;

import Objetos.Respuesta;

/**
 *
 * @author User
 */
public interface InterfaceReservas {

    public Respuesta create();

    public Respuesta read();

    public Respuesta update();

    public Respuesta delete();
}
