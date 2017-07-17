import Expo from 'expo';
import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, StatusBar} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {fetchWeather} from './weatherApi';
import Highlighter from 'react-native-highlight-words';

const iconNames = {
  Default: 'md-time',
  Clear: 'md-sunny',
  Rain: 'md-rainy',
  Thunderstorm: 'md-thunderstorm',
  Clouds: 'md-cloudy',
  Snow: 'md-snow',
  Drizzle: 'md-umbrella',
  Mist: 'md-cloud',
}

const phrases = {
  Default: {
    title: "Fetching the fucking weather",
    subtitle: "Be patient",
    highlight: "Fucking",
    color: "#636363",
    backgroundColor: "#9C9C9C", 
  },
  Clear: {
    title: "It's fucking amaze balls",
    subtitle: "Rock that shit!",
    highlight: "fucking",
    color: "#E32500",
    backgroundColor: "#FFD017",
  },
  Rain: {
    title: "Rain rain go away",
    subtitle: "Stay inside and code all day",
    highlight: "away",
    color: "#004A96",
    backgroundColor: "#2F343A",
  },
  Thunderstorm: {
    title: "Fucking thunderstrike",
    subtitle: "Unplug those devices",
    highlight: "thunderstrike",
    color: "#FBFF46",
    backgroundColor: "#020202",
  },
  Clouds: {
    title: "Cloud storage limit reached",
    subtitle: "error: 5000 - cirrocumulus",
    highlight: "limit",
    color: "#0044FF",
    backgroundColor: "#939393",
  },
  Snow: {
    title: "Brain Fucking Freeze",
    subtitle: "You're not supposed to eat it",
    highlight: "Fucking",
    color: "#021D4C",
    backgroundColor: "15A678",
  },
  Drizzle: {
    title: "Meh.. don't even ask",
    subtitle: "What did I just say?",
    highlight: "don't",
    color: "B3F6E4",
    backgroundColor: "15A678",
  },
  Mist: {
    title: "I can't see shit" ,
    subtitle: "Where are you?",
    highlight: "can't",
    color: "#020202",
    backgroundColor: "#cccccc",
  },
}


class App extends Component {

  componentWillMount() {
    this.state = {
      temp:0,
      weather: 'Default'
    }
  }

  componentDidMount() {
    this.getLocation()
    
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (posData) => fetchWeather(posData.coords.latitude, posData.coords.longitude)
        .then(res => this.setState({
          temp:Math.round(res.temp),
          weather:res.weather
        })),
      (error) => alert(error),
      {timeout:10000}
    )
  }

  render() {
    console.log(this.state.weather)
    return(
      <View style={[styles.container, {backgroundColor: phrases[this.state.weather].backgroundColor}]}>
        <StatusBar hidden={true}/>
        <View style={styles.header}>
          <Icon name={iconNames[this.state.weather]} size={80} color={'white'}/>
          <Text style={styles.temp}>{this.state.temp}°C</Text>
        </View>
        <View style={styles.body}>
          <Highlighter
            style={styles.title}
            highlightStyle={{color: phrases[this.state.weather].color}}
            searchWords={[phrases[this.state.weather].highlight]}
            textToHighlight={phrases[this.state.weather].title}
          ></Highlighter>
          <Text style={styles.subtitle}>{phrases[this.state.weather].subtitle}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD017'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-around', 
    flex: 1, 
    //backgroundColor: 'blue'
  },
  temp: {
    //fontFamily: 'HelveticaNeue-Bold',
    fontSize: 45,
    color: 'white'
  },
  body: {
    alignItems: 'flex-start', 
    justifyContent: 'flex-end', 
    flex: 5, 
    //backgroundColor: 'red',
    margin: 10
  },
  title: {
    //fontFamily: 'HelveticaNeue-Bold',
    fontSize: 78,
    color: 'white',
    marginBottom: 5
  },
  subtitle: {
    //fontFamily: 'HelveticaNeue-Medium',
    fontSize: 16,
    color: 'white'
  },
})

Expo.registerRootComponent(App);