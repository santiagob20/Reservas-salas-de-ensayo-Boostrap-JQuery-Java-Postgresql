# Reservas salas de ensayo 
Boostrap-JQuery-Java-Postgresql
Proyecto desarrollado por estudiantes de Ingenieria de sistemas de la Universidad Central Bogotá, Colombia

-----BIENVENIDO AL MANUAL DE INSTALACION DE RESERVAS RIFF-----

Nos alegra que a partir de ahora uses el aplicativo de Reservas Riff para la administracion de reservas de salas de ensayo de forma mas practica y confiable.

Para el correcto funcionamiento de este software, se debe cumplir con unos requisitos minimos:

--REQUISITOS MINIMOS--
> Sistema operativo Windows 8 o Superior/// Linux (version del 2018 o superior)/// Mac OS X Sierra o superior.
> Wildfly 16.0.0 o superior
> PostgreSQL 10 o superior
> JRE 8
> JDK 8


--INSTALACION--

Al ser un software web, no se instala en si, sino que se despliega en el servidor de aplicaciones Wildfly. Primero se debe proceder a configurar el Wildfly segun el manual wildfly 16.0.0 Riff.pdf adjunto en la misma ruta que este LEEME.txt

Luego de realizar la configuracion inicial del wildfly y tenerlo en funcionamiento, se procede a copiar el Riff.war y ponerlo en la carpeta de Deployements del Wildfly.

Respecto al motor de base de datos, Riff brinda una base de datos publica de prueba para testear el aplicativo, en caso de requerir una base de datos privada para produccion debe usar el backup adjunto para restaurar la estructura inicial de la base de datos.

-------DATOS DE ACCESO PARA BASE DE DATOS DE PRUEBA-----
Ruta del servidor: isilo.db.elephantsql.com
nombre de la base de datos: ******
nombre de usuario: ******
clave: **************
--------------------------------------------------------

Para la configuracion de la base de datos se recomienda usar la version mas reciente de PostgreSQL descargada de https://www.postgresql.org/download/ , en esta ocasion se ha dejado la version mas reciente para windowsx64 en la misma ruta de este LEEME.txt para su comodidad. La instalacion del postgreSQL es muy sencilla y solo requiere de unos pocos pasos para tenerla en funcionamiento.Para mayor informacion del proceso de instalacion visita https://www.locurainformaticadigital.com/2018/09/08/descargar-e-instalar-postgresql-en-windows/ .

Luego de tener el motor de base de datos en funcionamiento se debe tomar el archivo reservas.sql adjunto en esta misma ruta y se debe hacer un "Restore" desde el PgAdmin para restaurar la estructura de la base de datos que requiere Riff para su correcto funcionamiento. En este caso se debe descargar el codigo fuente de Riff en https://github.com/SebastianP07/Reservas-salas-de-ensayo-Boostrap-JQuery-Java-Postgresql/tree/master y modificar en src/java/Conexion/Conexion.java y modificar los datos de conexion a los sumisitrados en la base de datos privada.

Existen algunos Scripts de ayuda para usar desde el pgAdmin de tal forma que se puedan crear elementos en la base de datos como el caso de los usuarios. El backup que se va a restaurar contiene unos datos generales para poder usar el aplicativo de forma facil y rapida, sin embargo, los usuarios adicionales deben ser creados desde pgAdmin en la version 1.0 de este software.
