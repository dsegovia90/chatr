import { Surreal } from 'surrealdb.js';

const db = new Surreal();

export async function connect() {
	try {
		// Connect to the database
		await db.connect('http://127.0.0.1:8000/rpc', {
			// Set the namespace and database for the connection
			ns: 'chatr',
			db: 'chatr'

			// Set the authentication details for the connection
		});
	} catch (e) {
		console.error('ERROR', e);
	}
}

export default db;
