import React from 'react';
import { Card } from 'react-onsenui'

class TextElement extends React.Component {

  render () {
  //  console.log('card', this.props)
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
    //bg-teal-map
    return <div className="w-full md:w-1/3 mb-8">
      <Card modifier="material" className="inline-block font-sans h-full p-0" style={{padding:'0px'}}>
        <div className="bg-black text-white p-4 text-large font-sans">
            <div className="text-sm mb-4 italic">{this.props.punto.fields.Nombre} </div>
            <div className="text-2xl">{this.props.libro.fields.Nombre} </div>
            <div>{this.props.autor.fields.Nombre} </div>
        </div>
        <div className="p-4 h-full overflow-auto pb-3 font-sans text-xs" >
          "<span dangerouslySetInnerHTML={{__html: this.props.texto.Textos_corto}}></span>"
        </div>
      </Card>
    </div>
  }
}

export default TextElement
