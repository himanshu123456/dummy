export default function(state = {
    text: ''
  }, action) {
  switch (action.type) {
    case 'SNACK':
      return {
        text: action.text
      };
  }
  return state;
}
