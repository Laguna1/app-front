import { sessionService } from 'redux-react-session';
import axios from 'axios';
import { baseUrl } from '../../utilities/api';

export const login = (username, password, history) => () => axios({
  method: 'post',
  url: `${baseUrl}/login`,
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
    const { data: { relationships: { user: { meta: { username } } } } } = res;
    const { data: { attributes: { token } } } = res;

    sessionService.saveSession({ token })
      .then(() => {
        sessionService.saveUser({ username })
          .then(() => {
            history.push('/');
          });
      });
  })
  .catch(() => {
    history.push('/signin');
  });

export const logout = (history) => () => sessionService.loadSession()
  .then(({ token }) => {
    axios({
      method: 'delete',
      url: `${baseUrl}/logout`,
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
      .catch(() => {
        history.push('/not-found');
      });
  })
  .catch(() => {
    history.push('/signin');
  });

export const openActivItem = (date, history) => () => sessionService.loadSession()
  .then(({ token }) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const strDate = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
    axios({
      method: 'post',
      url: `${baseUrl}/activs`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        data: {
          attributes: {
            item: strDate,
          },
        },
      },
    })
      .then(({ data: { data: { id } } }) => {
        history.push(`/activ/${id}`);
      })
      .catch(() => {
        axios({
          method: 'get',
          url: `${baseUrl}/activs`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            data: {
              attributes: {
                item: strDate,
              },
            },
          },
        })
          .then(({ data: { data: activs } }) => {
            const activ = activs
              .find((activ) => activ.attributes.item === strDate);

            if (activ) {
              history.push(`/activ/${activ.id}`);
            } else {
              history.push('/not-found');
            }
          })
          .catch(() => {
            history.push('/not-found');
          });
      });
  })
  .catch(() => {
    history.push('signin');
  });
