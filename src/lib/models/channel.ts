import db from '$lib/surreal';
import { get } from 'svelte/store';
import { user } from '$lib/store/user';
import type { LiveQueryResponse } from 'surrealdb.js/script/types';

type ChannelType = 'public' | 'private';

export type Channel = {
	name: string;
	createdBy: string;
	created: Date;
	type: ChannelType;
	id: string;
};

export const createChannel = async ({ name }: { name: string }): Promise<Channel> => {
	const currentUser = get(user);
	const channelType: ChannelType = 'public';
	const [channel] = await db.create('channel', {
		name,
		createdBy: currentUser.id,
		created: new Date(),
		type: channelType
	});

	return channel;
};

export const getChannels = async (): Promise<Map<Channel['id'], Channel>> => {
	const [result] = await db.query<Channel[]>('SELECT * FROM channel ORDER BY created ASC;');
	const channels = result.result as unknown as Channel[]
	const map = new Map(channels.map((item) => [item.id, item]))

	return map;
};

export const subscribeToChannel = async (
	cb: (data: LiveQueryResponse<Channel>) => void,
	diff = false
) => {
	return db.live<Channel>('channel', cb, diff);
};
