

export const contains = (beers,query)=>{
    const filtered = []
   
    beers.forEach(beer => {
    if(beer.empty == null){
        if(beer.beer_name.toLowerCase().includes(query)||beer.beer_type.toLowerCase().includes(query)){
            filtered.push(beer);
        }
    }
    });
    return filtered;
}