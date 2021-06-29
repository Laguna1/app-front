import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { sessionService } from 'redux-react-session';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import FormActiv from '../../components/formActiv';
import TracksList from '../../components/tracks';

const Activ = ({ match: { params: { activId } }, history }) => {
  const [tracks, setTracks] = useState([]);
  const [refresh, setRefresh] = useState(1 + Math.random() * (100 - 1));

  useEffect(() => {
    let mounted = true;

    sessionService.loadSession()
      .then(({ token }) => {
        axios({
          method: 'get',
          url: `http://localhost:3000/activs/${activId}/tracks`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(({ data: { data } }) => {
            if (mounted) {
              setTracks(data);
            }
          })
          .catch(() => {
            if (mounted) {
              history.push('/not-found');
            }
          });
      })
      .catch(() => {
        if (mounted) {
          history.push('/login');
        }
      });

    // eslint-disable-next-line no-return-assign
    return () => mounted = false;
  }, [refresh]);

  return (
    <div>
      <FormActiv setRefresh={setRefresh} />
      <TracksList tracks={tracks} />
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
