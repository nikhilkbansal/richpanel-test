/*
 * @file: Loader.js
 * @description: Top header component for showing statusbar, back button, title etc
 * @date: 05.Jan.2018
 * @author: Manish Budhiraja
 * */

import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';


class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  componentDidMount() {
    const context = this;
    setTimeout(() => {
      context.setState({
        visible: false,
      });
    }, 7000);
  }

  render() {
    return <Spinner visible={this.state.visible} />;
  }
}


module.exports = Loader;
