import React from 'react'

import './simple.sass'

const Simple = ({ ...props }) => {
  return (
    <div {...props} className="simple">Simple</div>
  )
}

export default Simple