import React from 'react';
import DataViz from './DataViz.js'
//import TextView from './TextView.js'

class InfoPanel extends React.Component {

  render () {
    var points = []

    // get features that are within bounds of current map view
    if(this.props.loaded===true && this.props.bounds !== null) {
      // Filter points for points that are currently shown in the map view
      points = this.props.geoJson.features.filter((feature) => {
        // add random factor to point to separate nearby points
        var lng = feature.geometry.coordinates[0] + Math.random()*0.1
        var lat = feature.geometry.coordinates[1]
        console.log(lng, this.props.bounds._sw.lng, this.props.bounds._ne.lng)
        if(lng > this.props.bounds._sw.lng && lng < this.props.bounds._ne.lng){
          if(lat > this.props.bounds._sw.lat && lat < this.props.bounds._ne.lat){
            return true
          }
        }
        return false
      })
    }

    // <DataViz filteredPoints={points} />
  //   <DataViz filteredPoints={points} />
//<DataViz filteredPoints={points} />
//<TextView filteredPoints={points} data={this.props.data} loaded={this.props.loaded}/>
//       <TextView filteredPoints={points} data={this.props.data} loaded={this.props.loaded}/>
//  <DataViz filteredPoints={points} />
    return (<div>

    </div>)
  }
}

export default InfoPanel
