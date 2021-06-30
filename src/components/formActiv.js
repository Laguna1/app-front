import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { sessionService } from 'redux-react-session';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import TextForm from './TextForm';
import NumberForm from './NumberForm';

const FormActiv = ({ match: { params: { activId } }, history, setRefresh }) => {
  const [name, setName] = useState('');
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [repeat, setRepeat] = useState(0);

  const incrementDistance = () => {
    setDistance((prev) => prev + 1);
  };

  const decrementDistance = () => {
    setDistance((prev) => prev - 1);
  };
  const incrementDuration = () => {
    setDuration((prev) => prev + 1);
  };

  const decrementDuration = () => {
    setDuration((prev) => prev - 1);
  };

  const setDefault = () => {
    setName('');
    setDistance(1);
    setDuration(1);
    setRepeat(1);
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
      <form onSubmit={onSubmit} className="activ-form">
        <TextForm
          id="name"
          componentClassName="activ-form"
          handleChange={({ target: { value } }) => setName(value)}
          value={name}
          required
        />
        <NumberForm
          id="distance"
          handleChange={({ target: { value } }) => setDistance(value)}
          value={distance}
          increment={incrementDistance}
          decrement={decrementDistance}
          label="Distance"
        />
        <NumberForm
          id="duration"
          handleChange={({ target: { value } }) => setDuration(value)}
          value={duration}
          increment={incrementDuration}
          decrement={decrementDuration}
          label="Duration"
        />
        <input
          name="repeat"
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
