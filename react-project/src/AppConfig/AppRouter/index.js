import React, { useState, useEffect } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import ROUTES from './constant'

const AppRouter = () => {

    const [domain, setDomain] = useState('');

    useEffect(() => {
        const parsedData = window.location.pathname;
        setDomain(parsedData)
    }, [])

    return (
        <BrowserRouter basename={domain} >
            <Switch>
                {ROUTES && ROUTES.length &&
                    ROUTES.map((route, index) => {
                        if (route.private) {
                            return (
                                <PrivateRoute key={index} path={route.url} exact={route.exact} component={route.component} />
                            )
                        } else {
                            return (
                                <Route
                                    key={index}
                                    path={route.url}
                                    exact={route.exact}
                                    component={route.component}
                                />)
                        }
                    })
                }
            </Switch>
        </BrowserRouter>
    )
}

export default AppRouter