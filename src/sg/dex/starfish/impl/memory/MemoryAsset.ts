import AMemoryAsset from "./AMemoryAsset";
import DataAsset from "../../main/DataAsset";
import { keccak256 } from 'js-sha3';
import * as constant from '../../constant/constant'
import Asset from "../../main/Asset";
import { TSMap } from "typescript-map"


export default class MemoryAsset extends AMemoryAsset implements DataAsset{
    getContentSize(): number {
        return this.data!==null?this.data.length:-1
    }
    isDataAsset(): boolean {
        return false;
    }
  

    private data:number[];
    private constructor ( data:number[],metaData:string) {
        super(metaData);

        this.data = data;

    }

    //meta string,string
    private static buildMetaData(data:number[],  meta:Map<string, string>):string {
        let hash:string=keccak256(data)
        
        var ob = new TSMap<string,string>();
        ob.set(constant.Constant.DATE_CREATED, new Date().toLocaleDateString());
        ob.set(constant.Constant.CONTENT_HASH, hash);
        ob.set(constant.Constant.TYPE, constant.Constant.DATA_SET);
        ob.set(constant.Constant.SIZE, data.length.toString());
        ob.set(constant.Constant.CONTENT_TYPE, constant.Constant.OCTET_STREAM);

        if (meta != null) {

        
            meta.forEach((value:string,key:string)=>{
                ob.set(key, value);
            })
           
        }
        return JSON.stringify(ob.toJSON())
    
     
    }

   

    getContent(): number[] {
        return this.data
     }
     
     //change
    public static create(data:number[],asset:Asset,meta:Map<string,string>):MemoryAsset {
        if(meta!==null){
            return new MemoryAsset(data,this.buildMetaData(data,meta));
        }
        if(asset!==null){
            if (asset instanceof MemoryAsset) {
                return (asset as MemoryAsset);
            } else if (asset.isDataAsset()) {
                return new MemoryAsset(data,this.buildMetaData(data,null));
            }
            else{
                //Exception
            }
        }
        if(data!==null){
        return new MemoryAsset(data,this.buildMetaData(data,null));
        }

        else{
            //exception
        }
    }
}