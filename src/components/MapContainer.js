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
      selectedPoint: null,
      animate: false
    //  styleURL: this._mapOptions[0].data,
    }
    //this.updateBounds = this.updateBounds.bind(this)
    this.updateSelectedPoint = this.updateSelectedPoint.bind(this)
    this.getNextTexto = this.getNextTexto.bind(this)
    this.getPreviousTexto = this.getPreviousTexto.bind(this)
  }

  updateSelectedPoint(point, animate) {
    console.log('selected point', point, animate)
    this.setState({selectedPoint: point, animate: animate})
  }

  getNextTexto(point) {
    var index = point.index
    index++
    if(point.index >= this.state.geoJson.features.length) index = 0
    this.setState({ selectedPoint: this.state.geoJson.features[index], animate: true})
  }

  getPreviousTexto(point) {
    var index = point.index
    index--
    if(point.index < 0) index = this.state.geoJson.features.length - 1
    this.setState({ selectedPoint: this.state.geoJson.features[index], animate: true})
  }
  // updateBounds(newBounds, center) {
  //   console.log('new bounds', newBounds, center)
  //   this.setState({bounds: newBounds})
  // }

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
  //updateBounds={this.updateBounds}
  render () {
    return <div>
      <BaseMap
        geoJson={this.state.geoJson}
        loaded={this.state.loaded}
        updateSelectedPoint={this.updateSelectedPoint}
        animate={this.state.animate}
        center={this.state.center}
        selectedPoint={this.state.selectedPoint === null ? null : this.state.selectedPoint.uniqueId}
      />
      <DetailView
        point={this.state.selectedPoint}
        getNextTexto = {this.getNextTexto}
        getPreviousTexto = {this.getPreviousTexto}
      />
    </div>
  }
}

export default MapContainer
