import Account from "../main/Account";

export default abstract class AAccount implements Account{
    protected id:string;
	private credentials:Map<string, object>;

	/**
	 * Create an AAccount with the provided ID
	 *
	 * @param id The identifier for this account
	 */
	

	protected constructor(id:string, credentials:Map<string, object>) {
		this.id=id;
		this.credentials = (credentials == null) ? new Map<>() : credentials;
	}

	
	public getID():string {
		return this.id;
	}


	public getCredentials():Map<string,object>  {
		// deep cloning the map
		return  this.credentials
        }

	
    public toString = () : string => {
            return `AAccount (id: ${this.id},credentials:${this.credentials})`;
        }


}