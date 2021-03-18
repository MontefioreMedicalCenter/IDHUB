const app = require('express')()
const PORT = 8000
const cors = require('cors')
const bodyParser = require('body-parser')
const sendResponse=  require('./sendResponse')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/healthcheck', (req, res) => {
    sendResponse(res,200,{ message: 'Server is working fine' })
})

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})