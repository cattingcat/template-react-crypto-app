import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { chain, createClient, WagmiConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import {
  getDefaultWallets, lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

const { chains, provider } = configureChains(
  [chain.mainnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Test App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

const rainbowKitTheme = lightTheme({
  accentColor: '#FF7C00',
});

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={rainbowKitTheme}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
