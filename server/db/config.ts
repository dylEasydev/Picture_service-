import { Dialect , Sequelize, Transaction } from 'sequelize';
import cls from 'cls-hooked';

const transacNamespace = cls.createNamespace('very_own_namespace');
Sequelize.useCLS(transacNamespace);

const dbName = process.env.DB_NAME as string ;
const dbUser = process.env.DB_USER as string ;
const dbHost = process.env.DB_HOST;
const dbDriver = process.env.DB_DRIVER as Dialect; 
const dbPassword = process.env.DB_PASSWORD as string;

const sequelizeConnect = new Sequelize(dbName,dbUser,dbPassword,{
    host:dbHost,
    dialect:dbDriver,
    logging: false,
    isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
    define:{
        freezeTableName: true
    }
});

export default sequelizeConnect;