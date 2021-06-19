const cities = require('./cities.json')
var preProcess = require('./preProcess')
var shortPath = require('./shortPath')

function formGraph(contCities, startCity){
    let continents = Object.keys(contCities)
    let num = continents.length
    let adjMatrix = Array(num).fill(0).map(x => Array(num).fill(0))
    let cityMatrix = Array(num).fill(0).map(x => Array(num).fill(''))
    let startCont = cities[startCity].contId
    let startCityLoc = cities[startCity].location
    let curContCity = startCity
    let curContCityLoc = startCityLoc
    for(let i=0;i<num;i++){
        if(continents[i] == startCont){
            let temp = continents[0]
            continents[0] = continents[i]
            continents[i] = temp 
        }
    }
    // console.log("continents" ,continents)
    continents.forEach((cont,ind) => {
        // let curCont = cont
        for(let i=0;i<num;i++){
            let min = Number.MAX_SAFE_INTEGER
            let minCity = ''
            if(continents[i] != cont && continents[i] !=startCont){
            // console.log("in 2nd for",cont,continents[i])
                contCities[continents[i]].forEach(cityId =>{
                    let curCityLoc = cities[cityId].location
                    let dist = preProcess.getDistanceFromLatLonInKm(curContCityLoc.lat,curContCityLoc.lon,curCityLoc.lat,curCityLoc.lon)
                    // console.log("distance",cont,cityId,dist)
                    if(dist < min){
                        min = dist
                        minCity = cityId
                    }
                })
                // console.log("min distance",min,curContCity,minCity,cities[minCity].contId)
                adjMatrix[ind][i] = min
                cityMatrix[ind][i] = minCity
            }
            min = Number.MAX_SAFE_INTEGER
            minCity = ''
        }
        curContCity = ind<num-1?cityMatrix[0][ind+1]:''
        curContCityLoc = ind<num-1?cities[curContCity].location:''
        // console.log("==========",cityMatrix,curContCity)
    });
    for(let i=0;i<num;i++){
        adjMatrix[i][0] = adjMatrix[0][i]
        cityMatrix[i][0] = cityMatrix[0][i]
    }
    return {adjMatrix, cityMatrix}
}
function findPath(cities,start){
    let ans = {
        cityOrder : [],
        distance : 0
    }
    let continentCities = preProcess.groupByContinent(cities)
    // console.log("continent wise cities",continentCities)
    let graph = formGraph(continentCities,start)
    // console.log("graph formed",graph)
    let contOrder = shortPath.findShortPath(graph.adjMatrix,0)
    // console.log("short path",contOrder)
    ans['distance'] = contOrder.distance
    for(let i=0; i<contOrder.order.length-1;i++ ){
        let el = contOrder.order[i], elm =  contOrder.order[i+1]
        if(el ==0 || elm ==0){
            ans.cityOrder.push(start)
        }else{
            ans.cityOrder.push(graph.cityMatrix[el][elm])
        }
    }
    return ans
}
console.log(findPath(cities,'BOM'))