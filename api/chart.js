const app = require('express')()

module.exports = {
  path: '/chartData',
  handler: app
}

app.get('/', (req, res) => {
  res.json(fillData())
})


function fillData() {

  let datacollection = {
    labels: [getRandomInt(), getRandomInt(), getRandomInt()],
    datasets: [{
      label: 'Data One',
      backgroundColor: 'blue',
      data: [getRandomInt(), getRandomInt(), getRandomInt()]
    }, {
      label: 'Data two',
      backgroundColor: 'red',
      data: [getRandomInt(), getRandomInt(), getRandomInt()]
    }]
  }

  return datacollection

}

function getRandomInt() {
  return Math.floor(Math.random() * (50 - 5 + 1)) + 5
}
