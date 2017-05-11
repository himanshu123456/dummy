export default function(state = {
    isNew: true,
    restaurants: [],
    count: 0,
    error: false
  } , action) {
  console.log(action);
  if (action.type == "FETCH_RESTURANTS") {
    if (!action.error && (action.payload && action.payload.data && !action.payload.data.error)) {
      action.payload.data.restaurants = action.payload.data.restaurants.map(function({restaurant}) {
        return [restaurant.thumb, restaurant.name, restaurant.average_cost_for_two, restaurant.user_rating.aggregate_rating, restaurant.location.address, restaurant.cuisines, restaurant.url];
      });
      console.log(action.payload.data);
      action.payload.data.results_start = parseInt(action.payload.data.results_start);
      if (action.payload.data.results_start == 0)
        return {
          isNew: true,
          restaurants: action.payload.data.restaurants,
          count: action.payload.data.results_found,
          start: action.payload.data.results_start,
          error: false
        };
      else {
        return {
          isNew: false,
          restaurants: [...state.restaurants, ...action.payload.data.restaurants],
          count: action.payload.data.results_found,
          start: action.payload.data.results_start,
          error: false
        };
      }
    } else if (action.error && action.payload.message != 'cancel') {
      return {
        ...state,
        isNew: false,
        error: true
      };
    }
  }
  return state;
}
