import { MatterController } from '../controller';
import { BaseRouter } from './base.router';
import { auth } from '../middleware';

class MatterRouter extends BaseRouter<MatterController>{
    public initRoute(): void {
        this.routerServeur.put('/update/:id',auth.secureMiddleware,auth.verifPermToken('updated:imageMatter'),this.controllerService.updateImage);
        this.routerServeur.delete('/delete/:id',auth.secureMiddleware,auth.verifPermToken('deleted:imageMatter'),this.controllerService.deleteImage);
    }
}

export default new MatterRouter(new MatterController()).routerServeur;