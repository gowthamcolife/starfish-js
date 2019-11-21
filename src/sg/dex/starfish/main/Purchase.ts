import Listing from "./Listing";

export default interface Purchase {

    /**
     * Returns the Listing associated with this Purchase.
     * <p>
     * The listing may not be available in some circumstances (e.g. lack of access permission)
     * in which case an exception will be thrown.
     *
     * @return The listing for this Purchase
     * @throws AuthorizationException if requester does not have access permission
     * @throws StorageException       if there is an error in retrieving the Asset
     */
    getListing():Listing;


    /**
     * API to ge the status of Purchase.
     * Possible status can be :
     * FIXME: what are the states?
     * 
     * @return The status of the purchase
     *
     * @throws AuthorizationException if requester does not have access permission
     * @throws StorageException       if there is an error in retrieving the Asset
     */
    status():string;

    /**
     * API to get the metadata for this Purchase
     *
     * @return The metadata for this purchase
     */
    getMetaData():Map<string, object>;
}