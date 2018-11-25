import React from 'react';
import MapData from './MapData.js'
import BaseMap from './BaseMap.js'
import WordBlock from './WordBlock.js'

class DataViz extends React.Component {
  constructor (props) {
    super(props)


  }


  render () {
    var points = []
    var autores = []
    var libros = []
    var uniqueAutores = {}
    var uniqueLibros = {}
    // get features that are within bounds of current map view
    if(this.props.loaded===true && this.props.bounds !== null) {
      // Filter points for points that are currently shown in the map view
      points = this.props.geoJson.features.filter((feature) => {
        var lng = feature.geometry.coordinates[0]
        var lat = feature.geometry.coordinates[1]
        console.log(lng, this.props.bounds._sw.lng, this.props.bounds._ne.lng)
        if(lng > this.props.bounds._sw.lng && lng < this.props.bounds._ne.lng){
          if(lat > this.props.bounds._sw.lat && lat < this.props.bounds._ne.lat){
            return true
          }
        }
        return false
      }).map((point) => {
        var newAut = point.properties.autores.map((autor) => ({label: autor.fields.Nombre}))
        console.log('new aut', newAut)
      //  autores = autores.concat(point.properties.autores).map((autor) => autor.fields.Nombre)
        point.properties.autores.forEach((autor) => {
          if(uniqueAutores[autor.fields.Nombre]){
            uniqueAutores[autor.fields.Nombre].count++
          } else {
            uniqueAutores[autor.fields.Nombre] = {
              label: autor.fields.Nombre,
              count: 1
            }
          }
        })
        point.properties.libros.forEach((libro) => {
          if(uniqueLibros[libro.fields.Nombre]){
            uniqueLibros[libro.fields.Nombre].count++
          } else {
            uniqueLibros[libro.fields.Nombre] = {
              label: libro.fields.Nombre,
              count: 1
            }
          }
        })
      //  libros = libros.concat(point.properties.libros.map((libro) => ({label: libro.fields.Nombre})))
        return ({label: point.properties.Nombre})
      })

      // uniqueAutores = {}
      // autores.forEach((autor) => {
      //   if(uniqueAutores[autor]){
      //     uniqueAutores[autor].count++
      //   } else {
      //     uniqueAutores[autor] = {
      //       label: autor,
      //       count: 1
      //     }
      //   }
      // })
    //  }).map((point) => <div className="inline-block m-1 p-1 text-white bg-teal-dark">{point.properties.Nombre}</div>)

    }
  //  console.log('autores', Object.values(uniqueAutores))
    //  <WordBlock className="bg-orange-dark" words={Object.values(uniqueAutores)} />
    return <div id="data"
        className="pin-r pin-b absolute p-2 mb-10 mr-10 float-right"
        style={{zIndex: 100, color: '#000', width: "100%"}}
        >
        Libros:
      <WordBlock className="bg-black" words={Object.values(uniqueLibros)} />
      <WordBlock className="bg-black" words={Object.values(uniqueAutores)} />
      <WordBlock className="bg-black" words={points} />
    </div>
  }
}

export default DataViz
