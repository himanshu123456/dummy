const initialState = {
  q: '',
  entity_id: '',
  start: 0,
  count: 20,
  sort: '',
  order: '',
  entity_type: 'city'
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "QUERY_RESTURANT_SKIP":
      return {
        ...state,
        start: action.start
      };
    case "QUERY_RESTURANT_SEARCH":
      console.log({
        ...state,
        q: action.q,
        sort: '',
        order: '',
        start: 0
      });
      return {
        ...state,
        q: action.q,
        sort: '',
        order: '',
        start: 0
      }
    case "QUERY_RESTURANT_LOCATION":
      return {
        ...state,
        entity_id: action.entity_id,
        sort: '',
        order: '',
        start: 0
      }
    case "QUERY_RESTURANT_SORT":
      return {
        ...state,
        sort: action.sort,
        order: action.order,
        start: 0
      }
  }
  return state;
}
