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
  AvatarImage, EmptyState, NavigationBar, TextInput, Button, HrLine, DatePicker, LocationSelector, Text,
} from '../../Components';
import { Colors, FontSizes, ApplicationStyles } from '../../Theme';


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ApplicationStyles.lightBackground.color },
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

class Comment extends Component {
  static get propTypes() {
    return {
      navigation: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.state = {
      replyingTo: undefined,
      commentIndex: 0,
      comment: '',
      isRefreshing: false,
      itemId: params.itemId,
      itemType: params.itemType,
    };
    this.postComment = this.postComment.bind(this);
    this.doReply = this.doReply.bind(this);
    this.replyItem = this.replyItem.bind(this);
    this.cancelReply = this.cancelReply.bind(this);
    this.getMoreComments = this.getMoreComments.bind(this);

    this.commentInputRef = React.createRef();
    this.listRef = React.createRef();
    this.onEndReachedCalledDuringMomentum = true;
  }

  componentDidMount() {
    const { getComment } = this.props;
    const { itemId, itemType } = this.state;
    getComment({
      itemId,
      itemType,
    });
  }

  postComment() {
    const {
      comment, replyingTo, commentIndex, itemId, itemType,
    } = this.state;
    const { postComment } = this.props;
    postComment({
      commentIndex,
      repliedTo: replyingTo,
      comment,
      itemId,
      itemType,
    });

    this.setState({ comment: '', replyingTo: undefined });
    this.commentInputRef.current.blur();
    this.listRef.current.scrollToOffset(0);
  }

  likeUnlikeComment(_id, isLiked, isReply = false, indexes = {}) {
    const { likeUnlikeComment } = this.props;
    likeUnlikeComment({
      _id,
      isLiked,
      isReply,
      indexes,
    });
  }


  updateTextInput(key, value) {
    this.setState({ [key]: value });
  }

  doReply(_id, commentIndex) {
    this.setState({ replyingTo: _id, commentIndex });
    this.commentInputRef.current.focus();
  }

  cancelReply() {
    this.setState({ replyingTo: '' });
    this.commentInputRef.current.blur();
  }

  getMoreComments(repliedTo = undefined, commentIndex = 0, itemsLength = null) {
    const { getComment } = this.props;
    const { itemId, itemType } = this.state;
    getComment({
      skip: itemsLength || undefined,
      commentIndex,
      repliedTo,
      itemId,
      itemType,
    });
  }


  replyItem({ item, index, commentIndex }) {
    return (
      <View style={styles.commentContainer}>
        <AvatarImage
          style={styles.avatarStyle}
          size={wp('6%')}
          source={{ uri: CommonFunctions.getFile(item.userId.picture, 'avatar', false) }}
        />

        <View style={styles.contentContainer}>

          <Text style={styles.firstContainer}>
            <Text style={styles.userName}>
              {`${item.userId.name} `}
            </Text>
            {item.comment}
          </Text>
          <View style={styles.secondContainer}>

            <View style={styles.actionContainer}>
              <Text style={styles.likes}>
                {item.likes ? `${CommonFunctions.numberToReadable(item.likes)} Likes` : ''}
              </Text>

              <Button
                iconFamily="AntDesign"
                icon={item.howUserReacted ? 'like1' : 'like2'}
                buttonWrapperStyle={styles.likeButtonWrapper}
                iconSize={hp('2.5%')}
                onPress={() => this.likeUnlikeComment(
                  item._id,
                  !!item.howUserReacted,
                  true,
                  { replyIndex: index, commentIndex, newReply: getUpdatesLikes(!!item.howUserReacted, item.likes) },
                )}
                iconColor={item.howUserReacted ? ApplicationStyles.primaryColor.color : ApplicationStyles.body3.color}
                style={styles.likeButton}
              />
              <Button
                title="Reply"
                style={{ flex: 1 }}
                onPress={() => this.doReply(item.repliedTo, commentIndex)}
                titleStyle={styles.replyButton}
              />
            </View>

          </View>
        </View>
      </View>
    );
  }

  commentItem({ item, index }) {
    return (
      <View style={styles.commentContainer}>
        <AvatarImage
          style={styles.avatarStyle}
          size={wp('6%')}
          source={{ uri: CommonFunctions.getFile(item.userId.picture, 'avatar', false) }}
        />

        <View style={styles.contentContainer}>

          <Text style={styles.firstContainer}>
            <Text style={styles.userName}>
              {`${item.userId.name} `}
            </Text>
            {item.comment}
          </Text>
          <View style={styles.secondContainer}>

            <View style={styles.actionContainer}>

              <Text style={styles.likes}>
                {item.likes ? `${CommonFunctions.numberToReadable(item.likes)} ${CommonFunctions.getPluralString('Like', item.likes)}` : ''}
              </Text>


              <Button
                iconFamily="AntDesign"
                icon={item.howUserReacted ? 'like1' : 'like2'}
                onPress={() => this.likeUnlikeComment(item._id, !!item.howUserReacted, false, { commentIndex: index, newComment: getUpdatesLikes(!!item.howUserReacted, item.likes) })}
                buttonWrapperStyle={styles.likeButtonWrapper}
                iconSize={hp('2.5%')}
                iconColor={item.howUserReacted ? ApplicationStyles.primaryColor.color : ApplicationStyles.body3.color}
                style={styles.likeButton}
              />
              <Button
                title="Reply"
                style={{ flex: 1 }}
                titleStyle={styles.replyButton}
                onPress={() => this.doReply(item._id)}

              />
            </View>

          </View>
          <FlatList
            data={item.replies}
            extraData={Date.now()}
            renderItem={data => this.replyItem({ ...data, commentIndex: index })}
          />
          {item.isAvailbleReplies && (
          <Button
            title="View more replies"
            titleStyle={{ ...ApplicationStyles.body3 }}
            buttonWrapperStyle={{ }}
            onPress={() => this.getMoreComments(item._id, index, item.replies.length)}
          />
          )}
        </View>
      </View>
    );
  }

  render() {
    const { navigation, comments } = this.props;

    const { comment, replyingTo, isRefreshing } = this.state;
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} title="Comments" />

        <View style={{ paddingHorizontal: wp('4%'), height: replyingTo ? hp('73.1%') : hp('80%') }}>
        {comments.lenght===0 && <EmptyState message='No one commented yet. You can be the first one' messageContainerStyle={{backgroundColor: ApplicationStyles.lightBackground.color}}
        > 
          </EmptyState>}
          <FlatList
            data={comments}
            extraData={comments}
            showsVerticalScrollIndicator={false}
            ref={this.listRef}
            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
            renderItem={item => this.commentItem(item)}
            refreshing={isRefreshing}
            onRefresh={this.getMoreComments}
            onContentSizeChange={data => console.log('onContentSizeChange', data)}
            onEndReached={(data) => {
              // console.log('onEndReached', data);
              if (!this.onEndReachedCalledDuringMomentum) {
                this.onEndReachedCalledDuringMomentum = true;
                this.getMoreComments(undefined, 0, comments.length);
              }
            }}
            onEndReachedThreshold={0.1}
          />
        </View>
        {!!replyingTo && (
        <View style={{
          flexDirection: 'row',
          height: hp('5%'),
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'flex-end',
          backgroundColor: ApplicationStyles.smokeBackground.color,
          borderWidth: StyleSheet.hairlineWidth * 2,
          borderColor: ApplicationStyles.smokeBackground.color,
          borderBottomColor: 'black',
          paddingHorizontal: wp('3%'),
          position: 'absolute',
          bottom: hp('10%'),
          width: '100%',
        }}
        >
          <Button
            title="Cancel Reply"
            onPress={this.cancelReply}
            titleStyle={{ ...ApplicationStyles.info3 }}
          />
        </View>
        )}
        <View style={{
          flexDirection: 'row',
          backgroundColor: ApplicationStyles.smokeBackground.color,
          paddingHorizontal: wp('4%'),
          justifyContent: 'center',
          height: hp('10%'),
          position: 'absolute',
          bottom: 0,
        }}
        >

          <TextInput
            multiline
            numberOfLines={3}
            textInputRef={this.commentInputRef}
            label={null}
            placeholder="What do you say?"
            inputStyle={{
              width: wp('85%'), flex: 1, borderWidth: 0,
            }}
            value={comment}
            underLineAnd
            returnKeyType="next"
            onChangeText={text => this.updateTextInput('comment', text)}
          />
          <Button
            onPress={
              this.postComment
            }
            style={{ width: wp('8%'), paddingHorizontal: wp('1%') }}

            iconFamily="Ionicons"
            icon="md-send"
          />
        </View>

      </View>
    );
  }
}

export default connect(({ comment: { comments } }) => ({ comments }), {
  getComment: CommentActions.getComment,
  postComment: CommentActions.postComment,
  likeUnlikeComment: CommentActions.likeUnlikeComment,
})(Comment);
