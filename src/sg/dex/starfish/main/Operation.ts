import Asset from "./Asset";
import Job from "./Job";

export default interface Operation extends Asset {



	/**
	 * Invokes this operation with the given named parameters. Operations should
	 * override this method to provide an implementation of asynchronous invocation
	 * via the Job interface
	 * 
	 * @param params Positional parameters for this invoke job
	 * @throws IllegalArgumentException if required parameters are not available, or
	 *             of incorrect type
	 * @return The Job for this invoked operation
	 */
	invokeAsync(params:Map<string, object>):Job<Map<string,object>>;

	/**
	 * Invokes this operation with the given named parameters. Operations should
	 * override this method to provide an implementation of asynchronous invocation
	 * via the Job interface
	 *
	 * @param params Positional parameters for this invoke job
	 * @throws IllegalArgumentException if required parameters are not available, or
	 *             of incorrect type
	 * @return The Job for this invoked operation
	 */
	invokeResult(params:Map<string, object>):Map<string, object>;

	/**
	 * Invokes this operation with the given named parameters. Operations should
	 * override this method to provide an implementation of asynchronous invocation
	 * via the Job interface
	 *
	 * @param params Positional parameters for this invoke job
	 * @throws IllegalArgumentException if required parameters are not available, or
	 *             of incorrect type
	 * @return The Job for this invoked operation
	 */
	invoke(params:Map<string, object>):Job<Map<string,object>> ;

	invoke(...params:any[]):Job<Map<string,object>> ;

	/**
	 * Returns the operation specification for this operation. Operations must
	 * override this method to define what operation input and result  they accept.
	 * 
	 * TODO: add brief description of format and link to DEP6
	 *
	 * @return A map of parameter names to specifications
	 */
	
	/**
	 * Returns the parameter specification for this operation. Operations must
	 * override this method to define what parameters they accept.
	 *
	 * TODO: add brief description of format and link to DEP6
	 *
	 * @return A map of parameter names to specifications
	 */



}