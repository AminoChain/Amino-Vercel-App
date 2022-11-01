import '../styles/globals.css'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { AppWrapper } from '../context/state'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://api.thegraph.com/subgraphs/name/maximilianfullstack/aminochain',
})

const App = ({ Component, pageProps }) => {
  return (
    <AppWrapper>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </AppWrapper>
  )
}

export default App
