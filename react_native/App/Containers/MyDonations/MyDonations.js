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
import { CommonFunctions } from '../../Utils';

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

class MyDonations extends Component {
  static get propTypes() {
    return {
      navigation: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    this.state = { 
      forPo: params && params.forPo,
      donations: []
    };
    this.getMyDonations = this.getMyDonations.bind(this);
  }

  componentDidMount(){
    this.getMyDonations();
  }

  async getMyDonations( ) {
    const { profile } = this.props;
    const { donations, forPo } = this.state;
    const itemsLength = donations.reduce((x,y)=>x+y.data.length,0);
    try {
      const { donations } = this.state;
      const cond = forPo ? {receiverId: profile.id} : {senderId: profile.id}
      const data = await AxiosRequest({
        method: 'get',
        params:{ ...cond ,skip: itemsLength },
        url: 'payment/transaction',
      });
      this.setState({ donations: donations.concat(data) });
    } catch (e) {
      console.log('eeee',e)
    }
  }

  transctionItem({item}){
    const { profile, navigation } = this.props;
    const date = moment(item.createdAt);
    const anotherUser =  item.receiverId && profile.id === item.receiverId._id ? item.senderId : item.receiverId
    return (
      <View style={{flex:1, flexDirection: 'row', marginVertical: ApplicationStyles.listItemsSpace, paddingVertical: hp('1%'),backgroundColor:ApplicationStyles.lightBackground.color,  }}>
        <View style={{flex:1}}>
          <Text style={{...ApplicationStyles.fontStyles.caption,textAlign:'center'}}>{date.format('hh:mm A')}</Text>
          <Text style={{...ApplicationStyles.fontStyles.title, textAlign:'center'}}>{date.format('DD MMM')}</Text>
          <Text style={{...ApplicationStyles.fontStyles.caption, textAlign:'center'}}>{date.format('YYYY')}</Text>
        </View>
        <View style={{flex:1, }}>
        <Text style={{...ApplicationStyles.fontStyles.caption, textAlign:'center'}}>{item.txData.orderId} </Text>
          <Text style={{...ApplicationStyles.fontStyles.title, textAlign:'center'}}>₹{item.amount}</Text>
          <Text style={{...ApplicationStyles.fontStyles.caption, textAlign:'center'}}>{anotherUser && anotherUser.name}</Text>
        </View>
        <View style={{flex:1, justifyContent:'center'}}>
          <Text style={{...ApplicationStyles.fontStyles.caption, textAlign:'center'}}> </Text>
          <Button title='VIEW' titleStyle={{...ApplicationStyles.fontStyles.button}} onPress={()=>navigation.navigate('SingleDonation', {donation: item})}></Button>
          <Text style={{...ApplicationStyles.fontStyles.caption, textAlign:'center'}}>
          {CommonFunctions.numberToReadable(item.files.length)}
            {' '}
            {CommonFunctions.getPluralString('Attachment', item.files.length)} </Text>
        </View>
      </View>
    )
  }

  
  render() { 

    const { navigation } = this.props;
    const { donations } = this.state;
 
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} title="Donations" />
        {/* <ScrollView style={styles.subContainer}> */}
          {/* <BarChart
            data={data}
            width={wp('100%')}
            height={220}
            yAxisLabel="$"
            chartConfig={{
              backgroundGradientFrom: Colors.accent,
              backgroundGradientTo: Colors.backdrop,
              color: (opacity = 1) => `rgba(22, 138, 229, ${opacity})`,
              strokeWidth: 2, // optional, default 3
            }}
          /> */}

          {/* <ProgressChart
            data={[20, 45, 28, 80, 99, 43]}
            width={wp('100%')}
            height={220}
            chartConfig={{
              backgroundGradientFrom: Colors.accent,
              backgroundGradientTo: Colors.backdrop,
              color: (opacity = 1) => `rgba(22, 138, 229, ${opacity})`,
              strokeWidth: 2, // optional, default 3
            }}
          /> */}
        {/* </ScrollView> */}
        {donations.length < 1 
          ? <EmptyState message='There are no donations to show'> 
          </EmptyState>
        : <SectionList
            sections={donations}
            extraData={donations}
            showsVerticalScrollIndicator={false}
            ref={this.listRef}
            renderItem={item => this.transctionItem(item)}
            renderSectionHeader={({ section: { weekDesc } }) => (
              <View style={{ paddingHorizontal:wp('3%'), flexDirection: 'row', flex:1, justifyContent:'space-around'}}>
                  <Text style={{ ...ApplicationStyles.bodySubHeading, textAlign:'center', paddingVertical: hp('0.5%')}}>{weekDesc}</Text>
                </View> 

            )}
            // refreshing={isRefreshing}
            // onRefresh={this.getMoreComments}
            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
            onEndReached={(data) => {
              if (!this.onEndReachedCalledDuringMomentum) {
                this.onEndReachedCalledDuringMomentum = true;
                this.getMyDonations( );
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
)(MyDonations);
