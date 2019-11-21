import DID from '../util/DID'
import Asset from './Asset';

export default interface Agent{
    getDDO(): Map<string,object>;
    getDID(): DID;
    registerAsset(asset: Asset):Asset;
    getAsset(id: string):Asset;
    getAsset(id: DID):Asset;
    uploadAsset(a:Asset):Asset
}