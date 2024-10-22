import { DomainController } from '../controller';
import { auth } from '../middleware';
import { BaseRouter } from './base.router';

export class DomainRouter extends BaseRouter<DomainController>{

    public initRoute(): void {
        this.routerServeur.put('/update/:id',auth.secureMiddleware,auth.verifPermToken('updated:imageDomain'),this.controllerService.updateImage);
        this.routerServeur.delete('/delete/:id',auth.secureMiddleware,auth.verifPermToken('deleted:imageDomain'),this.controllerService.deleteImage);
    }
}

export default new DomainRouter(new DomainController()).routerServeur;