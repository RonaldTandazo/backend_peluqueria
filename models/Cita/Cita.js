import sequelize from '../../config/database.js';
import { DataTypes } from 'sequelize';

const Cita = sequelize.define('Cita', {
    id_cita: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'clientes',
            key: 'id_cliente'
        }
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('Agendada', 'En Proceso', 'Completada', 'Cancelada', 'No Asistió'),
        allowNull: false,
        defaultValue: 'Agendada'
    }
}, {
    tableName: 'citas',
    timestamps: true
});

export default Cita;