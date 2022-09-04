import { ApolloClient, InMemoryCache } from "@apollo/client"

export default function craftApolloClient () {	

	const client = new ApolloClient({
		uri: `${process.env.CMS_API_URL}`,
		cache: new InMemoryCache(),
	})
	return client
}