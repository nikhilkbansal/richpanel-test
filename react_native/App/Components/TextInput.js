import * as React from 'react';
import { View, TextInput as RNTextInput } from 'react-native';
import PropTypes from 'prop-types';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from './Button';
import Text from './Text';
import { Colors, ApplicationStyles } from '../Theme';

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEyeIcon: props.secureTextEntry,
      secureTextEntry: false,
    };
    this.toggleSecureEntry = !this.toggleSecureEntry;
  }

  eyeButton(icon = 'ios-eye') {
    return (
      <Button style={{ position: 'absolute', right: 0, top: hp('3%') }} onClick={this.toggleSecureEntry}>
        <Icon name={icon} size={ApplicationStyles.iconSize} color={Colors.mediumDarkFont} />
      </Button>
    );
  }

  toggleSecureEntry() {
    const { secureTextEntry } = this.state;
    this.setState({ secureTextEntry: !secureTextEntry });
  }

  render() {
    const { secureTextEntry, showEyeIcon } = this.state;
    const { label } = this.props;
    return (
      <View style={{ marginVertical: hp('2%') }}>
        <Text size="h3" color="mediumDark">{label}</Text>
        <RNTextInput
          secureTextEntry={secureTextEntry}
          style={{ paddingHorizontal: 0, margin: 0 }}
          underlineColorAndroid={Colors.primary}
        />
        {showEyeIcon && secureTextEntry && this.eyeButton('ios-eye') }
        {showEyeIcon && !secureTextEntry && this.eyeButton('ios-eye-off') }

      </View>
    );
  }
}

// const TextInput = ({ secureTextEntry, label }) => (
//   <View style={{ marginVertical: hp('2%') }}>
//     <Text size="h3" color="mediumDark">{label}</Text>
//     <RNTextInput
//       secureTextEntry={secureTextEntry}
//       style={{ paddingHorizontal: 0, margin: 0 }}
//       underlineColorAndroid={Colors.primary}
//     />
//     {secureTextEntry && <Icon style={{ position: 'absolute', right: 0, top: hp('3%') }} name="ios-eye" size={ApplicationStyles.iconSize} color={Colors.mediumDarkFont} />}

//   </View>
// );

TextInput.propTypes = {
  secureTextEntry: PropTypes.bool,
  label: PropTypes.string,
};

TextInput.defaultProps = {
  secureTextEntry: false,
  label: '',
};

export default TextInput;
