export const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT;

export const rapidapi = {
	url: import.meta.env.VITE_API_URL,
	key: import.meta.env.VITE_API_KEY,
	host: import.meta.env.VITE_API_HOST,
};

export const imgproxy = {
	api: import.meta.env.VITE_IMG_API,
	key: import.meta.env.VITE_IMG_KEY,
	salt: import.meta.env.VITE_IMG_SALT,
};
