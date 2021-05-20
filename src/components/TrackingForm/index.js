import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './TrackingForm.css';
import { updateItem } from '../../actions/tracking';

class TrackingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      distance: 1,
      duration: 60,
      pulse: '',
      calories: '',
      rate: '',
    };
  }

  componentDidMount = () => {
    const { actionToPerform, buttonId, trackings } = this.props;
    if (actionToPerform === 'Save Changes') {
      const track = trackings.filter((x) => x.id.toString() === buttonId);
      this.setState({
        date: track[0].date,
        distance: track[0].distance,
        duration: track[0].duration,
        pulse: track[0].pulse,
        calories: track[0].calories,
        rate: track[0].rate,
      });
    }
  }

  handleChangeDate = (e) => {
    this.setState({
      date: e.target.value,
    });
  }

  handleChangeDistance = (e) => {
    this.setState({
      distance: e.target.value,
    });
  }

  handleChangeDuration = (e) => {
    this.setState({
      duration: e.target.value,
    });
  }

  handleChangePulse = (e) => {
    this.setState({
      pulse: e.target.value,
    });
  }

  handleChangeCalories = (e) => {
    this.setState({
      calories: e.target.value,
    });
  }

  handleChangeRate= (e) => {
    this.setState({
      rate: e.target.value,
    });
  }

  handleEdit = async (id, activityId) => {
    const {
      date, distance, duration, pulse, calories, rate,
    } = this.state;
    const {
      user, updateItem, changeEditForm,
    } = this.props;
    const data = {
      id,
      userId: user.user.id,
      activityId,
      date,
      distance,
      duration,
      pulse,
      calories,
      rate,
    };

    await updateItem(data);
    changeEditForm();
  }

  handleSubmit(date, distance, duration, pulse, calories, rate) {
    const { addTracking, changeAddForm, user } = this.props;
    const userId = user.user.id;
    addTracking(date, distance, duration, pulse, calories, rate, userId);
    changeAddForm();
  }

  render() {
    const {
      date, distance, duration, pulse, calories, rate,
    } = this.state;
    const {
      actionToPerform, trackings, buttonId, changeAddForm, changeEditForm,
    } = this.props;
    const track = trackings.filter((x) => x.id.toString() === buttonId);

    return (
      <div className="t-form">
        <h4>
          {actionToPerform}
          {' '}
          Tracking for this Activity/TForm
        </h4>
        <form className="item" onSubmit={() => this.handleSubmit(date, distance, duration, pulse, calories, rate)}>

          <div className="form-div">
            <div className="item-detail date-div">
              <label htmlFor="date">
                Date:
                <input
                  id="date"
                  type="date"
                  name="date"
                  defaultValue={buttonId === '0' ? date : track[0].date.slice(0, 10)}
                  onChange={this.handleChangeDate}
                />
              </label>
            </div>

            <div className="item-detail distance-div">
              <label htmlFor="distance">
                Distance (m):
                <input
                  id="distance"
                  type="number"
                  name="distance"
                  defaultValue={buttonId === '0' ? distance : track[0].distance}
                  onChange={this.handleChangeDistance}
                />
              </label>
            </div>
            <div className="item-detail duration-div">
              <label htmlFor="duration">
                Duration (min):
                <input
                  id="duration"
                  type="number"
                  name="duration"
                  defaultValue={buttonId === '0' ? duration : track[0].duration}
                  onChange={this.handleChangeDuration}
                />
              </label>
            </div>
            <div className="item-detail pulse-div">
              <label htmlFor="pulse">
                Pulse:
                <input
                  id="pulse"
                  type="number"
                  name="pulse"
                  defaultValue={buttonId === '0' ? '' : track[0].pulse[0]}
                  onChange={this.handleChangePulse}
                />
              </label>
            </div>
            <div className="item-detail calories-div">
              <label htmlFor="calories">
                Calories burned (cal):
                <input
                  id="calories"
                  type="number"
                  name="calories"
                  defaultValue={buttonId === '0' ? '' : track[0].calories[0]}
                  onChange={this.handleChangeCalories}
                />
              </label>
            </div>
            <div className="item-detail rate-div">
              <label htmlFor="rate">
                Rate :
                <input
                  id="rate"
                  type="text"
                  name="rate"
                  defaultValue={buttonId === '0' ? '' : track[0].rate[0]}
                  onChange={this.handleChangeRate}
                />
              </label>
            </div>
            <div className="buttons-form item-buttons">
              {actionToPerform === 'Add' && <button type="button" onClick={() => this.handleSubmit(rate, distance, date, duration, pulse, calories)}>{actionToPerform}</button>}
              {actionToPerform === 'Save Changes' && <button type="button" onClick={() => this.handleEdit(track[0].id, track[0].activityId)}>Save</button>}
              {actionToPerform === 'Add' && <button type="button" onClick={changeAddForm}>Cancel</button>}
              {actionToPerform === 'Save Changes' && <button type="button" onClick={changeEditForm}>Cancel</button>}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

TrackingForm.propTypes = {
  addTracking: PropTypes.func,
  changeEditForm: PropTypes.func,
  changeAddForm: PropTypes.func,
  updateItem: PropTypes.func,
  buttonId: PropTypes.string,
  actionToPerform: PropTypes.string,
  trackings: PropTypes.instanceOf(Array),
  user: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
};

TrackingForm.defaultProps = {
  changeAddForm: () => {},
  addTracking: () => {},
  updateItem: () => {},
  changeEditForm: () => {},
  actionToPerform: '',
  trackings: [],
  buttonId: '0',
  user: {},

};

const mapStateToProps = (state) => ({
  user: state.user,
  trackings: state.tracking,
});
const mapDispatchToProps = (dispatch) => ({
  updateItem: (data) => dispatch(updateItem(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackingForm);
