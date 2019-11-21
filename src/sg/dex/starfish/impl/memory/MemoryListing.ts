import Listing from "../../main/Listing";
import MemoryAgent from "./MemoryAgent";
import { Constant } from "../../constant/constant";
import Account from '../../main/Account';
import Asset from '../../main/Asset'

export class MemoryListing implements Listing {

    private agent: MemoryAgent;

    private meta: Map<string, object>;
    private id: string;

    private constructor(agent: MemoryAgent, listingID: string, metaMap: Map<string, object>) {
        this.agent = agent;
        this.meta = metaMap;
        this.id = listingID;
    }

    /**
     * API will create the listing instance based on the metaMap data passed.
     * @param agent Agent on which the listing has to be created
     * @param metaMap Map of metadata that need to create listing
     * @return The new Listing
     */
    public static create(agent: MemoryAgent, metaMap: Map<string, object>): MemoryListing {
        let listingID: string = metaMap.get(Constant.ID).toString();
        return new MemoryListing(agent, listingID, metaMap);
    }


    getAsset(): Asset {
        return this.agent.getAsset(this.getAssetID());
    }
    getAgreement(): any {
        return this.getMetaData().get(Constant.AGREEMENT) !== null ? this.getMetaData().get(Constant.AGREEMENT) : null;
    }
    purchase(account: Account): Asset {
        return null;
    }
    refresh(): Listing {
        return this;
    }
    getMetaData(): Map<string, object> {
        return this.meta;
    }
    getId(): string {
        return this.id;
    }


    getAssetID(): string {
        return this.getMetaData().get("assetid").toString();
    }


}