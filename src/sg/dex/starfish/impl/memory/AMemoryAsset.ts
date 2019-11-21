import AAsset from "../AAsset";
import MemoryAgent from "./MemoryAgent";


export default abstract class AMemoryAsset extends AAsset {

    protected memoryAgent: MemoryAgent;


    protected constructor(metaData: string, aAgent?: MemoryAgent) {
        if (aAgent === null) {
            super(metaData);
        }
        else {
            super(metaData);
            this.memoryAgent = aAgent;
        }

    }
}
