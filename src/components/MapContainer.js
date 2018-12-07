import React from 'react';
import MapData from './MapData.js'
import BaseMap from './BaseMap.js'
import InfoPanel from './InfoPanel.js'
import DetailView from './DetailView.js'

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
      bounds: null,
      center: {lng: -74.065604, lat: 4.652280},
      selectedPoint: null
    //  styleURL: this._mapOptions[0].data,
    }
    this.updateBounds = this.updateBounds.bind(this)
    this.updateSelectedPoint = this.updateSelectedPoint.bind(this)
  }

  updateSelectedPoint(point) {
    console.log('selected point', point)
    this.setState({selectedPoint: point})
  }

  updateBounds(newBounds, center) {
    console.log('new bounds', newBounds, center)
    this.setState({bounds: newBounds})
  }

  componentDidMount () {
    this.mapData.loadData().then(()=>{
    //  console.log(this.mapData.getGeoJson())

      //this.mapData.getGeoJson()
      this.setState({ geoJson : this.mapData.getTextosGeoJson(), loaded: true})
      //console.log("data loaded")
    })
  }
  // <InfoPanel geoJson={this.state.geoJson} data={this.mapData} loaded={this.state.loaded} bounds={this.state.bounds}/>
  // <DetailView point={this.state.selectedPoint} />
  render () {
    return <div>
      <BaseMap geoJson={this.state.geoJson} loaded={this.state.loaded} updateSelectedPoint={this.updateSelectedPoint} updateBounds={this.updateBounds} center={this.state.center}/>
      <DetailView point={this.state.selectedPoint} />
    </div>
  }
}

export default MapContainer
