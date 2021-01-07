import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useWallet, UseWalletProvider } from 'use-wallet';
import styled from 'styled-components';

import BanksProvider from './contexts/Banks';
import BasisCashProvider from './contexts/BasisCashProvider';
import ModalsProvider from './contexts/Modals';

import Banks from './views/Banks';
import Home from './views/Home';
import Bond from './views/Bond';
import Stats from './views/Stats';

import store from './state';
import theme from './theme';
import Updaters from './state/Updaters';
import Distributions from './views/Distributions';
import Popups from './components/Popups';
import config from './config';
import Button from './components/Button';

const AppRouter: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/stats">
        <Stats />
      </Route>
      <Route path="/staking">
        <Banks />
      </Route>
      <Route path="/bonds">
        <Bond />
      </Route>
      <Route path="/distribution">
        <Distributions />
      </Route>
    </Switch>
  );
};

const AppWalletRouter = () => {
  const { account } = useWallet();
  // const basisCash = useBasisCash();

  if (!!!account) return <UnlockWallet />;

  return <AppRouter />;
};

const UnlockWallet = () => {
  const { connect } = useWallet();
  return (
    <Center>
      <Button onClick={() => connect('injected')} text="Unlock Wallet" />
    </Center>
  );
};

const App: React.FC = () => {
  return (
    <Providers>
      <Router>
        <AppWalletRouter />
      </Router>
    </Providers>
  );
};

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider chainId={config.chainId} connectors={{ injected: {} }}>
        <Provider store={store}>
          <Updaters />
          <BasisCashProvider>
            <ModalsProvider>
              <BanksProvider>
                <>
                  <Popups />
                  {children}
                </>
              </BanksProvider>
            </ModalsProvider>
          </BasisCashProvider>
        </Provider>
      </UseWalletProvider>
    </ThemeProvider>
  );
};

export default App;

const Center = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
`;
