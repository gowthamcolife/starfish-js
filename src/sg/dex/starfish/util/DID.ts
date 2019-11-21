import {randomBytes} from 'crypto'


export default class DID {
    private static readonly METHOD_REGEX:string="([a-z]+)";
	private static readonly ID_REGEX:string="([a-zA-z0-9\\\\d._]+)?";
	private static readonly PATH_REGEX:string="(?:/([a-z0-9\\-._~%!$&'()*+,;=:@/]*))?";
	private static readonly FRAGMENT_REGEX:string="(?:#(.*))?";
	private static readonly DID_PATTERN:RegExp=new RegExp("did:"+DID.METHOD_REGEX+":"+DID.ID_REGEX+DID.PATH_REGEX+DID.FRAGMENT_REGEX+"$");

	private method:string;
	private id:string;
	private path:string;
	private fragment:string;
    private fullString:string=null;

	/**
	 * Creates a DID
	 *
	 * @param method METHOD portion of DID
	 * @param id ID portion of DID
	 * @param path PATH portion of DID (optional)
	 * @param fragment FRAGMENT portion of DID  (optional)
	 * @throws IllegalArgumentException if method or id are null
	 */
	private constructor(method:string, id:string, path:string,fragment:string) {
	
		if (method==null) throw new Error("DID method cannot be null");
		if (id==null) throw new Error("DID id cannot be null");
		this.method=method;
		this.id=id;
		this.path=path;
		this.fragment=fragment;
	}

	/**
	 * Creates a DID with the specified method, id, path and fragment
	 * @param method The DID method, e.g. "op"
	 * @param id The DID idstring
	 * @param path The DID path
	 * @param fragment The DID fragment
	 * @return DID The newly created DID
	 */
	public static create(method:string, id:string, path:string, fragment:string):DID {
		return new DID(method,id,path,fragment);
	}

	/**
	 * Checks if the provided String is a valid DID
	 *
	 * @param did Any String to test as a DID
	 * @return boolean true if the String is parseable as a valid DID, false otherwise
	 */
	public static isValidDID(did:string):boolean {
		return DID.DID_PATTERN.test(did);
	}

	/**
	 * Attempts to parse the given string as a DID
	 *
	 * @param did The String to parse as a DID
	 * @throws IllegalArgumentException on DID parse error
	 * @return DID The newly created DID
	 */
	public static parse(did:string):DID {
		
		if (DID.DID_PATTERN.test(did)) {
            let m:any=DID.DID_PATTERN.exec(did);
			let method:string=m[1];
			let id:string=m[2];
			let path:string=m[3];
			let fragment:string=m[4];
			let newDID:DID= new DID(method,id,path,fragment);
			newDID.fullString=did;
			return newDID;
		} else {
			//throw new Error("Parse failure on invalid DID ["+did+"]");
			return null;
		}
	}

	/**
	 * Gets the DID scheme for this DID
	 * @return String The DID scheme, always defined as "did"
	 */
	public getScheme():string {
		return "did";
	}

	/**
	 * Gets the DID method for this DID
	 * @return String The DID method, e.g. "op"
	 */
	public getMethod():string {
		return this.method;
	}

	/**
	 * Gets the DID idstring for this DID
	 * @return String The DID idstring, e.g. "2ee8d7d4dd764bc96e8f1c762b1ca4ff54688b22aeb851378aa9a543290bcbd9"
	 */
	public getID():string {
		return this.id;
	}

	/**
	 * Gets the DID path for this DID
	 * @return String The DID path, or null if there is no path specified
	 */
	public getPath():string {
		return this.path;
	}

	/**
	 * Gets the DID fragment for this DID
	 * @return String The DID fragment, or null if there is no fragment specified
	 */
	public getFragment():string {
		return this.fragment;
	}

	private createString():string {
		let sb=[];
		sb.join("did");
		sb.join(':');
		sb.join(this.method);
		sb.join(':');
		sb.join(this.id);
		if (this.path!==null) {
			sb.join('/');
			sb.join(this.path);
		}
		if (this.fragment!==null) {
			sb.join('/');
			sb.join(this.fragment);
		}

		return sb.toString();
	}

	public toString():string {
		if (this.fullString===null) {
			this.fullString=this.createString();
		}
		return this.fullString;
	}

	
		/**
	 * Creates a new DID from this DID with an updated path
	 * @param path The new path to add to this DID (may be null)
	 * @return DID The updated DID with the specified path argument
	 */
	public withPath(path:string):DID {
		return DID.create(this.method,this.id,this.path,this.fragment);
	}

	/**
	 * Creates a random Ocean-compliant DID as a string, of the format:
	 *
	 *   "did:op:a1019172af9ae4d6cb32b52193cae1e3d61c0bcf36f0ba1cd30bf82d6e446563"
	 *
	 * @return A valid Ocean DID represented as a string
	 */
	public static createRandomString():string {
		console.log("randomBytes:  "+randomBytes(64).toString('hex'))
			return randomBytes(64).toString('hex')
	}

	/**
	 * Creates a random Ocean-compliant DID
	 * @return The created DID
	 */
	public static createRandom():DID {
		return this.parse(DID.createRandomString());
	}
}