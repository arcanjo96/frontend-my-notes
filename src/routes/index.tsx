import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Annotations from '../pages/Annotations';
import NewAnnotation from '../pages/NewAnnotation';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />

        <Route path="/annotations" component={Annotations} isPrivate />
        <Route path="/newAnnotation" component={NewAnnotation} isPrivate />
    </Switch>
);

export default Routes;