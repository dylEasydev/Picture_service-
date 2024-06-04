import { 
    Model ,CreationOptional,InferAttributes, 
    InferCreationAttributes
} from 'sequelize';
/**
 * interface représentant les Images
 */
export interface ImageInterface extends Model<
    InferAttributes<ImageInterface>,
    InferCreationAttributes<ImageInterface>
>{
    //attributs de base
    id:CreationOptional<number>;
    picturesName:CreationOptional<string>;
    urlPictures:CreationOptional<string>;
    nameTable:CreationOptional<string>;

    //clés étrangère
    foreignId:CreationOptional<number>;

    //timestamps
    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}