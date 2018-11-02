// load all data, methods to get nearest
import config from './../config.json';

const baseUrl ='https://api.airtable.com/v0/appe2QPJNGquOBgw0/'
const fetchUrls = ['Textos', 'Puntos', 'Autores', 'Libros']

// @todo how to make the fields more flexible/customizable?
class MapData  {

  constructor (props) {
    this.Puntos = {
      all: [],
      byId: {}
    }
    this.Libros = {
      all: [],
      byId: {}
    }
    this.Autores = {
      all: [],
      byId: {}
    }
    this.Textos = {
      all: [],
      byId: {}
    }
  }

  getGeoJson() {
    let features = this.Puntos.all.map((id) => this.Puntos.byId[id])
    .filter((punto) => punto.fields.Longitude && punto.fields.Latitude)
    .map((punto)=> this.getGeoJsonFromPunto(punto))
    return {
      type: 'FeatureCollection',
      features: features
    }
  }

  getGeoJsonFromPunto(punto) {
    if(punto.fields.Longitude && punto.fields.Latitude) {
      return {
        type: 'Feature',
        id: punto.id,
        properties: punto.fields,
        geometry: {
          type: 'Point',
          coordinates: [ punto.fields.Longitude, punto.fields.Latitude ]
        }
      }
    } else {
      console.log('NO COORDS', punto)
      return undefined
    }
  }

  loadData() {
    let header = 'Bearer ' + config.airtable.key
    let promises = fetchUrls.map((val) => {
      return fetch(baseUrl + val, {
        method: 'GET',
        headers: {
          'Authorization': header
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("data is", responseJson, val)
        responseJson.records.forEach((record) => {
          this[val].byId[record.id] = record
        })
        this[val].all = responseJson.records.map(record => record.id)
      })
      .catch((error) => { console.error(error) })
    })

    return Promise.all(promises).catch((error) =>  { console.error(error) })
  }

  getCoordinatesFromTextoArray (textos) {
    let puntos = []
    textos.forEach((texto) => {
    //   console.log("fields", texto.item.fields.Puntos)
       if(texto.item.fields.Puntos && texto.item.fields.Puntos.length > 0) puntos.push(texto.item.fields.Puntos[0])
    })
    //  console.log(puntos)
      if (puntos.length > 0) {
        let p = this.Puntos.byId[puntos[0]]
        console.log('p', p)
      //  console.log("punto", this.state.puntosById, p)
        if(p) return [p.fields.Longitude, p.fields.Latitude]
        //if(p) this._map.flyTo([p.Longitude, p.Latitude])
      }
      return null
  }

  getPuntoFromTextoArray (textos) {
    let puntos = []
    textos.forEach((texto) => {
    //   console.log("fields", texto.item.fields.Puntos)
       if(texto.item.fields.Puntos && texto.item.fields.Puntos.length > 0) puntos.push(texto.item.fields.Puntos[0])
    })
    //  console.log(puntos)
      if (puntos.length > 0) {
        let p = this.Puntos.byId[puntos[0]]
        console.log('p', p)
      //  console.log("punto", this.state.puntosById, p)
      //  if(p) return [p.fields.Longitude, p.fields.Latitude]
        if(p) return p
        //if(p) this._map.flyTo([p.Longitude, p.Latitude])
      }
      return null
  }

  getNearestTexts(point, number) {

  }
// to do: possibly cache results of filtering or add author and book info as soon as downloaded?
  getTextsInBounds(bounds) {
    let textos = {}
    //console.log(bounds)
    this.Puntos.all.map(id => this.Puntos.byId[id])
      .filter(punto => punto.fields.Latitude < bounds[0][1] && punto.fields.Latitude > bounds[1][1] && punto.fields.Longitude > bounds[1][0] && punto.fields.Longitude < bounds[0][0])
      .filter(punto => punto.fields.Textos)
      .forEach(punto => {
      //  console.log("punto", punto.fields)
      //  console.log("adding to array", punto, textos, punto.fields.Textos)
          punto.fields.Textos.forEach((id) => {
            textos[id] = this.Textos.byId[id]
          })
      })
    return Object.keys(textos).map(id => {
        let texto = this.Textos.byId[id]
        let libro = this.Libros.byId[texto.fields.Libro[0]]
        let autor = this.Autores.byId[libro.fields.Autor[0]]
        let punto = this.Puntos.byId[texto.fields.Puntos[0]]
        return Object.assign({}, texto, {libro: libro, autor: autor, punto: punto})
    })
  }
}

export default MapData
