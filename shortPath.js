exports.findShortPath = function(adjMat) {
    let ary=adjMat,completed=[],n,cost=0,ans=[];
    n= ary.length
    for(i=0;i < n;i++){
        completed[i] =0
    }
    function least( c){
        let nc=Number.MAX_SAFE_INTEGER;
        let min=Number.MAX_SAFE_INTEGER,kmin;
        for(let i=0;i < n;i++){
            if((ary[c][i]!=0)&&(completed[i]==0)){
                if(ary[c][i]+ary[i][c] < min){
                    min=ary[i][0]+ary[c][i];
                    kmin=ary[c][i];
                    nc=i;
                }
            }
        }
        if(min!=Number.MAX_SAFE_INTEGER)
        cost+=kmin;
        
        return nc;
    }
    function mincost( city){
        let ncity;
        completed[city]=1;
        ans.push(city)
        ncity=least(city);
        
        if(ncity==Number.MAX_SAFE_INTEGER) {
            ncity=0;
            ans.push(ncity)
            cost+=ary[city][ncity];
            return;
        }
        mincost(ncity);
    }
    mincost(0)
    // console.log(cost,ans)
    return {order: ans,distance:cost}
}
// console.log(findShortPath([[0,4,1,3],[4,0,2,1],[1,2,0,5],[3,1,5,0]]))