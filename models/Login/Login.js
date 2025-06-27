import sequelize from '../../config/database.js';
import { DataTypes } from 'sequelize';

const Login = sequelize.define('Log', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id_usuario'
        }
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, {
    tableName: 'log',
    timestamps: true
});

export default Login;