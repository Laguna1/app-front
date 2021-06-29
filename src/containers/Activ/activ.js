import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { sessionService } from 'redux-react-session';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const Activ = ({ match: { params: { activId } }, history }) => {
  const [name, setName] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState(0);
  const [repeat, setRepeat] = useState(0);

  const setDeafault = () => {
    setName('');
    setDistance('');
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
            setDeafault();
          })
          .catch(() => {
            history.push('/not-found');
          });
      })
      .catch(() => {
        history.push('/signin');
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
          placeholder="Distance"
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

Activ.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      activId: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(Activ);
