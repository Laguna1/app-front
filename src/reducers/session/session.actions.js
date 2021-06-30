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

export const openActivItem = (item, history) => () => sessionService.loadSession()
  .then(({ token }) => {
    axios({
      method: 'post',
      url: 'http://localhost:3000/activs',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        data: {
          attributes: {
            item: item.toISOString().substring(0, 10),
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
          url: 'http://localhost:3000/activs',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            data: {
              attributes: {
                item: item.toISOString().substring(0, 10),
              },
            },
          },
        })
          .then(({ data: { data: activs } }) => {
            const activ = activs
              .find((activ) => activ.attributes.item === item.toISOString()
                .substring(0, 10));

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
