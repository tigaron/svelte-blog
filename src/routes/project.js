export const GET = async () => {
	return {
		status: 302,
		headers: {
			location: "https://github.com/tigaron"
		} 
	}
}