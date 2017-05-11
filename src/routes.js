import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';

//pages
import MainWindow from './containers/mainWindow';
//import SingleResturantWindow from ...;

export default (
<Route path='/' component={App}>
  <IndexRoute component={MainWindow}/>
</Route>
);
