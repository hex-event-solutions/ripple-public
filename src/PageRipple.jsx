import React, { useState, useEffect } from 'react';

const PageRipple = (props) => {

  const { page, ...other } = props

  console.log(page.content)
  return (
    <div>
      Ripple?
    </div>
  )
}

export default PageRipple
