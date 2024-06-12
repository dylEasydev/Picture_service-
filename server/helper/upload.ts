import multer from 'multer';
import path from 'path';
import { __basedir } from '../global_dir';
import { FindExtension } from './fndExtension';
import util from 'util';


export class ExtensionError extends Error{}; 
export class UploadMulter {

    public upload:multer.Multer;
    public storage:multer.StorageEngine;
    public typeFile:string;

    constructor(type_file:string , limit_size:number){
        this.typeFile = type_file

        this.storage = multer.diskStorage({
            destination : (req, file, callback)=>{
                const dest = path.join(__basedir,'/ressources',`/${this.typeFile}`);
                callback(null, dest);
            },

            filename:(req, file, callback)=>{
                const extension = path.extname(file.originalname);
                const name = `easyclass-uploads-${Date.now()}${extension}`;
                callback(null,name);
            },
        })

        this.upload = multer({
            storage:this.storage,
            limits:{
                fileSize:limit_size*1024*1024
            },
            fileFilter:(req, file, callback)=>{
                const extension = path.extname(file.originalname);
                const mineType = file.mimetype;
                const validExt = new FindExtension(this.typeFile);
                validExt.findMineType().then(data=>{
                    if(data.includes(mineType)){
                        validExt.findExtension().then(data=>{
                            if(data.includes(extension)) callback(null ,true)
                            else callback(new ExtensionError(`mauvais MineType,les Minetypes admis sont ${data}`));
                        })
                    }else{
                        callback(new ExtensionError(`mauvais MineType,les Minetypes admis sont ${data}`));
                    }
                }).catch(error=>callback(error))
            }
        })
    }

    uploader(){
        return util.promisify(this.upload.single(this.typeFile));
    }
}

