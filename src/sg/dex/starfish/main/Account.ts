export default  interface Account {
	/**
	 * Gets the ID for an Account.
	 * 
	 * The account identifier used is defined by the agent implementation, however typically
	 * this would be a unique user name or ID for this agent.
	 *
	 * @return Account identifier
	 */
	getID():string;
	
	/**
	 * Gets the credentials stored for this Account.
	 * 
	 * Required credentials are defined by the agent implementation, but would typically include
	 * things like user name, password etc.
	 * 
	 * This map is immutable and can be used by Agent to get the credential
	 * 
	 * @return A credential map for this account
	 */
	getCredentials():Map<string,object>;
}