import React from 'react';
import {
    RouteProps as ReactDOMRouterProps,
    Route as ReactDOMRoute,
    Redirect
} from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

interface IRouteProps extends ReactDOMRouterProps {
    isPrivate?: boolean;
    component: React.ComponentType;
}

const Route: React.FC<IRouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
    const { user } = useAuth();

    return (
        <ReactDOMRoute
            {...rest}
            render={({ location }) => {
                return isPrivate === !!user ? (
                    <Component />
                ) : (
                    <Redirect to={{
                        state: { from: location },
                        pathname: isPrivate ? '/' : '/annotations'
                    }} />
                );
            }}
        />
    );
}

export default Route;