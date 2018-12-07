import React from 'react';

class DetailView extends React.Component {

  render () {
    var innerInfo = null
    if(this.props.point && this.props.point!== null) {
      var point = this.props.point.properties
      innerInfo =
      <div className="absolute w-1/2 h-full p-10 pin-b pin-r bg-black text-white">
      <div className="h-1/2 p-4 overflow-auto pb-3 font-sans" >
        "<span dangerouslySetInnerHTML={{__html: point.fields.Textos}}></span>"
      </div>
      <div className="p-4 text-large font-sans">
          <div className="text-2xl">{point.libro.fields.Nombre} </div>
          <div>{point.autor.fields.Nombre} </div>
          <div className="italic">{point.punto.fields.Nombre} </div>
      </div>
      </div>
    }
    return innerInfo

  }
}

export default DetailView
