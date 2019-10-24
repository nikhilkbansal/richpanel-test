import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet, View, StatusBar,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Button from './Button';
import Text from './Text';
import { Colors, ApplicationStyles } from '../Theme';

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('10%'),
    backgroundColor: ApplicationStyles.primaryColor.color,
    ...ApplicationStyles.elevationS,
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
  title, leftIcon, leftFunction, showRightSection, goBack, containerStyle, showLeftSection, rightIcon, statusBarColor, rightButtonAction, iconsColor, statusBarStyle,
}) {
  return (
    <View style={[styles.container,{paddingTop: StatusBar.currentHeight}, containerStyle]}>
      <StatusBar translucent  barStyle={statusBarStyle || 'light-content'} backgroundColor={statusBarColor || ApplicationStyles.primaryColor.color} />
      <View style={styles.subContainer}>
        <View style={styles.leftArea}>
          {showLeftSection && (
          <Button
            onPress={() =>leftFunction ? leftFunction() : goBack()}
            style={{ }}
            iconColor={iconsColor || ApplicationStyles.lightColor.color}
            buttonWrapperStyle={{ paddingHorizontal: wp('7%') }}
            icon={leftIcon || "ios-arrow-round-back"}
          />
          )}
        </View>
        <View style={styles.centerArea}>
          <Text style={[styles.label, ApplicationStyles.headline3, { color: ApplicationStyles.lightColor.color }]}>
            {title}
          </Text>
        </View>
        <View style={styles.rightArea}>
          {showRightSection && (
          <Button
            onPress={rightButtonAction}
            icon={rightIcon}
            iconColor={iconsColor || ApplicationStyles.lightColor.color}
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
  iconsColor: PropTypes.string,
  statusBarStyle: PropTypes.string,
};

NavigationBar.defaultProps = {
  title: '',
  goBack: Function,
  showRightSection: false,
  containerStyle: {},
  showLeftSection: true,
  rightButtonAction: Function,
  rightIcon: 'md-create',
  iconsColor: null,
  statusBarColor: null,
  statusBarStyle: null,
};


export default NavigationBar;
