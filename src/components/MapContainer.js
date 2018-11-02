import React from 'react';
import MapData from './MapData.js'
import BaseMap from './BaseMap.js'

class MapContainer extends React.Component {
  constructor (props) {
    super(props)

    this.mapData = new MapData()

    this.state = {
      geoJson: {},
      mapCenter: [],
      textos: [],
      userLocation: [],
      selected: null,
      loaded: false
    //  styleURL: this._mapOptions[0].data,
    }
  }

  componentDidMount () {
    this.mapData.loadData().then(()=>{
    //  console.log(this.mapData.getGeoJson())
      this.setState({ geoJson : this.mapData.getGeoJson(), loaded: true})
      //console.log("data loaded")
    })
  }

  render () {
    return <BaseMap geoJson={this.state.geoJson} loaded={this.state.loaded}/>
  }
}

export default MapContainer
