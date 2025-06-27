import bcrypt from 'bcrypt';
import sequelize from '../../config/database.js';
import { DataTypes } from 'sequelize';

const Usuario = sequelize.define('Usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('A', 'I', 'E'),
        allowNull: false,
        defaultValue: 'A'
    }
}, {
    tableName: 'usuarios',
    timestamps: true
});

Usuario.beforeCreate(async (usuario) => {
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(usuario.password, salt);
});

Usuario.prototype.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error('Error al comparar contraseñas');
    }
};

export default Usuario;