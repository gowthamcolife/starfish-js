import AAccount from "../AAccount";

export default class RemoteAccount extends AAccount{
	private userDataMap: Map<string, string> ;

	/**
	 * Create an AAccount with the provided ID
	 * @param id The identifier for this account
	 * @param credentials The credential for this account
	 * @retun instance of remote account
	 */
	protected constructor(id:string,credentials: Map<string, object>) {
		super(id, credentials);
		this.userDataMap = new Map<string,string>();
	}

	/**
	 * This method is to create instance of Remote Account
	 * @param id The identifier for this account
	 * @param credentials The credential for this account
	 * @return instance of remote account
	 */
	public static create(id:string,
					   credentials:Map<string, object>):RemoteAccount {
		return new RemoteAccount(id, credentials);
	}

	/**
	 * This method is to get the user data map.
	 * Userdata map contains value related to user which may change like Role ,token,..
	 * @return userdata map
	 */
	public getUserDataMap():Map<string, string>  {
		return this.userDataMap;
	}


    public toString = () : string => {
        return `RemoteAccount (id: ${this.userDataMap}`;
    }
}