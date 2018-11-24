import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import config from './../config.json';
import pinBlue from './../assets/pin-blue.png'

class BaseMap extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    mapboxgl.accessToken = config.mapbox.token;
    this.map = new mapboxgl.Map({
        container: this.rootEl,
        style: config.mapbox.style,
        attributionControl: 'false',
        center: [-74.065604, 4.652280],
        zoom: 14
    })
  // <div id='map'
  //   style={{width: '100%', height: '100%', position: 'fixed', top: '0px', bottom: '0px', left: '0px'}}
  //   ref={element => this.rootEl = element}
  // >
  // </div>
  }

  // Load points onto map
  componentWillReceiveProps (nextProps) {
    if(!this.props.loaded && nextProps.loaded) {
      console.log('json is', nextProps)

      nextProps.geoJson.features.forEach((point) => {
        console.log(point)
        var el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = 'url(' + pinBlue + ')'
        el.style.backgroundSize = 'contain'
        el.style.width = '50px';
        el.style.height = '69px';

        el.addEventListener('click', function() {
            window.alert(JSON.stringify(point))
        });

        // add marker to map
     new mapboxgl.Marker(el)
       .setLngLat(point.geometry.coordinates)
       .addTo(this.map);
      })

      // this.map.addLayer({
      //   "id": "points",
      //   "type": "symbol",
      //   "source": {
      //     "type": "geojson",
      //     "data": nextProps.geoJson
      //   }
      // })
    }
  }

  render() {
    return (
      <div id='map'
        style={{width: '100%', height: '100%', position: 'fixed', top: '0px', bottom: '0px', left: '0px'}}
        ref={element => this.rootEl = element}
      >
      </div>
    );
  }
}

export default BaseMap;
