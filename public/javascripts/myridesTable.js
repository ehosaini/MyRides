/* ----------------------- jQuery Script ------------------- */
$(document).ready(async () => {
    // Selectors
    const dataLoadCue = $('#data-loading-cue');

    // Helper scripts that fetch and process user data prior to populating it
    const uberId = $(".welcome").data("uber-id");
    const data = await userHistoryPromise(uberId).then(result => result).catch(error => console.log(error));
    const userHistory = await processUserHistory(data);

    // Order cities by trip counts in descending order
    const orderedHistory = _.orderBy(userHistory, ['trips_count'], ['desc']);

    // Hide the loading que prior to populating the table
    dataLoadCue.css('display', 'none');

    // Populate user's history table
    orderedHistory.forEach((history) => {
        const row = `<tr><th>${history['city']['display_name']}</th><td>${history['trips_count']}</td></tr>`
        $('#trips-summary').append(row);
    })
});