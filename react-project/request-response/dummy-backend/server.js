const app = require('express')()
const PORT = 8080
const cors = require('cors')
const bodyParser = require('body-parser')
const sendResponse = require('./sendResponse')
const path = require('path')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.post('/IdentityHub/api/authenticationsvc/authenticateUser', (req, res) => {
    if (req.body.userName === 'flexicious' && req.body.password === 'support') {
        sendResponse(res, 200, { "created-by": "system", "role-map": [{ "access-active-flag": 1, "created-by": "system", "id": { "role-id": "Admin", "user-id": "mmishra" }, "updated-by": "system" }], "updated-by": "system", "user-active-flag": 1, "user-email": "mmishra@montefiore.org", "user-first-name": "Mittul", "user-id": "mmishra", "user-last-name": "Mishra", "user-phone": "914-457-6018" })
    } else {
        sendResponse(res, 400, { "reason": "Login Failed. Please try again!", "message": "PBOX00070: Password invalid/Password required" })
    }
})

app.use(require('express').static(path.join(__dirname, 'build')));

app.get('/IdentityHub', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})