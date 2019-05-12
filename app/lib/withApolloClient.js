import React from 'react'
import Head from 'next/head'
import { getDataFromTree } from 'react-apollo'

import initApollo from './initApollo'
import { parseCookies } from './cookies'

export default App => {
  return class Apollo extends React.Component {
    static displayName = `WithApolloClient(${App.displayName})`

    static async getInitialProps(ctx) {
      const {
        Component,
        router,
        ctx: { req, res },
      } = ctx
      const apollo = initApollo(
        {},
        {
          getToken: () => parseCookies(req).token,
        }
      )

      ctx.ctx.apolloClient = apollo

      let appProps = {}

      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx)
      }

      if (res && res.finished) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {}
      }

      if (!process.browser) {
        try {
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />
          )
        } catch (error) {
          console.error('Error while running `getDataFromTree`', error)
        }

        Head.rewind()
      }

      const apolloState = apollo.cache.extract()

      return {
        ...appProps,
        apolloState,
      }
    }

    constructor(props) {
      super(props)
      this.apolloClient = initApollo(props.apolloState, {
        getToken: () => parseCookies().token,
      })
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />
    }
  }
}
