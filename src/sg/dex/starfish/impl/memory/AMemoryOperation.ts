import AMemoryAsset from "./AMemoryAsset";

import MemoryAgent from "./MemoryAgent";


export abstract class AMemoryOperation extends AMemoryAsset {
   

    protected constructor(metaString:string,memoryAgent:MemoryAgent) {
        super(metaString,memoryAgent);
    }

}