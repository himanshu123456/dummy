import React from 'react';
import Dialog from 'material-ui/Dialog';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default (props) => {
  let searchTerm = props.searchTerm;
  let location = props.location;
  console.log(searchTerm);
  return (
    <Dialog
    title="FILTERS"
    open={true}
    bodyStyle={{
      padding: 0
    }}
    onRequestClose={props.onClose}
    ><div style={{
      width: '100%'
    }}>
    {searchTerm ?
      <IconButton tooltip="CLEAR"
      onTouchTap={props.onClear}
      iconStyle={{
        fontSize: '15px'
      }}
      style={{
        width: '20%'
      }}
      >
    <FontIcon className="material-icons">clear</FontIcon></IconButton> : ''}
    <TextField
    hintText="Search"
    defaultValue={searchTerm}
    style={{
      width: '60%',
      marginLeft: props.searchTerm == '' ? '1.2rem' : 0
    }}
    onChange={(e, v) => {
      searchTerm = v;
    }}
    />
      <IconButton tooltip="SEARCH"
    style={{
      width: '20%'
    }}
    onTouchTap={() => {
      props.onSearch(searchTerm);
    }}
    >
      <FontIcon className="material-icons">search</FontIcon></IconButton></div>
      <FlatButton
    label={location ? location.name : ''}
    labelPosition="before"
    disableTouchRipple={true}
    style={{
      marginTop: '1rem',
      left: '50%',
      transform: 'translateX(-50%)',
      marginBottom: '2rem'
    }}
    labelStyle={{
      fontSize: '16px',
      paddingRight: '2px',
    }}
    icon={<FontIcon className="material-icons" style={{
      fontSize: '20px'
    }} color='black'>place</FontIcon>}
    onTouchTap={props.onOpenLoginDialog}
    />
        </Dialog>
    );
}
