import * as React from 'react';
import { Text } from 'react-native-paper';
import {View} from 'react-native';
import BottomNavigation, {
  FullTab, IconTab
} from 'react-native-material-bottom-navigation'
import Post from '../Post/Post';
import Notification from '../Notification/Notification';
import SearchPage from '../SearchPage/SearchPage';
import {  withTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Colors } from '../../Theme';

const RecentsRoute = () => <Text>Recents</Text>;
 class HomePage extends React.Component {
   constructor(props){
     super(props);
     this.state = {
      index: 0,

   tabs : [
    {
      key: 'post',
      icon: 'md-home',
      label: 'Post',
      barColor: '#388E3C',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },   
    {
      key: 'search',
      icon: 'md-home',
      label: 'Home',
      barColor: '#388E3C',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'home',
      icon: 'md-home',
      label: 'Home',
      barColor: '#388E3C',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'home',
      icon: 'md-home',
      label: 'Home',
      barColor: '#388E3C',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'home',
      icon: 'md-home',
      label: 'Home',
      barColor: '#388E3C',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
  ],
      routes: [
        { key: 'post', title: 'Posts', renderIcon: ({isActive})=>isActive ?(<Icon name="md-medal" size={22} color={'red'} style={{ paddingHorizontal: wp('2%') }} />): null, },
        { key: 'search', title: 'Search', icon: 'notifications-none' },
        { key: 'event', title: 'Events', icon: 'notifications-none' },
        { key: 'notification', title: 'Notification', icon: 'notifications-none' },
      ],
    };
     this._renderScene = this._renderScene.bind(this);
   }


  renderIcon = icon => ({ isActive }) => (
    <Icon size={24} color="white" name={icon} />
  )

  renderTab = ({ tab, isActive })      => (
    <IconTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  )

  _handleIndexChange = index => this.setState({ index });

  _renderScene = ({ isActive, tab }) => {
    switch (tab.key) {
      case 'post':
        return <Post navigation={this.props.navigation} />;
      case 'search':
        return <SearchPage  navigation={this.props.navigation}  />;
      case 'event':
        return <RecentsRoute  navigation={this.props.navigation}  />;
      case 'notification':
        return <Notification  navigation={this.props.navigation}  />;
    }
  }


  render() {
    const { theme } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {this.state.activeTab === 'post' && <Post navigation={this.props.navigation} />}
          {this.state.activeTab === 'search' && <SearchPage navigation={this.props.navigation} />}
        </View>
      <BottomNavigation
        // shifting
        onTabPress={newTab => this.setState({ activeTab: newTab.key })}
          renderTab={this.renderTab}
          tabs={this.state.tabs}
        // labeled={false}
        // activeColor={theme.colors.primary}
        // barStyle={{backgroundColor:'white',}}
        navigationState={this.state}
        // onIndexChange={this._handleIndexChange}
        // renderScene={this._renderScene}
        // renderTab={()=><Post navigation={this.props.navigation} />}
      />

</View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Post: Post,
  Search: SearchPage,
},  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Post') {
          iconName = "md-list";
        } else if (routeName === 'Search') {
          iconName = "md-search";
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      showLabel: false,
      activeTintColor: Colors.primary,
      inactiveTintColor: Colors.darkFont,
    },
  });
export default TabNavigator;

// export default withTheme(HomePage);

