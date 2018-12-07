import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import config from './../config.json';
import pin from './../assets/pin.png'
import pinSelected from './../assets/pin-selected.png'


class BaseMap extends Component {
  constructor() {
    super()
    this.markersById = {}
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
    var self = this

    // If data has not been loaded yet, load initial data
    if(!this.props.loaded && nextProps.loaded) {
    //  console.log('json is', nextProps)

      nextProps.geoJson.features.forEach((point) => {
        console.log('loaded point', point)

        //  create pin
        var el = document.createElement('div');
        el.className = 'marker';
      //  el.style.backgroundImage = 'url(http://thedeependdesign.com/wp-content/uploads/2012/11/8-bit-275x275-27.png)';
        el.style.backgroundImage = 'url('+ pin + ')';
        el.style.width = '30px';
        el.style.height = '50px';
        el.style.backgroundSize = 'cover'
        //el.style.transition = 'width 2s height 2s'
        el.addEventListener('click', function() {
            // window.alert(JSON.stringify(point))
            console.log("clicked")
            self.props.updateSelectedPoint(point, true)
            //self.map.flyTo({ center: point.geometry.coordinates, zoom: 18})
        });
        el.onmouseover = () => {
        //  console.log("mouse")
          // el.style.backgroundImage = 'url('+ pinSelected + ')';
          // el.style.width = '35px';
          // el.style.height = '75px';
          self.props.updateSelectedPoint(point, false)
        }
        el.onmouseout = () => {
        //  console.log("mouse")
          // el.style.backgroundImage = 'url('+ pin + ')';
          // el.style.width = '30px';
          // el.style.height = '50px';
        }

        var marker = new mapboxgl.Marker(el)
            .setLngLat(point.geometry.coordinates)
            .addTo(this.map);

            self.markersById[point.uniqueId] = {
              point: point,
              el: el,
              marker: marker
            }
      })
      }
    //    if(nextProps.selectedPoint !== null) {
          if(nextProps.selectedPoint !== this.props.selectedPoint) {

            console.log("NEW SELECTIONS", nextProps)
            self.clearPins()
            if(nextProps.selectedPoint !== null) {
              var selectedPoint = this.markersById[nextProps.selectedPoint]
              var el = selectedPoint.el
              el.style.backgroundImage = 'url('+ pinSelected + ')';
              el.style.width = '35px';
              el.style.height = '75px';
              if(nextProps.animate === true) {
                self.map.flyTo({ center: selectedPoint.point.geometry.coordinates, zoom: 18})
              }
            }
          } else if(nextProps.animate === true && this.props.animate !== true) {
              var selectedPoint = this.markersById[nextProps.selectedPoint]
              self.map.flyTo({ center: selectedPoint.point.geometry.coordinates, zoom: 18})
          }
  //    }
        // el.onmouseclick = () => {
        //
        // }
      //   <div className="text-2xl">{this.props.libro.fields.Nombre} </div>
        // var el = document.createElement('div');
        // el.className = 'marker';
        // el.innerHTML = `<div class="bg-black text-white p-4 text-large font-sans">
        //     <div class="text-sm mb-4 italic">${point.properties.Nombre}</div>
        //     </div>`
      //  el.style.backgroundImage = 'url(http://thedeependdesign.com/wp-content/uploads/2012/11/8-bit-275x275-27.png)';
        // el.style.backgroundImage = 'url('+ pinSelected + ')';
        // el.style.width = '30px';
        // el.style.height = '40px';
        // el.style.backgroundSize = 'cover'
        //el.style.transition = 'width 2s height 2s'



        // el.onmouseover = () => {
        // //  console.log("mouse")
        //   el.style.backgroundImage = 'url('+ pinSelected + ')';
        //   el.style.width = '35px';
        //   el.style.height = '75px';
        //   self.props.updateSelectedPoint(point)
        // }
        // el.onmouseout = () => {
        // //  console.log("mouse")
        //   el.style.backgroundImage = 'url('+ pin + ')';
        //   el.style.width = '30px';
        //   el.style.height = '40px';
        // //  self.props.updateSelectedPoint(null)
        // }
        // add marker to map


      // this.map.addLayer({
      //   "id": "points",
      //   "type": "symbol",
      //   "source": {
      //     "type": "geojson",
      //     "data": nextProps.geoJson
      //   }
      // })

      // this.map.on('move', () => {
      //   //var features = self.map.queryRenderedFeatures()
      //   // console.log(features)
      //   var bounds = self.map.getBounds()
      //   var center = self.map.getCenter()
      // //  console.log(bounds)
      //   self.props.updateBounds(bounds, center)
      // })

  }

  // reset pins to defaultState
  clearPins() {
    Object.values(this.markersById).forEach((marker) => {
      marker.el.style.backgroundImage = 'url('+ pin + ')';
      marker.el.style.width = '30px';
      marker.el.style.height = '50px';
    })
  }

  render() {
    return (
      <div id='map'
        style={{width: '100%', height: '80%', position: 'fixed', top: '0px', bottom: '0px', left: '0px'}}
        ref={element => this.rootEl = element}
      >
      </div>
    );
  }
}

export default BaseMap;
