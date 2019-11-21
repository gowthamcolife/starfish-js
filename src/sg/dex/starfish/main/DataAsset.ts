import Asset from "./Asset";

export default interface DataAsset extends Asset {
    
     getContentSize():number;
}