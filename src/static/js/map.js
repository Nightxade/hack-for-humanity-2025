const hostname = '127.0.0.1';
const flask_port = 5000;
const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

document.addEventListener("DOMContentLoaded", async function () {
    // Initialize Leaflet map
    var map = L.map('map').setView([51.505, -0.09], 13); // London

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 7,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var markers = [];
    // try {
    //     const response = await fetch(`http://${hostname}:${flask_port}/map-data/`,{
    //         method: 'GET',
    //         headers: headers,
    //     });
    //     const data = await response.json();

    //     // Places markers on the map
    //     markers = data.map(event => ({
    //         id: event.id,
    //         position: { lat: event.position[0], lng: event.position[1] },
    //         city: event.city
    //     }));
    // } catch (error) {
    //     console.log('wtf');
    // }

    // Loop through markers array and add them to the map
    markers.forEach(markerInfo => {
        var marker = L.marker(markerInfo.position).addTo(map);

        marker.bindPopup(
            `<div class="popup-content">
                <h3>${markerInfo.name}</h3>
                <div id="content-${markerInfo.id}">
                    <p class="loading">Loading data...</p>
                </div>
            </div>`
        );

        // Fetch event data when popup opens
        marker.on('popupopen', async function() {
            try {
                const response = await fetch(`http://${hostname}:${flask_port}/event-data/`,{
                    method: 'POST',
                    headers: headers,
                });
                const data = await response.json();

                // Update the popup content with received data
                document.getElementById(`content-${markerInfo.id}`).innerHTML = `
                    <p>Event Data: ${JSON.stringify(data)}</p>
                `;
            } catch (error) {
                document.getElementById(`content-${markerInfo.id}`).innerHTML = `
                    <p style="color: red;">Error loading data: ${error.message}</p>
                `;
            }
        });
    });
});
