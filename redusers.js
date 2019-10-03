import  { DisplayType, COME_BACK, REQUEST, RECEIVE, RECEIVE_POINTS, RECEIVE_DETAILS, SET_DISPLAY_TYPE, TOGGLE_DISPLAY_TYPE, SWIPE_LEFT, SWIPE_RIGHT, SET_SEARCH_STATE, TO_FAVORITES, ADD_TO_FAVORITES } from './actions'

const initialState = {
  displayType: DisplayType.SHOW_SEARCH,
  appartments: [],
  left_button: 'FEATURES',
  right_button: 'SHOW_LIST',
  searchState: {
      min: 1,
      max: 1000,
      button1: false,
      button2: false,
      button3: false,
      button4: false,
      button5: false,
      button6: false
    },
  json: {
    "appartments": []
  },
  points: []
}

leftSwipes = {
  'SHOW_MAP': 'SHOW_LIST',
  'SHOW_LIST': 'SHOW_SEARCH',
  'SHOW_SEARCH': 'FAVORITES',
  'FAVORITES': 'SHOW_MAP'
}

rightSwipes = {
  'SHOW_MAP': 'FAVORITES',
  'FAVORITES': 'SHOW_SEARCH',
  'SHOW_SEARCH': 'SHOW_LIST',
  'SHOW_LIST': 'SHOW_MAP'
}


export function appartmentApp(state=initialState, action) {
  switch (action.type) {
    case SET_DISPLAY_TYPE:
      return { ...state, displayType: action.type }
    case TOGGLE_DISPLAY_TYPE:
      if (state.displayType === DisplayType.SHOW_MAP) {
        return { ...state, displayType: DisplayType.SHOW_SEARCH }
      } else {
        return { ...state, displayType: DisplayType.SHOW_MAP }
      }
    case SWIPE_LEFT:
      current_type = leftSwipes[state.displayType]
      left_button = leftSwipes[current_type]
      right_button = rightSwipes[current_type]
      return { ...state, displayType: current_type, left_button: left_button, right_button: right_button }
    case SWIPE_RIGHT:
      current_type = rightSwipes[state.displayType]
      left_button = leftSwipes[current_type]
      right_button = rightSwipes[current_type]
      return { ...state, displayType: current_type, left_button: left_button, right_button: right_button }
    case SET_SEARCH_STATE:
      return {...state, searchState: action.searchState}
    case REQUEST:
      return {...state, displayType: DisplayType.REQUST, prevDisplayType: state.displayType}
    case RECEIVE:
      return {...state, displayType: DisplayType.SHOW_LIST, json: action.json}
    case RECEIVE_POINTS:
      new_state = {...state, displayType: DisplayType.SHOW_LIST, points: action.json}
      return new_state
    case RECEIVE_DETAILS:
      return {...state, displayType: DisplayType.DETAILS, details: action.details}
    case COME_BACK:
      return {...state, displayType: state.prevDisplayType}
    case TO_FAVORITES:
      return {...state, favorites: action.favorites}
    case ADD_TO_FAVORITES:
      new_state = {...state,}
      new_state.favorites.push({
        address: action.address,
        id: action.id
      })
      return new_state
    default:
      return state
  }
}
