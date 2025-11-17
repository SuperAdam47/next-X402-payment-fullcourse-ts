import Link from 'next/link';
import Image from 'next/image';
import { FaucetButton } from './faucet-button';

export function Header() {

  return (
    <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
                src="/images/x-logo.png"
                alt="Xorrabet Logo"
                width={40}
                height={40}
                className="w-10 h-10"
            />
            <span className="text-xl font-bold">
              <span className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">X</span>
              <span className="text-white">orra</span>
              <span className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">B</span>
              <span className="text-white">et</span>
            </span>
          </Link>

          <FaucetButton />
        </div>
      </div>

      <div className="bg-cyan-950/30 border-t border-cyan-900/30 py-2 px-4">
        <p className="text-center text-sm text-cyan-400/80">
          Running on <span className="font-semibold text-cyan-400">Base Sepolia</span> testnet
        </p>
      </div>
    </header>
  );
}
