import path from 'path';
import fs from 'node:fs/promises';
import { __basedir } from '../global_dir';

export class FindExtension{

    public typeFile:string;

    constructor(type_file:string){
        this.typeFile = type_file;
    }

    findMineType(){
        return new Promise<string[]>(async (resolve, reject) => {
            const path_director = path.join(__basedir ,`ressoures/`,`mine_${this.typeFile}.txt`);
            try {
                const mineType = await fs.readFile(path_director,'utf-8');
                resolve(mineType.split(','));
            } catch (error) {
                reject(error);
            }
        })
    }

    findExtension(){
        return new Promise<string[]>(async (resolve, reject) => {
            const path_director = path.join(__basedir ,`ressoures/`,`ext_${this.typeFile}.txt`);
            try {
                const extension = await fs.readFile(path_director , 'utf-8');
                resolve(extension.split(','));
            } catch (error) {
                reject(error);
            }
        })
    }
}
