import React, { Component } from 'react';
import {
  FlatList, View, StatusBar
} from 'react-native';
import {
  Button, HelperText, Divider, withTheme,
} from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import Container from '../../Components/Container';
import TextInput from '../../Components/TextInput';
import styles from './PostStyle';
import images from '../../Theme/Images';
import SmallButton from '../../Components/SmallButton';
import SpaceBar from '../../Components/SpaceBar';
import commonStyle from '../../Theme/ApplicationStyles';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import defaultStyle from '../../Theme/ApplicationStyles';
class LoginScreen extends Component {
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

  _renderItem = ({item}) => (
    <Card>
    <Card.Content>
    <Title>Card title</Title>
    <Paragraph>Card content</Paragraph>
      </Card.Content>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  );

  render() {
    const { email, password, checked } = this.state;
    const { theme } = this.props;
    return (
      <View style={{flex:1}}>
        <Appbar style={defaultStyle.headerBar}>
        <Appbar.Content
          title=""
        />
        <Appbar.Action icon="archive" onPress={() => console.log('Pressed archive')} />
        <Appbar.Action icon="mail" onPress={() => console.log('Pressed mail')} />
        <Appbar.Action icon="label" onPress={() => console.log('Pressed label')} />
        <Appbar.Action icon="add" onPress={() => console.log('Pressed delete')} />
      </Appbar>
      <Container>
        <FlatList
          data={[1,2,3]}
          renderItem={this._renderItem}
        />
      </Container>
      </View>
    );
  }
}

export default withTheme(LoginScreen);
