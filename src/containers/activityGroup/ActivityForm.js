import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ActivityForm from '../../components/ActivityForm/ActivityForm';
import {
  fetchUserActivity, createActivity, deleteActivity,
} from '../../actions/activity';
import { loginStatus } from '../../actions/user';
import './ActivityForm.css';

class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addForm: false,
      editForm: false,
      idActivity: '0',
    };
  }

  componentDidMount() {
    const { user, fetchUserActivity } = this.props;
    const ID = user.user.id;
    fetchUserActivity(ID);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { activity } = this.props;
    const {
      addForm, editForm,
    } = this.state;
    return activity !== nextProps.activity
    || addForm !== nextState.addForm
    || editForm !== nextState.editForm;
  }

  addActivity = (name, description) => {
    const { createActivity, user } = this.props;
    const { addForm } = this.state;
    const userId = user.user.id;
    createActivity({ name, description, userId });
    this.setState({
      addForm: !addForm,
    });
  };

  displayForm = () => {
    const { addForm } = this.state;
    this.setState({
      addForm: !addForm,
    });
  }

  displayEdit= (e) => {
    const { editForm } = this.state;
    this.setState({
      editForm: !editForm,
      idActivity: e.target.id,
    });
  }

  deleteActivity = (id) => {
    const { user } = this.props;
    const { deleteActivity } = this.props;
    const userId = user.user.id;
    deleteActivity({ userId, id });
  }

   changeEditForm = () => {
     const { editForm } = this.state;
     this.setState({
       editForm: !editForm,
     });
   }

   changeAddForm = () => {
     const { addForm } = this.state;
     this.setState({
       addForm: !addForm,
     });
   }

   render() {
     const { activity } = this.props;
     const {
       addForm, editForm, idActivity,
     } = this.state;
     return (
       <main className="main">
         <button type="button" className="add-activity" onClick={this.displayForm}>+</button>
         <div className="activities">
           { !editForm && !addForm && <h3>Your Activities</h3>}

           {activity.length === 0 && !addForm && <div className="tracking">Start adding a illness you want to track here!</div>}
           {activity.map((activ) => (
             <div key={activ.id}>
               { !editForm && !addForm && (
               <div className="one-activity">
                 <div className="buttons">
                   <button type="button" onClick={this.displayEdit}>
                     <i className="fa fa-pencil-square-o" id={activity.id} />
                   </button>
                   <button type="button" onClick={() => this.deleteActivity(activity.id)}>
                     <i className="fa fa-trash-o" />
                   </button>

                 </div>
                 <div className="activity-info">
                   <Link to={{
                     pathname: `activity/${activity.id}`,
                     state: {
                       nameactivity: activity.name,
                     },
                   }}
                   >
                     {!editForm && (
                     <div>
                       <div className="activity-name">
                         <p>Name:</p>
                         <p>Place:</p>
                       </div>
                       <div className="activity-place">
                         <p>{activity.name}</p>
                         <p>{activity.place}</p>
                       </div>
                     </div>
                     )}
                   </Link>
                 </div>
               </div>
               )}
               { editForm && activity.id.toString() === idActivity && <ActivityForm actionToPerform="Save Changes" buttonId={idActivity} changeEditForm={this.changeEditForm} />}
             </div>
           ))}
         </div>
         <div className="new-activity">
           {addForm && <ActivityForm addActivity={this.addActivity} actionToPerform="Add" changeAddForm={this.changeAddForm} />}
         </div>
       </main>
     );
   }
}

const mapStateToProps = (state) => (
  {
    user: state.user,
    isLogin: state.user.isLogin,
    activity: state.activity,
  });
const mapDispatchToProps = (dispatch) => ({
  fetchUserActivity: (data) => dispatch(fetchUserActivity(data)),
  createActivity: (data) => dispatch(createActivity(data)),
  deleteActivity: (id) => dispatch(deleteActivity(id)),
  loginStatus: () => dispatch(loginStatus()),
});

Activity.propTypes = {
  fetchUserActivity: PropTypes.func,
  createActivity: PropTypes.func,
  deleteActivity: PropTypes.func,
  user: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
  activity: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    place: PropTypes.string,
  })),
};

Activity.defaultProps = {
  createActivity: () => {},
  deleteActivity: () => {},
  fetchUserActivity: () => {},
  activity: {},
  user: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
