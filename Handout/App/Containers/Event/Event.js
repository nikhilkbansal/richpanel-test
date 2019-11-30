import React, { Component } from 'react'
import { FlatList, View, StyleSheet, StatusBar } from 'react-native'
import { withTheme } from 'react-native-paper'
import Share from 'react-native-share'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import PropTypes from 'prop-types'
import ActionButton from 'react-native-action-button'
import defaultStyle from '../../Theme/ApplicationStyles'
import { EventUi, NavigationBar, EmptyState } from '../../Components'
import { Colors, FontSizes, ApplicationStyles } from '../../Theme'
import Icon from 'react-native-vector-icons/Ionicons'
import Dialog, { DialogContent, SlideAnimation } from 'react-native-popup-dialog'
import { Button, Text } from 'react-native'
import { connect } from 'react-redux'
import EventActions from '../../Stores/Event/Actions'
import UserActions from '../../Stores/User/Actions'

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
})

class Event extends Component {
  static get propTypes() {
    return {
      theme: PropTypes.object.isRequired,
      navigation: PropTypes.func.isRequired,
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      email: null,
      password: '',
      checked: false,
    }
    this._renderItem = this._renderItem.bind(this)
    this.handleViewableItemsChanged = this.handleViewableItemsChanged.bind(this)
    this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 }
  }

  componentDidMount() {
    const { getHomeEvents } = this.props
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      getHomeEvents()
    })
  }

  componentWillUnmount() {
    this.navListener.remove()
  }

  onShare = async (item) => {
    const { profile, shareEvent } = this.props
    Share.open({
      message:
        profile.name +
        ' wants you see this event: ' +
        item.title +
        '. Use Handout App to make to world a better place for everyone like ' +
        profile.name +
        ' is doing',
      url: 'com.handout/' + item.title.replace(' ', ''),
    })
      .then((res) => {
        console.log(res)
        shareEvent({ itemId: item._id, itemType: 'event' })
      })
      .catch((err) => {
        err && console.log(err)
      })
  }

  _renderItem = ({ item }) => (
    <EventUi
      userName={item.userId.name}
      followUnfollow={() =>
        this.props.followUnFollow({
          type: 'homePageEvents',
          isFollowed: item.isFollowed,
          followeeId: item.userId._id,
        })
      }
      onSharePress={() => this.onShare(item)}
      onReactionPress={this.props.eventReaction}
      onRepost={() =>
        this.props.navigation.navigate('AddEvent', { itemId: item._id, isRepost: true })
      }
      onReactionRemovePress={this.props.removeEventReaction}
      userPicture={item.userId.picture}
      onViewComments={() =>
        this.props.navigation.navigate('Comment', { itemId: item._id, itemType: 'event' })
      }
      onUserClick={() =>
        this.props.navigation.navigate(item.userId.role === 'user' ? 'Profile' : 'NgoProfile', {
          poUserId: item.userId._id,
          userId: item.userId._id,
        })
      }
      onRepostUserClick={() =>
        item.repostOf &&
        this.props.navigation.navigate(
          item.repostOf.userId.role === 'user' ? 'Profile' : 'NgoProfile',
          { poUserId: item.repostOf.userId._id, userId: item.repostOf.userId._id }
        )
      }
      onDonatePress={() =>
        this.props.navigation.navigate('Donate', {
          paymentMeta: {
            _id: item.isRepost ? item.repostOf._id : item._id,
            poUserId: item.isRepost ? item.repostOf.userId._id : item.userId._id,
            txType: 'userToDirectPO',
          },
        })
      }
      {...item}
    />
  )

  handleViewableItemsChanged({ viewableItems }) {
    if (viewableItems && viewableItems.length > 0) {
      this.setState({ currentVisibleIndex: viewableItems[0].index })
    }
  }

  render() {
    const { navigation, homeEvents, profile } = this.props
    return (
      <View style={{ flex: 1, backgroundColor: ApplicationStyles.smokeBackground.color }}>
        <NavigationBar
          leftFunction={() => navigation.toggleDrawer()}
          leftIcon={'md-menu'}
          {...navigation}
          rightButtonAction={() => navigation.navigate('AddEvent')}
          showRightSection={profile && profile.role === 'ngo'}
          rightIcon="md-add"
          title="Events"
        />

        {homeEvents.length < 1 ? (
          <EmptyState message="There are no events to show">
            Tip: Follow some Philanthropy organizations from{' '}
            <Text
              onPress={() => navigation.navigate('Search')}
              style={{
                ...ApplicationStyles.fontStyles.button,
                textDecorationLine: 'underline',
                color: ApplicationStyles.grayishBackground.color,
                textAlign: 'center',
              }}
            >
              search page
            </Text>
          </EmptyState>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={this.handleViewableItemsChanged}
            viewabilityConfig={this.viewabilityConfig}
            onRefresh={() => {}}
            refreshing={false}
            data={homeEvents}
            renderItem={this._renderItem}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = false
            }}
            onEndReached={(data) => {
              if (!this.onEndReachedCalledDuringMomentum) {
                this.onEndReachedCalledDuringMomentum = true
                this.props.getHomeEvents({ skip: homeEvents.length })
              }
            }}
            onEndReachedThreshold={2}
          />
        )}
      </View>
    )
  }
}

export default connect(
  ({ event: { homeEvents }, user: { profile } }) => ({ homeEvents, profile }),
  {
    getHomeEvents: EventActions.getHomeEvents,
    eventReaction: EventActions.eventReaction,
    removeEventReaction: EventActions.removeEventReaction,
    shareEvent: EventActions.shareEvent,
    followUnFollow: UserActions.followUnFollow,
  }
)(Event)
