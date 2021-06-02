const app = require('express')()
const PORT = 8080
const cors = require('cors')
const bodyParser = require('body-parser')
const sendResponse = require('./sendResponse')
const path = require('path')
const multer = require('multer')
const loginResponse = require('./response/loginResponse')
const loginResponseRequestor = require('./response/loginResponseRequestor')
const loginResponseReviewer = require('./response/loginResponseReviewer')
const loginError = require('./error/loginError')
const { findWorklist } = require('./response/findWorklistResponse')

const findWorklistError = require('./error/findWorklistError')
const lookuplistError = require('./error/lookuplistError')
const lookuplistResponse = require('./response/lookuplistResponse')
const saveWorklistResponse = require('./response/saveWorklistResponse')
const listDocumentLibraryFiles = require('./response/listDocumentLibraryFiles')
const deleteWorklist = require('./response/deleteWorklist')
const storeWorklistDocument = require('./response/storeWorklistDocument')
const saveWorkGroupResponse = require('./response/saveWorkGroupResponse')
const sendAcceptMailToHelpDeskResponse = require('./response/sendAcceptMailToHelpDeskResponse')
const sendRejectMailToRequestorResponse = require('./response/sendRejectMailToRequestorResponse')
const findProcessedWorklistGroups = require('./response/findProcessedWorklistGroups')
const findWorklistGroupReviewer = require('./response/findWorklistGroupReviewer')
const getAllRoles = require('./response/getAllRoles')
const getAllUsers = require('./response/getAllUsers')
const unsetRole = require('./response/unsetRole')
const deleteDepartment = require('./response/deleteDepartment')
const deleteEmployeeSubgroup = require('./response/deleteEmployeeSubgroup')
const deleteTitle = require('./response/deleteTitle')
const findDepartments = require('./response/findDepartments')
const findEmployeeSubgroup = require('./response/findEmployeeSubgroup')
const findCampusCodes = require('./response/findCampusCodes')
const findTitles = require('./response/findTitles')
const saveCampusCode = require('./response/saveCampusCode')
const saveDepartment = require('./response/saveDepartment')
const saveEmployeeSubgroup = require('./response/saveEmployeeSubgroup')
const saveTitle = require('./response/saveTitle')
const saveUserOnly = require('./response/saveUserOnly')
const deleteUser = require('./response/deleteUser')
const addUserOnly = require('./response/addUserOnly')


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var upload = multer({ dest: 'upload/' })

app.post('/IdentityHub/api/authenticationsvc/authenticateUser', (req, res) => {
	if (req.body.userName === 'flexicious' && req.body.password === 'support') {
		sendResponse(res, 200, loginResponse)
	} else if (
		req.body.userName === 'requestor' &&
		req.body.password === 'support'
	) {
		sendResponse(res, 200, loginResponseRequestor)
	} else if (
		req.body.userName === 'reviewer' &&
		req.body.password === 'support'
	) {
		sendResponse(res, 200, loginResponseReviewer)
	} else {
		sendResponse(res, 400, loginError)
	}
})

app.post('/IdentityHub/api/authenticationsvc/logOut', (req, res) => {
	if (req.headers.username === 'mmishra') {
		sendResponse(res, 200)
	} else {
		sendResponse(res, 400)
	}
})

app.post('/IdentityHub/api/worklistsvc/findWorklistGroups', (req, res) => {
	if (req.headers.username === 'mmishra') {
		sendResponse(res, 200, findWorklistGroupReviewer)
	} else {
		sendResponse(res, 400, findWorklistError)
	}
})

app.post('/IdentityHub/api/worklistsvc/saveWorklist', (req, res) => {
	if (req.headers.username === 'mmishra' && req.body.worklist) {
		sendResponse(res, 200, saveWorklistResponse)
	} else {
		sendResponse(res, 400)
	}
})

app.post('/IdentityHub/api/worklistsvc/saveWorkGroup', (req, res) => {
	if (req.headers.username === 'mmishra' && req.body.worklistGroup) {
		sendResponse(res, 200, saveWorkGroupResponse)
	} else {
		sendResponse(res, 400)
	}
})

app.post('/IdentityHub/api/worklistsvc/sendAcceptMailToHelpDesk', (req, res) => {
	if (req.body.worklistGroup) {
		sendResponse(res, 200, sendAcceptMailToHelpDeskResponse)
	} else {
		sendResponse(res, 400)
	}
})

app.post('/IdentityHub/api/worklistsvc/sendRejectMailToRequestor', (req, res) => {
	if (req.body.worklistGroup) {
		sendResponse(res, 200, sendRejectMailToRequestorResponse)
	} else {
		sendResponse(res, 400)
	}
})

app.post('/IdentityHub/api/worklistsvc/findLookupListsReCache', (req, res) => {
	if (req.headers.username === 'mmishra') {
		sendResponse(res, 200, lookuplistResponse)
	} else {
		sendResponse(res, 400, lookuplistError)
	}
})
app.post('/IdentityHub/api/worklistsvc/deleteWorklist', (req, res) => {
	if (req.body.worklist) {
		sendResponse(res, 200, deleteWorklist)
	} else {
		sendResponse(res, 400)
	}
})
app.post('/IdentityHub/api/worklistsvc/deleteWorklistGroup', (req, res) => {
	if (req.body.worklistGroup) {
		sendResponse(res, 200, deleteWorklist)
	} else {
		sendResponse(res, 400)
	}
})
app.post('/IdentityHub/api/storagesvc/deleteWorklistDocument', (req, res) => {
	if (req.body.worklistId && req.body.dirListEntry) {
		sendResponse(res, 200, [])
	} else {
		sendResponse(res, 400)
	}
})
app.post('/IdentityHub/api/worklistsvc/findProcessedWorklistGroups', (req, res) => {
	if (req.body.processedFromDate && req.body.processedToDate && req.body.firstName && req.body.lastName) {
		sendResponse(res, 200, findProcessedWorklistGroups)
	} else {
		sendResponse(res, 400)
	}
})
app.post('/IdentityHub/api/boxsvc/uploadFile', (req, res) => {
	if (req.body.worklistId ) {
		sendResponse(res, 200, {"message":"wk.00011881"})
	} else {
		sendResponse(res, 400)
	}
})
app.post('/IdentityHub/api/adminsvc/unsetRole', (req, res) => {
	if (req.body.userId && req.body.roleId ) {
		sendResponse(res, 200, unsetRole)
	} else {
		sendResponse(res, 400)
	}
})
app.post('/IdentityHub/api/adminsvc/setRole', (req, res) => {
	if (req.body.userId && req.body.roleId ) {
		sendResponse(res, 200, {})
	} else {
		sendResponse(res, 400)
	}
})
app.post('/IdentityHub/api/adminsvc/deleteDepartment', (req, res) => {
	if (req.body.department) {
		sendResponse(res, 200, deleteDepartment)
	} else {
		sendResponse(res, 400)
	}
})
app.post('/IdentityHub/api/adminsvc/deleteEmployeeSubgroup', (req, res) => {
	if (req.body.idEmployeeSubGroupStr) {
		sendResponse(res, 200, deleteEmployeeSubgroup)
	} else {
		sendResponse(res, 400)
	}
})
app.post('/IdentityHub/api/adminsvc/deleteTitle', (req, res) => {
	if (req.body.idTitleStr) {
		sendResponse(res, 200, deleteTitle)
	} else {
		sendResponse(res, 400)
	}
})
app.post('/IdentityHub/api/adminsvc/saveCampusCode', (req, res) => {
	if (req.body.idcampusCodeStr) {
		sendResponse(res, 200, saveCampusCode)
	} else {
		sendResponse(res, 400)
	}
})
app.post('/IdentityHub/api/adminsvc/saveDepartment', (req, res) => {
	if (req.body.department) {
		sendResponse(res, 200, saveDepartment)
	} else {
		sendResponse(res, 400)
	}
})
app.post('/IdentityHub/api/adminsvc/saveEmployeeSubgroup', (req, res) => {
	if (req.body.idEmployeeSubGroupStr) {
		sendResponse(res, 200, saveEmployeeSubgroup)
	} else {
		sendResponse(res, 400)
	}
})
app.post('/IdentityHub/api/adminsvc/saveTitle', (req, res) => {
	if (req.body.idTitleStr) {
		sendResponse(res, 200, saveTitle)
	} else {
		sendResponse(res, 400)
	}
})
app.post('/IdentityHub/api/adminsvc/saveUserOnly', (req, res) => {
	if (req.body.user) {
		sendResponse(res, 200, saveUserOnly)
	} else {
		sendResponse(res, 400)
	}
})
app.post('/IdentityHub/api/adminsvc/deleteUser', (req, res) => {
	if (req.body.user) {
		sendResponse(res, 200, deleteUser)
	} else {
		sendResponse(res, 400)
	}
})
app.post('/IdentityHub/api/adminsvc/addUserOnly', (req, res) => {
	if (req.body.user) {
		sendResponse(res, 200, addUserOnly)
	} else {
		sendResponse(res, 400)
	}
})
app.post('/IdentityHub/api/adminsvc/findDepartments', (req, res) => {
	sendResponse(res, 200, findDepartments)
})
app.post('/IdentityHub/api/adminsvc/findEmployeeSubgroup', (req, res) => {
	sendResponse(res, 200, findEmployeeSubgroup)
})
app.post('/IdentityHub/api/adminsvc/findTitles', (req, res) => {
	sendResponse(res, 200, findTitles)
})
app.post('/IdentityHub/api/adminsvc/findCampusCodes', (req, res) => {
	sendResponse(res, 200, findCampusCodes)
})

app.post(
	'/IdentityHub/api/worklistsvc/loadWorklistFromSpreadsheet',
	upload.single('content'),
	(req, res) => {
		if (req.headers.username === 'mmishra' && req.body.groupFlag && req.file) {
			sendResponse(
				res,
				200,
				"Completed - Loaded 6 worklist items with Worklist IDs from 'wk.00010534' through 'wk.00010539'."
			)
		} else {
			sendResponse(res, 400)
		}
	}
)
app.post(
	'/IdentityHub/api/storagesvc/storeWorklistDocument',
	upload.single('dirListEntryContent'),
	(req, res) => {
		if (req.body.worklistId && req.body.fileName && req.file) {
			sendResponse(
				res,
				200,
				storeWorklistDocument
			)
		} else {
			sendResponse(res, 400)
		}
	}
)
app.get('/IdentityHub/api/storagesvc/listDocumentLibraryFiles', (req, res) => {
	sendResponse(res, 200, listDocumentLibraryFiles)
})
app.post('/IdentityHub/api/adminsvc/getAllRoles', (req, res) => {
	sendResponse(res, 200, getAllRoles)
})
app.post('/IdentityHub/api/adminsvc/getAllUsers', (req, res) => {
	sendResponse(res, 200, getAllUsers)
})

app.use(require('express').static(path.join(__dirname, 'build')))

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, () => {
	console.log(`Server is running at ${PORT}`)
})
