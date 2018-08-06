/* ----------------------- GoogleMap Script ------------------- */
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

/* ----------------------- jQuery Script ------------------- */
$(document).ready(async () => {
    //    const uberId = $(".welcome").data("uber-id");
    const uberId = '78711505-05d9-4afd-bc18-c43e926c292f'; // replace with session data
    
    // Helper scripts that fetch and process user data prior to populating it
    const data = await userHistoryPromise(uberId).then(result => result).catch(error => console.log(error));
    const userHistory = await processUserHistory(data);

    // Create markers for each city that user has used Uber in 
    userHistory.forEach((history) => {
        let location = {
            lat: history['city']['latitude'],
            lng: history['city']['longitude']
        }

        // Add new marker with 100 millisecond delay
        setTimeout(() => dropMarker(location), 100);
    });
});