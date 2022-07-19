import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useCallback } from 'react';
import { useAccount, useProvider, useSigner } from 'wagmi';
import styles from './App.module.css';

function App() {
  const { connector: activeConnector, isConnected, address } = useAccount();
  const {data: signer} = useSigner();

  const onSign = useCallback(async () => {
    if (activeConnector?.name === 'MetaMask') {
      console.error('MetaMask doesn\'t support signing without sending');
      return;
    }

    if (!isConnected) {
      console.error('Connect wallet first');
      return;
    }

    const r = await signer?.signTransaction({
      from: address,
      to: '0x0000000000000000000000000000000000000000',
      value: '0x1',
    });

  }, [signer, activeConnector]);

  const onSignViaRequest = useCallback(async () => {
    if (activeConnector?.name === 'MetaMask') {
      console.error('MetaMask doesn\'t support signing without sending');
      return;
    }

    if (!isConnected) {
      console.error('Connect wallet first');
      return;
    }

    const provider = await activeConnector?.getProvider();
    const r = await provider!.request({
      method: 'eth_signTransaction',
      params: {
        from: address,
        to: '0x0000000000000000000000000000000000000000',
        value: '0x1',
      },
    });
  }, [activeConnector]);

  const onSend = useCallback(async () => {
    if (activeConnector?.name === 'MetaMask') {
      console.error('MetaMask doesn\'t support signing without sending');
      return;
    }

    if (!isConnected) {
      console.error('Connect wallet first');
      return;
    }

    const r = await signer?.sendTransaction({
      from: address,
      to: '0x0000000000000000000000000000000000000000',
      value: '0x1',
    });
  }, [signer, activeConnector]);


  return (
    <div className={styles.App}>
      <header className={styles.App_header}>
        <p>
          Template react crypto app
        </p>
        <ConnectButton />
      </header>
      <main>
        <button onClick={onSign}> Click me to sign via signer </button>
        <button onClick={onSignViaRequest}> Click me to sign via request </button>
        <button onClick={onSend}> Click me to send tx </button>
      </main>
    </div>
  );
}

export default App;
