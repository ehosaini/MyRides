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


async function processUserHistory(data){
    const userHistory = [];
    data.forEach(element => {
        const history = {};
        const city = `city-${data.indexOf(element)}`;
        history['city'] = element['_id']['city'];
        history['trips_count'] = element['city_trips_count'];
        userHistory.push(history);
    });

    return userHistory;
}