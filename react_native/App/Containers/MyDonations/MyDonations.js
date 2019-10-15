import React, { Fragment, Component } from 'react';
import {
  View, StyleSheet, FlatList, Image, ScrollView,
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

import {
  Text, NavigationBar, TextInput, Button,
} from '../../Components';
import { Colors, FontSizes, ApplicationStyles } from '../../Theme';

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
    this.state = {
      email: null,
      password: '',
      checked: false,
      donations: []
    };
    this.getMyDonations = this.getMyDonations.bind(this);
  }

  componentDidMount(){
    this.getMyDonations();
  }

  async getMyDonations(itemsLength = 0) {
    const { profile } = this.props;
    try {
      const { donations } = this.state;
      const data = await AxiosRequest({
        method: 'get',
        params:{ senderId: profile._id ,skip: itemsLength },
        url: 'payment/transaction',
      });
      this.setState({ donations: donations.concat(data) });
    } catch (e) {
      console.log('eeee',e)
      Toast('Some error occured. Please try again later');
    }
  }


  render() {
    const { navigation } = this.props;
    const { donations } = this.state;
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [{
        data: [20, 45, 28, 80, 99, 43],
      }],
    };
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} title="My Donations" />
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
        <FlatList
            data={donations}
            extraData={donations}
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
    );
  }
}

export default connect(
  ({ user: { profile } }) => ({ profile }), {
  },
)(MyDonations);
