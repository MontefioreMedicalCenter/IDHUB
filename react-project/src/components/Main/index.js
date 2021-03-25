import React, { useState } from 'react';
import './main.style.scss';
import { Route, Switch, useHistory } from 'react-router';
import { PRIVATE_ROUTES } from '../../AppConfig/AppRouter/constant';
import CustomizedTabs from '../../shared/components/Tabs'
import { tabList, tabStyles } from './content';
import moment from 'moment';
import Montefiore from "../../assets/images/Doing-More-Logo.jpg";
import LoginService from '../../service/cfc/LoginService';
import { useSelector } from 'react-redux';

const Main = () => {
    const history = useHistory();
    const loginModel = useSelector(state => state.loginState.loginModel)
    const [tabValue, handleTabChange] = useState(0);
    const dateString = `${moment().format("MM/DD/YYYY")}`;
    const timeString = `${moment().format("HH:mm:ss")}`;

    const onSuccessLogout = () => {
        localStorage.clear()
        history.push('/')
    }
    const onLogoutFail = (err) => {
        console.log('Logout Failed!', err)
    }

    const handleLogout = () => {
        LoginService.getInstance().logout(
            onSuccessLogout,
            onLogoutFail
        )
    }

    return (
        <div className="main-container">
            <div className="title">
                <div className="title-logo">
                    <img
                        id="montefiore"
                        alt="Montefiorelogo"
                        src={Montefiore}
                        style={{ height: "30px" }}
                    />
                </div>
                <div className="title-content">
                    {dateString} -&nbsp;
                    {timeString} |&nbsp;
                    {loginModel ? loginModel.user.userId : ""} |&nbsp;
                    <span className="logout-btn" onClick={handleLogout}>logout</span>
                </div>
            </div>
            <CustomizedTabs
                customStyle={tabStyles}
                setTabValue={handleTabChange}
                tabValue={tabValue}
                tabList={tabList}
            />
            <div className="container-main-view">
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
        </div>
    )
}

export default Main;