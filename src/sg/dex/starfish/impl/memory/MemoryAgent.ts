import AAgent from "../AAgent";
import Invokable from "../../main/Invokable";
import MarketAgent from "../../main/MarketAgent";
import Operation from "../../main/Operation"
import Listing from "../../main/Listing"
import Purchase from "../../main/Purchase"
import MemoryAsset from "./MemoryAsset";
import Job from "../../main/Job"
import Ocean from "../../main/Ocean";
import DID from "../../util/DID";
import Asset from "../../main/Asset";
import { AMemoryOperation } from "./AMemoryOperation";
import { MemoryListing } from "./MemoryListing";
import { MemoryPurchase } from "./MemoryPurchase";


export default class MemoryAgent extends AAgent implements Invokable, MarketAgent {


    /**
     * The singleton default memory agent instance
     */
    /**
     * A cached thread pool for jobs executed in memory
     */
    // public static readonly ExecutorService THREAD_POOL = Executors.newCachedThreadPool();

    private assetStore: Map<string, MemoryAsset> = new Map<string, MemoryAsset>();
    private listingStore: Map<string, MemoryListing> = new Map<string, MemoryListing>();
    private purchaseStore: Map<string, MemoryPurchase> = new Map<string, MemoryPurchase>();


    private constructor(ocean: Ocean, did: DID) {
        super(did, ocean)
    }

    public static create(did?: any): MemoryAgent {
        if (did === undefined) {
            return new MemoryAgent(Ocean.connect(), DID.parse(DID.createRandomString()))
        }
        else if (typeof (did) === "string") {
            return new MemoryAgent(Ocean.connect(), DID.parse(did));
        }
        else {
            return new MemoryAgent(Ocean.connect(), did);
        }
    }

    public registerAsset(a: Asset): Asset {
        let ma: MemoryAsset = MemoryAsset.create(null, a, null);
        this.assetStore.set(ma.getAssetID(), ma);
        return ma;
    }

    public uploadAsset(a: Asset): Asset {
        let ma: MemoryAsset = MemoryAsset.create(null, a, null);
        this.registerAsset(ma);
        return ma;
    }

    public getAsset(id: string): Asset {
        return this.assetStore.get(id);
    }


    invoke(operation: Operation, param: Map<string, object>, ...params: any[]): Job<Map<string, object>> {
        if (param === null) {

            if (!(operation instanceof AMemoryOperation)) {
                throw new Error("Operation must be a MemoryOperation but got: ");
            }
            return operation.invoke(params);
        }
        else if (params === null) {
            if (!(operation instanceof AMemoryOperation)) {
                throw new Error("Operation must be a MemoryOperation but got: ");
            }
            return operation.invoke(param);
        }
    }
    invokeAsync(operation: Operation, params: Map<string, object>): Job<Map<string, object>> {
        if (this.isSyncMode(operation)) {
            throw new Error("Mode must be Async for this operation");
        }
        if (!(operation instanceof AMemoryOperation)) {
            throw new Error("Operation must be a MemoryOperation but got: ");
        }
        return operation.invoke(params);
    }


    getListing(id: string): Listing {
        return this.listingStore.get(id);
    }
    getPurchase(id: string): Purchase {
        return this.purchaseStore.get(id);
    }
    createListing(listingData: Map<string, object>): Listing {
        if (listingData.get("assetid") === null) {
            throw new Error("Asset Id is mandatory, cannot be null");
        }

        this.listingStore.set(listingData.get("id").toString(), MemoryListing.create(this, listingData));
        return this.listingStore.get(listingData.get("id").toString());
    }

    public createPurchase(purchaseData: Map<string, object>): MemoryPurchase {
        if (purchaseData.get("listingid") === null) {
            throw new Error("Listing Id is mandatory, cannot be null");
        }

        this.purchaseStore.set(purchaseData.get("id").toString(), MemoryPurchase.create(this, purchaseData));
        return this.purchaseStore.get(purchaseData.get("id").toString());
    }


    private isSyncMode(operation: Operation): boolean {
        let metaData: Map<string, string> = operation.getMetadata();
        let mode: string = metaData.get("modes");
        if (mode !== null && mode.toString() === ("sync")) {
            return true;
        }
        return false;
    }

}


