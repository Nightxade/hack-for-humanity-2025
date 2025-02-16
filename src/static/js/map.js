const hostname = '127.0.0.1';
const flask_port = 5000;
const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};
const popup = new MapPopup({
    width: '300px',
    backgroundColor: '#ffffff',
    borderColor: '#cccccc'
});


document.addEventListener("DOMContentLoaded", async function () {
    const default_location = [37.3541, -121.9552]

    // Initialize Leaflet map
    var map = L.map('map').setView(default_location, 13); // Santa Clara

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 7,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var markers = [];
    try {
        const response = await fetch(`http://${hostname}:${flask_port}/map-data/`,{
            method: 'GET',
            headers: headers,
        });
        const data = await response.json();
        markers = data;

        // Places markers on the map
        markers = data.map(event => ({
            id: event.id,
            position: { lat: event.position[0], lng: event.position[1] },
            city: event.city
        }));
    } catch (error) {
        console.log('Error fetching map data');
    }

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
        marker.on('popupopen', async function(e) {
            try {
                const response = await fetch(`http://${hostname}:${flask_port}/event-data/`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({ id: markerInfo.id }) 
                });
                const data = await response.json();
                
                // getting popup at marker
                const popupElement = e.popup.getElement();
                const rect = popupElement.getBoundingClientRect();
                
                marker.closePopup();
                // show the data
                popup.show(data, {
                    x: rect.left,
                    y: rect.top
                });
                
            } catch (error) {
                popup.showError(error);
            }
        });
    });
});
