import "dotenv/config";

export default ({ config }) => {
	return {
		...config,
		extra: {
			EXPO_BACK_URL: process.env.EXPO_BACK_URL,
		},
	};
};
