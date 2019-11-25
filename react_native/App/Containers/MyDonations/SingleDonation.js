import React, { Fragment, Component } from 'react';
import {
  View, StyleSheet, FlatList, Image, ScrollView, SectionList
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import CheckBox from 'react-native-checkbox';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Text, NavigationBar, TextInput, Button, EmptyState, FileSelector
} from '../../Components';
import { Colors, FontSizes, ApplicationStyles } from '../../Theme';
import AxiosRequest from '../../Services/HttpRequestService';
import DocumentPicker from 'react-native-document-picker';
import UploadFiles from '../../Services/UploadFilesService';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ApplicationStyles.smokeBackground.color },
  subContainer: { flex: 1,   },
  loginContainer: {
    marginTop: hp('1%'),
    backgroundColor: ApplicationStyles.primaryColor.color,
    borderRadius: wp('2%'),
    width: wp('80%'),
    alignSelf: 'center',
    height: hp('7%'),
  },
  loginTitle: { color: ApplicationStyles.lightColor.color, textAlign: 'center', fontSize: FontSizes.h3 },
});

class SingleDonation extends Component {
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
      donations: [],
      file: null
    };
    this.getMyDonations = this.getMyDonations.bind(this);
    this.sendFile = this.sendFile.bind(this);
    this.chooseDoc = this.chooseDoc.bind(this);
    this.updateTextInput = this.updateTextInput.bind(this);
    this.updateTransction = this.updateTransction.bind(this);
  }

  componentDidMount(){
    this.getMyDonations();
  }

  updateTextInput(key, value) {
    this.setState({ [key]: value });
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

  async chooseDoc(){
    try {
      const res = await DocumentPicker.pick({
        type:DocumentPicker.types.allFiles,
      });
      const { fileName } = this.state;
      res.name = fileName ? fileName+'.'+res.type.split('/')[1] : res.name;
      res.path = res.uri;
      res.mime = res.type;
      this.setState({file: res}); 
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('canceld')
        // User cancelled the picker, exit any dialogs or menus and move on
      }  
    }
  }

  transctionItem({item}){
    const { profile } = this.props;
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
        <Text style={{...ApplicationStyles.fontStyles.caption, textAlign:'center'}}> </Text>
          <Text style={{...ApplicationStyles.fontStyles.title, textAlign:'center'}}>₹{item.amount}</Text>
          <Text style={{...ApplicationStyles.fontStyles.caption, textAlign:'center'}}>{anotherUser && anotherUser.name}</Text>
        </View>
        <View style={{flex:1, justifyContent:'center'}}>
          <Text style={{...ApplicationStyles.fontStyles.caption, textAlign:'center'}}> </Text>
          <Text style={{...ApplicationStyles.fontStyles.caption, textAlign:'center'}}>No Attachment</Text>
        </View>
      </View>
    )
  }

  getRow(label, value, func = null){
    return <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center', alignContent:'center', paddingLeft:wp('8%')}}>
    <Text style={{ paddingVertical:hp('0.4%'),flex:1,  ...ApplicationStyles.fontStyles.body1,textAlign:'left'}}>{label}</Text>
    <Text style={{paddingVertical:hp('0.4%'),flex:1, ...ApplicationStyles.fontStyles.body2,textAlign:'left', color:func? ApplicationStyles.primaryColor.color: ApplicationStyles.darkColor.color }} onPress={func}>{value}</Text>
  </View>
  }

  async sendFile(){
    const { file } = this.state;
    console.log(file)
    const filesUploaded = await UploadFiles([file]);

  }

  async updateTransction(body ) {
    const { donations, forPo } = this.state; 
    try { 
       await AxiosRequest({
        method: 'patch',
        body: {...body },
        url: 'payment/transaction',
      });
      this.setState({ file: null });
    } catch (e) {
      console.log('eeee',e)
    }
  }

  render() { 

    const { navigation } = this.props;
    const { file } = this.state;
 
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} title="Donation" />
        <KeyboardAwareScrollView style={styles.subContainer}>
        
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
        {/* {donations.length < 1 
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
        }  */}
        
        <View style={{  flexDirection: 'column', marginVertical: ApplicationStyles.listItemsSpace, paddingVertical: hp('1%'),backgroundColor:ApplicationStyles.lightBackground.color,  }}>
          {this.getRow('Donation No.', 'INNVIV1574618020')}
          {this.getRow('Philanthropy org.', 'Goonj', ()=>{})}
          {this.getRow('Campaign', 'Poor kids', ()=>{})}
          {this.getRow('Date', '12:21 AM 10 Dec 2019')}
          {this.getRow('Donated', '₹500')}
          {this.getRow('Deduction', '₹10')}
          {this.getRow('PO Received', '₹490')}
          <View style={{flexDirection: 'row', alignContent:'center', justifyContent:'space-around', paddingVertical: hp('1%')}}>
            <Button title='CONTACT PO' style={{   height:hp('5%'),  }} buttonWrapperStyle={{flex:1, }} titleStyle={{...ApplicationStyles.fontStyles.button, color:ApplicationStyles.primaryColor.color}}  ></Button>
          </View> 
        </View>

        {/* <View style={{  flexDirection: 'column', marginVertical: ApplicationStyles.listItemsSpace, paddingVertical: hp('1%'),backgroundColor:ApplicationStyles.lightBackground.color,  }}>
          <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center', alignContent:'center', paddingLeft:wp('8%')}}>
            <Text style={{ paddingVertical:hp('0.4%'),flex:1,  ...ApplicationStyles.fontStyles.caption,textAlign:'center'}}>Attachments</Text>
          </View>
          <ScrollView style={{maxHeight: hp('40%')}}>
          {this.getRow('11:12 PM 10 Dec 2019', 'TaxtExamp.pdf', ()=>{})}
          {this.getRow('11:12 PM 10 Dec 2019', 'TaxtExamp.pdf', ()=>{})}
          {this.getRow('11:12 PM 10 Dec 2019', 'TaxtExamp.pdf', ()=>{})}
          {this.getRow('11:12 PM 10 Dec 2019', 'TaxtExamp.pdf', ()=>{})}
          {this.getRow('11:12 PM 10 Dec 2019', 'TaxtExamp.pdf', ()=>{})} 
          </ScrollView>

        </View> */}
        <View style={{  flexDirection: 'column', marginVertical: ApplicationStyles.listItemsSpace, paddingVertical: hp('1%'),backgroundColor:ApplicationStyles.lightBackground.color,  }}>
          <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center', alignContent:'center', paddingLeft:wp('8%')}}>
            <Text style={{ paddingVertical:hp('0.4%'),flex:1,  ...ApplicationStyles.fontStyles.caption,textAlign:'center'}}>Send Attachments</Text>
          </View>
          
          <View style={{flexDirection: 'column', paddingHorizontal: wp('4%'), alignContent:'center', justifyContent:'space-around', paddingVertical: hp('1%')}}>
            <TextInput
              label="File name"
              returnKeyType="done"
              optional
              onChangeText={text => this.updateTextInput('fileName', text)}
              placeholder="File name to identify it later i.e. taxexemption"
            />
            <Button title={file?'Choose other file (1 file selected)': 'Choose file'} onPress={this.chooseDoc} style={{   height:hp('5%'),  }} buttonWrapperStyle={{flex:1, }} titleStyle={{...ApplicationStyles.fontStyles.button, color:ApplicationStyles.primaryColor.color}} ></Button>
            {file && <Button
              style={styles.loginContainer}
              titleStyle={styles.loginTitle}
              onPress={this.sendFile}
              title="SEND"
            />}
          </View> 
        </View>

        </KeyboardAwareScrollView>

      </View>
    );
  }
}

export default connect(
  ({ user: { profile } }) => ({ profile }), {
  },
)(SingleDonation);
