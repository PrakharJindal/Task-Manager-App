/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, Dimensions, Modal, Switch} from 'react-native';
import {Textarea, Label, Button, Header, Body, Title} from 'native-base';
import * as Animatable from 'react-native-animatable';
import {
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {getData} from '../scr/actions';
import {Card} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Swiper from 'react-native-swiper';
import {copilot, walkthroughable, CopilotStep} from 'react-native-copilot';
import AsyncStorage from '@react-native-community/async-storage';

const WalkthroughableText = walkthroughable(Text);
const WalkthroughableView = walkthroughable(View);
const height = Dimensions.get('window').height;

axios.defaults.baseURL = 'http://192.168.137.1:8000/';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.typename,
      loading: false,
      currentTypeId: null,
      ModalVisible: false,
      ModalVisible2: false,
      chosenDate: '',
      title: '',
      completed: false,
      due_date: '',
      content: '',
      id: null,
      category: '',
    };
  }

  setDate = (newDate) => {
    this.setState({chosenDate: newDate});
  };

  componentDidMount = async () => {
    this.setState({
      loading: true,
    });
    const newApp = await AsyncStorage.getItem('newApp');
    // await AsyncStorage.removeItem('newApp');
    if (!newApp) {
      this.props.start();
      await AsyncStorage.setItem('newApp', 'Already used');
      console.log('asdfgh');
    } else {
      console.log(newApp);
    }
  };

  addType = () => {
    axios
      .post(
        'addType/',
        {
          typeName: this.state.category,
        },
        {
          headers: {
            Authorization: `Token ${this.props.token}`,
          },
        },
      )
      .then(async (res) => {
        console.log(res.data);
        if (res.data == 'Complete') {
          await this.props.getData(this.props.token, this.props.userid);
          this.setState({
            category: '',
            ModalVisible2: false,
          });
          alert('Updated');
        }
      });
  };

  editTodo = () => {
    console.log(this.props.token);
    axios
      .put(
        `editTodo/${this.state.id}`,
        {
          completed: this.state.completed,
          content: this.state.content,
          due_date: this.state.due_date,
          title: this.state.title,
          user: this.props.userid,
        },
        {
          headers: {
            Authorization: `Token ${this.props.token}`,
          },
        },
      )
      .then(async (res) => {
        console.log('completed');
        await this.props.getData(this.props.token, this.props.userid);
        this.setState({ModalVisible: false});
        alert('Updated');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  getComponent = () => {
    this.props.todos.forEach((item) => {
      return (
        <View style={{flex: 1}}>
          <Text>helijhgvhjk</Text>
        </View>
      );
    });
  };

  render() {
    return (
      <Animatable.View animation={'fadeIn'} style={{flex: 1}}>
        <Header>
          <Body style={{alignContent: 'center', justifyContent: 'center'}}>
            <Title style={{fontSize: 26, textAlign: 'center', width: '100%'}}>
              Welcome {this.props.username.toUpperCase()}
            </Title>
          </Body>
        </Header>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 0,
          }}>
          <View
            style={{
              borderRadius: 10,
              marginLeft: 5,
              marginRight: 5,
              marginTop: 30,
              height: 150,
              width: '40%',
            }}>
            <CopilotStep text="Add New task" order={2} name="addTask">
              <WalkthroughableView
                style={{
                  height: 150,
                  backgroundColor: 'transparent',
                }}>
                <Button
                  onPress={() => {
                    this.props.navigation.navigate('AddTodo');
                  }}
                  style={{
                    backgroundColor: '#0c8bfa',
                    height: 'auto',
                  }}>
                  <Text
                    style={{
                      width: '100%',
                      height: '100%',
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}>
                    <Entypo name="add-to-list" size={25} /> {'\n'}
                    ADD A {'\n'}NEW TASK
                  </Text>
                </Button>
              </WalkthroughableView>
            </CopilotStep>
          </View>
          <View
            style={{
              borderRadius: 10,
              marginLeft: 5,
              marginRight: 5,
              marginTop: 30,
              // backgroundColor: '#0c8bfa',
              height: 150,
              width: '40%',
            }}>
            <CopilotStep
              text="Add a new Label/Category for Todos eg. Personal , Work , etc."
              order={3}
              name="openApp">
              <WalkthroughableView
                style={{
                  height: 150,
                  backgroundColor: 'transparent',
                }}>
                <Button
                  onPress={() => {
                    this.setState({
                      ModalVisible2: true,
                    });
                  }}
                  style={{
                    // borderRadius: 10,
                    // marginLeft: 5,
                    // marginRight: 5,
                    // marginTop: 30,
                    backgroundColor: '#0c8bfa',
                    height: 'auto',
                    // width: '40%',
                  }}>
                  <Text
                    style={{
                      width: '100%',
                      height: '100%',
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}>
                    <AntDesign name="addfolder" size={25} /> {'\n'}
                    ADD A{'\n'}CATEGORY
                  </Text>
                </Button>
              </WalkthroughableView>
            </CopilotStep>
          </View>
        </View>
        <CopilotStep
          text="View All Labels By Swiping Left or Right ."
          order={4}
          name="Labels"
          style={{
            width: '100%',
            height: '100%',
            fontSize: 20,
          }}>
          <WalkthroughableView
            style={{
              // height: 150,
              backgroundColor: 'transparent',
              zIndex: 10,
              width: '100%',
              height: '68%',
            }}>
            <Swiper>
              {this.props.typename.map((item, i) => {
                return (
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                    }}>
                    <View
                      style={{
                        // flex: 1,
                        height: '0%',
                        bottom: 0,
                      }}>
                      <View
                        style={{
                          marginTop: 0,
                          width: '50%',
                          alignSelf: 'center',
                          borderRadius: 50,
                          height: height * 0.06,
                          backgroundColor: '#43c3fa',
                          zIndex: 10,
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            fontSize: 25,
                            width: '100%',
                            height: '100%',
                          }}>
                          {item.typeName}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        borderTopWidth: 1,
                        marginTop: height * 0.03,
                        backgroundColor: '#323232',
                        flex: 1,
                        width: '100%',
                        zIndex: 0,
                      }}>
                      <FlatList
                        style={{
                          width: '100%',
                          flex: 1,
                          marginTop: 40,
                          height: '100%',
                          paddingBottom: 200,
                          zIndex: 0,
                        }}
                        data={this.props.todos}
                        renderItem={(item2) => {
                          // console.log(item2);
                          if (item2.item.typeTodo == item.id) {
                            return (
                              <View style={{marginBottom: 20}}>
                                <Card
                                  title={item2.item.title}
                                  titleStyle={{fontSize: 20, color: '#0c8bfa'}}>
                                  <Text
                                    style={{marginBottom: 10, fontSize: 15}}
                                    numberOfLines={3}>
                                    {item2.item.content}
                                  </Text>
                                  <Text style={{fontSize: 15}}>
                                    <Text
                                      style={{
                                        color: 'red',
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                      }}>
                                      Due Date :{' '}
                                    </Text>
                                    {item2.item.due_date}
                                  </Text>
                                  <Text style={{fontSize: 15}}>
                                    <Text
                                      style={{
                                        color: 'red',
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                      }}>
                                      Completed :{' '}
                                    </Text>
                                    {item2.item.completed ? 'Yes' : 'No'}
                                  </Text>
                                  <TouchableOpacity
                                    onPress={() => {
                                      // console.log(item2.item.title);
                                      this.setState({
                                        ModalVisible: true,
                                        // currentDetails: item2.item,
                                        title: item2.item.title,
                                        content: item2.item.content,
                                        due_date: item2.item.due_date,
                                        completed: item2.item.completed,
                                        id: item2.item.id,
                                      });
                                    }}
                                    style={{
                                      borderRadius: 20,
                                      marginLeft: 20,
                                      marginRight: 20,
                                      marginTop: 10,
                                      // backgroundColor: '#0c8bfa',
                                      height: 30,
                                    }}>
                                    <Text
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        textAlign: 'center',
                                        textAlignVertical: 'center',
                                        color: 'red',
                                        fontWeight: 'bold',
                                        fontSize: 18,
                                      }}>
                                      Read More
                                    </Text>
                                  </TouchableOpacity>
                                </Card>
                              </View>
                            );
                          }
                        }}
                      />
                    </View>
                  </View>
                );
              })}
            </Swiper>
          </WalkthroughableView>
        </CopilotStep>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.ModalVisible}
          onRequestClose={() => {
            this.setState({ModalVisible: false});
          }}>
          <View
            style={{
              alignContent: 'center',
              flex: 1,
              backgroundColor: '#00000070',
            }}>
            <View
              style={{
                alignContent: 'center',
                marginVertical: 15,
                marginHorizontal: 10,
                borderRadius: 20,
                backgroundColor: '#1d2733',
                padding: 20,
                flex: 1,
              }}>
              <Label style={{color: 'darkorange'}}>Title</Label>
              <TextInput
                value={this.state.title}
                onChangeText={(val) => {
                  this.setState({
                    title: val,
                  });
                }}
                style={{
                  fontSize: 16,
                  color: '#fff',
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: 'white',
                  paddingHorizontal: 10,
                  marginTop: 15,
                }}
              />
              <Label style={{color: 'darkorange', marginTop: 10}}>
                Content
              </Label>
              <Textarea
                onChangeText={(val) => {
                  this.setState({
                    content: val,
                  });
                }}
                placeholder="Add Content"
                bordered
                value={this.state.content}
                style={{
                  fontSize: 17,
                  height: 340,
                  marginTop: 15,
                  color: '#fff',
                  borderRadius: 15,
                }}
              />
              <Label style={{marginTop: 10, color: 'darkorange'}}>
                Due Date :
              </Label>
              <DatePicker
                style={{width: 200}}
                date={this.state.due_date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2000-01-01"
                maxDate="2030-12-31"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                    marginTop: 15,
                  },
                  dateInput: {
                    marginLeft: 45,
                    marginTop: 20,
                    borderRadius: 15,
                  },
                  dateText: {
                    color: '#fff',
                  },
                }}
                onDateChange={(date) => {
                  this.setState({due_date: date});
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 30,
                }}>
                <Label style={{color: 'darkorange'}}>Completed : </Label>
                <Switch
                  value={this.state.completed}
                  style={{marginLeft: 100}}
                  onValueChange={() => {
                    this.setState({completed: !this.state.completed});
                    // console.log(this.state.completed);
                  }}
                />
              </View>
              <Button
                onPress={() => {
                  // console.log('pressed');
                  this.editTodo();
                }}
                style={{
                  borderRadius: 5,
                  marginLeft: 5,
                  marginRight: 5,
                  marginTop: 8,
                  backgroundColor: '#0c8bfa',
                  height: 40,
                }}>
                <Text
                  style={{
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>
                  Save
                </Text>
              </Button>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.ModalVisible2}
          onRequestClose={() => {
            this.setState({ModalVisible2: false});
          }}>
          <ScrollView
            style={{
              alignContent: 'center',
              flex: 1,
              backgroundColor: '#00000070',
            }}>
            <View
              style={{
                alignContent: 'center',
                marginVertical: height * 0.3,
                marginHorizontal: 10,
                borderRadius: 20,
                // backgroundColor: '#43c3fa',
                backgroundColor: '#fff',
                padding: 20,
                flex: 1,
              }}>
              <Text style={{fontSize: 20, marginTop: 20}}>
                Add a new Category
              </Text>
              <TextInput
                value={this.state.category}
                placeholder="Category"
                onChangeText={(val) => {
                  this.setState({
                    category: val,
                  });
                }}
                style={{
                  fontSize: 16,
                  color: 'black',
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: 'black',
                  paddingHorizontal: 10,
                  marginTop: 15,
                }}
              />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Button
                  onPress={() => {
                    // console.log('pressed');
                    this.addType();
                  }}
                  style={{
                    borderRadius: 10,
                    marginLeft: 5,
                    marginRight: 5,
                    marginTop: 30,
                    backgroundColor: '#0c8bfa',
                    height: 'auto',
                    width: '40%',
                  }}>
                  <Text
                    style={{
                      width: '100%',
                      height: '100%',
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}>
                    <AntDesign name="save" size={25} /> {'\n'}
                    SAVE{'\n'}
                  </Text>
                </Button>
                <Button
                  onPress={() => {
                    this.setState({
                      category: '',
                      ModalVisible2: false,
                    });
                  }}
                  style={{
                    borderRadius: 10,
                    marginLeft: 5,
                    marginRight: 5,
                    marginTop: 30,
                    backgroundColor: '#0c8bfa',
                    height: 'auto',
                    width: '40%',
                  }}>
                  <Text
                    style={{
                      width: '100%',
                      height: '100%',
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}>
                    <MaterialIcons name="cancel" size={25} /> {'\n'}
                    CANCEL{'\n'}
                  </Text>
                </Button>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </Animatable.View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.details.username,
    email: state.details.email,
    userid: state.details.userid,
    token: state.details.token,
    typename: state.details.typename,
    todos: state.details.todos,
  };
};

export default connect(mapStateToProps, {getData})(
  copilot({
    animated: true, // Can be true or false
    overlay: 'view', // Can be either view or svg
  })(HomeScreen),
);
