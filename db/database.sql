create database corralonbrito;

use corralonbrito;

CREATE TABLE Envio (
	idEnvio INT AUTO_INCREMENT PRIMARY KEY,
	Cantidad FLOAT,
	Fecha_Envio DATETIME,
	Direccion_Envio VARCHAR(500),
	Detalle_Factura INT UNIQUE,
	FOREIGN KEY (Detalle_Factura) REFERENCES DetalleFactura(Detalle_Factura)
);

CREATE TABLE Compra (
	idCompra INT AUTO_INCREMENT PRIMARY KEY,
	idProducto INT,
	Cantidad FLOAT,
	Fecha_Compra DATETIME,
	FOREIGN KEY (idProducto) REFERENCES Productos(Codigo_Producto)
);

CREATE TABLE Productos (
	Codigo_Producto INT AUTO_INCREMENT PRIMARY KEY,
	Nombre VARCHAR(200),
	Descripcion VARCHAR(300),
	Marca VARCHAR(150),
	Precio_Unitario FLOAT,
	Precio_Costo FLOAT
);

CREATE TABLE Ventas (
	idVenta INT AUTO_INCREMENT PRIMARY KEY,
	Codigo_Producto INT,
	Cantidad_Venta FLOAT,
	FOREIGN KEY (Codigo_Producto) REFERENCES Productos(Codigo_Producto)
);

CREATE TABLE DetalleFactura (
	Detalle_Factura INT AUTO_INCREMENT PRIMARY KEY,
	idVenta INT,
	Cantidad_Venta_Producto FLOAT,
	Precio_Venta_Total FLOAT,
	Fecha_Venta DATETIME,
	FOREIGN KEY (idVenta) REFERENCES Ventas(idVenta)
);

CREATE TABLE Categoria (
	idCategoria INT AUTO_INCREMENT PRIMARY KEY,
	Nombre VARCHAR(255),
	Descripcion VARCHAR(255)
);

CREATE TABLE Producto_Categoria (
	idProducto_Categoria INT AUTO_INCREMENT PRIMARY KEY,
	Codigo_Producto INT,
	idCategoria INT,
	FOREIGN KEY (Codigo_Producto) REFERENCES Productos(Codigo_Producto),
	FOREIGN KEY (idCategoria) REFERENCES Categoria(idCategoria)
);

CREATE TABLE Proveedores (
	idProveedor INT AUTO_INCREMENT PRIMARY KEY,
	Nombre VARCHAR(250)
);

CREATE TABLE Producto_Proveedor (
	idProducto_Proveedor INT AUTO_INCREMENT PRIMARY KEY,
	Codigo_Producto INT,
	idProveedor INT,
	FOREIGN KEY (Codigo_Producto) REFERENCES Productos(Codigo_Producto),
	FOREIGN KEY (idProveedor) REFERENCES Proveedores(idProveedor)
);

CREATE TABLE Transacciones (
  idTransaccion INT AUTO_INCREMENT PRIMARY KEY,
  Tipo ENUM('Compra', 'Venta') NOT NULL,
  Producto INT NOT NULL,
  Cantidad FLOAT NOT NULL,
  Precio_Unitario FLOAT NOT NULL,
  Fecha_Transaccion DATETIME NOT NULL
);