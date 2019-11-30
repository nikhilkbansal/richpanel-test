import React, { Fragment, Component } from 'react';
import {
  View, StyleSheet, FlatList, Image, ScrollView, SectionList
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import CheckBox from 'react-native-checkbox';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Text, NavigationBar, TextInput, Button, EmptyState
} from '../../Components';
import { Colors, FontSizes, ApplicationStyles } from '../../Theme';
import AxiosRequest from '../../Services/HttpRequestService';
import CommonFunctions from '../../Utils/CommonFunctions';
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ApplicationStyles.smokeBackground.color },
  subContainer: { flex: 1, paddingHorizontal: wp('5%') },
  loginContainer: {
    marginTop: hp('4%'),
    backgroundColor: ApplicationStyles.primaryColor.color,
    borderRadius: wp('2%'),
    width: wp('80%'),
    alignSelf: 'center',
    height: hp('7%'),
  },
  loginTitle: { color: ApplicationStyles.lightColor.color, textAlign: 'center', fontSize: FontSizes.h3 },
});

class RecurringPayments extends Component {
  static get propTypes() {
    return {
      navigation: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
    const { profile } = props;
    this.state = { 
      forPo: profile && profile.role === 'ngo',
      donations: [],
      activePayment: null,
    };
    this.getMyDonations = this.getMyDonations.bind(this);
    this.transctionItem = this.transctionItem.bind(this);
    this.cancelDonations = this.cancelDonations.bind(this);
  }

  componentDidMount(){
    this.getMyDonations();
  }

  async getMyDonations() {
    const { profile } = this.props;
    const { donations, forPo } = this.state;
    const itemsLength = donations.reduce((x,y)=>x+y.data.length,0);
    try {
      const { donations } = this.state;
      const cond = forPo ? {receiverId: profile.id} : {senderId: profile.id}
      const data = await AxiosRequest({
        method: 'get',
        params:{ ...cond, skip: itemsLength },
        url: 'payment/subscription',
      });
      this.setState({ donations: donations.concat(data) });
    } catch (e) {
      console.log('eeee',e)
    }
  }

  async cancelDonations(_id, postsIndex) {
    try {
      const { donations } = this.state;
      await AxiosRequest({
        method: 'post',
        params:{ _id},
        url: 'payment/subscription/cancel',
      });
      donations[postsIndex].status = 'cancelled';
      this.setState({ donations: donations });
    } catch (e) {
      console.log('eeee',e)
    }
  }


  subTransactionItem(tx){
    return (<View style={{flex:1, flexDirection: 'row',}}>
    <Text style={{flex:1, ...ApplicationStyles.fontStyles.body1,textAlign:'center'}}>{ moment(tx.createdAt).format('DD MMM YYYY')}</Text>
    <Text style={{flex:1,...ApplicationStyles.fontStyles.body2, textAlign:'center'}}>₹{tx.amount}</Text>
    <Text style={{flex:1,...ApplicationStyles.fontStyles.body1, textAlign:'center'}}>{tx.txStatus}</Text>
  </View>)
  }

  transctionItem({item, index}){
    const date = moment(item.createdAt);
    const { activePayment } = this.state;
    const isActive = activePayment === item._id;
    return (
      <View style={{flex:1, marginVertical: ApplicationStyles.listItemsSpace, paddingVertical: hp('1%'),backgroundColor:ApplicationStyles.lightBackground.color,  }}>
        <View style={{flex:1, flexDirection: 'row',}}>
          <View style={{flex:1}}>
            <Text style={{...ApplicationStyles.fontStyles.caption,textAlign:'center'}}>Created on</Text>
            <Text style={{...ApplicationStyles.fontStyles.title, textAlign:'center'}}>{date.format('DD MMM')}</Text>
            <Text style={{...ApplicationStyles.fontStyles.caption, textAlign:'center'}}>{date.format('YYYY')}</Text>
          </View>
          <View style={{flex:1, }}>
    <Text style={{...ApplicationStyles.fontStyles.caption, textAlign:'center'}}>₹{item.plan.amount} per {item.plan.intervalType}</Text>
            <Text style={{...ApplicationStyles.fontStyles.title, textAlign:'center'}}>₹{item.totalAmount}</Text>
            <Text style={{...ApplicationStyles.fontStyles.caption, textAlign:'center'}}>{item.receiverId && item.receiverId.name}</Text>
          </View>
          <View style={{flex:1, justifyContent:'center'}}>
            <Text style={{...ApplicationStyles.fontStyles.caption, textAlign:'center'}}>{item.subscription.status}</Text>
            <Button title={isActive ? 'HIDE' : 'VIEW'} onPress={()=>this.setState({activePayment: isActive ? null : item._id})} titleStyle={{...ApplicationStyles.fontStyles.button}}></Button>
    <Text style={{...ApplicationStyles.fontStyles.caption, textAlign:'center'}}> {CommonFunctions.numberToReadable(item.transactions.length)}
            {' '}
            {CommonFunctions.getPluralString('Transactions', item.transactions.length)}</Text>
          </View>
        </View>
        { isActive && <Fragment>
            <View style={{flex:1, marginTop: hp('1.6%')}}>
              { item.transactions.map(o=>
                this.subTransactionItem(o))
              }
            </View>
            <Button title='STOP DONATIONS' onPress={()=>this.cancelDonations(item._id, index)} titleStyle={{...ApplicationStyles.fontStyles.button, ...ApplicationStyles.warningColor}}></Button>
          </Fragment>
        }

      </View>
    )
  }

  
  render() { 

    const { navigation } = this.props;
    const { donations } = this.state;
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} title="Recurring Payments" />
        {donations.length < 1 
          ? <EmptyState message='There are no donations to show'> 
          </EmptyState>
        : 
        <FlatList
            data={donations }
            extraData={new Date()}
            showsVerticalScrollIndicator={false}
            // ref={this.listRef}
            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
            renderItem={item => this.transctionItem(item)}
            // refreshing={isRefreshing}
            // onRefresh={this.getMoreComments}
            onEndReached={(data) => {
              if (!this.onEndReachedCalledDuringMomentum) {
                this.onEndReachedCalledDuringMomentum = true;
                this.getMyDonations();
              }
            }}
            onEndReachedThreshold={0.1}
          /> 
        } 

      </View>
    );
  }
}

export default connect(
  ({ user: { profile } }) => ({ profile }), {
  },
)(RecurringPayments);
