import Asset from '../main/Asset'
import DID from '../util/DID'
import { keccak256 } from 'js-sha3';
import * as constant from '../constant/constant'

export default abstract class AAsset implements Asset {
    getContent(): number[] {
        throw new Error("Method not implemented.");
    }
    isDataAsset(): boolean {
        throw new Error("Method not implemented.");
    }

    protected metadataString: string;
    protected id: string;

    protected constructor(meta: string) {
        this.metadataString = meta;
        this.id = keccak256(meta)
    }

    getAssetID(): string {
        return this.id;
    }
    getAssetDID(): DID {
        throw new Error("Unable to obtain DID for asset of class");
    }
    getMetadata(): Map<string, string> {
        return JSON.parse(this.metadataString);
    }

    toString(): string {
        return this.getAssetID();
    }

    getMetadataString(): string {
        return this.metadataString;
    }

    getParamValue(): Map<string, string> {
        let o: Map<string, string> = new Map<string, string>();
        o.set(constant.Constant.ID, this.getAssetID())
        return o;
    }



}