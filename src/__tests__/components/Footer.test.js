import renderer from 'react-test-renderer';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import combinedReducers from '../../reducers';
import Footer from '../../components/Footer/Footer';

test('Footer renders correctly', () => {
  const store = createStore(combinedReducers, applyMiddleware(thunk));
  const tree = renderer
    .create(
      <Provider store={store}>
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      </Provider>,
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
