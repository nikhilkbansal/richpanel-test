import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ApplicationStyles from '../Theme/ApplicationStyles';

const Loader = ({ isLoading }) => <Spinner visible={isLoading} color={ApplicationStyles.primaryColor.color} overlayColor={'rgba(255, 255, 255, 0.24)'} animation={'fade'} cancelable={true}/>;

Loader.propTypes = { isLoading: PropTypes.bool.isRequired };

export default connect(({ app: { isLoading } }) => ({ isLoading }))(Loader);
