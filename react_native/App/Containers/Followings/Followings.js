import React, { Fragment, Component } from 'react';
import {
  View, StyleSheet, FlatList, Image, ScrollView, horizontal, Picker,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import CommentActions from 'App/Stores/Comment/Actions';
import { CommonFunctions } from '../../Utils';
import { Config } from '../../Config';
import {
  AvatarImage,EmptyState, ProgressiveImage, NavigationBar, TextInput, Button, HrLine, DatePicker, LocationSelector, Text,
} from '../../Components';
import { Colors, FontSizes, ApplicationStyles } from '../../Theme';
import AxiosRequest from '../../Services/HttpRequestService';


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ApplicationStyles.smokeBackground.color },
  commentContainer: {
    flexDirection: 'row',
    paddingVertical: hp('2%'),
  },
  avatarStyle: {
    paddingRight: wp('1%'),
    paddingTop: hp('0.57%'),
  },
  contentContainer: { flex: 1 },
  firstContainer: {
    ...ApplicationStyles.body, flex: 1, flexWrap: 'wrap',
  },
  userName: { ...ApplicationStyles.avatarTitle },
  secondContainer: {
    flex: 1, flexDirection: 'row',
  },
  actionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  likes: {
    flex: 1, textAlign: 'left', ...ApplicationStyles.body3,
  },
  likeButton: {
    flex: 1, alignContent: 'center', alignItems: 'center', paddingHorizontal: wp('1%'),
  },
  replyButton: {
    textAlign: 'right', flex: 1, ...ApplicationStyles.body3,
  },
  likeButtonWrapper: { flex: 1, paddingBottom: 0 },
  nameDetail: { paddingLeft: wp('2%'), flex: 1, flexDirection: 'row' },

});

function getUpdatesLikes(isLiked, likes) {
  if (isLiked) {
    return {
      likes: likes - 1,
      howUserReacted: false,
    };
  }
  return {
    likes: likes + 1,
    howUserReacted: 'like',
  };
}

class Followings extends Component {
  static get propTypes() {
    return {
      navigation: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      followees:[]
    };

    this.getFollowees = this.getFollowees.bind(this);

    this.commentInputRef = React.createRef();
    this.listRef = React.createRef();
    this.onEndReachedCalledDuringMomentum = true;
  }

  componentDidMount() {
    this.getFollowees();
  }


  async getFollowees(itemsLength = 0) {
    try {
      const {followees } = this.state;
      const data = await AxiosRequest({
        method: 'get',
        params:{ skip: itemsLength },
        url: 'follow',
      });
      this.setState({ followees: followees.concat(data) });
    } catch (e) {
      console.log('eeee',e)
      Toast('Some error occured. Please try again later');
    }
  }



  async followUnfollow(followeeId, followIndex,  unfollowed = false) {
    const { followees } = this.state;
    try {
       await AxiosRequest({
        method: 'post',
        data: {
          followeeId,
        },
        url: 'follow',
      });
      followees[followIndex].unfollowed = !unfollowed;
      this.setState({ followees });
    } catch (e) {
      // Toast('Some error occured. Please try again later');
    }
  }
 

 

  followItem({ item, index }) {
    const { navigation:{ navigate}} = this.props;
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        height: hp('10.5%'),
        paddingHorizontal: wp('5.5%'),
        paddingVertical: hp('1%'),
        marginVertical: ApplicationStyles.listItemsSpace,
        backgroundColor: ApplicationStyles.lightBackground.color
      }}
      >
        <Button 
        onPress={()=>navigate('NgoProfile',{poUserId:item.followeeId._id})}
        buttonWrapperStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          // marginTop: -hp('5.5'),
          justifyItems: 'center',
        }}
        >
          <AvatarImage size={wp('13%')} source={{ uri: CommonFunctions.getFile(item.followeeId.picture, 'avatar', true) }}/>
        </Button>
        <View style={{ flex: 5, alignItems: 'center' }}>
          <View style={[styles.nameDetail]}>
            <View style={{
              flex: 1,
              alignItems: 'flex-start',
              justifyItems: 'center',
            }}
            >
              <View style={{flexDirection: 'row'}}>
              <Text onPress={()=>navigate('NgoProfile',{poUserId:item.followeeId._id})} style={[ApplicationStyles.fontStyles.body2, { flex: 1 }]}>{item.followeeId.name}</Text>
              <Button
                title={item.unfollowed ? "Follow": "Unfollow"}
                style={{
                  flex: 1,
                  alignItems:'flex-end'
                }}
                containerStyle={{ flex: 1 }}
                buttonWrapperStyle={{
                  flex: 1,
                }}
                onPress={()=>this.followUnfollow(item.followeeId._id, index, item.unfollowed)}
                titleStyle={{ ...ApplicationStyles.fontStyles.button, color:ApplicationStyles.primaryColor.color }}
                />
              </View>
              <Text style={[ApplicationStyles.fontStyles.caption, { flex: 1 }]}>
                @{item.followeeId.userName}
              </Text>
              <Text style={[ApplicationStyles.fontStyles.caption, { flex: 1 }]}>
                { item.followerCount } { CommonFunctions.getPluralString('Follower', item.followerCount)}
              </Text>
            </View>
          </View>
        </View>
        </View>
    );
  }

  render() {
    const { navigation } = this.props;

    const { followees } = this.state;
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} title="Followings" />
        {followees.length < 1 ? <EmptyState message='There are no followings to show'> 
          Tip: Follow some Philanthropy organizations from <Text onPress={()=>navigation.navigate('Search')}  style={{...ApplicationStyles.button2, textDecorationLine: 'underline', color: ApplicationStyles.grayishBackground.color, textAlign:'center'}}>search page</Text>
        </EmptyState> 
        :<View style={{   flex:1, height: hp('93%'),   }}>
          <FlatList
            data={followees }
            extraData={followees}
            showsVerticalScrollIndicator={false}
            ref={this.listRef}
            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
            renderItem={item => this.followItem(item)}
            // refreshing={isRefreshing}
            // onRefresh={this.getMoreComments}
            onEndReached={(data) => {
              if (!this.onEndReachedCalledDuringMomentum) {
                this.onEndReachedCalledDuringMomentum = true;
                this.getFollowees(followees.length);
              }
            }}
            onEndReachedThreshold={0.1}
          />  
      </View>
        }
      </View>
    );
  }
}

export default connect()(Followings);
