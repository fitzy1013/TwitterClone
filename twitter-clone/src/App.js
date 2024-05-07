import React from 'react';
import { AuthProvider } from 'react-auth-kit'
import RouteComponent from './components/routes';

const App = () => (
    <AuthProvider authType = {'cookie'}
                  authName={'_auth'}
                  cookieDomain={window.location.hostname}
                  cookieSecure={window.location.protocol === "http:"}>
        <RouteComponent />
    </AuthProvider>
);

export default App;