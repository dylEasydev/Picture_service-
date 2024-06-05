import cluster from 'node:cluster';
import { launchCluster } from './cluster'
import { launchHttpServer } from './server';

const launchServer = (isRequiredClustering:Boolean)=>{
    if(isRequiredClustering && cluster.isPrimary){
        launchCluster();
    }
    else{
        launchHttpServer();
    }
}

launchServer(false);