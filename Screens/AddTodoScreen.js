/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, Switch} from 'react-native';
import {Textarea, Label, Button, Picker, Item} from 'native-base';
import {TextInput} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {addTodo} from '../scr/actions';
import DatePicker from 'react-native-datepicker';

class AddTodoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      tittle: '',
      content: '',
      due_date: null,
      completed: null,
    };
  }

  saveTodo = () => {
    if (
      this.state.category == null &&
      this.state.title == '' &&
      this.state.due_date == null
    ) {
      alert('One or More fields are empty .');
    } else {
      this.props.addTodo(
        this.state.category,
        this.state.title,
        this.state.content,
        this.state.due_date,
        this.state.completed,
        this.props.token,
        this.props.userid,
      );
    }
  };

  render() {
    return (
      <View
        style={{
          alignContent: 'center',
          flex: 1,
          backgroundColor: '#00000070',
        }}>
        <View
          style={{
            alignContent: 'center',
            backgroundColor: '#a6cdff',
            padding: 20,
            flex: 1,
          }}>
          <Item style={{borderColor: 'black', borderWidth: 1}}>
            <Picker
              selectedValue={this.state.category}
              onValueChange={(val) => {
                this.setState({category: val});
              }}>
              <Picker.Item value={null} label={'Select Category'} />
              {this.props.typename.map((u, i) => {
                return <Picker.Item value={u.id} label={u.typeName} />;
              })}
            </Picker>
          </Item>
          <Label style={{color: 'darkbrown', marginTop: 10, fontSize: 18}}>
            Title
          </Label>
          <TextInput
            value={this.state.title}
            placeholder="Add Title"
            onChangeText={(val) => {
              this.setState({
                title: val,
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
          <Label style={{color: 'darkbrown', marginTop: 10}}>Content</Label>
          <Textarea
            onChangeText={(val) => {
              this.setState({
                content: val,
              });
            }}
            placeholder="Add Content"
            multiline
            bordered
            value={this.state.content}
            style={{
              fontSize: 17,
              height: 300,
              marginTop: 15,
              color: 'black',
              borderRadius: 15,
              borderColor: 'black',
            }}
          />
          <Label style={{marginTop: 10, color: 'darkbrown'}}>Due Date :</Label>
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
                borderColor: 'black',
              },
              dateText: {
                color: 'black',
              },
              placeholderText: {
                color: 'black',
              },
              // ... You can check the source to find the other keys.
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
            <Label style={{color: 'darkbrown'}}>Completed : </Label>
            <Switch
              value={this.state.completed}
              style={{marginLeft: 100}}
              onValueChange={() => {
                this.setState({completed: !this.state.completed});
                console.log(this.state.completed);
              }}
            />
          </View>
          <Button
            onPress={() => {
              console.log('pressed');
              this.saveTodo();
            }}
            style={{
              borderRadius: 5,
              marginLeft: 5,
              marginRight: 5,
              marginTop: 20,
              backgroundColor: '#0c8bfa',
              height: 40,
            }}>
            <Text
              style={{
                width: '100%',
                height: '100%',
                textAlign: 'center',
                textAlignVertical: 'center',
                color: 'black',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Save
            </Text>
          </Button>
        </View>
      </View>
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

export default connect(mapStateToProps, {addTodo})(AddTodoScreen);
