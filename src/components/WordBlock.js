import React from 'react';
import MapData from './MapData.js'
import BaseMap from './BaseMap.js'

class WordBlock extends React.Component {
  constructor (props) {
    super(props)
  }


  render () {
    var words = this.props.words.map((word) => {
      var size = 10 + word.count*2
      return (<div
          className={"inline-block m-1 p-3 pt-1 pb-2 text-sm font-sans float-right " + this.props.className}
          style={{fontSize: size + 'px'}}
        >
          {word.label}
        </div>)
    })

    return <div id="data" className="m-1 float-right" >
      {words}
    </div>
  }
}

export default WordBlock
