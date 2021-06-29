import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { sessionService } from 'redux-react-session';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const FormActiv = ({ match: { params: { activId } }, history, setRefresh }) => {
  const [name, setName] = useState('');
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [repeat, setRepeat] = useState(0);

  const setDefault = () => {
    setName('');
    setDistance(0);
    setDuration(0);
    setRepeat(0);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    sessionService.loadSession()
      .then(({ token }) => {
        axios({
          method: 'post',
          url: `http://localhost:3000/activs/${activId}/tracks`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            data: {
              attributes: {
                name,
                distance,
                duration,
                repeat,
              },
            },
          },
        })
          .then(() => {
            setDefault();
            setRefresh(1 + Math.random() * (100 - 1));
          })
          .catch(() => {
            history.push('/not-found');
          });
      })
      .catch(() => {
        history.push('sign-in');
      });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="name"
          type="text"
          onChange={({ target: { value } }) => setName(value)}
          value={name}
          placeholder="Name"
          required
        />
        <input
          name="distance"
          type="number"
          onChange={({ target: { value } }) => setDistance(value)}
          value={distance}
          required
        />
        <input
          name="duration"
          type="number"
          onChange={({ target: { value } }) => setDuration(value)}
          value={duration}
          required
        />
        <input
          name="repeat"
          type="number"
          onChange={({ target: { value } }) => setRepeat(value)}
          value={repeat}
          required
        />
        <input
          type="submit"
        />
      </form>
    </div>
  );
};

FormActiv.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      activId: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  setRefresh: PropTypes.func.isRequired,
};

export default withRouter(FormActiv);
