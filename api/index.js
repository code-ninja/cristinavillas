const app = require('express')()
const ghost = require('ghost')

module.exports = { path: '/api', handler: app }

app.get('/say/:word', (req, res) => {
  res.json(req.params)
})

ghost().then(function (ghostServer){
  app.use('/', ghostServer.rootApp)
  ghostServer.start(app)
})
