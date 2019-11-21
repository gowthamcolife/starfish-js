import Listing from "./Listing";
import Purchase from "./Purchase";

export default interface MarketAgent {
    /**
     * API to get all the Listing.
     * This will return all the listing that belong specific agent
     * 
     * @param id The ID of the Listing to retrieve
     * @return Listing instance, or null if not found
     */
    getListing(id:string):Listing;

    /**
     * API to get one  Listing.
     * This will return  the listing that belong specific agent
     * @param id The ID 
     *
     * @return Purchase instance, or null if not found
     */
     getPurchase(id:string):Purchase;

    /**
     * API used to create a  new listing instance
     * it will have map of all metadata that need to be passed while creating the listing instance
     *
     * @param listingData The data to include in the listing
     * @return Listing instance created
     */
    createListing(listingData:Map<string, object> ):Listing;
}
