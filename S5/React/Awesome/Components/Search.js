import React from 'react'
import { View, TextInput, Button, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import {connect} from 'react-redux'

class Search extends React.Component{
  constructor(props){
    super(props)
    this.searchedText = ""
    this.page= 0
    this.total_pages= 0
    this.sumId= ""
    this.state = {
      films: [],
      isLoading: false
    }
  }

  _searchFilms(){
    this.page=0
    this.total_pages=0
    this.setState({
      films: []
    },()=>{this._loadFilms()
    })
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _searchTextInputChanged(text){
    this.searchedText=text
  }

  _loadFilms(){
    this.setState({isLoading:true})
    getFilmsFromApiWithSearchedText(this.searchedText,this.page + 1).then(data => {
      this.page=data.page
      this.total_pages=data.total_pages
      this.setState({
        films: [ ...this.state.films, ...data.results],
        isLoading:false
      })
    })
  }

  _displayDetailForFilm = (idFilm) => {
    this.props.navigation.navigate("FilmDetail",{idFilm : idFilm})
}


  render(){
    return(
      <View style={[styles.main_container]}>
        <TextInput
          style={[styles.textinput]}
          placeholder='Titre du film'
          onChangeText={(text)=>this._searchTextInputChanged(text)}
          onSubmitEditing={()=>this._searchFilms()}
          />
        <Button style={[styles.button]} title='Rechercher' onPress={()=>this._searchFilms()}/>
        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <FilmItem film={item}
                                            displayDetailForFilm={this._displayDetailForFilm}
                                            isFilmFavorite={(this.props.favoritesFilm.findIndex(film=>film.id == item.id)!==-1)? true : false}
          />}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.state.films.length > 0 && this.page<this.total_pages) {
              this._loadFilms()
              }
            }
          }
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex:1,
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  button: {
    height:50
  },
  loading_container: {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 100,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center'
  }
})

const mapStateToProps = state =>{
  return{
    favoritesFilm : state.favoritesFilm
  }
}
export default connect(mapStateToProps)(Search)
