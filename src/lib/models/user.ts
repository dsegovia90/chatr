import db, { connect } from '$lib/surreal';

export type User = {
	name: {
		first: string;
		last?: string;
	};
	id: string;
};

export const createUser = async (name: User['name']): Promise<User> => {
	await connect();
	const [user] = await db.create('user', {
		name
	});

	return user;
};

export const getUsers = async (): Promise<User[]> => {
	await connect();
	return db.select<User>('user');
};
