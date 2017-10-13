import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import reducers from './reducers';
import GameIndex from './components/game_index';
import GameJoin from './components/game_join';
import TeamAnswer from './components/team_answer';
import PermissionDenied from './components/permission_denied';
import AdminPage from './components/admin_page';

const createStoreWithMiddleware = applyMiddleware(thunk, promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/game/:game/:team" component={TeamAnswer}/>
          <Route path="/join" component={GameJoin}/>
          <Route path="/create" component={PermissionDenied}/>
          <Route path="/admin" component={AdminPage}/>
          <Route path="/" component={GameIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
