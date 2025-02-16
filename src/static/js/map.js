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
    try {
        const response = await fetch(`http://${hostname}:${flask_port}/map-data/`,{
            method: 'GET',
            headers: headers,
        });
        const data = await response.json();

        // Places markers on the map
        markers = data.map(event => ({
            id: event.id,
            position: { lat: event.position[0], lng: event.position[1] },
            city: event.city
        }));
    } catch (error) {
        console.log('wtf');
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
        marker.on('popupopen', async function() {
            try {
                const response = await fetch(`http://${hostname}:${flask_port}/event-data/`, {
                    method: 'POST',
                    headers: headers,
                });
                const data = await response.json();
        
                // 使用自定义弹窗显示数据
                window.showEventPopup(data);
                
                // 关闭 Leaflet 的原生 popup
                marker.closePopup();
            } catch (error) {
                // 错误处理也使用自定义弹窗
                window.showEventPopup({
                    error: true,
                    message: `Error loading data: ${error.message}`
                });
                marker.closePopup();
            }
        });
    });
});
