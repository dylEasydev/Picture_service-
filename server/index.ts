import cluster from 'node:cluster';
import { launchCluster } from './cluster'
import { launchHttpServer } from './server';
import { initDB } from './db';

const launchServer = (isRequiredClustering:Boolean)=>{
    initDB().then(()=>console.log('sychronisation avec la BD reussi !'))
    .catch(error=>console.error(error));
    if(isRequiredClustering && cluster.isPrimary){
        launchCluster();
    }
    else{
        console.log(`${process.pid} is worker`);
        launchHttpServer();
    }
}

launchServer(false);