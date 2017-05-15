import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
//import custom components
//import actions and configs
import { setReducer } from '../actions/index';

class HeadContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      showSearchBar: false
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(e, v) {
    console.log(v);
    this.setState({
      searchTerm: v
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      searchTerm: nextProps.query.q
    });
  }

  render() {
    console.log(this.state);
    return (
      <Toolbar
      style={{
        backgroundColor: '#ca1f2e',
        position: 'relative',
        padding: 0
      }}
      >
      {window.innerWidth > 650 ? ''
        : <IconButton
        onTouchTap={() => {
          this.props.onOpenLoginDialog();
        }}
        style={{
          height: '100%'
        }}
        >
          <FontIcon className="material-icons" color='white'>place</FontIcon></IconButton>}
    <ToolbarTitle text="Zomato Table"
      style={{
        color: 'white',
        marginLeft: '2rem'
      }}/>
      {window.innerWidth > 650 ?
        <ToolbarGroup lastChild={true}>
    {this.state.searchTerm ? <IconButton tooltip="CLEAR"
        onTouchTap={() => {
          this.setState({
            searchTerm: ''
          });
          this.props.setReducer({
            type: 'QUERY_RESTAURANT_SEARCH',
            q: ''
          });
        }}
        iconStyle={{
          fontSize: '15px'
        }}
        >
    <FontIcon className="material-icons"color='white'>clear</FontIcon></IconButton> : ''}
    <TextField
        hintText="Search"
        inputStyle={{
          color: 'white'
        }}
        value={this.state.searchTerm}
        hintStyle={{
          color: 'white'
        }}
        onChange={this.onChange}
        />

      <IconButton tooltip="SEARCH"
        onTouchTap={() => {
          this.props.setReducer({
            type: 'QUERY_RESTAURANT_SEARCH',
            q: this.state.searchTerm
          });
        }}
        >
      <FontIcon className="material-icons" color='white'>search</FontIcon></IconButton>
      <FlatButton
        label={this.props.location ? this.props.location.name : ''}
        labelPosition="before"
        primary={true}
        disableTouchRipple={true}
        style={{
          marginTop: '1rem'
        }}
        labelStyle={{
          fontSize: '16px',
          paddingRight: '2px',
          color: 'white'
        }}
        icon={<FontIcon className="material-icons" label={this.props.location ? this.props.location.name : ''} style={{
          fontSize: '20px'
        }} color='white'>place</FontIcon>}
        onTouchTap={() => {
          this.props.onOpenLoginDialog();
        }}
        />
      </ToolbarGroup>
        : <IconButton
        onTouchTap={() => {
          this.setState({
            showSearchBar: true
          });
        }}
        style={{
          height: '100%'
        }}
        >
              <FontIcon className="material-icons" color='white'>search</FontIcon></IconButton>}
              {this.state.showSearchBar ?
        <div style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '100%',
          background: '#ca1f2e',
          zIndex: '2'
        }}>

       <IconButton tooltip="CLEAR"
        onTouchTap={() => {
          this.setState({
            searchTerm: '',
            showSearchBar: false
          });
          this.props.setReducer({
            type: 'QUERY_RESTAURANT_SEARCH',
            q: ''
          });
        }}
        style={{
          width: '20%',
          float: 'left',
          height: '100%'
        }}
        iconStyle={{
          fontSize: '15px'
        }}
        >
        <FontIcon className="material-icons"color='white'>clear</FontIcon></IconButton>
                      <IconButton
        style={{
          float: 'right',
          width: '20%',
          height: '100%'
        }}
        tooltip="SEARCH"
        onTouchTap={() => {
          this.props.setReducer({
            type: 'QUERY_RESTAURANT_SEARCH',
            q: this.state.searchTerm
          });
        }}
        >
                      <FontIcon className="material-icons" color='white'>search</FontIcon></IconButton>

              <TextField
        hintText="Search"
        inputStyle={{
          color: 'white'
        }}
        value={this.state.searchTerm}
        hintStyle={{
          color: 'white'
        }}
        style={{
          float: 'right',
          width: '60%'
        }}
        onChange={this.onChange}
        />
        </div> : ''}
</Toolbar>
    )
  }
}

function mapStateToProps({query}) {
  return {
    query
  };
}

export default connect(mapStateToProps, {
  setReducer
})(HeadContainer);
