const request = require("request")
const forecast = (lon,lat, callback) => { 
  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
    qs: {q: `${lon},${lat}`},
    headers: {
      'x-rapidapi-key': 'dee82f358dmshf02863162d81dd2p1d8c65jsn4d9ec5726c56',
      'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
      useQueryString: true
    }
  };

    request(options, (erorr, {body} ) => {
        if (erorr) {
            callback('Unable to connect to the server!', undefined)
        } else if ( body.message === "location is not defined correctly") {
            callback('Please put correct cordinantes!', undefined)
        } else {
          console.log(lon,lat)
          reslut = JSON.parse(body)
          console.log(reslut)
        }
      })}
    
    
module.exports = forecast;