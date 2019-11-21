import DID from '../util/DID'
import { Ocean as OceanAPI } from '@oceanprotocol/squid'
import { OceanAssets } from '@oceanprotocol/squid/dist/node/ocean/OceanAssets';
import { OceanAccounts } from '@oceanprotocol/squid/dist/node/ocean/OceanAccounts';
import Agent from './Agent';
import Asset from './Asset';

export default class Ocean {
	private static readonly DEFAULT_OCEAN:Ocean=new Ocean(null);
	
	private readonly  ddoCache:Map<DID, string> = new Map<DID,string>();

	private readonly oceanAPI:OceanAPI;

	private constructor(oceanAPI:OceanAPI) {
		this.oceanAPI=oceanAPI;
	}
	
	

	public static connect(oceanAPI?:OceanAPI):Ocean {
		if(typeof oceanAPI === "object"){
			return new Ocean(oceanAPI);
		}
		else{
			return Ocean.DEFAULT_OCEAN;
		}
	}

	/**
	 * Gets a DDO for a specified DID via the Universal resolver
	 * 
	 * @param did DID to resolve
	 * @return The DDO as a JSON map
	 */

	 //parsing is not used
	/*public getDDO(did:string):Map<String,Object> {
		return this.getDDO(DID.parse(did));
	}
	*/

	/**
	 * Registers a DID with a DDO in the context of this Ocean connection on the local machine.
	 * 
	 * This registration is intended for testing purposes.
	 * 
	 * @param did A did to register
	 * @param ddo A string containing a valid Ocean DDO
	 */
	public registerLocalDID(did:DID, ddo:string):void {
		this.ddoCache.set(did,ddo);
	}
	
	/**
	 * Registers an agent DDO with this Ocean connection,
	 * @return did The newly created DID for the agent
	 * @param ddo associated with the DID
	 */

	 //Register DDO not used
/* 	public registerDDO(ddo:string):DID {
		did:DID =DID.createRandom();;
		
		this.registerLocalDID(did,ddo);
		return did;
	}
  */
	/**
	 * Gets a DDO for a specified DID via the Universal Resolver.
	 * Returns null if the DDO cannot be found.
	 *
	 * @param did DID to resolve
	 * @throws UnsupportedOperationException not yet implemented
	 * @return The DDO as a JSON map
	 */
	public getDDO(did:DID):Map<string,object>  {
		let localDDO:string=this.ddoCache.get(did);
		if (localDDO!==null) {
			return JSON.parse(localDDO);
		}
		// TODO universal resolver
		throw new Error("Not yet implemented");
	}
	
	/**
	 * Gets the Squid OceanAPI for this Ocean connection
	 * @return OceanAPI instance
	 */
	public getOceanAPI():OceanAPI {
		return this.oceanAPI;
	}
	
	/**
	 * Gets the Squid AssetsAPI for this Ocean connection
	 * @return AssetsAPI instance
	 */
	public  getAssetsAPI():OceanAssets {
		return this.oceanAPI.assets;
	}
	
	/**
	 * Gets the Squid AccountsAPI for this Ocean connection
	 * @return AccountsAPI instance
	 */
	public  getAccountsAPI():OceanAccounts {
		return this.oceanAPI.accounts;
	}

	/**
	 * Gets the agent for a given DID
	 * @param did The DID for the agent to resolve
	 * @return Agent instance, or null if not able to resolve the DID
	 */
	public getAgent(did:Agent):Agent {
		// TODO: resolve DDO for squid
		return
		//return RemoteAgent.create(Ocean.bind(this), did);
	}

	/**
	 * Attempts to resolve an asset for a given DID
	 * 
	 * @param did The DID
	 * @return The Asset for the given DID, or null if not found
	 */
	public getAsset(did:DID):Asset {
		if (did.getPath()==null) {
			// resolve using Squid
			//return SquidAsset.create(this,did);
			return;
		} else {
			// resolve using DEP protocol
			//Agent ag=getAgent(did);
			//return ag.getAsset(did);
			return
		}
		
	}



}
