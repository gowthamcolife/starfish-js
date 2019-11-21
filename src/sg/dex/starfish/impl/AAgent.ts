import DID from '../util/DID';
import Agent from '../main/Agent';
import Ocean from '../main/Ocean';
import Asset from '../main/Asset';

export default abstract class AAgent implements Agent {

	abstract getAsset(id: string|DID):Asset
	abstract registerAsset(asset: Asset): Asset
	
	
	abstract uploadAsset(a: Asset): Asset;
	
	
	

	
//Final
	protected did:DID;

	private ddo:Map<string,object>;
//final
	protected  ocean:Ocean;

	/**
	 * Create an agent with the provided Ocean connection and DID
	 * 
	 * @param ocean The ocean connection to use for this agent
	 * @param did The DID for this agent
	 */
	protected constructor(did:DID,ocean?:Ocean) {
		if(ocean!==null){
		this.ocean=ocean;
		this.did=did;
		}
		else{
		this.ocean=Ocean.connect();
		this.did=did;
		}
	}



	getDDO(): Map<string, object> {
		if (this.ddo==null) {
			this.ddo=this.refreshDDO();
		}
		return this.ddo;
	}
	getDID(): DID {
		return this.did;
	}

	/**
	 * Fetches the latest DDO from Universal Resolver if not cached
	 * @return JSONObject
	 */
	public refreshDDO():Map<string,object> {
		return this.ocean.getDDO(this.did);
	}
	
	/**
	 * Returns the serviceEndpoint for the specified service type.
	 * Searched the agent's DDO for the appropriate service.
	 * 
	 * @param type The type of the service to find
	 * @return The service endpoint, or null if not found
	 */

	public getEndpoint(type:string):string {
		//let ddo:Map<string,object>=this.getDDO();
		 let services:any = this.ddo.get("service");
		if (services===null) return null;
		return null;
	}


}