import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import config from './../config.json';
import pinGrey from './../assets/pin-grey.png'
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
        pitch: 120, // pitch in degrees
      //  bearing: -60, // bearing in degrees
      //  center: [-74.065604, 4.652280],
        center: this.props.center,
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
    //  console.log('json is', nextProps)
      var self = this

      nextProps.geoJson.features.forEach((point) => {
        console.log('loaded point', point)

        //  create pin
        var el = document.createElement('div');
        el.className = 'marker';
      //  el.style.backgroundImage = 'url(http://thedeependdesign.com/wp-content/uploads/2012/11/8-bit-275x275-27.png)';
        el.style.backgroundImage = 'url('+ pinBlue + ')';
        el.style.width = '30px';
        el.style.height = '40px';
        el.style.backgroundSize = 'cover'
        //el.style.transition = 'width 2s height 2s'
        el.addEventListener('click', function() {
            // window.alert(JSON.stringify(point))
        });
        el.onmouseover = () => {
        //  console.log("mouse")
          el.style.backgroundImage = 'url('+ pinBlue + ')';
          el.style.width = '60px';
          el.style.height = '80px';
        }
        el.onmouseout = () => {
        //  console.log("mouse")
          el.style.backgroundImage = 'url('+ pinBlue + ')';
          el.style.width = '30px';
          el.style.height = '40px';
        }
      //   <div className="text-2xl">{this.props.libro.fields.Nombre} </div>
        // var el = document.createElement('div');
        // el.className = 'marker';
        // el.innerHTML = `<div class="bg-black text-white p-4 text-large font-sans">
        //     <div class="text-sm mb-4 italic">${point.properties.Nombre}</div>
        //     </div>`
      //  el.style.backgroundImage = 'url(http://thedeependdesign.com/wp-content/uploads/2012/11/8-bit-275x275-27.png)';
        // el.style.backgroundImage = 'url('+ pinBlue + ')';
        // el.style.width = '30px';
        // el.style.height = '40px';
        // el.style.backgroundSize = 'cover'
        //el.style.transition = 'width 2s height 2s'
        el.addEventListener('click', function() {
            // window.alert(JSON.stringify(point))
        });
        el.onmouseover = () => {
        //  console.log("mouse")
          el.style.backgroundImage = 'url('+ pinBlue + ')';
          el.style.width = '60px';
          el.style.height = '80px';
          self.props.updateSelectedPoint(point)
        }
        el.onmouseout = () => {
        //  console.log("mouse")
          el.style.backgroundImage = 'url('+ pinBlue + ')';
          el.style.width = '30px';
          el.style.height = '40px';
        //  self.props.updateSelectedPoint(null)
        }
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
      this.map.on('move', () => {
        //var features = self.map.queryRenderedFeatures()
        // console.log(features)
        var bounds = self.map.getBounds()
        var center = self.map.getCenter()
      //  console.log(bounds)
        self.props.updateBounds(bounds, center)
      })
    }
  }

  render() {
    return (
      <div id='map'
        style={{width: '50%', height: '100%', position: 'fixed', top: '0px', bottom: '0px', left: '0px'}}
        ref={element => this.rootEl = element}
      >
      </div>
    );
  }
}

export default BaseMap;
