import Ocean from '../main/Ocean';
import DID from '../util/DID';
import Asset from '../main/Asset'


export default class SquidAsset extends AAsset {
	private ocean:Ocean;
	private did:DID;
	private DDO:ddo;

	private constructor(meta:string, did:DID, ddo:DDO, ocean:Ocean) {
		super(meta);
		this.did = did;
		this.ddo=ddo;
		this.ocean=ocean;
	}
	
	private static create(meta:string, did:DID, ddo:DDO, ocean:Ocean):Asset {
		return new SquidAsset(meta,did,ddo,ocean);
	}

	/**
	 * Gets the DID for this SquidAsset
	 *
	 * @return DID
	 */



	/**
	 * Returns true if this asset is an operation, i.e. can be invoked on an
	 * appropriate agent
	 *
	 * @return true if this asset is an operation, false otherwise
	 */

	public static create(ocean:Ocean, did:DID):Asset {
		com.oceanprotocol.squid.models.DID squidDID;
		try {
			squidDID = com.oceanprotocol.squid.models.DID.builder().setDid(did.toString());
			DDO ddo=ocean.getAssetsAPI().resolve(squidDID);
			
			String metaString=wrapDDOMeta(ddo);
			return create(metaString,did,ddo,ocean);
		}
		catch (DIDFormatException e) {
			throw new Error(e);
		}
		catch (EthereumException e) {
			throw new Error(e);
		}
		catch (DDOException e) {
			throw new Error(e);
		}
	}

	private static String wrapDDOMeta(DDO ddo) {
		HashMap<String,Object> info=new HashMap<>();
		try {
			info.put("ddoString", JSON.toMap(ddo.toJson()));
		}
		catch (JsonProcessingException e) {
			throw new IllegalArgumentException(e);
		}
		
		HashMap<String,Object> meta=new HashMap<>();
		meta.put("type", "dataset");
		meta.put("additionalInformation", info);
		
		String result=JSON.toPrettyString(meta);
		return result;
	}

}
