import { subscribeToMessage, type QueriedMessage, getChannelMessages, killMessageStream } from '$lib/models/message';
import { derived, writable } from 'svelte/store';

export const channelUid = writable<string>();

let messageId: string
export const messages = derived<typeof channelUid, Map<QueriedMessage['id'], QueriedMessage>>(
	channelUid,
	(channelUid, set, update) => {
		if (!channelUid) return
		if (messageId) {
			killMessageStream(messageId)
		}
		getChannelMessages({ channel: channelUid }).then((initial) => {
			set(initial);
		});

		subscribeToMessage(channelUid, (x) => {
			if (x.action === 'CREATE' && x.result.channel === channelUid) {
				update((messageMap) => {
					messageMap.set(x.result.id, x.result);
					return messageMap;
				});
			}
		}).then(queryId => messageId = queryId);
	},
	new Map()
);
