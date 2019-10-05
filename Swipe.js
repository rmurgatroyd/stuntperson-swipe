import React, { Component } from 'react';
import { View, Text, Image, PanResponder, Dimensions, Animated, gesture } from 'react-native';
import { Card } from 'react-native-elements';

const screenWidth = Dimensions.get('window').width;
const swipeThreshold = 0.25 * screenWidth;
const swipeOut = 250;


class Swipe extends Component {
  static defaultProps = {
    onSwipeRight : () => {},
    onSwipeLeft: () => {},
    keyProp: 'stuntid'
  };

  constructor(props) {
  super(props);
  this.position = new Animated.ValueXY();
  this.panResponder = PanResponder.create({
    // Ask to be the responder:
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, gesture) => {
      this.position.setValue({ x: gesture.dx, y: gesture.dy });
    },
    onPanResponderRelease: (evt, gesture) => {
    if (gesture.dx > swipeThreshold) {
      this.swipeOffPage('right');
    } else if (gesture.dx < -swipeThreshold) {
      this.swipeOffPage('left');
    } else {
      this.resetPosition();
    }
  }
  });

  this.state = {
    index: 0
  };
}

onSwipeCompleted(direction) {
  const {onSwipeLeft, onSwipeRight, data} = this.props;
  const item = data[this.state.index];

  direction === 'right' ? onSwipeRight(item.name) : onSwipeLeft(item.name);
  this.position.setValue({x: 0, y:0});
  this.setState({index: this.state.index + 1});
}

swipeOffPage(direction) {
  const x = direction === 'right' ? screenWidth : -screenWidth;
  Animated.timing(this.position, {
    toValue : {x, y: 0},
    duration: swipeOut}).start(() => this.onSwipeCompleted(direction));
}

resetPosition() {
   Animated.spring(this.position, {
     toValue: { x: 0, y: 0 }
   }).start();
 }

renderCards = () => {
  if (this.state.index >= this.props.data.length) {
    return this.props.renderNoMoreCards();
  }
  return this.props.data.map((item,i) => {
    if (i < this.state.index) {return null}
    if (i === this.state.index) {
      return (
        <Animated.View
          style={[this.position.getLayout(), styles.cardStyle]}
          key={item[this.props.keyProp]}
          {...this.panResponder.panHandlers}
          >
          {this.props.renderCard(item)}
        </Animated.View>
  )}
  return(
    <View
      key={item[this.props.keyProp]}
      style={[styles.cardStyle, { top: 20 * (i - this.state.index)}]}>
      {this.props.renderCard(item)}
    </View>
  );
}).reverse();
}

  render() {
    return <View>{this.renderCards()}</View>;
  }
}

const styles = {
  cardStyle: {
    position: 'absolute',
    width: screenWidth
  }
};

export default Swipe;
