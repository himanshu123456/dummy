import React, { Component } from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

const autoHideDuration = 4000;
class SnackBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }
  componentWillReceiveProps() {
    this.state.open = true;
  }
  render() {
    return <Snackbar
      open={this.state.open}
      message={this.props.snack.text}
      autoHideDuration={autoHideDuration}
      onRequestClose={() => {
        this.setState({
          open: false
        });
      }}
      />
  }
}


function mapStateToProps({snack}) {
  return {
    snack
  };
}

export default connect(mapStateToProps, null)(SnackBar);
