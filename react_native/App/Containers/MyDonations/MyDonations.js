import React, { Fragment, Component } from 'react';
import {
  View, StyleSheet, FlatList, Image, ScrollView, SectionList
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import CheckBox from 'react-native-checkbox';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Text, NavigationBar, TextInput, Button, EmptyState
} from '../../Components';
import { Colors, FontSizes, ApplicationStyles } from '../../Theme';
import AxiosRequest from '../../Services/HttpRequestService';

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
    const date = moment(item.createdAt);
    return (
      <View style={{flex:1, flexDirection: 'row', paddingVertical: hp('1%'),backgroundColor:ApplicationStyles.lightBackground.color,  }}>
        <View style={{flex:1}}>
          <Text style={{...ApplicationStyles.bodySubHeading,textAlign:'center'}}>{date.format('hh:mm A')}</Text>
          <Text style={{...ApplicationStyles.headline2, textAlign:'center'}}>{date.format('DD MMM')}</Text>
          <Text style={{...ApplicationStyles.bodySubHeading, textAlign:'center'}}>{date.format('YYYY')}</Text>
        </View>
        <View style={{flex:1, justifyContent:'center'}}>
        <Text style={{...ApplicationStyles.bodySubHeading, textAlign:'center'}}> </Text>
          <Text style={{...ApplicationStyles.headline2, textAlign:'center'}}>₹{item.amount}</Text>
          <Text style={{...ApplicationStyles.bodySubHeading, textAlign:'center'}}>{item.receiverId && item.receiverId.name}</Text>
        </View>
        <View style={{flex:1, justifyContent:'center'}}>
          <Text style={{...ApplicationStyles.bodySubHeading, textAlign:'center'}}> </Text>
          <Button title='View' titleStyle={{...ApplicationStyles.button2}}></Button>
          <Text style={{...ApplicationStyles.bodySubHeading, textAlign:'center'}}>No Attachment</Text>
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
            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
            renderItem={item => this.transctionItem(item)}
           renderSectionHeader={({ section: { weekDesc } }) => (
             <View style={{ paddingHorizontal:wp('3%'), flexDirection: 'row', flex:1, justifyContent:'space-around'}}>
              <Text style={{ ...ApplicationStyles.bodySubHeading, textAlign:'center', paddingVertical: hp('0.5%')}}>{weekDesc}</Text>
            </View> 

        )}
            // refreshing={isRefreshing}
            // onRefresh={this.getMoreComments}
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
