import React from 'react';
import _ from 'lodash';
import { View, StyleSheet, Animated } from 'react-native';

const colors = ['#F7ECFB','#ECF7FB', '#FBECF0', '#ECF0FB', '#FBECF7'];
const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: _.sample(colors)
  },
  container: {
    backgroundColor: '#F2F2F2',
  },
});

class ProgressiveImage extends React.Component {
  thumbnailAnimated = new Animated.Value(0);

  imageAnimated = new Animated.Value(0);

  handleThumbnailLoad = () => {
    Animated.timing(this.thumbnailAnimated, {
      toValue: 1,
    }).start();
  }

  onImageLoad = () => {
    Animated.timing(this.imageAnimated, {
      toValue: 1,
    }).start();
  }

  render() {
    const {
      thumbnailSource,
      source,
      style,
      containerStyle,
      ...props
    } = this.props;
    const thumbnailSourceObj = thumbnailSource || { uri: source.uri+'width=200&height=200'}
    return (
      <View style={[styles.container, containerStyle]}>
        <Animated.Image
          {...props}
          source={thumbnailSourceObj}
          style={[style, { backgroundColor: _.sample(colors)}, ]}
          onLoad={this.handleThumbnailLoad}
          blurRadius={1}
        />
        <Animated.Image
          {...props}
          source={source}
          style={[styles.imageOverlay, { opacity: this.imageAnimated }, style]}
          onLoad={this.onImageLoad}
        />
      </View>
    );
  }
}

export default ProgressiveImage;
