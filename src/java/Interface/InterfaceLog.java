/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Interface;

import Objetos.Respuesta;
import Objetos.Usuario;

/**
 *
 * @author developer
 */
public interface InterfaceLog {
    public Respuesta create(Usuario u);
    public Respuesta read(Usuario u);
    public Respuesta update(Usuario u);
    public Respuesta delete (Usuario u);
    public Respuesta validarSesion (Usuario u);
    
    
}
