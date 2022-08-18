export type post = {
	attributes: {
		title: string;
		slug: string;
		content: string;
		excerpt: string;
		publishedAt: string;
		tags: { data: Array<tag> };
		author: { data: author };
	};
};

type author = {
	attributes: {
		username: string;
		photo: { data: { attributes: { url: string } } };
	};
};

type tag = {
	attributes: {
		title: string;
		slug: string;
	};
};
