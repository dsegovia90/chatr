import { user } from '$lib/store/user';
import db from '$lib/surreal';
import type { LiveQueryResponse } from 'surrealdb.js/script/types';
import { get } from 'svelte/store';
import type { User } from './user';

export type Message = {
	text: string;
	createdBy: string;
	created: Date;
	channel: string;
	id: string;
};

export const createMessage = async ({
	text,
	channel
}: {
	text: Message['text'];
	channel: Message['channel'];
}) => {
	const currentUser = get(user);
	db.create('message', {
		text,
		createdBy: currentUser.id,
		created: new Date(),
		channel
	});
};

export type QueriedMessage = {
	text: string;
	createdBy: User;
	created: string;
	channel: string;
	id: string;
};

export const getChannelMessages = async ({
	channel
}: {
	channel: string;
}): Promise<Map<string, QueriedMessage>> => {
	const [result] = await db.query<QueriedMessage[]>(
		'SELECT *, createdBy.* FROM message WHERE channel == $channel ORDER BY created ASC;',
		{ channel }
	);
	const messages = result.result as unknown as QueriedMessage[];
	const map = new Map(messages.map((item) => [item.id, item]));

	return map;
};

export const subscribeToMessage = async (
	channel: string,
	cb: (data: LiveQueryResponse<QueriedMessage>) => void
	// diff = false
) => {
	const [res] = await db.query<[string]>(
		`LIVE SELECT *, createdBy.* FROM message WHERE channel == ${channel};`
	);
	// NOTE: The code below is not working in surrealdb 1.0
	// const [res] = await db.query<[string]>(
	// 	`LIVE SELECT *, createdBy.* FROM message WHERE channel == ${channel};`,
	// 	{
	// 		channel
	// 	}
	// );

	const queryId = res.result!;

	await db.listenLive(queryId, cb);
	return queryId;
};

export const killMessageStream = (queryId: string) => {
	db.kill(queryId);
};
