import Login from '../../components/Login'
import Main from '../../components/Main'
import RequestWorkList from '../../components/RequestWorkList'
import ReviewerWorkList from '../../components/ReviewerWorkList'
import UserModifier from '../../components/Admin/Views/UserModifier'



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
	}
]

export default ROUTES
