import { Response ,Request } from 'express';
import { CodeStatut, generateToken, statusResponse } from '../helper';
import { Token } from '../db/interface';
import { TokenExpiredError , JsonWebTokenError, NotBeforeError } from 'jsonwebtoken';

class AuthToken {

    async secureMiddleware(req:Request ,res:Response ,next :()=>void){
        try {
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
            req.body.token = await generateToken.verifyToken<Token>(token);
            next();
        } catch (error) {
            if((error instanceof TokenExpiredError) || (error instanceof JsonWebTokenError ) || (error instanceof NotBeforeError)){
                return statusResponse.sendResponseJson(
                    CodeStatut.NOT_PERMISSION_STATUS, 
                    res,
                    error.message,
                    error
                )
            }
            return statusResponse.sendResponseJson(
                CodeStatut.SERVER_STATUS, 
                res,
                `Erreur au niveau du serveur , réessayer plus tard !`,
                error
            )
        }
    }
}

export default new AuthToken();