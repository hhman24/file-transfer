import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { RouterProvider } from 'react-router-dom';
import { router } from '~/routes/routes.jsx';
import { Provider } from 'react-redux';
import GlobalStyles from '@mui/material/GlobalStyles';
import themes from '~/themes/index.js';
import { persistor, store } from '~/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CssVarsProvider theme={themes} defaultMode="system" disableTransitionOnChange>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <GlobalStyles
          styles={() => ({
            ':root': {
              '--Form-maxWidth': '800px',
              '--Transition-duration': '0.4s', // set to `none` to disable transition
              '--Header-height': '52px',
            },
          })}
        />
        <RouterProvider router={router} />
      </CssVarsProvider>
    </PersistGate>
  </Provider>,
);
