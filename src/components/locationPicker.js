import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { cities } from '../config';
import { find } from '../helpers';
/**
 * Dialogs can be nested. This example opens a Date Picker from within a Dialog.
 */
const radioButtonStyle = {
  marginTop: 16,
};


export default (props) => {
  let location = props.location;
  function renderCities() {
    let currentList = [];
    cities.forEach((o, i) => {
      currentList.push(
        <RadioButton
        key={i}
        value={i}
        label={o.name}
        style={radioButtonStyle}
        />
      );
    })
    return currentList;
  }

  function SelectLocation() {
    if (location && (!props.location || (location.id != props.location.id)))
      props.onSelectLocation(location);
    else {
      props.onClose();
    }
  }

  const actions = [
    <FlatButton
    label="Cancel"
    primary={true}
    onTouchTap={props.onClose}
    />,
    <FlatButton
    label="Go"
    primary={true}
    keyboardFocused={true}
    onTouchTap={SelectLocation}
    />,
  ];
  let contentStyle = {
  }
  if (window.innerHeight < window.innerWidth)
    contentStyle.transform = 'translate(0,0)';
  return (
    <Dialog
    title="Select your Location"
    actions={actions}
    modal={false}
    bodyStyle={{
      minHeight: '10rem'
    }}
    contentStyle={contentStyle}
    open={true}
    onRequestClose={props.onClose}
    autoScrollBodyContent={true}
    >
          <RadioButtonGroup name="locationPicker" valueSelected={location ? find(cities, 'id', location.id) : undefined}
    onChange={(e, v) => {
      location = cities[v]
      console.log();
    }}>
            {renderCities()}
          </RadioButtonGroup>
        </Dialog>
    );
}
