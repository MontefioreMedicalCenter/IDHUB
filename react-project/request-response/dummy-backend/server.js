const app = require('express')()
const PORT = 8080
const cors = require('cors')
const bodyParser = require('body-parser')
const sendResponse = require('./sendResponse')
const path = require('path')
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
const multer = require('multer')
const storeWorklistDocument = require('./response/storeWorklistDocument')
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
		sendResponse(res, 200, findWorklist)
	} else {
		sendResponse(res, 400, findWorklistError)
	}
})

app.post('/IdentityHub/api/worklistsvc/saveWorklist', (req, res) => {
	if (req.body.worklist) {
		sendResponse(res, 200, saveWorklistResponse)
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
app.post('/IdentityHub/api/storagesvc/deleteWorklistDocument', (req, res) => {
	if (req.body.worklistId && req.body.dirListEntry) {
		sendResponse(res, 200, [])
	} else {
		sendResponse(res, 400)
	}
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
	upload.single('dirListEntry'),
	(req, res) => {
		if (req.headers.username === 'mmishra' && req.body.worklistId && req.file) {
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

app.use(require('express').static(path.join(__dirname, 'build')))

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, () => {
	console.log(`Server is running at ${PORT}`)
})
