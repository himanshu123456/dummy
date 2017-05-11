import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import Overlay from '../components/overlay';
//import custom components

class Loader extends Component {
  render() {
    return (
      <div style={{
        position: 'absolute',
        height: '100%',
        width: '100%',
        display: this.props.loader.show ? 'block' : 'none'
      }}>
      <Overlay bgColor="rgba(0,0,0,0.2)"/>
      <div className='center'>
      <CircularProgress size={80} thickness={5}/>
      </div>
      </div>
    )
  }
}

function mapStateToProps({loader}) {
  return {
    loader
  };
}

export default connect(mapStateToProps, null)(Loader);
