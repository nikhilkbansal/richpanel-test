import {
  all, call, put, takeLatest, select, take,
} from 'redux-saga/effects';
import httpClient from './HttpClient';
import { Config } from '../Config';
import commentActions, { CommentTypes } from '../Stores/Comment/Actions';

export function* getComment({ payload }) {
  try {
    const payloadData = {
      method: 'get',
      params: {
        ...payload,
        perPage: Config.PAGE_SIZE,
      },
      url: 'comment/',
    };
    const data = yield call(httpClient, payloadData, 'default', !payload.skip);
    if (payload.skip) {
      if (payload.repliedTo) {
        yield put(commentActions.pushReplies({ replies: data, commentIndex: payload.commentIndex }));
      } else {
        yield put(commentActions.pushComments({ comments: data }));
      }
    } else {
      yield put(commentActions.gotComments(data));
    }
  } catch (e) {
    // catch errors here
  }
}

export function* postComment({ payload }) {
  try {
    const payloadData = {
      method: 'post',
      data: {
        ...payload,
      },
      url: 'comment/',
    };
    const data = yield call(httpClient, payloadData);
    if (payload.repliedTo) {
      yield put(commentActions.putReply({ commentIndex: payload.commentIndex, newReply: data }));
    } else {
      yield put(commentActions.putComment({ newComment: data }));
    }
  } catch (e) {
    // catch errors here
  }
}

export function* likeUnlike({ payload }) {
  try {
    const payloadData = {
      method: 'post',
      data: {
        ...payload,
      },
      url: 'comment/likeUnlike',
    };
    yield call(httpClient, payloadData);
    if (payload.isReply) {
      yield put(commentActions.patchReply(payload.indexes));
    } else {
      yield put(commentActions.patchComment(payload.indexes));
    }
  } catch (e) {
    // catch errors here
  }
}


function* Saga() {
  yield all(
    [
      takeLatest(CommentTypes.GET_COMMENT, getComment),
      takeLatest(CommentTypes.POST_COMMENT, postComment),
      takeLatest(CommentTypes.LIKE_UNLIKE_COMMENT, likeUnlike),
    ],
  );
}

export default Saga;
