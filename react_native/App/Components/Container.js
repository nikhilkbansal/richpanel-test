import React, { Component } from 'react';
import {
  StyleSheet, View, Animated, StatusBar,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { withTheme } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0F484E',
    flex: 1,
    height: hp('100%'),
  },
});

class Scroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  render() {
    return (
      <Animated.ScrollView
        scrollEventThrottle={16}
        style={{ backgroundColor: this.props.theme.colors.background, flex: 1 }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: this.state.scrollY } },
            },
          ],
          {
            useNativeDriver: true, // <- Native Driver used for animated events
          },
        )}
      >
        <StatusBar
          backgroundColor={this.props.theme.colors.background}
          barStyle="default"
        />
        <View style={[styles.container, { backgroundColor: this.props.theme.colors.background }]}>
          {this.props.children}
        </View>
      </Animated.ScrollView>

    );
  }
}

export default withTheme(Scroll);
