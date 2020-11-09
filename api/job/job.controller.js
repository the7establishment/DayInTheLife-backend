var axios = require('axios');
var mongoose = require('mongoose');

exports.getByKeyword = function(req, res){
  var keyword = req.params.keyword
  const config = {
    headers: { Authorization: `Bearer ${process.env.CareerOne_API_Key}`}
  }
  axios.get(
    `https://api.careeronestop.org/v1/occupation/${process.env.CareerOne_UserId}/${keyword}/Y/0/100`,
    config
  )
  .then(function(response){
    console.log(`Found this many matches ${response.data.RecordCount}`)
    res.status(200).send(response.data)
  })
  .catch(err => {
    console.log(err)
    res.status(500).send(err)
  })
}