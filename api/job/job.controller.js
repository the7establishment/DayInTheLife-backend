var axios = require('axios');
var mongoose = require('mongoose');

const config = {
  headers: { Authorization: `Bearer ${process.env.CareerOne_API_Key}`}
}

exports.getByKeyword = function(req, res){
  var keyword = req.params.keyword
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

exports.getJobDescriptionByOnetCode = function(req, res){
  var onetCode = req.params.onetCode
  var location = req.params.location
  const config = {
    headers: { Authorization: `Bearer ${process.env.CareerOne_API_Key}`}
  }
  axios.get(
    `https://api.careeronestop.org/v1/jdw/${process.env.CareerOne_UserId}/${onetCode}/${location}/Purpose`,
    config
  )
  .then(function(response){
    console.log(`Found Job Description for ${onetCode}`)
    res.status(200).send(response.data)
  })
  .catch(err => {
    console.log(`Could not find job description for ${onetCode}`)
    console.log(err)
    res.status(500).send(err)
  })
}

exports.getSalariesByOccupationAndLocation = function(req, res){
  var keyword = req.params.keyword
  var location = req.params.location
  axios.get(
    `https://api.careeronestop.org/v1/comparesalaries/${process.env.CareerOne_UserId}/wageocc?keyword=${keyword}&location=${location}&sortColumns=0&sortDirections=0&sortBy=0`,
    config
  )
  .then(function(response){
    console.log(`Found Salary for ${response.data.LocationsList[0].OccupationList[0].Title} in ${location}`)
    res.status(200).send(response.data)
  })
  .catch(err => {
    console.log(err)
    res.status(500).send(err)
  })
}

exports.getToolsAndTechByOccupation = function(req, res){
  var onetCode = req.params.onetCode
  axios.get(
    `https://api.careeronestop.org/v1/techtool/${process.env.CareerOne_UserId}/${onetCode}`,
    config
  )
  .then(function(response){
    console.log(`Found ${response.data.RecordCount} Tools for ${response.data.TechToolOccupationDetails.OnetTitle}`)
    res.status(200).send(response.data)
  })
  .catch(err => {
    console.log(err)
    res.status(500).send(err)
  })
}