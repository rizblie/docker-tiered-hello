'use strict'

const defaultPort = (typeof process.env.PORT !== 'undefined')
  ? process.env.PORT
  : '80'

const program = require('commander')
program
  .version('1.0.0')
  .requiredOption('-b, --backend <uri>', 'uri of backend service')
  .option('-p, --port <port>', 'server port', defaultPort)
  .parse(process.argv)

const port = parseInt(program.port)
const backend = program.backend.trim()

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const axios = require('axios');

// Constants
const HOST = '0.0.0.0'

app.get('/hello/:name', (req, res) => {
  var name = req.params.name

  res.set('Cache-Control', 'no-cache')

  console.log(`Calling backend: ${backend}`)

  axios.get(
    backend, { responseType: 'json' }
  )
  .then(function(response) {
    res.send(
      `${response.data.greeting} ${name}<br>${response.data.message}<br>` +
      `<br>timestamp: ${response.data.timestamp}`
    )
  })
  .catch(function(error) {
    console.log(JSON.stringify(error))
    console.trace()
    res.send(JSON.stringify(error))
  })
})
app.get('/ping', (req, res) => {
  res.send("ok")
})

const server = app.listen(port, HOST);
console.log(`Service running on http://${HOST}:${port}`);

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.')
  console.log('Closing http server.')
  server.close(() => {
    console.log('Http server closed.')
    process.exit(0);
  })
})