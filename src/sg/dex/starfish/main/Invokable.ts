import Job from './Job'
import Operation from './Operation';

export default interface Invokable {

	/**
	 * Invokes the specified operation on this agent. If the invoke is successfully launched,
	 * will return a Job instance that can be used to access the result, otherwise throws an
	 * exception.
	 * 
	 * @param operation The operation to invoke on this agent
	 * @param params Positional parameters for the invoke operation
	 * @return A Job instance allowing access to the invoke job status and result
	 */
	 invoke(operation:Operation,param:Map<string,object>,...params:any[]):Job<Map<string,object>>;
	
	
	/**
	 * Gets the parameter specification for this Invokable service given the specified operation
	 * 
	 * @param op The operation for which to obtain the parameter specification
	 *
	 * @throws UnsupportedOperationException if this service cannot support the given operation
	 * @return A map of parameter names to parameter specs
	 */
	
	
	/**
	 * Invokes this operation with the given named parameters. Operations should override
	 * this method to provide an implementation of asynchronous invocation via the
	 * Job interface
	 *
	 * @param params Positional parameters for this invoke job
	 * @param operation The operation for which to obtain the parameter specification
	 * @throws IllegalArgumentException if required parameters are not available, or of incorrect type
	 * @return The Job for this invoked operation
	 */
	invokeAsync(operation:Operation,params:Map<string,object>):Job<Map<string,object>>;
}