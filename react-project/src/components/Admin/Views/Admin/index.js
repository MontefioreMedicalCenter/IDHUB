import React, { useState } from 'react'
import CustomizedTabs from '../../../../shared/components/Tabs'
import './admin.style.scss'
import IdDepartmentModifier from './IdDepartmentModifier'
import TitleModifier from './TitleModifier'
import { Route, Switch } from 'react-router'


const tabList = [
    { label: 'Department', value: 0, path: '/main/admin/department' },
    { label: 'Locations', value: 1, path: '/main/admin/locations' },
    { label: 'User Types ', value: 2, path: '/main/admin/usertype' },
    { label: 'Title', value: 3, path: '/main/admin/title' }
]
const routes = [{
    name: 'users',
    url: '/main/admin/department',
    private: true,
    component: IdDepartmentModifier,
    exact: true
}, {
    name: 'users',
    url: '/main/admin/locations',
    private: true,
    component: IdDepartmentModifier,
    exact: true
}, {
    name: 'users',
    url: '/main/admin/usertype',
    private: true,
    component: IdDepartmentModifier,
    exact: true
}, {
    name: 'users',
    url: '/main/admin/title',
    private: true,
    component: TitleModifier,
    exact: true
}]
const tabStyles = {
    backgroundColor: 'white',
    tabColor: 'rgba(0, 0, 0, 0.54)',
    indicatorHeight: 2,
    indicatorColor: '#3f51b5',
    textTransform: 'none',
    boxShadow:
        '0px 2px 2px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 2px 2px -1px rgba(0,0,0,0.12)',
    containerPadding: 2,
    tabHeight: '50vh'
}

const AdminTab = () => {
    const [tabValue, handleTabChange] = useState(0)
    console.log(tabValue)
    return (
        <div className="admin-main-container">
            <CustomizedTabs
                customstyle={tabStyles}
                setTabValue={handleTabChange}
                tabValue={tabValue}
                tabList={tabList}
            />
            <Switch>
                {routes.map((route, idx) => {
                    return route.component ? (
                        <Route
                            key={idx}
                            path={route.url}
                            exact={route.exact}
                            name={route.name}
                            render={props => <route.component {...props} />}
                        />
                    ) : null
                })}
            </Switch>
        </div>
    )

}
export default AdminTab;
