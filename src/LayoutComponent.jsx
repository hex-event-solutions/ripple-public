import React, { useState, useEffect } from 'react'
import ReactMustache from 'react-mustache'

const LayoutComponent = (props) => {

  // console.log('received props:', props)

  const { type, ...others } = props

  const [template, setTemplate] = useState('')

  useEffect(() => {
    fetch(`http://localhost:3002/template/${type}.mustache`).then(res => {
      if (res.ok) {
        res.text().then(raw => {
          setTemplate(raw)
        })
      }
    })
  }, [])

  return (
    <div>
      <ReactMustache template={template} data={others} />
    </div>
  )
}

export default LayoutComponent
