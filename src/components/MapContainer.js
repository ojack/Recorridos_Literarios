import React from 'react';
import MapData from './MapData.js'
import BaseMap from './BaseMap.js'
import InfoPanel from './InfoPanel.js'

class MapContainer extends React.Component {
  constructor (props) {
    super(props)

    this.mapData = new MapData()

    this.state = {
      geoJson: {},
      // mapCenter: [],
      // textos: [],
      // userLocation: [],
      // selected: null,
      loaded: false,
      bounds: null
    //  styleURL: this._mapOptions[0].data,
    }
    this.updateBounds = this.updateBounds.bind(this)
  }

  updateBounds(newBounds) {
    console.log('new bounds', newBounds)
    this.setState({bounds: newBounds})
  }

  componentDidMount () {
    this.mapData.loadData().then(()=>{
    //  console.log(this.mapData.getGeoJson())
      this.setState({ geoJson : this.mapData.getGeoJson(), loaded: true})
      //console.log("data loaded")
    })
  }

  render () {
    return <div>
      <BaseMap geoJson={this.state.geoJson} loaded={this.state.loaded} updateBounds={this.updateBounds}/>
      <InfoPanel geoJson={this.state.geoJson} data={this.mapData} loaded={this.state.loaded} bounds={this.state.bounds}/>
    </div>
  }
}

export default MapContainer
