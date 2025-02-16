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


const iconSizes = [[60, 60], [45, 45], [35, 35], [25, 25], [20, 20], [15, 15]];
const initialZoom = 5;

const categoryIcons = {
    'Natural disaster': L.icon({
        iconUrl: '/static/images/disaster_icon.png',
        iconSize: iconSizes[zoomToSize(initialZoom)],
    }),
    'Human rights': L.icon({
        iconUrl: '/static/images/equal_icon.png',
        iconSize: iconSizes[zoomToSize(initialZoom)],
    }),
    'Health and disease': L.icon({
        iconUrl: '/static/images/health_icon.png',
        iconSize: iconSizes[zoomToSize(initialZoom)],
    }),
    'Conflict of war': L.icon({
        iconUrl: '/static/images/war_icon.png',
        iconSize: iconSizes[zoomToSize(initialZoom)],
    }),
    'Environmental': L.icon({
        iconUrl: '/static/images/tree_icon.png',
        iconSize: iconSizes[zoomToSize(initialZoom)],
    }),
    'default': L.icon({
        iconUrl: '/static/images/default_icon.png',
        iconSize: iconSizes[zoomToSize(initialZoom)],
    })
};

let map;
let markersLayer;

document.addEventListener("DOMContentLoaded", async function () {
    const default_location = [37.3541, -121.9552];

    // Initialize Leaflet map
    map = L.map('map').setView(default_location, initialZoom);
    markersLayer = L.layerGroup().addTo(map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 2,
        maxZoom: 7,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var markers = [];
    try {
        const response = await fetch(`http://${hostname}:${flask_port}/map-data/`, {
            method: 'GET',
            headers: headers,
        });
        const data = await response.json();
        markers = data.map(event => ({
            id: event.id,
            position: { lat: event.position[0], lng: event.position[1] },
            name: event.name,
            city: event.city,
            category: event.category,
        }));
        
        markers = createMarkers(markers);

        // dynamic resizing of icons on zoom
        map.on('zoomend', function(e) {
            markers.forEach(marker => {
                let icon = marker.options.icon;
                icon.options.iconSize = iconSizes[zoomToSize(map.getZoom())];
                marker.setIcon(icon);
            });
        });
    } catch (error) {
        console.log('Error fetching map data:', error);
    }
});

function createMarkers(markers) {
    // Clear existing markers
    markersLayer.clearLayers();

    let markerList = [];
    markers.forEach(markerInfo => {
        const icon = categoryIcons[markerInfo.category] || categoryIcons.default;
        const marker = L.marker([markerInfo.position.lat, markerInfo.position.lng], { 
            icon: icon,
            category: markerInfo.category 
        });

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

        markersLayer.addLayer(marker);
        markerList.push(marker);
    });
    return markerList;
}

// Filter markers based on selected categories
window.addEventListener('filterMarkers', function(e) {
    const selectedCategories = e.detail.categories;
    
    markersLayer.eachLayer(marker => {
        if (selectedCategories.includes('all') || selectedCategories.includes(marker.options.category)) {
            marker.addTo(map);
        } else {
            map.removeLayer(marker);
        }
    });
});

function zoomToSize(zoom) {
    return -zoom + iconSizes.length;
}