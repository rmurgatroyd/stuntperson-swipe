import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Animated, Easing } from 'react-native';
import { Card, Button} from 'react-native-elements';
import Swipe from './Swipe';
import stuntpeople from './data';


class App extends Component {

  constructor () {
  super()
  this.animatedValue1 = new Animated.Value(0)
  this.animatedValue2 = new Animated.Value(0)
}

  state = {
  likedStunt: [],
  passedStunt: []
};

likedAnimate () {
  this.animatedValue1.setValue(0)
  Animated.timing(
    this.animatedValue1,
    {
      toValue: 1,
      duration: 500,
      easing: Easing.ease
    }
  ).start();
}

passedAnimate () {
  this.animatedValue2.setValue(0)
  Animated.timing(
    this.animatedValue2,
    {
      toValue: 1,
      duration: 500,
      easing: Easing.ease
    }
  ).start();
}

animation1 = () => {
  this.likedAnimate();
}

animation2 = () => {
  this.passedAnimate();
}

handleLikedStunt = (stuntName) => {
  this.setState(({likedStunt}) => ({
    likedStunt: [...this.state.likedStunt, stuntName]
}));
this.animation1();
};

handlePassedStunt = (stuntName) => {
  this.setState(({passedStunt}) => ({
    passedStunt: [...this.state.passedStunt, stuntName]
}));
this.animation2();
};

renderCards(stuntperson) {
  return (
    <Card>
      <View style={{ height: 300 }}>
        <Image
          source={stuntperson.src}
          style={{ width: '100%', height: 300 }}
        />
      </View>
      <View style={styles.detailWrapper}>
        <Text style={{fontSize: 20}}>{stuntperson.name}</Text>
      </View>
    </Card>
  );
};

renderNoMoreCards = () => {
  return (
    <Card title="You liked these stuntpeople:">
      <View>
        <Text style={{fontSize: 16}}>{this.state.likedStunt.join(", ")}</Text>
      </View>
    </Card>
  );
};

render() {
  const likedScale = this.animatedValue1.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.5, 1, 0.5]
      });
  const passedScale = this.animatedValue2.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.5, 1, 0.5]
      });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{textAlign: 'center', fontSize: 25, marginTop: 5}}>Position: Stunt double</Text>
      <Swipe
        data={stuntpeople}
        renderCard={this.renderCards}
        renderNoMoreCards={this.renderNoMoreCards}
        onSwipeRight = {this.handleLikedStunt}
        onSwipeLeft = {this.handlePassedStunt}
        keyProp = "id"
      />
      <View style={styles.statusStyle}>
        <Animated.Image
          source={require('./assets/cross.png')}
          style={{height: 100, width: 100, transform: [{scale: passedScale}]}}
        />
      <Animated.Image
        source={require('./assets/tick.png')}
        style={{height: 100, width: 100, transform: [{scale: likedScale}]}}
      />
  </View>
    </SafeAreaView>
  );
}
}
const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#D3D3D3',
  marginTop: 100
},
statusStyle: {
  padding: 15,
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginTop: 430
},
detailWrapper: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: 5
}
});
export default App;
