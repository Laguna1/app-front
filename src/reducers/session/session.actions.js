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
  .catch(() => {
    history.push('/not-found');
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
      .catch(() => {
        history.push('/not-found');
      });
  })
  .catch(() => {
    history.push('/not-found');
  });

export const openActivItem = (item, history) => () => sessionService.loadSession()
  .then(({ token }) => {
    const day = item.getDate();
    const month = item.getMonth() + 1;
    const year = item.getFullYear();

    const strDate = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
    axios({
      method: 'post',
      url: 'http://localhost:3000/activs',
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
          url: 'http://localhost:3000/activs',
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
