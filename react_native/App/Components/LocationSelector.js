import * as React from 'react';
import {
  View, DatePickerAndroid, TimePickerAndroid, StyleSheet, ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Dialog, { DialogContent, SlideAnimation } from 'react-native-popup-dialog';
import { GoogleAutoComplete, GoogleLocationDetailResult, GoogleLocationResult } from 'react-native-google-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from './Button';
import Text from './Text';
import TextInput from './TextInput';
import { Config } from '../Config';
import {
  Colors, ApplicationStyles,
} from '../Theme';
import { CommonFunctions } from '../Utils';

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: hp('1%'),paddingBottom: hp('1%') },
  button: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth ,
    borderBottomColor: ApplicationStyles.disabledColor.color,
    paddingTop: hp('0.5%'),
    paddingBottom: hp('1.9%'),
  },
  loginContainer: {
    marginVertical: hp('4%'),
    marginBottom: hp('1%'),
    backgroundColor: ApplicationStyles.primaryColor.color,
    borderRadius: wp('2%'),
    width: wp('80%'),
    alignSelf: 'center',
    height: hp('7%'),
  },
});


class LocationSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateTime: '',
      visibleDialog: false,
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };

    this.openLocationSelector = this.openLocationSelector.bind(this);
  }

  async openLocationSelector() {
    this.setState({ visibleDialog: true });
  }

  render() {
    const { dateTime, visibleDialog, region } = this.state;
    const {
      label, placeholder,
    } = this.props;
    return (
      <View style={styles.container}>
        <Dialog
          visible={visibleDialog}
          dialogAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
          onTouchOutside={() => {
            this.setState({ visibleDialog: false });
          }}
        >
          <DialogContent style={{ width: wp('90%') }}>
            <KeyboardAwareScrollView behavior="padding">
              <View style={{ flex: 1, marginTop: hp('2%') }}>
                <MapView
                  style={{
                    width: '100%', height: hp('40%'),
                  }}
                  showsUserLocation
                  showsMyLocationButton
                  initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  region={region}
                  onRegionChangeComplete={
                  (data) => {
                    this.setState({ region: data });
                  }
                }
                />
              </View>

              <View style={{
                backgroundColor: ApplicationStyles.lightBackground.color,
                position: 'absolute',
                top: 10,
                width: '100%',
              }}
              >
                <GoogleAutoComplete apiKey={Config.GOOGLE_PLACE_API_KEY} debounce={300}>
                  {({
                    inputValue, handleTextChange, locationResults, fetchDetails, clearSearchs,
                  }) => (
                    <React.Fragment>
                      <TextInput
                        style={{
                          height: hp('10%'),
                          width: '100%',
                          borderWidth: 1,
                          paddingHorizontal: 16,
                        }}
                        value={inputValue}
                        onChangeText={handleTextChange}
                        placeholder="Location..."
                      />
                      <ScrollView style={{ maxHeight: hp('30%') }}>
                        {locationResults.map((el, i) => {
                          console.log('sd', el, fetchDetails);
                          return (
                            <Text
                              style={{ ...ApplicationStyles.body2 }}
                              onPress={async () => {
                                clearSearchs();
                                const data = await fetchDetails(el.place_id);
                                this.setState({
                                  region: {
                                    longitude: data.geometry.location.lng,
                                    latitude: data.geometry.location.lat,
                                    ...region,
                                  },
                                });
                              }}
                            >
                              {el.description}

                            </Text>
                          );
                        })}
                      </ScrollView>
                    </React.Fragment>
                  )}
                </GoogleAutoComplete>
              </View>

              <TextInput
            // error={errors.title}
                multiline
                numberOfLines={1}
                label="Flat no./Landmark"
                placeholder="e.g. #123, Near Wall Street"
                returnKeyType="next"
              />
              <Button
                title="Submit"
                style={styles.loginContainer}
              />
            </KeyboardAwareScrollView>
          </DialogContent>
        </Dialog>
        <Text style={[{ ...ApplicationStyles.textInputLabel }, { padding: 0 }]}>
          {label}
        </Text>
        <Button
          onPress={this.openLocationSelector}
          style={styles.button}
        >
          { dateTime

            ? <Text style={[{ ...ApplicationStyles.textInputValue }, { padding: 0 }]}>{dateTime}</Text>
            : <Text style={[{ ...ApplicationStyles.textInputValue, ...ApplicationStyles.disabledColor }, { padding: 0 }]}>{placeholder}</Text>
          }
        </Button>

      </View>
    );
  }
}


LocationSelector.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

LocationSelector.defaultProps = {
  placeholder: '',
  onChange: () => {},
};

export default LocationSelector;
