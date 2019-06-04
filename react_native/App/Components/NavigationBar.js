import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet, View, StatusBar,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Button from './Button';
import Text from './Text';
import { Colors } from '../Theme';

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('9%'),
  },
  subContainer: {
    flex: 1,
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  leftArea: {
    flex: 1,
    flexDirection: 'row',
  },
  centerArea: {
    flex: 2,
    alignContent: 'center',
    justifyContent: 'center',
  },
  rightArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  label: {
    alignSelf: 'center',
  },
  leftIcon: { alignSelf: 'center' },
});


function NavigationBar({
  title, showRightSection, goBack, containerStyle, showLeftSection, rightIcon, statusBarColor, rightButtonAction,
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.subContainer}>
        <View style={styles.leftArea}>
          {showLeftSection && (
          <Button
            onPress={() => goBack()}
            style={{ }}
            buttonWrapperStyle={{ paddingHorizontal: wp('7%') }}
            icon="ios-arrow-round-back"
          />
          )}
        </View>
        <View style={styles.centerArea}>
          <Text size="h2" color="dark" font="medium" style={styles.label}>
            {title}
          </Text>
        </View>
        <View style={styles.rightArea}>
          {showRightSection && (
          <Button
            onPress={rightButtonAction}
            icon={rightIcon}
            style={{ }}
            buttonWrapperStyle={{ paddingHorizontal: wp('7%') }}
            iconSize={wp('6%')}
          />
          )}
        </View>
      </View>

    </View>
  );
}

NavigationBar.propTypes = {
  title: PropTypes.string,
  showRightSection: PropTypes.bool,
  goBack: PropTypes.func,
  containerStyle: PropTypes.object,
  rightIcon: PropTypes.string,
  rightButtonAction: PropTypes.func,
  statusBarColor: PropTypes.string,
  showLeftSection: PropTypes.bool,
};

NavigationBar.defaultProps = {
  title: '',
  goBack: Function,
  showRightSection: false,
  containerStyle: {},
  showLeftSection: true,
  rightButtonAction: Function,
  rightIcon: 'md-create',
  statusBarColor: Colors.accent,
};


export default NavigationBar;
