import React from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import { withRouter } from 'react-router-dom';
import { sessionService } from 'redux-react-session';
import axios from 'axios';

const ActivItem = ({ history }) => {
  const onClickItem = (item) => {
    sessionService.loadSession()
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
                  .find((activ) => activ.attributes.item === item.toISOString().substring(0, 10));

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
    history.push();
  };

  return (
    <Calendar
      onClickFItem={onClickItem}
    />
  );
};

ActivItem.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(ActivItem);
