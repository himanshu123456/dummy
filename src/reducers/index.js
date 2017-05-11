import { combineReducers } from 'redux';
import query from './query';
import snack from './snack';
import loader from './loader';
import restaurants from './resturants';

const rootReducer = combineReducers({
  snack,
  restaurants,
  query,
  loader
});

export default rootReducer;
