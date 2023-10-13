import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const WalletConnect = new WalletConnectConnector({
  rpcUrl: `https://bsc-dataseed.binance.org/`,
  // rpcUrl: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
  // bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

export const Injected = new InjectedConnector({
  supportedChainIds: [56], //chain ids for ethereum, goerli, bsc test net , bsc main net
});
