'use strict'

const defaultPort = (typeof process.env.PORT !== 'undefined')
  ? process.env.PORT
  : '80'

const defaultGreeting = (typeof process.env.GREETING !== 'undefined')
? process.env.GREETING
: 'Hello'

const defaultMessage = (typeof process.env.MESSAGE !== 'undefined')
? process.env.MESSAGE
: 'Welcome to our world!'

const program = require('commander')
program
  .version('1.0.0')
  .option('-p, --port <port>', 'server port', defaultPort)
  .option('-g, --greeting <greeting>', 'greeting', defaultGreeting)
  .option('-m, --message <message>', 'message', defaultMessage)
  .parse(process.argv)

const port = parseInt(program.port)
const greeting = program.greeting.trim()
const message = program.message.trim()

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Constants
const HOST = '0.0.0.0'

function format(o, pretty) {
  return (pretty)
    ? JSON.stringify(o, null, 2) + '\n'
    : JSON.stringify(o)
}

app.get('/data', (req, res) => {

  let pretty = (typeof req.query.pretty !== 'undefined')
  let timestamp = Date.now()
  res.set('Cache-Control', 'no-cache')

  res.type('json').send(
    format({
      "timestamp" : timestamp,
      "greeting" : greeting,
      "message" : message
    },pretty)
  )
})
app.get('/ping', (req, res) => {
  res.send("ok")
})

const server = app.listen(port, HOST);
console.log(`Service running on http://${HOST}:${port}`);

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing http server.');
  server.close(() => {
    console.log('Http server closed.');
    process.exit(0);
  })
})