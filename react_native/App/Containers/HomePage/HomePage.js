import * as React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Post from '../Post/Post';
import Event from '../Event/Event';
import Notification from '../Notification/Notification';
import SearchPage from '../SearchPage/SearchPage';
import Shop from '../Shop/Shop';
import Profile from '../Profile/Profile';
import Drawer from './Drawer';
import { Colors, ApplicationStyles } from '../../Theme';
import { Text, Icon } from '../../Components';
import { createDrawerNavigator } from 'react-navigation-drawer';


// const RecentsRoute = () => <Text>Recents</Text>;
//  class HomePage extends React.Component {
//    constructor(props){
//      super(props);
//      this.state = {
//       index: 0,

//    tabs : [
//     {
//       key: 'post',
//       icon: 'md-home',
//       label: 'Post',
//       barColor: '#388E3C',
//       pressColor: 'rgba(255, 255, 255, 0.16)'
//     },
//     {
//       key: 'search',
//       icon: 'md-home',
//       label: 'Home',
//       barColor: '#388E3C',
//       pressColor: 'rgba(255, 255, 255, 0.16)'
//     },
//     {
//       key: 'home',
//       icon: 'md-home',
//       label: 'Home',
//       barColor: '#388E3C',
//       pressColor: 'rgba(255, 255, 255, 0.16)'
//     },
//     {
//       key: 'home',
//       icon: 'md-home',
//       label: 'Home',
//       barColor: '#388E3C',
//       pressColor: 'rgba(255, 255, 255, 0.16)'
//     },
//     {
//       key: 'home',
//       icon: 'md-home',
//       label: 'Home',
//       barColor: '#388E3C',
//       pressColor: 'rgba(255, 255, 255, 0.16)'
//     },
//   ],
//       routes: [
//         { key: 'post', title: 'Posts', renderIcon: ({isActive})=>isActive ?(<Icon name="md-medal" size={22} color={'red'} style={{ paddingHorizontal: wp('2%') }} />): null, },
//         { key: 'search', title: 'Search', icon: 'notifications-none' },
//         { key: 'event', title: 'Events', icon: 'notifications-none' },
//         { key: 'notification', title: 'Notification', icon: 'notifications-none' },
//       ],
//     };
//      this._renderScene = this._renderScene.bind(this);
//    }


//   renderIcon = icon => ({ isActive }) => (
//     <Icon size={24} color="white" name={icon} />
//   )

//   renderTab = ({ tab, isActive })      => (
//     <IconTab
//       isActive={isActive}
//       key={tab.key}
//       label={tab.label}
//       renderIcon={this.renderIcon(tab.icon)}
//     />
//   )

//   _handleIndexChange = index => this.setState({ index });

//   _renderScene = ({ isActive, tab }) => {
//     switch (tab.key) {
//       case 'post':
//         return <Post navigation={this.props.navigation} />;
//       case 'search':
//         return <SearchPage  navigation={this.props.navigation}  />;
//       case 'event':
//         return <RecentsRoute  navigation={this.props.navigation}  />;
//       case 'notification':
//         return <Notification  navigation={this.props.navigation}  />;
//     }
//   }


//   render() {
//     const { theme } = this.props;
//     return (
//       <View style={{ flex: 1 }}>
//         <View style={{ flex: 1 }}>
//           {this.state.activeTab === 'post' && <Post navigation={this.props.navigation} />}
//           {this.state.activeTab === 'search' && <SearchPage navigation={this.props.navigation} />}
//         </View>
//       <BottomNavigation
//         // shifting
//         onTabPress={newTab => this.setState({ activeTab: newTab.key })}
//           renderTab={this.renderTab}
//           tabs={this.state.tabs}
//         // labeled={false}
//         // activeColor={theme.colors.primary}
//         // barStyle={{backgroundColor:'white',}}
//         navigationState={this.state}
//         // onIndexChange={this._handleIndexChange}
//         // renderScene={this._renderScene}
//         // renderTab={()=><Post navigation={this.props.navigation} />}
//       />

// </View>
//     );
//   }
// }

const TabNavigator = createBottomTabNavigator({

  Post,
  Event,
  Search: SearchPage,
  Shop,
  Notification,
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    lazy: true,
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName,
        iconFamily,
        iconSize = wp('7%');
      if (routeName === 'Post') {
        iconName = 'md-list';
      } else if (routeName === 'Search') {
        iconName = 'md-search';
      } else if (routeName === 'Notification') {
        iconName = 'bell';
        iconFamily = 'Feather';
        iconSize = wp('6.4%');
      } else if (routeName === 'Event') {
        iconName = 'md-time';
      } else if (routeName === 'Shop') {
        iconFamily = 'Feather';
        iconSize = wp('5.8%');
        iconName = 'shopping-bag';
      }


      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Icon name={iconName} size={iconSize} iconFamily={iconFamily} color={tintColor} />;
    },
    tabBarLabel: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let title;
      if (routeName === 'Post') {
        title = 'Posts';
      } else if (routeName === 'Search') {
        title = 'Search';
      } else if (routeName === 'Notification') {
        title = 'Notifications';
      } else if (routeName === 'Event') {
        title = 'Events';
      } else if (routeName === 'Shop') {
        title = 'Shop';
      }

      return (
        <Text style={{
          ...ApplicationStyles.tabLabelStyle, marginTop: -hp('1%'), textAlign: 'center', color: focused ? tintColor : ApplicationStyles.disabledColor.color,
        }}
        >
          {title}

        </Text>
      );
    },
  }),
  tabBarOptions: {
    style: {
      height: hp('8%'), paddingVertical: hp('1%'), borderTopWidth: 0, ...ApplicationStyles.elevationM, backgroundColor: ApplicationStyles.lightBackground.color
    },
    tabStyle: { paddingTop: 0 },
    showLabel: true,
    showIcon: true,
    keyboardHidesTabBar: true,
    activeTintColor: ApplicationStyles.primaryColor.color,
    inactiveTintColor: ApplicationStyles.disabledColor.color,
  },
});

const DrawerNavigator = createDrawerNavigator({
  Home:{
      screen: TabNavigator
  }
},{
  initialRouteName: 'Home',
  contentComponent: Drawer,
  drawerWidth: wp('60%'),
  drawerType: 'slide',
  edgeWidth: wp('20%'),
  drawerBackgroundColor: ApplicationStyles.lightColor.color,
  hideStatusBar:true,
  overlayColor: 0.5
});

export default DrawerNavigator;

// export default withTheme(HomePage);
