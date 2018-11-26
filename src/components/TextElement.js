import React from 'react';
import { Card } from 'react-onsenui'

class TextElement extends React.Component {

  render () {
    // var textos = []
    // // get features that are within bounds of current map view
    // this.props.filteredPoints.forEach((point) => {
    //   textos = textos.concat(point.properties.textos)
    // })
    //
    //
    //  console.log('textos', textos, this.props.data)
    //
    //  var textoEls = textos.map((texto) => <div> {texto.fields.Textos} </div>)
    //  <WordBlock className="bg-orange-dark" words={Object.values(uniqueAutores)} />
    // return (<div className="bg-white text-sm text-black m-4 h-full w-64 inline-block">
    //   <div className="p-3 bg-black text-white"> {this.props.punto.fields.Nombre} </div>
    //     <div className="p-6 h-full overflow-auto"> {this.props.texto.Textos} </div>
    // </div>)
    return <Card modifier="material">
      <div className="p-3 text-large"> {this.props.punto.fields.Nombre} </div>
      <div className="p-6 h-full overflow-auto"> {this.props.texto.Textos} </div>
    </Card>
  }
}

export default TextElement
