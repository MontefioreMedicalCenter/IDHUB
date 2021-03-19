const app = require('express')()
const PORT = 8000
const cors = require('cors')
const bodyParser = require('body-parser')
const sendResponse = require('./sendResponse')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/IdentityHub/api/authenticationsvc/authenticateUser', (req, res) => {
    sendResponse(res, 200, { "created-by": "system", "role-map": [{ "access-active-flag": 1, "created-by": "system", "id": { "role-id": "Admin", "user-id": "mmishra" }, "updated-by": "system" }], "updated-by": "system", "user-active-flag": 1, "user-email": "mmishra@montefiore.org", "user-first-name": "Mittul", "user-id": "mmishra", "user-last-name": "Mishra", "user-phone": "914-457-6018" })
})

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})