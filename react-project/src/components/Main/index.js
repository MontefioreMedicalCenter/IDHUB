import React, { useState } from 'react';
import './main.style.scss';
import { Route, Switch } from 'react-router';
import { PRIVATE_ROUTES } from '../../AppConfig/AppRouter/constant';
import CustomizedTabs from '../../shared/components/Tabs'
import { tabList, tabStyles } from './content';
import moment from 'moment';
import Montefiore from "../../assets/images/Doing-More-Logo.jpg"

const Main = () => {
    const [tabValue, handleTabChange] = useState(0);
    const dateString = `${moment().format("MM/DD/YYYY")}`;
    const timeString = `${moment().format("HH:mm:ss")}`;

    return (
        <div className="main-container">
            <div className="title">
                <div className="title-logo">
                    <img
                        id="montefiore"
                        alt="Montefiorelogo"
                        src={Montefiore}
                        style={{
                            height:"40px",
                        }}
                    />
                </div>
                <div className="title-content">
                    {dateString} -&nbsp;
                    {timeString} |&nbsp;
                    beweeks |&nbsp;
                    logout
                </div>
            </div>
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