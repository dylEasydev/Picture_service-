import { MatterController } from '../controller';
import { BaseRouter } from './base.router';
import { auth } from '../middleware';

class MatterRouter extends BaseRouter<MatterController>{
    public initRoute(): void {
        this.routerServeur.put('/update/:id',auth.secureMiddleware,this.controllerService.updateImage);
        this.routerServeur.delete('/delete/:id',auth.secureMiddleware,this.controllerService.deleteImage);
    }
}

export default new MatterRouter(new MatterController()).routerServeur;