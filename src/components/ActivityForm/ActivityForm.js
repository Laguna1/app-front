import React from 'react';
import './ActivityForm.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateActivity } from '../../actions/activity';

class ActivityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      place: '',
      intensity: '',
    };
  }

    componentDidMount = () => {
      const { actionToPerform, buttonId, activity } = this.props;
      if (actionToPerform === 'Save Changes') {
        const activ = activity.filter((x) => x.id.toString() === buttonId);
        this.setState({
          name: activ[0].name,
          place: activ[0].place,
          intensity: activ[0].intensity,
        });
      }
    }

    handleChangeName = (e) => {
      this.setState({
        name: e.target.value,
      });
    }

    handleChangePlace = (e) => {
      this.setState({
        place: e.target.value,
      });
    }

    handleChangeIntensity = (e) => {
      this.setState({
        intensity: e.target.value,
      });
    }

    handleSubmit = (name, place, intensity) => {
      const { addActivity } = this.props;
      addActivity(name, place, intensity);
    }

    handleUpdate = async (id) => {
      const { name, place, intensity } = this.state;

      const {
        user, updateActivity, changeEditForm,
      } = this.props;

      const data = {
        id,
        user_id: user.user.id,
        name,
        place,
        intensity,
      };

      await updateActivity(data);
      changeEditForm();
    }

    render() {
      const { name, place, intensity } = this.state;
      const {
        actionToPerform, activity, buttonId, changeEditForm, changeAddForm,
      } = this.props;
      const activ = activity.filter((x) => x.id.toString() === buttonId);
      return (
        <div className="a-form">
          <h3>
            {actionToPerform}
            {' '}
            activity
          </h3>
          <form
            className="one-form"
            onSubmit={
             actionToPerform === 'Add'
               // eslint-disable-next-line max-len
               ? () => this.handleSubmit(name, place, intensity) : () => this.handleUpdate(activ[0].id)
  }
          >
            <div className="one-parameter">
              <label htmlFor="name">
                Name:
                <input
                  required
                  id="name"
                  type="text"
                  name="name"
                  defaultValue={buttonId === '0' ? name : activ[0].name}
                  onChange={this.handleChangeName}
                />
              </label>
            </div>
            <div className="one-parameter">
              <label htmlFor="place">
                Place:
                <textarea
                  id="place"
                  name="place"
                  defaultValue={buttonId === '0' ? place : activ[0].place}
                  onChange={this.handleChangePlace}
                />
              </label>

            </div>
            <div className="one-parameter">
              <label htmlFor="intensity">
                intensity:
                <textarea
                  id="intensity"
                  name="intensity"
                  defaultValue={buttonId === '0' ? intensity : activ[0].place}
                  onChange={this.handleChangeIntensity}
                />
              </label>

            </div>
            <div className="buttons-form">
              {actionToPerform === 'Add' && <button type="submit">{actionToPerform}</button>}
              {actionToPerform === 'Save Changes' && <button type="submit">Save</button>}
              {actionToPerform === 'Add' && <button type="button" onClick={changeAddForm}>Cancel</button>}
              {actionToPerform === 'Save Changes' && <button type="button" onClick={changeEditForm}>Cancel</button>}
            </div>
          </form>
        </div>
      );
    }
}

ActivityForm.propTypes = {
  addActivity: PropTypes.func,
  actionToPerform: PropTypes.string,
  changeAddForm: PropTypes.func,
  activity: PropTypes.instanceOf(Array),
  buttonId: PropTypes.string,
  updateActivity: PropTypes.func,
  changeEditForm: PropTypes.func,
  user: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),

};

ActivityForm.defaultProps = {
  changeAddForm: () => {},
  addActivity: () => {},
  actionToPerform: '',
  activity: [],
  buttonId: '0',
  updateActivity: () => {},
  changeEditForm: () => {},
  user: {},
};

const mapStateToProps = (state) => ({
  user: state.user,
  activity: state.activity,
});
const mapDispatchToProps = (dispatch) => ({
  updateActivity: (data) => dispatch(updateActivity(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityForm);
