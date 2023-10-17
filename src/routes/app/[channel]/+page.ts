export function load({ params }) {
	const { channel } = params;

	return {
		channelUid: channel
	};
}
