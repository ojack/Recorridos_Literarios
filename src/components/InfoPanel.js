import React from 'react';
import MapData from './MapData.js'
import BaseMap from './BaseMap.js'

class InfoPanel extends React.Component {
  constructor (props) {
    super(props)


  }


  render () {
    // get features that are within bounds of current map view
    if(this.props.loaded===true && this.props.bounds !== null) {
      var points = this.props.geoJson.features.filter((feature) => {
        var lng = feature.geometry.coordinates[0]
        var lat = feature.geometry.coordinates[1]
        console.log(lng, this.props.bounds._sw.lng, this.props.bounds._ne.lng)
        if(lng > this.props.bounds._sw.lng && lng < this.props.bounds._ne.lng){
          if(lat > this.props.bounds._sw.lat && lat < this.props.bounds._ne.lat){
            return true
          }
        }
        return false
      }).map((point) => <div className="inline-block m-1 p-1 text-white bg-teal-dark">{point.properties.Nombre}</div>)
      console.log('points', points)
    }

    return <div id="data" className="pin-r pin-b absolute p-2 mb-10 mr-10" style={{zIndex: 100, color: '#000', width: "400px"}}>
      {points}
    </div>
  }
}

export default InfoPanel
