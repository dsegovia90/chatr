import { subscribeToChannel, type Channel, getChannels } from '../models/channel';
import { writable } from 'svelte/store';

export const channels = writable<Map<Channel['id'], Channel>>(new Map(), () => {
	getChannels().then((initial) => channels.set(initial));
	subscribeToChannel((x) => {
		switch (x.action) {
			case 'CLOSE':
				return;
			case 'DELETE':
				channels.update((store) => {
					store.delete(x.result.id);
					return store;
				});
				break;
			default:
				channels.update((store) => {
					store.set(x.result.id, x.result);
					return store;
				});
				break;
		}
	});
});
