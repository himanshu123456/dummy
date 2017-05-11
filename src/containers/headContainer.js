import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
//import custom components
import MobileOptionDialog from '../components/mobileOptionDialog'
//import actions and configs
import { setReducer } from '../actions/index';

class HeadContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      showOptionDialog: false
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
        backgroundColor: '#ca1f2e'
      }}
      >
    <ToolbarTitle text="Zomato Table"
      style={{
        color: 'white'
      }}/>
      {window.innerWidth > 650 ?
        <ToolbarGroup lastChild={true}>
    {this.state.searchTerm ? <IconButton tooltip="CLEAR"
        onTouchTap={() => {
          this.setState({
            searchTerm: ''
          });
          this.props.setReducer({
            type: 'QUERY_RESTURANT_SEARCH',
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
            type: 'QUERY_RESTURANT_SEARCH',
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
            showOptionDialog: true
          });
        }}
        >
              <FontIcon className="material-icons" color='white'>menu</FontIcon></IconButton>}
{this.state.showOptionDialog ? <MobileOptionDialog onClose={() => {
        this.setState({
          showOptionDialog: false
        });
      }}
      onClear={() => {
        this.setState({
          searchTerm: '',
          showOptionDialog: false
        });
        this.props.setReducer({
          type: 'QUERY_RESTURANT_SEARCH',
          q: ''
        });
      }}
      onSearch={(v) => {
        this.setState({
          searchTerm: v,
          showOptionDialog: false
        });
        if (v != this.props.query.q)
          this.props.setReducer({
            type: 'QUERY_RESTURANT_SEARCH',
            q: v
          });
      }}
      onOpenLoginDialog={() => {
        this.setState({
          showOptionDialog: false
        });
        this.props.onOpenLoginDialog();
      }}
      searchTerm={this.state.searchTerm} location={this.props.location}/> : ''}
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
