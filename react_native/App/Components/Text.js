import PropTypes from 'prop-types';
import React from 'react';
import {
  Text as RNText,
} from 'react-native';
import { ApplicationStyles } from '../Theme';

function getTruncateString(string, maxLength, returnOriginal = false) {
  if (returnOriginal) {
    return string;
  }
  if (string.length > maxLength) {
    return string.slice(0, maxLength);
  }
  return string;
}

class Text extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHiddenText: false,
    };
    this.textShowToggle = this.textShowToggle.bind(this);
  }

  textShowToggle() {
    const { showHiddenText } = this.state;
    this.setState({ showHiddenText: !showHiddenText });
  }

  render() {
    const {
      children, style, maxLength, ...props
    } = this.props;
    const { showHiddenText } = this.state;
    const showMoreHide = maxLength && typeof children === 'string' && children.length > maxLength;
    const showMoreButton = showMoreHide && !showHiddenText;
    const showHideButton = showMoreHide && showHiddenText;

    return (
      <RNText style={[style]} {...props}>
        {typeof children === 'string' ? getTruncateString(children, maxLength, showHiddenText) : children}
        {showMoreButton && '...'}
        {showMoreButton
        && (
        <RNText onPress={this.textShowToggle} style={[style, { color: ApplicationStyles.primaryColor.color }]}>
          {' More'}
        </RNText>
        )}
        {showHideButton
        && (
        <RNText onPress={this.textShowToggle} style={[style, { color: ApplicationStyles.primaryColor.color }]}>
          {' Hide'}
        </RNText>
        )}
      </RNText>
    );
  }
}


Text.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.object,
};

Text.defaultProps = {
  style: {},
};


export default Text;
