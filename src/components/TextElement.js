import React from 'react';

class TextElement extends React.Component {

  render () {
    var textos = []
    // get features that are within bounds of current map view
    this.props.filteredPoints.forEach((point) => {
      textos = textos.concat(point.properties.textos)
    })


     console.log('textos', textos, this.props.data)

     var textoEls = textos.map((texto) => <div> {texto.fields.Textos} </div>)
    //  <WordBlock className="bg-orange-dark" words={Object.values(uniqueAutores)} />
    return (<div className="absolute pin-t pin-l font-sans w-64 h-100">
      {textoEls}
    </div>)
  }
}

export default TextElement
