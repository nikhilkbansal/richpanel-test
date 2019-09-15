import * as React from 'react';
import {
  View, DatePickerAndroid, TimePickerAndroid, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Dialog, { DialogContent, SlideAnimation } from 'react-native-popup-dialog';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import Button from './Button';
import Text from './Text';
import TextInput from './TextInput';
import { Config } from '../Config';
import {
  Colors, ApplicationStyles,
} from '../Theme';
import { CommonFunctions } from '../Utils';

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: hp('1%') },
  button: {
    paddingTop: hp('0.4%'),
    paddingBottom: hp('1%'),
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderBottomColor: Colors.mediumDarkFont,
  },
  loginContainer: {
    marginVertical: hp('4%'),
    backgroundColor: ApplicationStyles.primaryColor.color,
    borderRadius: wp('2%'),
    width: wp('80%'),
    alignSelf: 'center',
    height: hp('7%'),
  },
});


const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } } };
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } } };

class LocationSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateTime: '',
      visibleDialog: false,
    };

    this.openLocationSelector = this.openLocationSelector.bind(this);
  }

  async openLocationSelector() {
    this.setState({ visibleDialog: true });
  }

  render() {
    const { dateTime, visibleDialog } = this.state;
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
          <DialogContent style={{ width: wp('90%'), height: hp('70%') }}>
            <GooglePlacesAutocomplete
              placeholder="Type address here"
              minLength={2} // minimum length of text to search
              returnKeyType="search" // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              keyboardAppearance="light" // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
              listViewDisplayed="auto" // true/false/undefined
              fetchDetails
              renderDescription={row => row.description} // custom description render
              onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                console.log(data, details);
              }}

              getDefaultValue={() => ''}

              query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
                key: Config.GOOGLE_PLACE_API_KEY,
                language: 'en', // language of the results
                types: '(cities)', // default: 'geocode'
              }}
              suppressDefaultStyles
              styles={{
                container: {
                  marginTop: hp('1.5%'),
                },
                textInput: {
                  ...ApplicationStyles.textInputValue,
                  paddingHorizontal: 0,
                  paddingTop: hp('0.5%'),
                  paddingBottom: hp('1.5%'),
                  borderColor: 'transparent',
                  margin: 0,
                  borderBottomColor: Colors.mediumDarkFont,
                  borderWidth: StyleSheet.hairlineWidth * 2,
                },
                textInputContainer: {
                  width: '100%',
                  padding: 0,
                  margin: 0,
                },
                description: {
                  ...ApplicationStyles.bodyHeading,
                  fontWeight: 'bold',
                  paddingVertical: hp('0.7%'),
                  borderColor: 'transparent',

                  borderBottomColor: Colors.mediumDarkFont,
                  borderWidth: StyleSheet.hairlineWidth,
                },
                predefinedPlacesDescription: {
                  ...ApplicationStyles.bodyHeading,
                  paddingVertical: hp('0.7%'),

                  color: ApplicationStyles.primaryColor.color,
                },
                poweredContainer: {
                  marginTop: hp('1%'),
                },
              }}

              // currentLocation // Will add a 'Current location' button at the top of the predefined places list
              currentLocationLabel="Current location"
              nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
              GoogleReverseGeocodingQuery={{
              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              }}
              GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                rankby: 'distance',
                type: 'cafe',
              }}

              GooglePlacesDetailsQuery={{
              // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                fields: 'formatted_address',
              }}

              filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
              // predefinedPlaces={[homePlace, workPlace]}

              debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
              // renderLeftButton={() => <Image source={require('path/custom/left-icon')} />}
              // renderRightButton={() => <Text>Custom text after the input</Text>}
            />
            <MapView
              style={{ width: '100%', height: hp('30%'), backgroundColor: 'red' }}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
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
