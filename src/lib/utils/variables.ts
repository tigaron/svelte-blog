export const strapi = {
	graphql: import.meta.env.VITE_STRAPI_GRAPHQL
};

export const rapidapi = {
	host: import.meta.env.VITE_RAPIDAPI_HOST,
	key: import.meta.env.VITE_RAPIDAPI_KEY
};

export const imgproxy = {
	url: import.meta.env.VITE_IMGPROXY_URL,
	key: import.meta.env.VITE_IMGPROXY_KEY,
	salt: import.meta.env.VITE_IMGPROXY_SALT
};
