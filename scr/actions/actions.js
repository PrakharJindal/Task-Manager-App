import axios from 'axios';

import AsyncStorage from '@react-native-community/async-storage';

axios.defaults.baseURL = 'http://taskmanagerapp.pythonanywhere.com/';
// axios.defaults.baseURL = 'http://127.0.0.1:8000/';

export const checkLogin = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem('token');
    const userid = await AsyncStorage.getItem('userid');
    if (token && userid) {
      // console.log(token);
      await axios
        .get(`userDetails/${userid}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then(async (res) => {
          console.log(res.data);
          var typeName = '';
          var todos = '';
          await axios
            .get(
              `getTypes/${userid}`,
              {},
              {
                headers: {
                  Authorization: `Token ${token}`,
                },
              },
            )
            .then((res2) => {
              // console.log(res.data);
              typeName = res2.data;
            });
          await axios
            .get(
              `getTodo/${userid}`,
              {},
              {
                headers: {
                  Authorization: `Token ${token}`,
                },
              },
            )
            .then((res3) => {
              // console.log(res3.data);
              todos = res3.data;
            });
          dispatch({
            type: 'LOGIN2',
            token: token,
            userid: userid,
            typename: typeName,
            todos: todos,
            username: res.data.username,
            email: res.data.email,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }

    console.log('Done.');
  };
};

export const getData = (token, userid) => {
  return async (dispatch) => {
    var typeName = '';
    var todos = '';
    await axios
      .get(
        `getTypes/${userid}`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      )
      .then((res) => {
        // console.log(res.data);
        typeName = res.data;
      });
    await axios
      .get(
        `getTodo/${userid}`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      )
      .then((res) => {
        // console.log(res.data);
        todos = res.data;
      });
    dispatch({
      type: 'UPDATEDATA',
      typename: typeName,
      todos: todos,
    });
  };
};

export const addTodo = (
  category,
  title,
  content,
  due_date,
  completed,
  token,
  userid,
) => {
  return async (dispatch) => {
    await axios
      .post(
        'addTodo/',
        {
          title: title,
          completed: completed,
          typeTodo: category,
          content: content,
          due_date: due_date,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      )
      .then((res) => {
        console.log(res.data);
      });
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    axios
      .post('login/', {
        username: username,
        password: password,
      })
      .then(async (res) => {
        console.log(res.data);
        try {
          await AsyncStorage.setItem('userid', res.data.id.toString());
          await AsyncStorage.setItem('token', res.data.token);
        } catch (e) {
          // save error
        }
        const token = await AsyncStorage.getItem('token');
        const userid = await AsyncStorage.getItem('userid');
        // console.log('Done.');
        var typeName = '';
        var todos = '';
        await axios
          .get(
            `getTypes/${userid}`,
            {},
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            },
          )
          .then((res2) => {
            console.log(res2.data);
            typeName = res2.data;
          });
        await axios
          .get(
            `getTodo/${userid}`,
            {},
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            },
          )
          .then((res3) => {
            // console.log(res3.data);
            todos = res3.data;
          });
        dispatch({
          type: 'LOGIN2',
          token: token,
          userid: userid,
          typename: typeName,
          todos: todos,
          username: username,
        });
        // dispatch({
        //   type: 'LOGIN',
        //   username: username,
        //   userid: res.data.id.toString(),
        //   token: res.data.token,
        // });
      })
      .catch((e) => {
        // console.log(e);
      });
  };
};

export const signup = (username, password) => {
  return async (dispatch) => {
    axios
      .post(
        'signup/',
        {
          username: username,
          password: password,
        },
        {
          headers: {
            Accept: 'application/json',
          },
        },
      )
      .then(async (res) => {
        // console.log(res.data);
        if (res.data.non_field_errors) {
          console.log(res.data.non_field_errors[0]);
        } else {
          try {
            await AsyncStorage.setItem('userid', res.data.id.toString());
            await AsyncStorage.setItem('token', res.data.token);
          } catch (e) {
            // save error
          }

          // console.log('Done.');
          dispatch({
            type: 'LOGIN',
            username: username,
            userid: res.data.id.toString(),
            token: res.data.token,
          });
        }
      })
      .catch(async (e) => {
        // console.log(e);
      });
  };
};

export const logout = () => {
  return async (dispatch) => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');
    dispatch({
      type: 'LOGOUT',
    });
  };
};
