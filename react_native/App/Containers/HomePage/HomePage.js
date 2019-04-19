import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Post from '../Post/Post';
import Notification from '../Notification/Notification';
import SearchPage from '../SearchPage/SearchPage';
import {  withTheme } from 'react-native-paper';

const RecentsRoute = () => <Text>Recents</Text>;
 class HomePage extends React.Component {
   constructor(props){
     super(props);
     this.state = {
      index: 0,
      routes: [
        { key: 'post', title: 'Posts', icon: 'home', },
        { key: 'search', title: 'Search', icon: 'search' },
        { key: 'event', title: 'Events', icon: 'sentiment-satisfied' },
        { key: 'notification', title: 'Notification', icon: 'notifications-none' },
      ],
    };
     this._renderScene = this._renderScene.bind(this);
   }


  _handleIndexChange = index => this.setState({ index });

  _renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case 'post':
        return <Post navigation={this.props.navigation} jumpTo={jumpTo} />;
      case 'search':
        return <SearchPage  navigation={this.props.navigation}  jumpTo={jumpTo} />;
      case 'event':
        return <RecentsRoute  navigation={this.props.navigation}  jumpTo={jumpTo} />;
      case 'notification':
        return <Notification  navigation={this.props.navigation}  jumpTo={jumpTo} />;
    }
  }


  render() {
    const { theme } = this.props;
    return (
      <BottomNavigation
        shifting
        labeled={false}
        activeColor={theme.colors.primary}
        barStyle={{backgroundColor:'white',}}
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}


export default withTheme(HomePage);

