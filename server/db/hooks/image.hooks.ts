import {Image} from '../init';
import fs from 'node:fs/promises';
import path from 'node:path';
import { __basedir } from '../../global_dir';

const nameExcept = [
    'profil_default.png','client_default.png','matter_default.png','domain_default.png'
];

Image.afterUpdate((instance)=>{
    return new Promise<void>(async (resolve, reject) => {
        //récuperation des anciennes valeur avant la mis à jour 
        const picturesName = instance.previous().picturesName as string;
        const path_director = path.join(__basedir ,'/ressources/pictures',`/${picturesName}`);
        if(!nameExcept.includes(picturesName)){
            try {
                //supression de l'anciennes images 
                await fs.unlink(path_director);
                resolve();
            } catch (error) {
                reject(error);
            }
        }else resolve();
    })
});

export {Image};