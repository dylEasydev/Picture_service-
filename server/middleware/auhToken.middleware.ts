import { Response ,Request } from 'express';
import { CodeStatut, statusResponse } from '../helper';
import jwt from 'jsonwebtoken';

class AuthToken {

    async secureMiddleware(req:Request ,res:Response ,next :()=>void){
        const bearerToken = req.headers.authorization;

        if(!bearerToken){
            return statusResponse.sendResponseJson(
                CodeStatut.NOT_PERMISSION_STATUS,
                res,
                `Aucun Token n'as été fourni !`
            );
        }

        const token = bearerToken.split(' ')[1];
        if(!token){
            return statusResponse.sendResponseJson(
                CodeStatut.NOT_PERMISSION_STATUS,
                res,
                `Aucun Token n'as été fourni !`
            );
        }

        jwt.verify(token ,process.env.PRIVATE_KEY as string,(err , decode)=>{
            if(err){
                return statusResponse.sendResponseJson(
                    CodeStatut.UNAUTH_STATUS,
                    res,
                    `Aucun Token n'as été fourni !`
                );
            }
            req.body.token = decode ;
            next();
        });
    }
}

export default new AuthToken();