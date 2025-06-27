import sequelize from '../../config/database.js';
import { DataTypes } from 'sequelize';

const Atencion = sequelize.define('Atencion', {
    id_atencion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_cita: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'citas',
            key: 'id_cita'
        }
    },
    id_servicio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'servicios',
            key: 'id_servicio'
        }
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('A', 'I', 'E'),
        allowNull: false,
        defaultValue: 'A'
    }
}, {
    tableName: 'atenciones',
    timestamps: true
});

export default Atencion;