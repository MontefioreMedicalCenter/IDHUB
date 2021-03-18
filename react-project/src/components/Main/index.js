import React, { useState } from 'react';
import './main.style.scss';
import { Route, Switch } from 'react-router';
import { PRIVATE_ROUTES } from '../../AppConfig/AppRouter/constant';
import CustomizedTabs from '../../shared/components/Tabs'
import { tabList, tabStyles } from './content';

const Main = () => {
    const [tabValue, handleTabChange] = useState(0);

    return (
        <div className="main-container">
            <CustomizedTabs
                customStyle={tabStyles}
                setTabValue={handleTabChange}
                tabValue={tabValue}
                tabList={tabList}
            />
            <Switch>
                {PRIVATE_ROUTES.map((route, idx) => {
                    return route.component ? (
                        <Route key={idx} path={route.url} exact={route.exact} name={route.name}
                            render={props => (
                                <route.component {...props} />
                            )} />)
                        : (null)
                })}
            </Switch>
        </div>
    )
}

export default Main;