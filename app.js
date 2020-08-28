if (process.env.NODE_ENV === "development") {
    require('dotenv').config()
    console.log('Starting...... Go!!.....')
}

const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 3000
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const router = require('./routes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)
app.use(errorHandler)

io.on('connection', socket => {
    console.log('a user connected')
    socket.on('show-data', data => {
        socket.broadcast.emit('realtime-data', data)
    })
})

http.listen(port, () => console.log(`listen on port @${port}`))