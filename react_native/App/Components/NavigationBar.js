import PropTypes from 'prop-types';
import React from 'react';
import {
  Text, StyleSheet, View, StatusBar,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Button from './Button';
import { Colors } from '../Theme';

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('10%'),
  },
  subContainer: {
    flex: 1,
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: wp('4%'),
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


function NavigationBar({ title, showRightSection }) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />
      <View style={styles.subContainer}>
        <View style={styles.leftArea}>
          <Button
          onPress={() => { alert(2); }}
          icon="ios-arrow-round-back"
        />
        </View>
        <View style={styles.centerArea}>
          <Text style={styles.label}>
            {title}
          </Text>
        </View>
        <View style={styles.rightArea}>
          {showRightSection && (
          <Button
            onPress={() => { alert(2); }}
            icon="long-arrow-right"
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
};

NavigationBar.defaultProps = {
  title: '',
  showRightSection: false,
};


export default NavigationBar;
