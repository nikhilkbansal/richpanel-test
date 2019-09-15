import * as React from 'react';
import {
  View, DatePickerAndroid, TimePickerAndroid, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';
import Video from 'react-native-video';
import Button from './Button';
import Text from './Text';
import {
  Colors, ApplicationStyles,
} from '../Theme';
import { CommonFunctions } from '../Utils';
import ProgressiveImage from './ProgressiveImage';

const styles = StyleSheet.create({
  wrapper: {
    elevation: 1,
    flex: 1,
    height: hp('30%'),
  },
  slide: {
    elevation: 1,
    flex: 1,
    height: '100%',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  mainImage: {
    width: null,
    height: '100%',
    paddingBottom: 0,
    paddingTop: 0,
    justifyContent: 'center',
  },
});


class SwiperPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateTime: '',
    };
  }


  render() {
    const { dateTime } = this.state;
    const {
      files,
    } = this.props;
    return (
      <Swiper loop={false} style={styles.wrapper} showsButtons={false} activeDotColor={ApplicationStyles.primaryColor.color}>
        {files && files.map(o => (
          <View style={styles.slide}>
            {CommonFunctions.isFileVideo(o) ? (<Video
              source={{ uri: CommonFunctions.getFile(o) }} // Can be a URL or a local file.
              ref={(ref) => {
                this.player = ref;
              }} // Store reference

              style={{
                height: hp('30%'),
                width: '100%',
                flex: 1,
                justifyContent: 'center',
                backgroundColor: 'black',
              }}

              controls
              resizeMode="cover"
            />
            )
              : (
                <ProgressiveImage
                  thumbnailSource={{ uri: `${CommonFunctions.getFile(o)}?width=50&height=50` }}
                  source={{ uri: CommonFunctions.getFile(o) }}
                  style={styles.mainImage}
                  resizeMode="cover"
                />
              )}
          </View>
        ))}
      </Swiper>
    );
  }
}


SwiperPage.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

SwiperPage.defaultProps = {
  placeholder: '',
  onChange: () => {},
};

export default SwiperPage;
