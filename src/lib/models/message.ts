import { user } from '$lib/store/user';
import db from '$lib/surreal';
import type { LiveQueryResponse } from 'surrealdb.js/script/types';
import { get } from 'svelte/store';

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

export const subscribeToMessage = async (
  channel: string,
	cb: (data: LiveQueryResponse<Message>) => void,
	diff = false
) => {
	return db.live<Message>('channel', cb, diff);
};
