import React, { Component } from 'react';
import { connect } from 'react-redux';
//import custom components
import SnackBar from './snackbar';
import HeadContainer from './headContainer';
import ResturantTable from './resturantTable';
import LocationPicker from '../components/locationPicker';
//import actions and configs
import { fetch, setReducer } from '../actions/index';

class MainWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: window.localStorage.getItem('city'),
      locationDilogOpen: false
    };
    this.onSelectLocation = this.onSelectLocation.bind(this);
    this.onCloseLocationPicker = this.onCloseLocationPicker.bind(this);
  }

  onSelectLocation(location) {
    if (location) {
      window.localStorage.setItem('city', JSON.stringify(location));
      this.setState({
        locationDilogOpen: false,
        city: location
      });
      this.props.setReducer({
        type: 'QUERY_RESTURANT_LOCATION',
        entity_id: this.state.city.id
      });
    } else {
      this.props.setReducer({
        type: 'SNACK',
        text: 'Please choose your Location.'
      });
    }
  }

  onCloseLocationPicker() {
    if (this.state.city) {
      this.setState({
        locationDilogOpen: false
      });
    } else {
      this.props.setReducer({
        type: 'SNACK',
        text: 'Please choose your Location.'
      });
    }
  }

  componentWillMount() {
    if (!this.state.city) {
      this.state.locationDilogOpen = true;
    } else {
      try {
        this.state.city = JSON.parse(this.state.city);
        this.props.setReducer({
          type: 'QUERY_RESTURANT_LOCATION',
          entity_id: this.state.city.id
        });
      } catch (err) {
        this.state.city = undefined;
      }
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextState.locationDilogOpen != this.state.locationDilogOpen)
  //     return true;
  //   return false;
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.query.start == 0)
      this.props.setReducer({
        type: 'LOADER_SHOW',
      });
    this.props.fetch(nextProps.query);
  }

  render() {
    return (
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%'
      }}>
        <HeadContainer location={this.state.city} onOpenLoginDialog={() => {
        this.setState({
          locationDilogOpen: true
        });
      }}/>
        <ResturantTable sort={this.props.query.sort} order={this.props.query.order}/>
        {this.state.locationDilogOpen
        ? <LocationPicker location={this.state.city} onClose={this.onCloseLocationPicker} onSelectLocation={this.onSelectLocation}/>
        : ''}
        <SnackBar/>
        </div>
    )
  }
}

function mapStateToProps({query}) {
  return {
    query
  };
}

export default connect(mapStateToProps, {
  fetch,
  setReducer
})(MainWindow);
