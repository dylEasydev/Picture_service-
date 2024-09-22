import { ImageServiceInterface } from './interface';
import sequelizeConnect from '../config';
import { Image } from '../models';
import { Op } from 'sequelize';
import { __baseurl } from '../../global_dir';

export class ImageService implements ImageServiceInterface{
    findImage(foreignId:number ,nameTable:string){
        return new Promise<Image|null>(async(resolve, reject) => {
            try {
                const picture = await sequelizeConnect.transaction(async t=>{
                    return await Image.findOne({
                        where:{
                            [Op.and]:{
                                foreignId,
                                nameTable
                            }
                        }
                    })
                })

                resolve(picture);
            } catch (error) {
                reject(error);
            }
        })
    }

    updateImage(image:Image ,newName:string){
        return new Promise<Image>(async(resolve, reject) => {
            try {
                const pictureUpdate = await sequelizeConnect.transaction(async t=>{
                    return await image.update({
                        picturesName: newName,
                        urlPictures:`${__baseurl}/public/pictures/${newName}`
                    })
                })

                resolve(pictureUpdate);
            } catch (error) {
                reject(error);
            }
        })
    }
}

export default new ImageService();