mapboxgl.accessToken =
'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';
let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10',
    zoom: 8, // starting zoom
    center: [-121.81193014002105, 47.53498148210733], // starting center
});

map.on('load', () => {
    map.addSource('basemap-tiles', {
        'type': 'raster',
        'tiles': [
            '/tiles/basemap/{z}/{x}/{y}.png'
        ],
        'tileSize': 256,
        'attribution': 'Base by CartoDB, customized by Keith Ellingwood</a>'
    });

    map.addSource('salmon-tiles', {
        'type': 'raster',
        'tiles': [
            '/tiles/salmon/{z}/{x}/{y}.png'
        ],
        'tileSize': 256,
        'attribution': 'Data from King County, visualization by Keith Ellingwood</a>'
    });

    map.addSource('basemap-salmon-tiles', {
        'type': 'raster',
        'tiles': [
            '/tiles/basemap_with_salmon/{z}/{x}/{y}.png'
        ],
        'tileSize': 256,
        'attribution': 'Base by CartoDB, Data from King County, visualization by Keith Ellingwood</a>'
    });

    map.addSource('bisexual-tiles', {
        'type': 'raster',
        'tiles': [
            '/tiles/bisexual/{z}/{x}/{y}.png'
        ],
        'tileSize': 256,
        'attribution': 'Base by Mapbox, customized by Keith Ellingwood</a>'
    });

    map.addLayer({
        'id': 'basemap',
        'type': 'raster',
        'layout': {
            'visibility': 'none'
        },
        'source': 'basemap-tiles'
    });

    map.addLayer({
        'id': 'salmon',
        'type': 'raster',
        'layout': {
            'visibility': 'none'
        },
        'source': 'salmon-tiles'
    });

    map.addLayer({
        'id': 'basemap-with-salmon',
        'type': 'raster',
        'layout': {
            'visibility': 'none'
        },
        'source': 'basemap-salmon-tiles'
    });

    map.addLayer({
        'id': 'bisexual',
        'type': 'raster',
        'layout': {
            'visibility': 'none'
        },
        'source': 'bisexual-tiles'
    });
});

map.on('idle', () => {
    if (!map.getLayer('basemap') || !map.getLayer('salmon') || !map.getLayer('basemap-with-salmon') || !map.getLayer('bisexual')) {
        return;
    }

    // Enumerate ids of the layers.
    const toggleableLayerIds = ['basemap', 'salmon', 'basemap-with-salmon', 'bisexual'];

    // Set up the corresponding toggle button for each layer.
    for (const id of toggleableLayerIds) {
        // Skip layers that already have a button set up.
        if (document.getElementById(id)) {
            continue;
        }

        // Create a link.
        const link = document.createElement('a');
        link.id = id;
        link.href = '#';
        link.textContent = id;
        link.className = 'inactive';

        // Show or hide layer when the toggle is clicked.
        link.onclick = function (e) {
            const clickedLayer = this.textContent;
            e.preventDefault();
            e.stopPropagation();

            const visibility = map.getLayoutProperty(
                clickedLayer,
                'visibility'
            );

            // Toggle layer visibility by changing the layout object's visibility property.
            // if it is currently visible, after the clicking, it will be turned off.
            if (visibility === 'visible') {
                map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                this.className = '';
            } else { //otherise, it will be turned on.
                this.className = 'active';
                map.setLayoutProperty(
                    clickedLayer,
                    'visibility',
                    'visible'
                );
            }
        };

        // in the menu place holder, insert the layer links.
        const layers = document.getElementById('menu');
        layers.appendChild(link);
    }
});