/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DAO;

import Interface.InterfaceContacto;
import Objetos.Respuesta;
import Objetos.Usuario;
import java.io.UnsupportedEncodingException;
import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

/**
 *
 * @author developer
 */
public class OperacionesContacto implements InterfaceContacto {

    @Override
    public Respuesta contactoLaCueva(Usuario u) {
        Respuesta rta = new Respuesta();
        String correoRiff = "reservasriff@gmail.com";

        try {
            String host = "smtp-mail.outlook.com";
            String from = "snt.barrera@outlook.com";
            String pass = "Sb2019/*-";
            Properties props = new Properties();
            props.put("mail.smtp.host", host);
            props.put("mail.smtp.user", from);
            props.put("mail.smtp.password", pass);
            props.put("mail.smtp.port", "587");
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true");

            Session session = Session.getDefaultInstance(props, new javax.mail.Authenticator() {
                @Override
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(from, pass);
                }
            });
            Message msg = new MimeMessage(session);
            msg.setFrom(new InternetAddress(from, "La Cueva de la Cebra"));
            msg.addRecipient(Message.RecipientType.TO,
                    new InternetAddress(u.getCorreoElectronico(), "Sr"));
            msg.setSubject("Nos has contactado");
            msg.setText("Hola " + u.getNombre() + ", Hemos recibido tu mensaje y nos contactaremos muy pronto para solucionar tu inquietud,"
                    + " Un saludo de parte de La Cueva");
            Transport transport = session.getTransport("smtp");
            transport.connect(host, from, pass);//CAUSES EXCEPTION
            Transport.send(msg);
            rta.setCodigo(1);
            rta.setDescripcion("Mensaje enviado correctamente");
        } catch (UnsupportedEncodingException ex) {
            rta.setCodigo(0);
            rta.setDescripcionError("error al enviar mensaje " + ex);

        } catch (MessagingException ex) {
            rta.setCodigo(0);
            rta.setDescripcionError("Error al enviar mensaje " + ex);
        }

        //ENVVIAR CORREO A RIFF CON EL MENSAJE
        try {
            String host = "smtp-mail.outlook.com";
            String from = "snt.barrera@outlook.com";
            String pass = "Sb2019/*-";
            Properties props = new Properties();
            props.put("mail.smtp.host", host);
            props.put("mail.smtp.user", from);
            props.put("mail.smtp.password", pass);
            props.put("mail.smtp.port", "587");
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true");

            Session session = Session.getInstance(props, new javax.mail.Authenticator() {
                @Override
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(from, pass);
                }
            });
            Message msg = new MimeMessage(session);
            msg.setFrom(new InternetAddress(from, "Reservas Riff"));
            msg.addRecipient(Message.RecipientType.TO,
                    new InternetAddress(correoRiff, "Sr"));
            msg.setSubject("Te han enviado un mensaje desde la web");
            msg.setText(u.getMensajeContactenos());
            Transport transport = session.getTransport("smtp");
            transport.connect(host, from, pass);//CAUSES EXCEPTION
            Transport.send(msg);
            rta.setCodigo(1);
            rta.setDescripcion("Mensaje enviado correctamente");
        } catch (UnsupportedEncodingException ex) {
            rta.setCodigo(0);
            rta.setDescripcionError("error al enviar mensaje, " + ex);

        } catch (MessagingException ex) {
            rta.setCodigo(0);
            rta.setDescripcionError("Error al enviar mensaje, " + ex);
        }
        return rta;
    }

    @Override
    public Respuesta contactoRiff(Usuario u) {
        Respuesta rta = new Respuesta();
        String correoRiff = "reservasriff@gmail.com";

        try {
            String host = "smtp-mail.outlook.com";
            String from = "snt.barrera@outlook.com";
            String pass = "Sb2019/*-";
            Properties props = new Properties();
            props.put("mail.smtp.host", host);
            props.put("mail.smtp.user", from);
            props.put("mail.smtp.password", pass);
            props.put("mail.smtp.port", "587");
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true");

            Session session = Session.getInstance(props, new javax.mail.Authenticator() {
                @Override
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(from, pass);
                }
            });
            Message msg = new MimeMessage(session);
            msg.setFrom(new InternetAddress(from, "Reservas Riff"));
            msg.addRecipient(Message.RecipientType.TO,
                    new InternetAddress(u.getCorreoElectronico(), "Sr"));
            msg.setSubject("Nos has contactado");
            msg.setText("Hola " + u.getNombre() + ", Hemos recibido tu mensaje y nos contactaremos muy pronto para solucionar tu inquietud,"
                    + " Un saludo de parte de Riff");
            Transport transport = session.getTransport("smtp");
            transport.connect(host, from, pass);//CAUSES EXCEPTION
            Transport.send(msg);
            rta.setCodigo(1);
            rta.setDescripcion("Mensaje enviado correctamente");
        } catch (UnsupportedEncodingException ex) {
            rta.setCodigo(0);
            rta.setDescripcionError("error al enviar mensaje, " + ex);
        } catch (MessagingException ex) {
            rta.setCodigo(0);
            rta.setDescripcionError("Error al enviar mensaje, " + ex);
        }

        //ENVVIAR CORREO A RIFF CON EL MENSAJE
        try {
            String host = "smtp-mail.outlook.com";
            String from = "snt.barrera@outlook.com";
            String pass = "Sb2019/*-";
            Properties props = new Properties();
            props.put("mail.smtp.host", host);
            props.put("mail.smtp.user", from);
            props.put("mail.smtp.password", pass);
            props.put("mail.smtp.port", "587");
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true");

            Session session = Session.getInstance(props, new javax.mail.Authenticator() {
                @Override
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(from, pass);
                }
            });
            Message msg = new MimeMessage(session);
            msg.setFrom(new InternetAddress(from, "Reservas Riff"));
            msg.addRecipient(Message.RecipientType.TO,
                    new InternetAddress(correoRiff, "Sr"));
            msg.setSubject("Te han enviado un mensaje desde la web");
            msg.setText(u.getMensajeContactenos());
            Transport transport = session.getTransport("smtp");
            transport.connect(host, from, pass);//CAUSES EXCEPTION
            Transport.send(msg);
            rta.setCodigo(1);
            rta.setDescripcion("Mensaje enviado correctamente");
        } catch (UnsupportedEncodingException ex) {
            rta.setCodigo(0);
            rta.setDescripcionError("error al enviar mensaje, " + ex);

        } catch (MessagingException ex) {
            rta.setCodigo(0);
            rta.setDescripcionError("Error al enviar mensaje, " + ex);
        }
        return rta;
    }
}
