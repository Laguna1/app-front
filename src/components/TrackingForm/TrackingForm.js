import React from 'react';
import './TrackingForm.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateItem } from '../../actions/tracking';

class TrackingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '2020-13-05',
      distance: 5000,
      duration: 60,
      pulse: 80,
      calories: 150,
      selectedOption: '🙂',
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
        selectedOption: track[0].rate,
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

    handleOptionChange= (e) => {
      this.setState({
        selectedOption: e.target.value,
      });
    }

    handleEdit = async (id, activityId) => {
      const {
        date, duration, selectedOption, distance, pulse, calories,
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
        rate: selectedOption,
      };

      await updateItem(data);
      changeEditForm();
    }

    handleSubmit(date, duration, distance, pulse, calories, rate) {
      const { addTracking, changeAddForm, user } = this.props;
      const userId = user.user.id;
      addTracking(date, duration, distance, pulse, calories, rate, userId);
      changeAddForm();
    }

    render() {
      const {
        date, distance, duration, pulse, calories, selectedOption,
      } = this.state;
      const {
        actionToPerform, trackings, buttonId, changeAddForm, changeEditForm,
      } = this.props;
      const track = trackings.filter((x) => x.id.toString() === buttonId);

      return (
        <div className="t-form">
          <h3>
            {actionToPerform}
            {' '}
            Tracking for Activity
          </h3>
          <form className="item">

            <div className="form-div">
              <div className="date-temp">
                <div className="date-div">
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
                <div className="duration-div">
                  <label htmlFor="duration">
                    distance:
                    <input
                      id="duration"
                      type="number"
                      name="duration"
                      defaultValue={buttonId === '0' ? duration : track[0].duration}
                      onChange={this.handleChangeDuration}
                    />
                  </label>
                  <span>hours</span>
                </div>
              </div>
              <div className="distance-div">
                <label htmlFor="distance">
                  distance:
                  <input
                    id="distance"
                    type="number"
                    name="distance"
                    defaultValue={buttonId === '0' ? distance : track[0].distance}
                    onChange={this.handleChangeDistance}
                  />
                </label>
                <span>km</span>
              </div>

              <div className="pulse">
                <p>Pulse:</p>
                <div className="pulse-div">
                  <input
                    id="pulse"
                    type="text"
                    name="pulse"
                    defaultValue={buttonId === '0' ? '' : track[0].pulse[0]}
                    placeholder="Add pulse"
                    onChange={(e) => this.handleChangePulse(e, 0, 0)}
                  />
                </div>
              </div>
              <div className="calories">
                <p>calories:</p>
                <div className="calories-div">
                  <input
                    id="calories"
                    type="text"
                    name="calories"
                    placeholder="Used calories"
                    defaultValue={buttonId === '0' ? '' : track[0].calories[0]}
                    onChange={(e) => this.handleChangeCalories(e, 0)}
                  />
                </div>
              </div>
              <div className="rate-div">
                <span>Rate: </span>
                <input type="radio" id="option1" name="rate" value="🙂" checked={selectedOption === '🙂'} onChange={this.handleOptionChange} />
                <span role="img" aria-label="rate_0">🙂</span>
                <input type="radio" id="option2" name="rate" value="😐" checked={selectedOption === '😐'} onChange={this.handleOptionChange} />
                <span role="img" aria-label="rate_1">😐</span>
                <input type="radio" id="option3" name="rate" value="🙁" checked={selectedOption === '🙁'} onChange={this.handleOptionChange} />
                <span role="img" aria-label="rate_2">🙁</span>
                <input type="radio" id="option4" name="rate" value="😩" checked={selectedOption === '😩'} onChange={this.handleOptionChange} />
                <span role="img" aria-label="rate_3">😩</span>
              </div>

              <div className="buttons-form item-buttons">
                {actionToPerform === 'Add' && <button type="button" onClick={() => this.handleSubmit(selectedOption, distance, date, duration, pulse, calories)}>{actionToPerform}</button>}
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
