import * as React from 'react';
import {
  View, DatePickerAndroid, TimePickerAndroid, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';
// import Video from 'react-native-video';
import Video from 'react-native-af-video-player'
import Button from './Button';
import Text from './Text';
import {
  Colors, ApplicationStyles,
} from '../Theme';
import { CommonFunctions } from '../Utils';
import ProgressiveImage from './ProgressiveImage';

const styles = StyleSheet.create({
  wrapper: {
    ...ApplicationStyles.elevationS,
    flex: 1,
    height: hp('30%'),
  },
  slide: {
    ...ApplicationStyles.elevationS,
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
    this.player = [];
    this.onIndexChanged = this.onIndexChanged.bind(this);
  }

  onIndexChanged(i){
    this.player[i+1] && this.player[i+1].pause();
    this.player[i] && this.player[i].play();
    this.player[i-1] && this.player[i-1].pause();
  }

  componentWillReceiveProps(nextProps){
    if(this.props.currentVisible !== nextProps.currentVisible){
      this.player.forEach(o=>o && o.controls && !o.controls.props.paused && o.pause());
    }
  }

  render() {
    const { dateTime } = this.state;
    const {
      files, isWholePath
    } = this.props;
    return (
      <Swiper onIndexChanged={this.onIndexChanged} showsPagination={false} showsButtons loop={false} style={styles.wrapper}
        dotColor={'red'}
        nextButton={<Text style={{...ApplicationStyles.headline, color: ApplicationStyles.smokeBackground.color}}>›</Text>}
        prevButton={<Text style={{...ApplicationStyles.headline, color: ApplicationStyles.smokeBackground.color}}>‹</Text>}
        buttonWrapperStyle={{...ApplicationStyles.elevationS}} activeDotColor={ApplicationStyles.smokeBackground.color}>
        {files && files.map((o, index) => (
          <View style={styles.slide}>
            {CommonFunctions.isFileVideo(o) ? (
            <View style={{height: hp('30%'), width: '100%',}}>
              <Video
              autoPlay={false}
              url={{uri:CommonFunctions.getFile(o)}}
              // source={{ uri: CommonFunctions.getFile(o) }} // Can be a URL or a local file.
              ref={(ref) => {
                this.player[index] = ref;
              }} // Store reference
              hideFullScreenControl={true}
              inlineOnly={true}
              style={{
                height: '100%',
                width: '100%',
                flex: 1,
                justifyContent: 'center',
                backgroundColor: 'black',
              }}

              // controls
              resizeMode="cover"
            />
            </View>
            )
              : (
                <ProgressiveImage
                  thumbnailSource={{ uri: `${CommonFunctions.getFile(o)}?width=50&height=50` }}
                  source={{ uri: isWholePath ? o :CommonFunctions.getFile(o) }}
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
