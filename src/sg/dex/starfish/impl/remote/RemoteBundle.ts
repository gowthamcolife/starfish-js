import ARemoteAsset from "./ARemoteAsset";
import Bundle from "../../main/Bundle";
import Asset from "../../main/Asset";
import RemoteAgent from "./RemoteAgent";
import { Constant } from "../../constant/constant";

export default class RemoteBundle extends ARemoteAsset implements Bundle {


    private assetMap: Map<string, Asset>;

    private constructor(metaData: string, remoteAgent: RemoteAgent, assetMap: Map<string, Asset>) {
        super(metaData, remoteAgent);
        this.assetMap = assetMap === null ? new Map<string, Asset>() : assetMap;

    }

    public static create(remoteAgent: RemoteAgent, assetMap: Map<string, Asset>, meta?: Map<string, string>): RemoteBundle {
        if (meta === null) {
            return new RemoteBundle(this.buildMetaData(assetMap, null), remoteAgent, assetMap);

        }
        return new RemoteBundle(this.buildMetaData(assetMap, meta), remoteAgent, assetMap);
    }

    public static createBundle(remoteAgent: RemoteAgent, responseMap: any): RemoteBundle {

        // get the contents
        let allSubAsset: Map<string, Map<string, string>> = responseMap.get("contents") as Map<string, Map<string, string>>;
        //build meta data
        let assetMap: Map<string, Asset> = new Map<string, Asset>();
        allSubAsset.forEach((value: Map<string, string>, key: string) => {
            //JSON.parse(allSubAsset.get(key))
            //iterate issue

        });
        return new RemoteBundle(this.buildMetaData(assetMap, responseMap), remoteAgent, assetMap);
    }


    private static buildMetaData(assetMap: Map<string, Asset>, meta: Map<string, string>): string {
        let ob: Map<string, string> = new Map<string, string>();
        ob.set(Constant.DATE_CREATED, new Date().toLocaleString());
        ob.set(Constant.TYPE, Constant.BUNDLE);

        if (meta !== null) {
            meta.forEach((value: string, key: string) => {
                ob.set(key, value)
            });
        }

        //build meta data
        let subAssetIdMap: Map<string, Map<string, string>> = new Map<string, Map<string, string>>();
        assetMap = assetMap === null ? new Map<string, Asset>() : assetMap;
        let asset: Asset;
        assetMap.forEach((value: Asset, key: string) => {
            subAssetIdMap.set(key, this.getAssetIdMap(asset.getAssetID()))
        });

        ob.set(Constant.CONTENTS, JSON.stringify(subAssetIdMap));
        return JSON.stringify(ob);
    }

    private static getAssetIdMap(assetId: string): Map<string, string> {
        let assetIDMap: Map<string, string> = new Map<string, string>();
        assetIDMap.set(Constant.ASSET_ID, assetId);
        return assetIDMap;

    }

    private getAssetMap(): Map<string, Asset> {

        return this.assetMap;
    }

    isBundle(): boolean {
        throw new Error("Method not implemented.");
    }
    add(name: string, asset: Asset): Bundle {
        let copyMap: Map<string, Asset> = this.getAssetMap();
        copyMap.set(name, asset);
        return RemoteBundle.create(this.remoteAgent, copyMap, this.getMetadata());
    }
    addAll(assetMap: Map<string, Asset>): Bundle {
        let copyMap: Map<string, Asset> = this.getAssetMap();
        assetMap.forEach((value: Asset, key: string) => {
            copyMap.set(key, value)
        });

        return RemoteBundle.create(this.remoteAgent, copyMap, this.getMetadata());
    }
    get(name: string): Asset {
        return this.getAssetMap().get(name);
    }
    getAll(): Map<string, object> {
        return this.getAssetMap();
    }


}
