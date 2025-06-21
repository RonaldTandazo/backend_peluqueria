import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos MySQL establecida exitosamente.');
        await sequelize.sync({ alter: true });
        console.log('Modelos sincronizados con la base de datos.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
        process.exit(1);
    }
}

connectDB();

export default sequelize;