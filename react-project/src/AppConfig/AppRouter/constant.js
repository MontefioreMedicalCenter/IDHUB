import Login from '../../components/Login'
import Main from '../../components/Main'
import RequestWorkList from '../../components/RequestWorkList'

const ROUTES = [
   { name: 'login', url: '/', private: false, component: Login, exact: true },
   { name: 'main', url: '/main', private: true, component: Main, exact: false },
]

export const PRIVATE_ROUTES = [
   { name: 'worklist', url: '/main/worklist', private: true, component: RequestWorkList, exact: true },
]

export default ROUTES