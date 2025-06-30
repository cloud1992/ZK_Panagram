// lib/wagmi.ts
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, sepolia, foundry } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'Panagram App',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'fallback',
  chains: [foundry, sepolia, mainnet],
  ssr: true,
})