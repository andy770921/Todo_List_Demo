import CssBaseline from '@mui/material/CssBaseline'
import { ApolloProvider } from '@apollo/client'
import NiceModal from '@ebay/nice-modal-react'
import { useApollo } from '../apollo/client'

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <NiceModal.Provider>
        <CssBaseline />
        <Component {...pageProps} />
      </NiceModal.Provider>
    </ApolloProvider>
  )
}
