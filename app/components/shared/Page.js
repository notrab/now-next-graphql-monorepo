import React from 'react'

import Header from './Header'

const Page = ({ children }) => (
  <React.Fragment>
    <Header />

    {children}
  </React.Fragment>
)

export default Page
