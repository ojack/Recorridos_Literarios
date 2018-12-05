import React from 'react';
import WordBlock from './WordBlock.js'

class DataViz extends React.Component {

  render () {
    var uniqueAutores = {}
    var uniqueLibros = {}
    // get features that are within bounds of current map view
    var points = this.props.filteredPoints.map((point) => {
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


    return <div id="data"
        className="pin-r pin-b absolute p-2 m-2 float-right"
        style={{zIndex: 100, color: '#000', width: "100%"}}
        >
      <WordBlock className="bg-black text-white" words={Object.values(uniqueLibros)} />
      <WordBlock className="bg-grey-dark text-white " words={Object.values(uniqueAutores)} />
      <WordBlock className="bg-teal-map text-white " words={points} />
    </div>
  }
}

export default DataViz
