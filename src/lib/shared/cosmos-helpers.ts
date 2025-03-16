export function removeCosmosFields<T>(item: any): T {
	const cleanItem = { ...item };
	delete cleanItem._attachments;
	delete cleanItem._etag;
	delete cleanItem._rid;
	delete cleanItem._self;
	delete cleanItem._ts;
	return cleanItem as T;
}
