import React, { useState, useEffect } from 'react';
import LayoutComponent from './LayoutComponent'

const PageStatic = (props) => {

  const { page, ...other } = props

  var counts = {}

  const content = page.content.map(comp => {
    const { type, ...others } = comp
    counts[type] = ++counts[type] || 0
    return <LayoutComponent key={`${type}.${counts[type]}`} type={type} {...others} />
  })

  return (
    <div className='container-fluid text-center'>
      {content}
    </div>
  )
}

export default PageStatic
