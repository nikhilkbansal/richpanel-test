import * as React from 'react';
import {
  View, DatePickerAndroid, TimePickerAndroid, StyleSheet, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-picker';
import Button from './Button';
import Text from './Text';
import Image from './ProgressiveImage';
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
});

const options = {
  title: 'Select Files',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
class FileSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };

    this.selectImage = this.selectImage.bind(this);
    this.removeFile = this.removeFile.bind(this);
  }


  selectImage() {
    const { files } = this.state;
    const { onChange } = this.props;
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('response', response);
        files.push(response);
        onChange(files);
        this.setState({ files });
      }
    });
  }

  removeFile(fileIndex) {
    const { files } = this.state;
    files.splice(fileIndex, 1);
    this.setState({ files });
  }

  render() {
    const { files } = this.state;
    console.log('response', files);

    const {
      label, placeholder,
    } = this.props;
    return (
      <View style={styles.container}>
        <Text style={[{ ...ApplicationStyles.textInputLabel }, { padding: 0 }]}>
          {label}
        </Text>
        <View style={{
          marginHorizontal: wp('1%'), flex: 1, flexDirection: 'row',
        }}
        >
          <View style={{
            width: files.length === 0 ? wp('25%') : wp('13%'),
            height: wp('25%'),
            borderRadius: wp('1.1%'),
            overflow: 'hidden',
            borderColor: Colors.primary,
            borderWidth: 'item'.empty ? 1 : 0,
            justifyContent: 'center',
            marginVertical: wp('2%'),
          }}
          >
            <Button
              style={{
                borderColor: ApplicationStyles.primaryColor.color,
                borderRadius: wp('5%') / 2,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}
              buttonWrapperStyle={{
                width: '100%',
                alignItems: 'center',
              }}
              onPress={this.selectImage}
              icon="md-add"
              iconColor={Colors.primary}
              iconSize={23}
            />


          </View>
          <FlatList
            data={files}
            style={{ flex: 1, marginLeft: wp('1%') }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View>
                <View style={{
                  width: wp('25%'),
                  height: wp('25%'),
                  borderRadius: wp('2%'),
                  overflow: 'hidden',
                  justifyContent: 'center',
                  marginVertical: wp('2%'),
                  margin: wp('01%'),
                }}
                >
                  <Image
                    resizeMode="cover"
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    source={{ uri: item.uri }}
                  />
                </View>
                <Button
                  style={{
                    backgroundColor: 'red',
                    width: wp('5%'),
                    height: wp('5%'),
                    borderColor: Colors.background,
                    borderRadius: wp('5%') / 2,
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 5,
                    position: 'absolute',
                    top: 0,
                    padding: wp('1%'),
                    right: -wp('0.2%'),
                  }}
                  onPress={() => this.removeFile(index)}
                  icon="md-remove"
                  iconColor={Colors.lightFont}
                  iconSize={23}
                />
              </View>
            )}
            horizontal
          />
        </View>
      </View>
    );
  }
}


FileSelector.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

FileSelector.defaultProps = {
  placeholder: '',
  onChange: () => {},
};

export default FileSelector;
