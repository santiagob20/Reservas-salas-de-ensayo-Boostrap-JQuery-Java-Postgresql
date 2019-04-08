/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Conexion;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author User
 */
public class Conexion {

    private Connection c;
    private String usuario = "yslmmaxd";
    private String password = "pQAkoPmPJzWY_Ja9v0UsZAS1inHeaLVD";

    public Connection conectar() {
        try {
            Class.forName("org.postgresql.Driver");
            c = DriverManager.getConnection("jdbc:postgresql://isilo.db.elephantsql.com:5432/yslmmaxd", usuario, password);
        } catch (ClassNotFoundException | SQLException e) {
            System.out.println("Error BD: " + e);
        }
        return c;
    }

    public void desconectar() {
        try {
            c.close();
        } catch (SQLException e) {
            System.out.println("Error al desconectar PoostgreSQL " + e);
        }
    }
}
