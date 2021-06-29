import { sessionService } from 'redux-react-session';
import axios from 'axios';

export const login = (username, password, history) => () => axios({
  method: 'post',
  url: 'http://localhost:3000/login',
  data: {
    data: {
      attributes: {
        username,
        password,
      },
    },
  },
})
  .then(({ data: res }) => {
    const { data: { attributes: { id } } } = res;
    const { data: { attributes: { token } } } = res;

    sessionService.saveSession({ token })
      .then(() => {
        sessionService.saveUser({ id })
          .then(() => {
            history.push('/');
          });
      });
  })
  .catch((err) => {
    // eslint-disable-next-line
              console.log(err);
  });

export const logout = (history) => () => sessionService.loadSession()
  .then(({ token }) => {
    axios({
      method: 'delete',
      url: 'http://localhost:3000/logout',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        sessionService.deleteSession()
          .then(() => {
            sessionService.deleteUser();
            history.push('/');
          });
      })
      .catch((err) => {
        // eslint-disable-next-line
                console.log(err);
      });
  })
  .catch((err) => {
    // eslint-disable-next-line
              console.log(err);
  });
