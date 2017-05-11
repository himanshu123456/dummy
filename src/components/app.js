import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Loader from '../containers/loader';
import MainWindow from '../containers/mainWindow';
export default function(props) {
  injectTapEventPlugin();
  return (
    <MuiThemeProvider muiTheme={getMuiTheme({
      fontFamily: "'Lato', sans-serif"
    })}>
    <div>
  <MainWindow/><Loader/>
</div>
</MuiThemeProvider>
    );
}
