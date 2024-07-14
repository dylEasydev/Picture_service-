import { Token } from '../db/interface';
import { imageService } from '../db/service';
import { CodeStatut, ExtensionError, UploadMulter, statusResponse } from '../helper';
import { BaseController } from './base.controller';
import { Request,Response } from 'express';
import fs from 'node:fs/promises';
import path from 'path';
import { __basedir } from '../global_dir';
import sharp from 'sharp';

export class MatterController extends BaseController{
    
    async updateImage(req:Request, res:Response){
        if(req.params.id){
            try {
                const userToken = req.body.token as Token
                if(typeof userToken.scope ==='string'){
                    if(userToken.scope !== 'updated:imageMatter')
                        return statusResponse.sendResponseJson(
                            CodeStatut.NOT_PERMISSION_STATUS,
                            res,
                            `Aucune permission de mis à jour d'une image !`
                        );
                }else if(typeof userToken.scope === 'undefined'){
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_PERMISSION_STATUS,
                        res,
                        `Aucune permission de mis à jour d'une image !`
                    );
                }else{
                    if(!userToken.scope.includes('updated:imageMatter'))
                        return statusResponse.sendResponseJson(
                            CodeStatut.NOT_PERMISSION_STATUS,
                            res,
                            `Aucune permission de mis à jour d'une image !`
                        );
                }
                if(userToken.userId !== parseInt(req.params.id)){
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_PERMISSION_STATUS,
                        res,
                        `Cette Image n'est pas celle de votre matière , Aucune permission de mis à jour !`
                    );
                }
                const uploader = new UploadMulter('pictures',2).uploader();
                await uploader(req,res);
                if(!req.file){
                    return statusResponse.sendResponseJson(
                        CodeStatut.CLIENT_STATUS,
                        res,
                        `Aucune image fourni !`
                    )
                }
                const filepath = req.file.path as string;
                const bufferSharp = await sharp(filepath).metadata();
    
                const width = bufferSharp.width as number;
                const heigth = bufferSharp.height as number;
                const name = `IMG-EC-${Date.now()}.jpeg`
    
                if(width < 200 || heigth < 200){
                    await sharp(filepath).resize(200 ,200)
                                         .toFormat('jpeg')
                                         .jpeg({quality:80})
                                         .toFile(path.join(__basedir ,`ressources/pictures`,`/${name}`));
                }else if(width > 500 || heigth > 500){
                    await sharp(filepath).resize(500 ,500)
                                        .toFormat('jpeg')
                                        .jpeg({quality:80})
                                        .toFile(path.join(__basedir ,`ressources/pictures`,`/${name}`));
                }else{
                    await sharp(filepath).toFormat('jpeg')
                                         .jpeg({quality:80})
                                         .toFile(path.join(__basedir ,`ressources/pictures`,`/${name}`));
                }
    
                const path_director = path.join(__basedir ,'ressources/pictures',`/${req.file.filename}`);
                await fs.unlink(path_director);
                delete req.file;
                
                const pictures = await imageService.findImage(parseInt(req.params.id) ,'matter');
                if(pictures === null)
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_FOUND_STATUS,
                        res,
                        `Aucune image associer au domaine identifiant ${req.params.id} !`
                    );
                const picturesUpdate =await imageService.updateImage(pictures,name);
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS,
                    res,
                    `Mis à jour réussi !`,
                    picturesUpdate
                );
            } catch (error) {
                if(req.file){
                    const path_director = path.join(__basedir ,'ressources/pictures',req.file.filename);
                    fs.unlink(path_director).catch(err=>{
                        return statusResponse.sendResponseJson(
                            CodeStatut.SERVER_STATUS,
                            res,
                            err.message,
                            err
                        )
                    })
                }
                
                if(error instanceof ExtensionError){
                    return statusResponse.sendResponseJson(
                        CodeStatut.CLIENT_STATUS,
                        res,
                        error.message,
                        error
                    )
                }
                return statusResponse.sendResponseJson(
                    CodeStatut.SERVER_STATUS,
                    res,
                    `Erreur du serveur veillez réesayer plus tard !`,
                    error
                )
            }   
        }
    }

    async deleteImage(req:Request , res:Response){
        if(req.params.id){
            try {
                const userToken = req.body.token as Token
                if(typeof userToken.scope ==='string'){
                    if(userToken.scope !== 'deleted:imageMatter')
                        return statusResponse.sendResponseJson(
                            CodeStatut.NOT_PERMISSION_STATUS,
                            res,
                            `Aucune Permission de supprimer une image !`
                        );
                }else if(typeof userToken.scope === 'undefined'){
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_PERMISSION_STATUS,
                        res,
                        `Aucune Permission de supprimer une image !`
                    );
                }else{
                    if(!userToken.scope.includes('deleted:imageMatter'))
                        return statusResponse.sendResponseJson(
                            CodeStatut.NOT_PERMISSION_STATUS,
                            res,
                            `Aucune Permission de supprimer une image !`
                        );
                }
                if(userToken.userId !== parseInt(req.params.id)){
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_PERMISSION_STATUS,
                        res,
                        `Cette Image n'est pas celle de votre matière , Aucune permission de suppression !`
                    );
                }
                const pictures = await imageService.findImage(parseInt(req.params.id),'matter');
                if(pictures === null)
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_FOUND_STATUS,
                        res,
                        `Aucune image associer à cette utilisateur !`
                    );
                const picturesUpdate =await imageService.updateImage(pictures,'matter_default.png');
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS,
                    res,
                    `suppression réussi !`,
                    picturesUpdate
                );
            } catch (error) {
                return statusResponse.sendResponseJson(
                    CodeStatut.SERVER_STATUS,
                    res,
                    `Erreur du serveur veillez réesayer plus tard !`,
                    error
                )
            }
        }
    } 
}
