import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { FaucetModal } from '@/components/faucet-modal';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Xorrabets - x402 Payment Experiments in Xorrabet',
  description: 'Unlocking Web3 micro-payments and experiments in Xorrabet',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="dark flex flex-col min-h-screen bg-background">
          <Header />
          <main className="flex-1">{children}</main>
          {/* <Footer /> */}
          <FaucetModal />
        </div>
      </body>
    </html>
  );
}
