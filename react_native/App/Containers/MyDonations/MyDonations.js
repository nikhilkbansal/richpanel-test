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
import {
  Text, NavigationBar, TextInput, Button,
} from '../../Components';
import { Colors, FontSizes } from '../../Theme';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  subContainer: { flex: 1, paddingHorizontal: wp('5%') },
  loginContainer: {
    marginTop: hp('4%'),
    backgroundColor: Colors.primary,
    borderRadius: wp('2%'),
    width: wp('80%'),
    alignSelf: 'center',
    height: hp('7%'),
  },
  loginTitle: { color: Colors.lightFont, textAlign: 'center', fontSize: FontSizes.h3 },
});

class EditProfile extends Component {
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
    };
  }

  render() {
    const { navigation } = this.props;
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [{
        data: [20, 45, 28, 80, 99, 43],
      }],
    };
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} title="My Donations" />
        <ScrollView style={styles.subContainer}>
          <BarChart
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
          />

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
        </ScrollView>
      </View>
    );
  }
}

export default EditProfile;
