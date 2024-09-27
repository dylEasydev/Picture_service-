import { MatterServiceInterface } from './interface';
import { Matter} from '../interface';
import axios,{ AxiosInstance } from 'axios';

export class RequestError extends Error{
    public status:number;
    public data:any;
    constructor(
        status:number,
        data:unknown,
        message?:string
    ){
        super(message);
        this.status=status;
        this.data =data;
    }
}
export class MatterService implements MatterServiceInterface{
    public axiosRequest: AxiosInstance;

    constructor(jeton?:string){
        this.axiosRequest = axios.create({
            baseURL:'http://localhost:3003/',
            timeout:3000,
            headers:{
                Authorization:`Bearer ${jeton}`,
                Connection:"keep-alive",
                Upgrade:"h2"
            }
        })
    }
    getMatterById(matterId:number){
        return new Promise<{message:string; data:Matter;}>(async(resolve, reject) => {
            try {
                const matterFind = await this.axiosRequest.get<
                {message:string; data:unknown;}
                >(`/matter/${matterId}`,{
                    validateStatus:(status:number)=>{return status < 500}
                });
                if(matterFind.status < 200 || matterFind.status > 300){
                    reject(
                        new RequestError(
                            matterFind.status,
                            matterFind.data.data,
                            matterFind.data.message
                        )
                    )
                }else resolve(matterFind.data as {message:string,data:Matter}); 
            } catch (error) {
               reject(error);
            }
        })
    }
}