// app/page.tsx
'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Panagram } from '../components/Panagram'

export default function Home() {
  const { address, isConnected } = useAccount()

  return (
    <main className="p-8">
      <div className="mb-4 justify-center flex">
        <ConnectButton  />
      </div>  
      <Panagram />
        
      
     
    </main>
  )
}
