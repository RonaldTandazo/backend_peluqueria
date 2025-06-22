import sequelize from '../config/database.js';
import Cita from './Cita/Cita.js';
import Cliente from './Cliente/Cliente.js';
import Usuario from './Usuario/Usuario.js';
import Servicio from './Servicio/Servicio.js';
import Atencion from './Atencion/Atencion.js';

// Atencion
Atencion.belongsTo(Cita, { foreignKey: 'id_cita', as: "cita"});
Atencion.belongsTo(Servicio, { foreignKey: 'id_servicio', as: 'servicioCita' });
Atencion.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'ingresadoPor'});

// Cita
Cita.belongsTo(Cliente, { foreignKey: 'id_cliente', as: 'clienteCita' });
Cita.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'agendadaPor' });

// Cliente
Cliente.hasMany(Cita, { foreignKey: 'id_cliente', as: 'citas' });

// Servicio
Servicio.hasMany(Atencion, { foreignKey: 'id_servicio', as: 'atenciones' });

// Usuario
Usuario.hasMany(Cita, { foreignKey: 'id_usuario', as: 'citasAgendadas' });
Usuario.hasMany(Atencion, { foreignKey: 'id_usuario', as: 'atencionesIngresadas' });

export {
    Atencion,
    Cita,
    Cliente,
    Usuario,
    Servicio
};