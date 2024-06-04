import { 
    CreationOptional, InferAttributes, InferCreationAttributes,Model
} from 'sequelize';

import {ImageInterface} from '../interface';
/**
 * models des image stocker dans le serveur de Gestion des images 
 */
export class Image extends Model<
    InferAttributes<Image>,
    InferCreationAttributes<Image>
>implements ImageInterface{
    
    //attributs attributs
    declare id:CreationOptional<number>;
    declare picturesName:CreationOptional<string>;
    declare urlPictures:CreationOptional<string>;
    declare nameTable: CreationOptional<string>;

    //timestamps
    declare readonly createdAt:CreationOptional<Date>;
    declare readonly updatedAt:CreationOptional<Date>;
    declare readonly deletedAt:CreationOptional<Date>;

    //clé etrangère 
    declare foreignId: CreationOptional<number>;

}