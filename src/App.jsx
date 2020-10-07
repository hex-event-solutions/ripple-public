import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { usePromiseTracker, trackPromise } from 'react-promise-tracker'
import Loader from 'react-loader-spinner'

import NotFound from './NotFound'
import PageStatic from './PageStatic'
import PageRipple from './PageRipple'
import LayoutComponent from './LayoutComponent'

const jsyaml = require('js-yaml')

const LoadingSpinner = props => {
  const { promiseInProgress } = usePromiseTracker()

  return (
    promiseInProgress &&
    <div
      style={{
        width: "100%",
        height: "100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
    </div>
  )
}

const App = () => {
  const [loading, setLoading] = useState(true)
  const [template, setTemplate] = useState({ pages: [], styles: {}})
  const [route_elements, setRoutes] = useState([])

  useEffect(() => {
    trackPromise(
      fetch(`http://localhost:3000/website/template`).then(res => {
        if (!res.ok) {
          // TODO:
          // Show error for no template/domain found
        } else {
          res.text().then(raw => {
            var tmpl = jsyaml.load(raw)
            setTemplate(tmpl)
            console.log(tmpl)
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
    )
  }, [])

  useEffect(() => {
    setup_routes(template.pages)
  }, [template])

  const setup_routes = pages => {
    var raw_routes = []
    pages.forEach(page => {
      console.log(page)
      page.paths.forEach(path => {
        var PageTag = tag_from_type(page.type)
        raw_routes.push(<Route exact key={path} path={path} render={props => <PageTag page={page} { ...props } />} />)
      })
    })

    setRoutes(raw_routes)
  }

  const tag_from_type = typestring => {
    switch (typestring) {
      case 'static':
        return PageStatic
      case 'ripple':
        return PageRipple
    }
  }

  return (
    <BrowserRouter>
      <LoadingSpinner />
      <LayoutComponent type='header' {...template.header} />
      <Switch>
        {route_elements}
        <Route key='not-found' component={NotFound} />
      </Switch>
      <LayoutComponent type='footer' {...template.footer} />
    </BrowserRouter>
  )
}

export default App
