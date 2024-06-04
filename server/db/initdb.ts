import {Image, sequelizeConnect} from '../db';

function initDB():Promise<void>{
    return new Promise<void>(async (resolve, reject) => {
        const test = process.env.NODE_ENV === 'developemnent';
        try {
            await sequelizeConnect.authenticate();
            await Image.sync({alter:test});
            await sequelizeConnect.sync({alter:test});
            resolve();
        } catch (error) {
            reject(error);
        }
    })
}

export {initDB};