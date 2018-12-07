import React from 'react';

class DetailView extends React.Component {

  render () {
    var innerInfo = null
    if(this.props.point && this.props.point!== null) {
      var point = this.props.point.properties
      innerInfo =
      <div className="absolute w-full p-10 pt-16 pin-b pin-l gradient flex items-center justify-center" style={{ height: "50%"}}>
        <i onClick={() => this.props.getPreviousTexto(this.props.point)} className="fas fa-chevron-left text-4xl text-white hover:text-black cursor-pointer m-12"></i>
        <div className="max-w-xl flex flex-col sm:flex-row flex items-center overflow-auto ">
          <div className="h-1/2 p-4 text-black leading-loose pb-3 font-sans" style={{ flex:2 }}>
            "<span dangerouslySetInnerHTML={{__html: point.textosCorto}}></span>"
          </div>
          <div className="p-4 text-large font-sans text-white flex-1">
              <div className="text-4xl mb-6">{point.libro} </div>
              <div>{point.autor} </div>
              <div className="italic">{point.punto} </div>
          </div>
        </div>
        <i onClick={() => this.props.getNextTexto(this.props.point)} className="fas fa-chevron-right text-4xl text-white hover:text-black cursor-pointer m-12"></i>
      </div>
    }
    return innerInfo

  }
}

export default DetailView
