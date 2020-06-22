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

  var page_header = ''

  if (page.name != 'Home') {
    page_header = <LayoutComponent key='page-header' type='page-header' heading={page.name} />
  }

  return (
    <div className='container-fluid text-center'>
      {page_header}
      {content}
    </div>
  )
}

export default PageStatic
