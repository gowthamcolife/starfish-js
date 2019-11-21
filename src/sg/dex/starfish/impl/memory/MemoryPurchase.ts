import Purchase from "../../main/Purchase";
import MemoryAgent from "./MemoryAgent";
import { Constant } from "../../constant/constant";
import Listing from "../../main/Listing"

export class MemoryPurchase implements Purchase {
  

    private meta:Map<string, object>;
    private  id:string;
    private agent:MemoryAgent;

    private constructor(agent:MemoryAgent, listingID:string,metaMap:Map<string, object>) {
        this.agent = agent;
        this.meta = metaMap;
        this.id = listingID;
    }

    /**
     * Create method is to create a instance of Memory Purchase
     * This method will create a new instance of Purchase based on metaMap passed as an argument.
     *
     * @param agent   Agent on which the listing has to be created
     * @param metaMap Map of metadata that need to create listing
     * @return Return the new Memory Purchase instance
     */
    public static create(agent:MemoryAgent, metaMap:Map<string, object>):MemoryPurchase {

        return new MemoryPurchase(agent, metaMap.get(Constant.ID).toString(), metaMap);
    }

    getListingId():string {
        return this.meta.get(Constant.LISTING_ID).toString()
    }

    getId():string {
        return this.id;
    }

    getListing(): Listing {
        return this.agent.getListing(this.meta.get(Constant.LISTING_ID).toString());;
    }
    status(): string {
        return this.meta.get(Constant.STATUS) === null ? null : this.meta.get(Constant.STATUS).toString();
    }
    getMetaData(): Map<string, object> {
      return this.meta;
    }


}