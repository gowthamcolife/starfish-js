import DID from '../util/DID'

export default interface Asset {

    getAssetID():string;
    getAssetDID():DID;
    getMetadata(): Map<string,string>;
    getMetadataString():string
    getParamValue():Map<string, string>;
    getContent():number[];
    isDataAsset():boolean;
}