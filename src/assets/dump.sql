CREATE TABLE IF NOT EXISTS recorrido (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    actividad TEXT, 
    costo TEXT,
    detalle TEXT,
    fecha TEXT,
    tiempo TEXT
);

INSERT or IGNORE INTO recorrido (id, actividad, costo, detalle, fecha, tiempo) VALUES (1, 'Visita Crito de la Concordia', '15', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '03/05/2020', '4 horas');
INSERT or IGNORE INTO recorrido (id, actividad, costo, detalle, fecha, tiempo) VALUES (2, 'Visita El Parque de la Familia', '15', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '03/05/2020', '4 horas');

CREATE TABLE IF NOT EXISTS mensaje (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT, 
    mensaje TEXT,
    nombre TEXT
);

INSERT or IGNORE INTO mensaje (id, email, mensaje, nombre) VALUES (1, 'tanto@gmail.com', 'Lorem ipsum dolor sit amet.', 'Juan');