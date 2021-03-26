const app = require('express')()
const PORT = 8080
const cors = require('cors')
const bodyParser = require('body-parser')
const sendResponse = require('./sendResponse')
const path = require('path')
const { findWorklist, lookupList } = require('./constant')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.post('/IdentityHub/api/authenticationsvc/authenticateUser', (req, res) => {
    if (req.body.userName === 'flexicious' && req.body.password === 'support') {
        sendResponse(res, 200, { "create-date": "2018-03-26 04:00:00", "created-by": "system", "role-map": [{ "access-active-flag": 1, "created-by": "system", "id": { "role-id": "Admin", "user-id": "mmishra" }, "updated-by": "system" }], "updated-by": "system", "user-active-flag": 1, "user-email": "mmishra@montefiore.org", "user-first-name": "Mittul", "user-id": "mmishra", "user-last-name": "Mishra", "user-phone": "914-457-6018" })
    } else {
        sendResponse(res, 400, { "reason": "Login Failed. Please try again!", "message": "PBOX00070: Password invalid/Password required" })
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
        sendResponse(res, 400, {
            "reason": "Error Fetching Worklist for the Requestor: mmishra",
            "message": "wrong number of arguments"
        })
    }
})

app.post('/IdentityHub/api/worklistsvc/findLookupListsReCache', (req, res) => {
    if (req.headers.username === "mmishra") {
        sendResponse(res, 200, lookupList)
} else {
    sendResponse(res, 400,{
        "reason":"Error fetching Lookup list","message":"/ by zero"
    })
}
})

app.use(require('express').static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})