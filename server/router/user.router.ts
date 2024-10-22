import { UserController } from '../controller';
import { auth } from '../middleware';
import { BaseRouter } from './base.router';

export class UserRouter extends BaseRouter<UserController>{

    public initRoute(): void {
        this.routerServeur.put('/',auth.secureMiddleware,auth.verifPermToken('updated:profil'),this.controllerService.updateImage);
        this.routerServeur.delete('/',auth.secureMiddleware,auth.verifPermToken('deleted:profil'),this.controllerService.deleteImage);
    }
}

export default new UserRouter(new UserController()).routerServeur;