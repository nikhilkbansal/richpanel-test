import * as React from 'react';
import {
  View, DatePickerAndroid, TimePickerAndroid, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

import DraggableFlatList from 'react-native-draggable-flatlist';
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
    borderBottomColor: ApplicationStyles.disabledColor.color,
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
      files: props.files || [],
    };

    this.selectImage = this.selectImage.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.updateFiles = this.updateFiles.bind(this);
  }

  updateFiles(newFiles){
    const { onChange } = this.props;

    onChange(newFiles);
    this.setState({ files: newFiles });
  }

  selectImage() {
    const { files } = this.state;
    ImagePicker.openPicker({
      multiple: true,
    }).then((images) => {
      const newFiles = [...files, ...images];
      this.updateFiles(newFiles);
    });

    // ImagePicker.showImagePicker(options, (response) => {
    //   console.log('Response = ', response);

    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else if (response.customButton) {
    //     console.log('User tapped custom button: ', response.customButton);
    //   } else {
    //     console.log('response', response);
    //     files.push(response);
    //     onChange(files);
    //     this.setState({ files });
    //   }
    // });
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
      label, placeholder, error
    } = this.props;
    return (
      <View style={styles.container}>
        <Text style={[{ ...ApplicationStyles.fontStyles.body1 }, { padding: 0 }]}>
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
            borderColor: ApplicationStyles.primaryColor.color,
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
              iconColor={ApplicationStyles.primaryColor.color}
              iconSize={23}
            />


          </View>
          <DraggableFlatList
            data={files}
            style={{ flex: 1, marginLeft: wp('1%') }}
            showsHorizontalScrollIndicator={false}
            renderItem={({
              item, index, move, moveEnd, isActive,
            }) => (
              <View>
                <TouchableOpacity
                  style={{
                    // height: 100,
                    backgroundColor: isActive ? 'blue' : 'red',
                    width: wp('25%'),
                    height: wp('25%'),
                    borderRadius: wp('2%'),
                    overflow: 'hidden',
                    justifyContent: 'center',
                    marginVertical: wp('2%'),
                    margin: wp('01%'),
                  }}
                  onLongPress={move}
                  onPressOut={moveEnd}
                >

                  <Image
                    resizeMode="cover"
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    source={{ uri: item.path }}
                  />
                </TouchableOpacity>
                <Button
                  style={{
                    backgroundColor: ApplicationStyles.warningColor.color,
                    width: wp('5%'),
                    height: wp('5%'),
                    borderColor: ApplicationStyles.lightColor.color,
                    borderRadius: wp('5%') / 2,
                    borderWidth: StyleSheet.hairlineWidth,
                    justifyContent: 'center',
                    alignItems: 'center',
                    ...ApplicationStyles.elevationL,
                    position: 'absolute',
                    top: 0,
                    padding: wp('1%'),
                    right: -wp('0.2%'),
                  }}
                  onPress={() => this.removeFile(index)}
                  icon="md-remove"
                  iconColor={ApplicationStyles.lightColor.color}
                  iconSize={23}
                />
              </View>
            )}
            horizontal
            keyExtractor={(item, index) => item.path}
            onMoveEnd={({ data }) =>  this.updateFiles(data) }
          />
        </View>
        {error &&<Text style={[{ ...ApplicationStyles.fontStyles.caption, color: ApplicationStyles.warningColor.color }, { padding: 0 }]}>
          {error}
        </Text>
        }
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
