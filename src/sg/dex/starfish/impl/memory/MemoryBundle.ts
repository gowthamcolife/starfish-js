/* import AMemoryAsset from "./AMemoryAsset";
import Asset from "../../main/Asset";
import Bundle from "../../main/Bundle";
import DID from "../../util/DID";
import memoryAgent from './MemoryAgent'
import MemoryAgent from "./MemoryAgent";

export default class MemoryBundle extends AMemoryAsset implements Bundle{

    private assetMap:Map<string, Asset>;

    private constructor(metaData:string, assetMap:Map<string, Asset>, memoryAgent:MemoryAgent) {
        super(metaData, memoryAgent);
        this.assetMap = assetMap == null ? new Map<string, Asset>() : assetMap;

    }


    public static create(memoryAgent:MemoryAgent, assetMap:Map<string, Asset>,meta: Map<string, object>):Bundle {

        return new MemoryBundle(buildMetaData(assetMap, meta), assetMap, memoryAgent);
    }

    isBundle(): boolean {
        return true;
    }    
    add(name: string, asset: Asset): Bundle {
        throw new Error("Method not implemented.");
    }
    addAll(assetMap: Map<string, Asset>): Bundle {
        throw new Error("Method not implemented.");
    }
    get(name: string): Asset {
        throw new Error("Method not implemented.");
    }
    getAll(): Map<string, object> {
        throw new Error("Method not implemented.");
    }
    getAssetDID():DID{
        throw new Error("Unable to obtain DID for asset of class MemoryBundle")
    }



   

    
} */