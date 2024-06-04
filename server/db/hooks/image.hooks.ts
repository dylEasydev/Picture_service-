import {Image} from '../init';
import fs from 'node:fs/promises';
import path from 'path';
import { __basedir } from '../../global_dir';

const nameExcept = [
    'profil_default.png','client_default.png','matter_default.png'
];

Image.afterUpdate((instance , options)=>{
    return new Promise<void>(async (resolve, reject) => {
        const picturesName = instance.previous().picturesName as string;
        const path_director = path.join(__basedir ,'ressources/pictures',picturesName);
        if(!nameExcept.includes(picturesName)){
            try {
                await fs.unlink(path_director);
            } catch (error) {
                reject(error);
            }
        }else resolve();
    })
});

export {Image};