import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { fetchActivItems, createItem, deleteItem } from '../../actions/tracking';
import { loginStatus } from '../../actions/user';
import TrackingForm from '../../components/TrackingForm/TrackingForm';
import './TrackingForm.css';

class Trackings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: props.match.params.id,
      addEdit: false,
      buttonId: '0',
    };
  }

  componentDidMount() {
    const {
      user, fetchActivItems,
    } = this.props;

    const { ID } = this.state;
    const userID = user.user.id;

    fetchActivItems(userID, ID);
  }

    createDate = (date) => {
      const dateFormat = new Date(date);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return dateFormat.toUTCString(undefined, options);
    }

    displayInfo = () => {
      const { displayForm } = this.props;
      displayForm();
    }

    addTracking = (date, distance, duration, pulse, calories, rate, userId) => {
      const { ID } = this.state;
      const { createItem } = this.props;
      const activityId = ID;
      createItem({
        activityId, date, distance, duration, pulse, calories, rate, userId,
      });
    }

    deleteTracking = (id) => {
      const { ID } = this.state;
      const { deleteItem, user } = this.props;
      const userId = user.user.id;
      const activityId = ID;
      deleteItem({ activityId, id, userId });
    }

    changeEditForm = () => {
      const { addEdit } = this.state;
      this.setState({
        addEdit: !addEdit,
      });
    }

    changeAddForm = () => {
      const { displayForm } = this.props;
      displayForm();
    }

    displayEdit = (e) => {
      const { addEdit } = this.state;
      this.setState({
        addEdit: !addEdit,
        buttonId: e.target.id,
      });
    }

    displayTracking = () => {
      const { location } = this.props;
      const { state } = location;
      if (state) {
        const { nameactivity } = state;
        return nameactivity;
      }
      const { history } = this.props;
      history.push('/workpage');
      return null;
    }

    render() {
      const { addEdit, buttonId } = this.state;
      const { trackings, addForm } = this.props;

      const name = this.displayTracking();

      return (
        <div className="trackings">
          <div className="trackings-buttons">
            <button type="button" className="go-back" onClick={this.displayInfo}>
              <Link to="/workpage">
                <i className="fa fa-arrow-up" aria-hidden="true" />
              </Link>
            </button>
            <button type="button" className="add-item" onClick={this.displayInfo}>+</button>
          </div>
          {!addEdit && !addForm && (
          <h3>
            Tracking of activity details:
            {name && <span>{name}</span>}
          </h3>
          )}
          {trackings.map((item) => (
            <div key={item.id}>
              {!addEdit && !addForm && (
                <div>
                  <div className="item">
                    <div className="date">

                      <p>
                        {' '}
                        <i className="fa fa-calendar" aria-hidden="true" />
                        {this.createDate(item.date).slice(0, 16)}
                      </p>
                      <div>
                        <button type="button" onClick={() => this.deleteTracking(item.id)}>
                          <i className="fa fa-trash-o" />
                        </button>
                        <button type="button" onClick={this.displayEdit}><i className="fa fa-pencil-square-o" aria-label="pencil" id={item.id} /></button>
                      </div>
                    </div>
                    <div className="duration">
                      <p>
                        duration:
                      </p>
                      <p>
                        <i className="fa fa-clock" />
                        {item.duration}
                        hours:
                      </p>
                    </div>
                    <div className="distance">
                      <p>
                        distance:
                      </p>
                      <p>
                        <i className="fa fa-meter" />
                        {item.distance}
                        meters:
                      </p>
                    </div>
                    <div className="pulse">
                      <p>
                        pulse:
                      </p>
                      <p>{item.pulse}</p>
                    </div>
                    <div className="calories">
                      <p>
                        calories:
                      </p>
                      <p>{item.calories}</p>
                    </div>
                    <div className="rate">
                      <p>
                        rate:
                      </p>
                      <p>{item.rate}</p>
                    </div>
                  </div>
                </div>
              )}
              {addEdit && buttonId === item.id.toString() && (
              <TrackingForm
                actionToPerform="Save Changes"
                buttonId={buttonId}
                changeEditForm={this.changeEditForm}
              />
              )}
            </div>
          ))}
          {addForm && <TrackingForm actionToPerform="Add" addTracking={this.addTracking} changeAddForm={this.changeAddForm} /> }
        </div>

      );
    }
}

const mapStateToProps = (state) => ({
  user: state.user,
  trackings: state.tracking,
});
const mapDispatchToProps = (dispatch) => ({
  fetchActivItems: (datauser, dataactivity) => dispatch(fetchActivItems(datauser, dataactivity)),
  loginStatus: () => dispatch(loginStatus()),
  createItem: (data) => dispatch(createItem(data)),
  deleteItem: (id, id2) => dispatch(deleteItem(id, id2)),
});

Trackings.propTypes = {
  addForm: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
  fetchActivItems: PropTypes.func,
  deleteItem: PropTypes.func,
  createItem: PropTypes.func,
  user: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
  trackings: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    name: PropTypes.string,
  })),
  location: PropTypes.shape({
    state: PropTypes.shape({ nameactivity: PropTypes.string }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  displayForm: PropTypes.func,

};

Trackings.defaultProps = {
  addForm: false,
  fetchActivItems: () => {},
  deleteItem: () => {},
  createItem: () => {},
  displayForm: () => {},
  user: {},
  trackings: [],
  location: {},
  history: {},
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Trackings));
