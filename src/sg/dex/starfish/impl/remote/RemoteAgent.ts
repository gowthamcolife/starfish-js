import Invokable from "../../main/Invokable";
import MarketAgent from "../../main/MarketAgent";
import AAgent from "../AAgent";
import Operation from '../../main/Operation'
import RemoteAccount from "./RemoteAccount";
import DID from "../../util/DID";
import Ocean from "../../main/Ocean";
import Asset from "../../main/Asset";
import Listing from "../../main/Listing";
import Purchase from "../../main/Purchase";
import ARemoteAsset from "./ARemoteAsset";
import { Constant } from "../../constant/constant";
import RemoteBundle from "./RemoteBundle";
import { request } from 'http';

export default class RemoteAgent extends AAgent implements Invokable, MarketAgent {
	invoke(operation: Operation, param: Map<string, object>, ...params: any[]): import("../../main/Job").default<Map<string, object>> {
		throw new Error("Method not implemented.");
	}
	invokeAsync(operation: Operation, params: Map<string, object>): import("../../main/Job").default<Map<string, object>> {
		throw new Error("Method not implemented.");
	}



	private readonly account: RemoteAccount;
	private userDataMap: Map<string, object>;

	/**
	 * Create an AAccount with the provided ID
	 * @param id The identifier for this account
	 * @param credentials The credential for this account
	 * @retun instance of remote account
	 */
	protected constructor(ocean: Ocean, did: DID, account: RemoteAccount) {
		super(did, ocean);
		this.account = account;
	}

	/**
	* Creates a RemoteAgent with the specified Ocean connection, DID
	* and RemoteAccount
	*
	* @param ocean   Ocean connection to use
	* @param did     DID for this agent
	* @param account RemoteAccount for this agent
	* @return RemoteAgent
	*/
	public static create(ocean: Ocean, did: DID, account?: RemoteAccount): RemoteAgent {
		if (ocean === null) {
			//throw new IllegalArgumentException("Ocean connection cannot be null for remote agent");
		}
		if (did === null) {
			//throw new IllegalArgumentException("DID cannot be null for remote agent");
		}
		if (account === null) {
			return new RemoteAgent(ocean, did, null);
		}
		return new RemoteAgent(ocean, did, account);
	}

	/**
		 * Creates a remote invoke Job using the given HTTP response.
		 *
		 * @param agent    RemoteAgent on which to create the Job
		 * @param response A valid successful response from the remote Invoke API
		 * @return A job representing the remote invocation
		 * @throws IllegalArgumentException for a bad invoke request
		 * @throws RuntimeException         for protocol errors
		 */
    /* public static createJob(RemoteAgent agent, HttpResponse response):Job {
        StatusLine statusLine = response.getStatusLine();
        int statusCode = statusLine.getStatusCode();
        if (statusCode == 201) {
            return RemoteAgent.createSuccessJob(agent, response);
        }
        String reason = statusLine.getReasonPhrase();
        if ((statusCode) == 400) {
            throw new IllegalArgumentException("Bad invoke request: " + reason);
        }
        throw new GenericException("Internal Server Error");
    }

 */

	public connect(acc: RemoteAccount): RemoteAgent {
		// TODO: get user token and store this in account
		return new RemoteAgent(this.ocean, this.did, acc);
	}

	private registerBundle(a: Asset): ARemoteAsset {
		let remoteBundle: RemoteBundle = a as RemoteBundle;

		let resultAsset: Map<string, Asset> = new Map<string, Asset>();
		// getting  all sub asset
		let allSubAsset: Map<string, object> = remoteBundle.getAll();

		allSubAsset.forEach((value: object, key: string) => {
			let subAsset: Asset = allSubAsset.get(key) as Asset;
			if (subAsset.getMetadata().get(Constant.TYPE) === Constant.BUNDLE) {
				this.registerBundle(subAsset);
			}
			resultAsset.set(key, this.registerRemoteAsset(subAsset))
		});

		return this.registerRemoteAsset(RemoteBundle.create(this, resultAsset, a.getMetadata()));
	}

	getAsset(id: string | DID): Asset {
		if (typeof (id) === "string") {
			let uri: string = this.getMetaURI(id);
			}
		else {
			return this.getAsset(id.getID());
		}
	}

	private  getRemoteAsset(metaString:string, metaMap:Map<string, object>):ARemoteAsset {
        if (metaMap.get(Constant.TYPE)===(Constant.OPERATION)) {
            return RemoteOperation.create(this, metaString);
        } else if (metaMap.get(TYPE).equals(DATA_SET)) {
            return RemoteAsset.create(this, metaString);
        } else if (metaMap.get(TYPE).equals(BUNDLE)) {
            return RemoteBundle.createBundle(this, metaMap);
        } else {
            throw new StarfishValidationException("Invalid Asset Type :" + metaMap.get(TYPE));
        }
    }

	registerAsset(a: Asset): ARemoteAsset {
		if (null === a) {
			//throw new StarfishValidationException("Asset cannot be null");
		}
		if (a.getMetadata().get(Constant.TYPE) === Constant.BUNDLE) {
			return this.registerBundle(a);
		}
		return this.registerRemoteAsset(a);
	}


	private registerRemoteAsset(a: Asset): ARemoteAsset {
		let uri: string = this.getMetaURI();
		let headers: string = this.addAuthHeaders()


		return this.createRemoteAsset(uri, headers);
	}

	private createRemoteAsset(uri: string, headers: string): ARemoteAsset {
		try {

		}
		catch{

		}
	}


	uploadAsset(a: Asset): Asset {
		throw new Error("Method not implemented.");
	}


	getListing(id: string): Listing {
		throw new Error("Method not implemented.");
	}
	getPurchase(id: string): Purchase {
		throw new Error("Method not implemented.");
	}
	createListing(listingData: Map<string, object>): Listing {
		throw new Error("Method not implemented.");
	}

	public invokeResult(operation:Operation,params: Map<string, object>):Map<string, object> {
			return
      /*   // this will validate if the required input is provided or not
        Map<String, object> paramValueMap = Params.formatParams(operation, params);

        // check if the mode is sync else throw exception
        if (!isModeSupported(operation, SYNC)) {
            throw new StarfishValidationException("Mode must be sync for this operation");
        }

        CloseableHttpClient httpclient = HttpClients.createDefault();
	URI uri=getInvokeSyncURI(operation.getAssetID());
        HttpPost httppost = new HttpPost(uri);
        addAuthHeaders(httppost);
        // TODO if params is a map of asset then form proper entity
        StringEntity entity = new StringEntity(JSON.toPrettyString(paramValueMap), ContentType.APPLICATION_JSON);
        httppost.setEntity(entity);
        CloseableHttpResponse response;
        try {
            response = httpclient.execute(httppost);
            try {
                StatusLine statusLine = response.getStatusLine();
                if (statusLine.getStatusCode() == 200) {
                    String body = Utils.stringFromStream(response.getEntity().getContent());
                    return JSON.toMap(body);
                } else {
                    throw new HttpResponseException(statusLine.getStatusCode(), statusLine.getReasonPhrase());
                }
            } finally {
                response.close();
            }
        } catch (IOException e) {
            throw new JobFailedException(" Job invocation failed for operation : " + operation.toString() + "params :" + JSON.toPrettyString(params), e);
        } */
    }


	protected addAuthHeaders(): string {
		if (this.account === null) {
			//throw new AuthorizationException("User don`t have account credentials");
		} else {
			let token: string = null;
			let username: string = null;
			let password: string = null;

			if (this.account.getUserDataMap().get("token") != null) {
				token = this.account.getUserDataMap().get("token").toString();
			}
			if (this.account.getCredentials().get("username").toString() != null) {
				username = this.account.getCredentials().get("username").toString();
			}
			if (this.account.getCredentials().get("password").toString() != null) {
				password = this.account.getCredentials().get("password").toString();
			}
			if ((token == null) && (username == null) && (password == null)) {
				// throw new AuthorizationException("Username or Token or Password is not available for given account :" + account);
			} else {
				let buffer: string = ''
				if (token !== null) {
					buffer = 'token ' + token
				}
				// will create toke for given account
				else {
					//					final StringBuilder tmp = new StringBuilder();
					//					tmp.append(username);
					//					tmp.append(":");
					//					tmp.append((password == null) ? "null" : password);
					//					final Base64 base64codec = new Base64(0);
					//					final byte[] base64password = base64codec.encode(EncodingUtils.getBytes(tmp.toString(), Consts.UTF_8.name()));
					//					buffer.append("Basic ");
					//					buffer.append(base64password, 0, base64password.length);
					this.createToken(this.account);
					buffer = 'token ' + this.account.getUserDataMap().get("token").toString();
				}
				return buffer
			}
		}
	}


	private getMetaURI(id?: string): string {
		let metaEndpoint: string = this.getMetaEndpoint();
		if (metaEndpoint === null)
			//throw new UnsupportedOperationException("This agent does not support the Meta API (no endpoint defined)");
			try {
				if (id === null) {
					return metaEndpoint + Constant.DATA;
				}
				else {
					return metaEndpoint + Constant.DATA + "/" + id;
				}
			}
			catch {
				//throw new IllegalArgumentException("Can't create valid URI for asset metadata", e);
			}
	}

	public getMetaEndpoint(): string {
		return this.getEndpoint("Ocean.Meta.v1");
	}

	public getAuthEndpoint(): String {
		return this.getEndpoint("Ocean.Auth.v1");
	}



	private createToken(account: RemoteAccount): void {

		// TODO this probably needs refactoring

		try {
			let username: string = account.getCredentials().get(Constant.USER_NAME).toString();
			let password: string = account.getCredentials().get(Constant.PASSWORD).toString();
			const response = request(
				{
					host: 'localhost',
					port: '5000',
					path: '/posts',
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					}
				},
				response => {
					if (response.statusCode == 404) {
						//throw new RemoteException("Asset ID not found for at: " + "");
					}
					if (response.statusCode == 200) {

						let id: string = JSON.parse(response.statusMessage);
						this.updateAccountData(id);
					} else {
						//throw new HttpResponseException(statusLine.getStatusCode(), statusLine.getReasonPhrase());
					}
				}
			);	
			);


		}
		catch{

		}
	}


	
	private updateAccountData(token: string): void {
		this.account.getUserDataMap().set(Constant.TOKEN, token);
	}

}