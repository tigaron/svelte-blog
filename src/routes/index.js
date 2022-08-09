export const GET = async () => {
	return {
		status: 302,
		headers: {
			location: "/blog"
		} 
	}
}