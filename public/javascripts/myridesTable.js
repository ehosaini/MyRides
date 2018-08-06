let userHistoryAjax = (uuid) => {
    return $.ajax({
        url: "/user-history",
        type: 'GET',
        data: {
            uuid: `${uuid}`
        }
    });
}

let userHistoryPromise = (uuid) => {
    return new Promise((resolve) => {
        resolve(userHistoryAjax(uuid));
    });
}

$(document).ready(async()=>{
 
    //    const uberId = $(".welcome").data("uber-id");
    const uberId = '78711505-05d9-4afd-bc18-c43e926c292f'; // replace with session data
    const data = await userHistoryPromise(uberId).then(result => result).catch(error => console.log(error));
    
    const userHistory = [];
    data.forEach(element => {
        const history = {};
        const city = `city-${data.indexOf(element)}`;
        history['city'] = element['_id']['city'];
        history['trips_count'] = element['city_trips_count'];
        userHistory.push(history);
    });

    // Order cities by trip counts
    const orderedHistory = _.orderBy(userHistory, ['trips_count'], ['desc']);
    
    // Populate user's history table
    orderedHistory.forEach((history)=>{
        const row = `<tr><th>${history['city']['display_name']}</th><td>${history['trips_count']}</td></tr>`
        $('#trips-summary').append(row);
    })
});