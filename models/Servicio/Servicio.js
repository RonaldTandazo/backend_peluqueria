import sequelize from '../../config/database.js';
import { DataTypes } from 'sequelize';

const Servicio = sequelize.define('Servicio', {
    id_servicio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    estado: {
        type: DataTypes.ENUM('A', 'I', 'E'),
        allowNull: false,
        defaultValue: 'A'
    }
}, {
    tableName: 'servicios',
    timestamps: true
});

export default Servicio;