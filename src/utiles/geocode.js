const request = require("request")
const geocode = (address, callback) => {

    const options = {
    method: 'GET',
    url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +  '.json?access_token=pk.eyJ1IjoidG9teXhyYXQiLCJhIjoiY2tya3ZqZGh1MTY4dzJvcGUzZzZxaDZ5aSJ9.4fnwO01VG9WBdbZRHYnjCQ&limit=1',
    json: true
}
    request(options, (erorr,{body}) => {
        if (erorr) {
            callback('unable to connect to the server!', undefined)
        } else if (body.message === "Not Authorized - Invalid Token") {
            callback('please put an authorized api', undefined)
       } else if  (body.features[0] === undefined) {
     //   const placeName = body.features[0].place_name;
    
       //  const latitude = 0
         //cconst longtude = 0
         callback(undefined, {
             latitude,
             longtude,
             placeName: 'enter a correct name'
         }) 
        } else {
        callback(undefined,{
            latitude: body.features[0].geometry.coordinates[1],
            longtude: body.features[0].geometry.coordinates[0],
            placeName: body.features[0].place_name
        })
        }
    })
}
module.exports = geocode;