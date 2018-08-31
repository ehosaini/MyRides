/* ----------------------- jQuery Script ------------------- */
$(document).ready(async () => {
    // Selectors
    const dataLoadCue = $('#data-loading-cue');

    // Helper scripts that fetch and process user data prior to populating it
    const uberId = $(".welcome").data("uber-id");
    const data = await userHistoryPromise(uberId).then(result => result).catch(error => console.log(error));

    if (data) {
        const userHistory = await processUserHistory(data);

        // Order cities by trip counts in descending order
        const orderedHistory = _.orderBy(userHistory, ['trips_count'], ['desc']);
        console.log(orderedHistory.length)

        if (orderedHistory.length !== 0) {
            // Hide the loading cue prior to populating the table
            dataLoadCue.css('display', 'none');
            // Populate user's history table
            orderedHistory.forEach((history) => {
                const row = `<tr><th>${history['city']['display_name']}</th><td>${history['trips_count']}</td></tr>`
                $('#trips-summary').append(row);
            });
        };

        const text = '<h4 class="text-danger">You do not have a ride history with Uber.</h4>'
        console.log(text);
        dataLoadCue.html(text);

    } else {
        // Hide the loading cue and show message
        dataLoadCue.css('display', 'none');
        $(".welcome").append("<h3 class='text-warning'>We could not get data, please try again later.</h3>");
    }


});