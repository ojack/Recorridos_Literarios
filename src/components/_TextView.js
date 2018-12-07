import React from 'react';
import TextElement from './TextElement.js'

class TextView extends React.Component {

  render () {
    var textos = []
    // get features that are within bounds of current map view
    this.props.filteredPoints.forEach((point) => {
      textos = textos.concat(point.properties.textos)
    })
     console.log('textos', textos, this.props.data)

     var textoEls = textos.map((texto) => {
       var libro = this.props.data.Libros.byId[texto.fields.Libro[0]]
       console.log('libro', libro)
      return <TextElement
       texto={texto.fields}
       autor={this.props.data.Autores.byId[libro.fields.Autor[0]]}
       libro={libro}
       punto={this.props.data.Puntos.byId[texto.fields.Puntos[0]]}
      />})
    //  <WordBlock className="bg-orange-dark" words={Object.values(uniqueAutores)} />
    return (<div className="absolute pin-b pin-l font-sans w-full h-64 flex flex-wrap mb-10">
      {textoEls}
    </div>)
  }
}

export default TextView
