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
console.log(stuntName);
};

handlePassedStunt = (stuntName) => {
  this.setState(({passedStunt}) => ({
    passedStunt: [...this.state.passedStunt, stuntName]
}));
this.animation2();
console.log(stuntName);
};

renderCards(stuntperson) {
  return (
    <Card>
      <View style={{ height: 200 }}>
        <Image
          source={stuntperson.src}
          style={{ width: '100%', height: 200 }}
        />
      </View>
      <View style={styles.detailWrapper}>
        <Text>{stuntperson.name}</Text>
      </View>
    </Card>
  );
};

renderNoMoreCards = () => {
  return (
    <Card style={styles.noMore} title="You liked these stuntpeople:">
      <Text>{this.state.likedStunt.toString()}</Text>
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
          style={{height: 50, width: 50, transform: [{scale: passedScale}]}}
        />
      <Animated.Image
        source={require('./assets/tick.png')}
        style={{height: 50, width: 50, transform: [{scale: likedScale}]}}
      />
  </View>
    </SafeAreaView>
  );
}
}
const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
  marginTop: 100
},
statusStyle: {
  padding: 15,
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginTop: 300
},
noMore: {
  flex: 1,
  flexDirection: 'column'
}
});
export default App;
