import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const Loader = ({ isLoading }) => <Spinner visible={isLoading} />;

Loader.propTypes = { isLoading: PropTypes.bool.isRequired };

export default connect(({ app: { isLoading } }) => ({ isLoading }))(Loader);
