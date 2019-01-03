import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Post from 'App/Containers/Post/Post';
import { Searchbar } from 'react-native-paper';

const AlbumsRoute = () =>  <Searchbar
placeholder="Search"
/>;

const RecentsRoute = () => <Text>Recents</Text>;

export default class MyComponent extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'post', title: 'Posts', icon: 'photo' },
      { key: 'search', title: 'Search', icon: 'search' },
      { key: 'event', title: 'Events', icon: 'schedule' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    post: Post,
    search: AlbumsRoute,
    event: RecentsRoute,
  });

  render() {
    return (
      <BottomNavigation
        shifting
        labeled={false}
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}
