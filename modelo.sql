--ELIMINAR RELACIONES (LLAVES FORANEAS)
ALTER TABLE A_USUARIO DROP CONSTRAINT CLASE_DE_USUARIO_FK;
ALTER TABLE A_USUARIO DROP CONSTRAINT TIPO_DE_USUARIO_FK;
ALTER TABLE A_COLOR_PRODUCTO DROP CONSTRAINT COLOR_DE_PRODUCTO_FK;
ALTER TABLE A_PRODUCTO DROP CONSTRAINT DUENO_DEL_PRODUCTO_FK;
ALTER TABLE A_FACTURA DROP CONSTRAINT USUARIO_CLIENTE_FK;
ALTER TABLE A_RESPUESTA DROP CONSTRAINT RESPUESTA_DEL_DUENO_FK;
ALTER TABLE A_PUNTUACION DROP CONSTRAINT USUARIO_QUE_PUNTUA_FK;
ALTER TABLE A_CONVERSACION DROP CONSTRAINT HELPDESK_FK;
ALTER TABLE A_CONVERSACION DROP CONSTRAINT CLIENTE_FK;
ALTER TABLE A_DETALLE DROP CONSTRAINT DETALLE_DEL_CARRITO_FK;
ALTER TABLE A_RESPUESTA DROP CONSTRAINT COMENTARIO_RESPONDIDO_FK;
ALTER TABLE A_DETALLE DROP CONSTRAINT PRODUCTO_COMPRADO_FK;
ALTER TABLE A_PUNTUACION DROP CONSTRAINT PRODUCTO_PUNTUADO_FK;
ALTER TABLE A_COLOR_PRODUCTO DROP CONSTRAINT PRODUCTO_CON_COLOR_FK;
ALTER TABLE A_PRODUCTO DROP CONSTRAINT CATEGORIA_DEL_PRODUCTO_FK;
ALTER TABLE A_CATEGORIA DROP CONSTRAINT CATEGORIAX2_FK;

--ELIMINAR SECUENCIAS (AUTOINCREMENTABLES)
DROP SEQUENCE ID_USUARIO_SEQ;

--ELIMINAR TABLAS
DROP TABLE A_CLASE;
DROP TABLE A_TIPO_USUARIO;
DROP TABLE A_COLOR;
DROP TABLE A_CONVERSACION;
DROP TABLE A_USUARIO;
DROP TABLE A_FACTURA;
DROP TABLE A_RESPUESTA;
DROP TABLE A_DETALLE;
DROP TABLE A_PUNTUACION;
DROP TABLE A_COLOR_PRODUCTO;
DROP TABLE A_PRODUCTO;
DROP TABLE A_CATEGORIA;
DROP TABLE A_X_BITACORA;

--CREAR TABLAS DEL MODELO
CREATE TABLE A_CATEGORIA (
	ID_CATEGORIA INTEGER NOT NULL,
	NOMBRE VARCHAR2(30) NOT NULL,
	DESCRIPCION VARCHAR2(50),
	PERTENECE INTEGER
);
CREATE TABLE A_CLASE (
	ID_CLASE INTEGER NOT NULL,
	NOMBRE VARCHAR2(10) NOT NULL
);
CREATE TABLE A_COLOR (
	ID_COLOR INTEGER NOT NULL,
	NOMBRE VARCHAR2(10) NOT NULL
);
CREATE TABLE A_COLOR_PRODUCTO (
	PRODUCTO INTEGER NOT NULL,
	COLOR INTEGER NOT NULL
);
CREATE TABLE A_CONVERSACION (
	ID_CONVERSACION INTEGER NOT NULL,
	HELP_DESK INTEGER NOT NULL,
	CLIENTE INTEGER NOT NULL,
	REMITENTE INTEGER NOT NULL, --0:HelpDesk 1:Usuario
	SOLUCION INTEGER NOT NULL, --0:No --1:Si
	FECHA DATE NOT NULL,
	MENSAJE VARCHAR2(500) NOT NULL
);
CREATE TABLE A_DETALLE (
	ID_CARRITO INTEGER NOT NULL,
	PRODUCTO INTEGER NOT NULL,
	CANTIDAD INTEGER NOT NULL,
	PRECIO NUMBER NOT NULL,
	SUBTOTAL NUMBER
);
CREATE TABLE A_FACTURA (
	ID_CARRITO INTEGER NOT NULL,
	CLIENTE INTEGER NOT NULL,
	TOTAL_CARRITO NUMBER
);
CREATE TABLE A_PRODUCTO (
	ID_PRODUCTO INTEGER NOT NULL,
	IMAGEN VARCHAR2(200),
	DESCRIPCION VARCHAR2(200) NOT NULL,
	CATEGORIA INTEGER NOT NULL,
	PRECIO NUMBER,
	PUBLICACION DATE NOT NULL,
	DISPONIBLES INTEGER NOT NULL,
	DUENO INTEGER NOT NULL,
    ID NUMBER
);
CREATE TABLE A_PUNTUACION (
	USUARIO INTEGER NOT NULL,
	PRODUCTO INTEGER NOT NULL,
	PUNTUACION INTEGER NOT NULL,
	FECHA DATE NOT NULL,
	TITULO VARCHAR2(50),
	COMENTARIO VARCHAR2(200)
);
CREATE TABLE A_RESPUESTA (
	USUARIO INTEGER NOT NULL,
	PRODUCTO INTEGER NOT NULL,
	DUENO INTEGER NOT NULL,
	RESPUESTA VARCHAR2(200) NOT NULL
);
CREATE TABLE A_TIPO_USUARIO (
	ID_TIPO INTEGER NOT NULL,
	NOMBRE VARCHAR2(15) NOT NULL
);
CREATE TABLE A_USUARIO (
	ID_USUARIO INTEGER NOT NULL,
	NOMBRE VARCHAR2(30) NOT NULL,
	APELLIDOS VARCHAR2(50) NOT NULL,
	CLAVE VARCHAR2(20) NOT NULL,
	CORREO VARCHAR2(50) NOT NULL,
	TELEFONO NUMBER,
	FOTOGRAFIA VARCHAR2(200),
	GENERO CHAR, --M:Masculino F:Femenino O:Otros #NULLEABLE
	NACIMIENTO DATE,
	REGISTRO DATE NOT NULL,
	DIRECCION VARCHAR2(200),
	CREDITO NUMBER,
	GANANCIA NUMBER DEFAULT(0),
	CLASE INTEGER NOT NULL,
	ESTADO INTEGER NOT NULL, --0:Correo no confirmado 1:Activo 2:Congelado 3:Eliminado
	TIPO INTEGER NOT NULL, --0:Administrador 1:HelpDesk 2:Cliente
    ID NUMBER
);

--CREAR LLAVES PRIMARIAS
ALTER TABLE A_CATEGORIA 
	ADD CONSTRAINT CATEGORIA_PK 
		PRIMARY KEY (ID_CATEGORIA);
ALTER TABLE A_CLASE 
	ADD CONSTRAINT CLASE_DE_USUARIO_PK 
		PRIMARY KEY (ID_CLASE);
ALTER TABLE A_COLOR 
	ADD CONSTRAINT COLOR_PK 
		PRIMARY KEY (ID_COLOR);
ALTER TABLE A_COLOR_PRODUCTO 
	ADD CONSTRAINT COLOR_DE_PRODUCTO_PK 
		PRIMARY KEY (PRODUCTO, COLOR);
ALTER TABLE A_CONVERSACION
	ADD CONSTRAINT CONVERSACION_PK
		PRIMARY KEY (ID_CONVERSACION);
ALTER TABLE A_DETALLE 
	ADD CONSTRAINT DETALLE_PK 
		PRIMARY KEY (ID_CARRITO);
ALTER TABLE A_FACTURA 
	ADD CONSTRAINT FACTURA_PK 
		PRIMARY KEY (ID_CARRITO);
ALTER TABLE A_PRODUCTO 
	ADD CONSTRAINT PRODUCTO_PK 
		PRIMARY KEY (ID_PRODUCTO);
ALTER TABLE A_PUNTUACION 
	ADD CONSTRAINT COMENTARIO_PK 
		PRIMARY KEY (USUARIO, PRODUCTO);
ALTER TABLE A_RESPUESTA 
	ADD CONSTRAINT RESPUESTA_PK 
		PRIMARY KEY (USUARIO, PRODUCTO, DUENO);
ALTER TABLE A_TIPO_USUARIO 
	ADD CONSTRAINT TIPO_DE_USUARIO_PK 
		PRIMARY KEY (ID_TIPO);
ALTER TABLE A_USUARIO 
	ADD CONSTRAINT USUARIO_PK 
		PRIMARY KEY (ID_USUARIO);

--CREAR RELACIONES (LLAVES FORANEAS)
ALTER TABLE A_CATEGORIA 
	ADD CONSTRAINT CATEGORIAX2_FK 
		FOREIGN KEY (PERTENECE) REFERENCES A_CATEGORIA (ID_CATEGORIA);
ALTER TABLE A_COLOR_PRODUCTO 
	ADD CONSTRAINT COLOR_DE_PRODUCTO_FK 
		FOREIGN KEY (COLOR) REFERENCES A_COLOR (ID_COLOR);
ALTER TABLE A_CONVERSACION
	ADD CONSTRAINT CLIENTE_FK
		FOREIGN KEY (CLIENTE) REFERENCES A_USUARIO(ID_USUARIO);
ALTER TABLE A_CONVERSACION
	ADD CONSTRAINT HELPDESK_FK
		FOREIGN KEY (HELP_DESK) REFERENCES A_USUARIO(ID_USUARIO);
ALTER TABLE A_COLOR_PRODUCTO 
	ADD CONSTRAINT PRODUCTO_CON_COLOR_FK 
		FOREIGN KEY (PRODUCTO) REFERENCES A_PRODUCTO (ID_PRODUCTO);
ALTER TABLE A_PUNTUACION 
	ADD CONSTRAINT PRODUCTO_PUNTUADO_FK 
		FOREIGN KEY (PRODUCTO) REFERENCES A_PRODUCTO (ID_PRODUCTO);
ALTER TABLE A_PUNTUACION 
	ADD CONSTRAINT USUARIO_QUE_PUNTUA_FK 
		FOREIGN KEY (USUARIO) REFERENCES A_USUARIO (ID_USUARIO);
ALTER TABLE A_FACTURA 
	ADD CONSTRAINT USUARIO_CLIENTE_FK 
		FOREIGN KEY (CLIENTE) REFERENCES A_USUARIO (ID_USUARIO);
ALTER TABLE A_DETALLE 
	ADD CONSTRAINT DETALLE_DEL_CARRITO_FK 
		FOREIGN KEY (ID_CARRITO) REFERENCES A_FACTURA (ID_CARRITO);
ALTER TABLE A_DETALLE 
	ADD CONSTRAINT PRODUCTO_COMPRADO_FK 
		FOREIGN KEY (PRODUCTO) REFERENCES A_PRODUCTO (ID_PRODUCTO);
ALTER TABLE A_PRODUCTO 
	ADD CONSTRAINT CATEGORIA_DEL_PRODUCTO_FK 
		FOREIGN KEY (CATEGORIA) REFERENCES A_CATEGORIA (ID_CATEGORIA);
ALTER TABLE A_PRODUCTO 
	ADD CONSTRAINT DUENO_DEL_PRODUCTO_FK 
		FOREIGN KEY (DUENO) REFERENCES A_USUARIO (ID_USUARIO);
ALTER TABLE A_RESPUESTA 
	ADD CONSTRAINT COMENTARIO_RESPONDIDO_FK 
		FOREIGN KEY (USUARIO, PRODUCTO) REFERENCES A_PUNTUACION (USUARIO, PRODUCTO);
ALTER TABLE A_RESPUESTA 
	ADD CONSTRAINT RESPUESTA_DEL_DUENO_FK 
		FOREIGN KEY (DUENO) REFERENCES A_USUARIO (ID_USUARIO);
ALTER TABLE A_USUARIO 
	ADD CONSTRAINT CLASE_DE_USUARIO_FK 
		FOREIGN KEY (CLASE) REFERENCES A_CLASE (ID_CLASE);
ALTER TABLE A_USUARIO 
	ADD CONSTRAINT TIPO_DE_USUARIO_FK 
		FOREIGN KEY (TIPO) REFERENCES A_TIPO_USUARIO (ID_TIPO);

--INSERTAR DATOS POR DEFECTO
INSERT INTO A_CLASE(ID_CLASE, NOMBRE) VALUES(1, 'DIAMANTE');
INSERT INTO A_CLASE(ID_CLASE, NOMBRE) VALUES(2, 'PLATINO');
INSERT INTO A_CLASE(ID_CLASE, NOMBRE) VALUES(3, 'ORO');
INSERT INTO A_CLASE(ID_CLASE, NOMBRE) VALUES(4, 'PLATA');
INSERT INTO A_CLASE(ID_CLASE, NOMBRE) VALUES(5, 'BRONCE');
INSERT INTO A_TIPO_USUARIO(ID_TIPO, NOMBRE) VALUES(0, 'ADMINISTRADOR');
INSERT INTO A_TIPO_USUARIO(ID_TIPO, NOMBRE) VALUES(1, 'HELP DESK');
INSERT INTO A_TIPO_USUARIO(ID_TIPO, NOMBRE) VALUES(2, 'CLIENTE');

--CREAR TABLA BITACORA
CREATE TABLE A_X_BITACORA (
	ID_ADMINISTRADOR INTEGER NOT NULL,
	ACCION INTEGER NOT NULL, --0:Activo 1:Modificado 2:Congelado 3:Eliminado
	DESCRIPCION VARCHAR2(200) NOT NULL,
	FECHA DATE NOT NULL,
	CUENTA INTEGER NOT NULL
);

--CREAR AUTOINCREMENTABLES
CREATE SEQUENCE ID_USUARIO_SEQ
	START WITH 1
		INCREMENT BY 1;
        
CREATE OR REPLACE TRIGGER AUMENTO_ID_USUARIO
BEFORE INSERT ON A_USUARIO
FOR EACH ROW
BEGIN
	DECLARE
		IDUSUARIO INTEGER;
	BEGIN
		SELECT ID_USUARIO_SEQ.NEXTVAL INTO IDUSUARIO FROM dual;
		:NEW.ID_USUARIO := IDUSUARIO;
	END;
END;
