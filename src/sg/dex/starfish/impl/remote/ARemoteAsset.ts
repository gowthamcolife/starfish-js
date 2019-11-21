import AAsset from "../AAsset";
import RemoteAgent from "./RemoteAgent";

export default abstract class ARemoteAsset extends AAsset {

    protected remoteAgent:RemoteAgent;
    protected constructor(meta:string,remoteAgent:RemoteAgent) {
        super(meta);
        this.remoteAgent=remoteAgent;
    }

}