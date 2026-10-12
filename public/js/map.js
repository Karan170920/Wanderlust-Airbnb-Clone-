    mapboxgl.accessToken = mapToken;
    const targetCoords = listing.geometry.coordinates;
   

    const map = new mapboxgl.Map({
        // accessToken: 'pk.eyJ1Ijoic2lnbWEtOSIsImEiOiJjbXV2M24zb3gwMG9tMnlxeDdrOWw3NWlrIn0.amphmn-L9K1N8VzLEX7EWw',
        container: 'map', // container ID
        style: "mapbox://styles/mapbox/satellite-streets-v12",
        center: targetCoords, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        projection:'globe',
        zoom: 9 ,// starting zoom
        
    });


    const marker = new mapboxgl.Marker({color: 'red'})
    .setLngLat(targetCoords)//Listing.geometry.coordinates
    .setPopup(new mapboxgl.Popup({offset: 25})
    .setHTML(`<h4>${listing.location}</h4><p>Exact location provided after booking</p>`))
    .addTo(map);

    // Mapbox ka ready-made live GPS button
const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true // Exact mobile GPS ke liye
    },
    trackUserLocation: true,    // Jaise-jaise aap move honge, map camera sath chalega
    showUserHeading: true       // Phone jis direction mein ghumega, arrow wahan point karega
});

// Button ko map ke top-right corner par lagayein
map.addControl(geolocate, 'top-right');

map.on('style.load', () => {
  map.setFog({
    color: 'rgb(186, 210, 235)', // Lower atmosphere
    'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
    'horizon-blend': 0.02, // Atmosphere thickness (default 0.2 at low zooms)
    'space-color': 'rgb(11, 11, 25)', // Background color
    'star-intensity': 1.0 // Background star brightness (default 0.35 at low zoooms )
  });
});
    
   