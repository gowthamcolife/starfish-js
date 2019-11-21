import ARemoteAsset from "./ARemoteAsset";
import Operation from "../../main/Operation";
import RemoteAgent from "./RemoteAgent";
import Job from '../../main/Job'

export default class RemoteOperation extends ARemoteAsset implements Operation {
    invokeAsync(params: Map<string, object>): Job<Map<string, object>> {
        return this.remoteAgent.invokeAsync(this, params);
    }
    invokeResult(params: Map<string, object>): Map<string, object> {
        let response:Map<String, object> = this.remoteAgent.invokeResult(this, params);
        return Params.formatResponse(this, response, this.remoteAgent);
    }
    invoke(params: Map<string, object>,...paramsRest: any[]): Job<Map<string, object>>{
        if(paramsRest===null){
        return this.remoteAgent.invoke(this, paramsRest);
        }
        else{
            return this.remoteAgent.invoke(this, params);
        }
    }
    
  

    protected constructor(remoteAgent:RemoteAgent, meta:string) {
        super(meta, remoteAgent);
    }

    /**
     * This method is to create the remote operation instance by passing the remote agent and the metadata
     *
     * @param a    agent on which this operation instance needs to be created
     * @param meta meta data for creating remote operation instance
     * @return new Remote operation instance
     */
    public static create(a:RemoteAgent, meta:string):RemoteOperation {
        return new RemoteOperation(a, meta);
    }


  
    
}
