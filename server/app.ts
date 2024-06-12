import express,{Application} from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { domainRouter, indexRouter, userRouter } from './router';
import path  from 'path';
import { __basedir } from './global_dir';

class ExpressApp{
    public expressServer: Application;

    constructor(){
        this.expressServer = express();
        this.configServer();
    }

    private configServer(){
        this.expressServer.use(bodyParser.json())
                          .use(bodyParser.urlencoded({extended:true}))
                          .use(cors())
                          .use('/public',express.static(path.join(__basedir,'/ressources')))
                          .use('/',indexRouter)
                          .use('/image/user',userRouter)
                          .use('/image/domain',domainRouter)
                          .use('*',(req,res)=>{
                                res.redirect('/docs');
                          })
    }
}

export default new ExpressApp().expressServer