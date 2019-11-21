import MemoryAsset from "./impl/memory/MemoryAsset";
import Asset from "./main/Asset";


export default class Main{


    memoryAsset:MemoryAsset;
    data:number[];
    constructor(){
        this.data=[2,3,4]
        this.memoryAsset = MemoryAsset.create(this.data,null,null)

        this.testBuildMetaData()
    }

    public testBuildMetaData():void{
      
        let data:number[]
        data = [1,2,3];
        let metaMap:Map<string,string> = new Map<string,string>();
        metaMap.set("test1","success")
        let a:Asset = MemoryAsset.create(data,null,metaMap)

    }
}