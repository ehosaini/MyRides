// Generate GoogleMap
let map = null;

function initMap() {
    map = new google.maps.Map($('#map')[0], {
        center: {
            lat: 38.889931,
            lng: -77.009003
        },
        zoom: 4
    });
}

let position = null;
let marker = null;

function dropMarker(position) {
    marker = new google.maps.Marker({
        position,
        map,
        animation: google.maps.Animation.DROP
    });
}

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


$(document).ready(async () => {
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

    // Create markes for each city that user has used Uber
    userHistory.forEach((history) => {
        let location = {
            lat: history['city']['latitude'],
            lng: history['city']['longitude']
        }

        // Add new marker with 200 milisecond delay
        setTimeout(() => dropMarker(location), 200);
    });
});