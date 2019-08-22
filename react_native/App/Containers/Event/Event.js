import React, { Component } from 'react';
import {
  FlatList, View, StyleSheet
} from 'react-native';
import { 
  withTheme
} from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import {EventUi, NavigationBar} from '../../Components';
import { Colors, FontSizes, ApplicationStyles } from '../../Theme';

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

class EventScreen extends Component {
  static get propTypes() {
    return {
      theme: PropTypes.object.isRequired,
      navigation: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: '',
      checked: false,
    };
  }

  _renderItem = ({item}) =><EventUi />;

  render() {
    console.log('propsprops',this.props);

    const { email, password, checked } = this.state;
    const { theme, navigation  } = this.props;
    return (
      <View style={{flex: 1, backgroundColor: ApplicationStyles.lightBackgkround.color}}>
        <NavigationBar {...navigation} rightButtonAction={() => navigation.navigate('AddPost')} showLeftSection={false} showRightSection rightIcon="md-add" title="Events" containerStyle={{ paddingHorizontal: wp('2%') }} />
        <FlatList
          data={[{a:3},{a:3},{a:3},{a:3}]} 
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

export default withTheme(EventScreen);
