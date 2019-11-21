export default interface Job<T> {

	/**
	 * Gets the Job ID associated with this Job. Job IDs are allocated by the agent implementation
	 * responsible for completing the job.
	 *
	 * @return jobID
	 */
	getJobID():string;

	/**
	 * Returns true if the Job has been completed. If the job is complete, the result
	 * may be obtained via getResult()
	 *
	 * @return boolean true if the job is complete, false otherwise.
	 */
	isComplete():boolean;

	/**
	 * Gets the result of the job as an Ocean asset
	 *
	 * @throws AuthorizationException if requestor does not have load permission
	 * @throws StorageException if unable to load the Asset
	 * @throws JobFailedException if the job failed during execution
	 * @return The Asset resulting from the job, or null if not yet available
	 */
	getResult():T;
    awaitResult(timeoutMillis:number):T;

}