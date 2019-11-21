import Asset from "./Asset";
import DID from "../util/DID";

export default interface Bundle extends Asset{
   
     isBundle():boolean;
     add(name:string, asset:Asset):Bundle;
     addAll(assetMap:Map<string, Asset>):Bundle;
     get(name:string):Asset;
     getAll():Map<string, object>;
     getAssetDID():DID;
     getParamValue():Map<string,string>
}