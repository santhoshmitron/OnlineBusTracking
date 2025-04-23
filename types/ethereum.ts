import type { ethers } from "ethers"

export type EthereumRequestMethod =
  | "eth_requestAccounts"
  | "eth_accounts"
  | "eth_chainId"
  | "eth_sendTransaction"
  | "wallet_addEthereumChain"
  | "wallet_switchEthereumChain"
  | "personal_sign"
  | string

export interface RequestArguments {
  method: EthereumRequestMethod
  params?: unknown[]
}

export interface ProviderRpcError extends Error {
  code: number
  data?: unknown
}

export interface EthereumEventMap {
  connect: { chainId: string }
  disconnect: ProviderRpcError
  accountsChanged: string[]
  chainChanged: string
  message: { type: string; data: unknown }
}

// Define a more compatible provider interface
export interface EthereumProvider extends ethers.Eip1193Provider {
  isMetaMask?: boolean
  request<T = unknown>(args: RequestArguments): Promise<T>
  // Use more general types for event handling to be compatible with Window
  on(event: string, listener: (...args: unknown[]) => void): void
  removeListener(event: string, listener: (...args: unknown[]) => void): void
}

// Declare global to augment the Window interface
declare global {
  interface Window {
    ethereum?: EthereumProvider
  }
}

// Export a type for use in components
export type WindowWithEthereum = Window & {
  ethereum?: EthereumProvider
}
