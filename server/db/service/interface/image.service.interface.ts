import { ImageInterface } from "../../interface";

export interface  ImageServiceInterface{

    findImage(foreingId:number ,nametable:string):Promise<ImageInterface|null>;
    updateImage(image:ImageInterface ,newName:string):Promise<ImageInterface>;
}