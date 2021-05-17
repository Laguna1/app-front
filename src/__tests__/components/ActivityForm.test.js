import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { create } from 'react-test-renderer';
import { createStore, applyMiddleware } from 'redux';
import combinedReducers from '../../reducers';
import ActivityForm from '../../components/ActivityForm/ActivityForm';

test('ActivityForm renders correctly', () => {
  const store = createStore(combinedReducers, applyMiddleware(thunk));
  const tree = create(
    <Provider store={store}>
      <ActivityForm />
    </Provider>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
