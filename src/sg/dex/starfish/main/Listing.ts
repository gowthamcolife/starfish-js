import Asset from "./Asset";
import Account from "./Account";

export default interface Listing {

    /**
     * Returns the asset associated with this listing.
     * <p>
     * The asset may not be available in some circumstances (e.g. lack of access permission)
     * in which case an exception will be thrown.
     *
     * @return The asset for this listing
     * @throws AuthorizationException if requester does not have access permission
     * @throws StorageException       if there is an error in retrieving the Asset
     */
     getAsset():Asset;

    /**
     * Returns the service agreement associated with this listing.
     * TODO create service agreement abstraction
     *
     * @return The Agreement associated with this Listing
     */
     getAgreement():Map<string,object>;
    
    /**
     * Purchases this listing using the given account
     * FIXME: should this return an asset or a purchase?
     *
     * @param account The account to use for the purchase
     * @return The purchased asset
     */
     purchase(account:Account):Asset;

    /**
     * Refreshes the Listing data from the agent where it is stored, returning a new listing.
	 *
     * @return The latest version of the Listing
     */
     refresh():Listing;

    /**
     * API to get the meta data of this Listing
     * @return A map of listing metadata
     */
     getMetaData():Map<string, object> ;

    /**
     * API to get the Listing ID
     * @return Listing ID
     */
    getId():string;
    
    /**
     * Gets the Asset ID of this listing
     * @return The Asset ID
     */
    getAssetID():string;