export const tabList = [
	{ label: 'Requestor WorkList', value: 0, path: '/main/worklist' },
	{ label: 'Service Desk Reviewer', value: 1, path: '/main/reviewer' },
	{ label: 'Manage Users ', value: 2, path: '/main/users' },
	{ label: 'Admin', value: 3, path: '/main/admin/department' }
]

export const tabStyles = {
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
