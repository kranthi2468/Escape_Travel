exports.groupByContinent = function(obj){
    let cont = {}
    for(elem in obj ){
        let contId = obj[elem]['contId']
        if(cont[contId]){
            cont[contId].push(obj[elem]['id'])
        }else{
            cont[contId] = [obj[elem]['id']]
        }
    };
    return cont
}

exports.getDistanceFromLatLonInKm = function (lat1,lon1,lat2,lon2) {
    // console.log("in getDistanceFromLatLonInKm",lat1,lon1,lat2,lon2)
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return parseInt(d);
}
function deg2rad(deg) {
    return deg * (Math.PI/180)
}