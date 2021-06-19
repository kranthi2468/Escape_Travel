# Escape_Travel
## Design
  run index.js file , give the city name in the end of index.js file while calling findPath function
  this solution is based on the assumption that weight of bidirectional graph is calculated based on the nearest city from previous continent.

## Data Processing 
  cities are grouped by continent and nearest cities from one continent is calculated by given function
## Algorithm
  from start city find min distance city in each continent
  in next step start from that min city in each continent and find min distance to each continents and use that distance as weight of bidirectional graph
  
  once graph is represented in adjacency matrix of graph, it boils down to min cost problem
  this is solved by computing permutations possible paths and finding shortest distance path
  
