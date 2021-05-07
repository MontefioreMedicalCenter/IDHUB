import Login from '../../components/Login'
import Main from '../../components/Main'
import RequestWorkList from '../../components/RequestWorkList'
import ReviewerWorkList from '../../components/ReviewerWorkList'
import UserModifier from '../../components/Admin/Views/UserModifier'
import AdminTab from '../../components/Admin/Views/Admin'



const ROUTES = [
	{ name: 'login', url: '/', private: false, component: Login, exact: true },
	{ name: 'main', url: '/main', private: true, component: Main, exact: false }
]

export const PRIVATE_ROUTES = [
	{
		name: 'worklist',
		url: '/main/worklist',
		private: true,
		component: RequestWorkList,
		exact: true
	},{
		name: 'worklist',
		url: '/main/reviewer',
		private: true,
		component: ReviewerWorkList,
		exact: true
	},{
		name: 'users',
		url: '/main/users',
		private: true,
		component: UserModifier,
		exact: true
	},{
		name: 'users',
		url: '/main/admin',
		private: true,
		component: AdminTab,
		exact: true
	},{
		name: 'users',
		url: '/main/admin/department',
		private: true,
		component: AdminTab,
		exact: true
	},{
		name: 'users',
		url: '/main/admin/locations',
		private: true,
		component: AdminTab,
		exact: true
	},{
		name: 'users',
		url: '/main/admin/usertype',
		private: true,
		component: AdminTab,
		exact: true
	},{
		name: 'users',
		url: '/main/admin/title',
		private: true,
		component: AdminTab,
		exact: true
	}
]

// const tabList = [
// 	{ label: 'Department', value: 0, path: '/main/admin/department' },
// 	{ label: 'Locations', value: 1, path: '/main/admin/locations' },
// 	{ label: 'User Types ', value: 2, path: '/main/admin/usertype' },
// 	{ label: 'Title', value: 3, path: '/main/admin/title' }
// ]

export default ROUTES
