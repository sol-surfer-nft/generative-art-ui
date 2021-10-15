/* eslint-disable react/display-name */
import React, { Suspense } from 'react'

const withSuspense = (Component) => (props) => (
  <Suspense fallback={<div className="page-content"></div>}>
    <Component {...props} />
  </Suspense>
)

export default withSuspense