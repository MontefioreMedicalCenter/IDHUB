const app = require('express')()
const PORT = 8080
const cors = require('cors')
const bodyParser = require('body-parser')
const sendResponse = require('./sendResponse')
const path = require('path')
const loginResponse = require('./response/loginResponse')
const loginError = require('./error/loginError')
const { findWorklist } = require('./response/findWorklistResponse')

const findWorklistError = require('./error/findWorklistError')
const lookuplistError = require('./error/lookuplistError')
const lookuplistResponse = require('./response/lookuplistResponse')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.post('/IdentityHub/api/authenticationsvc/authenticateUser', (req, res) => {
    if (req.body.userName === 'flexicious' && req.body.password === 'support') {
        sendResponse(res, 200, loginResponse)
    } else {
        sendResponse(res, 400, loginError)
    }
})

app.post('/IdentityHub/api/authenticationsvc/logOut', (req, res) => {
    if (req.headers.username === "mmishra") {
        sendResponse(res, 200)
    } else {
        sendResponse(res, 400)
    }
})

app.post('/IdentityHub/api/worklistsvc/findWorklistGroups', (req, res) => {
    if (req.headers.username === "mmishra") {
        sendResponse(res, 200, findWorklist)
    } else {
        sendResponse(res, 400, findWorklistError)
    }
})

app.post('/IdentityHub/api/worklistsvc/findLookupListsReCache', (req, res) => {
    if (req.headers.username === "mmishra") {
        sendResponse(res, 200, lookuplistResponse)
    } else {
        sendResponse(res, 400, lookuplistError)
    }
})

app.use(require('express').static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})