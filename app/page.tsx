'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Cookie, Image } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <section className="py-8 px-4 flex-shrink-0">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">x</span>
            <span className="text-white">402-orra</span>
            <span className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">B</span>
            <span className="text-white">et</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-2">
            Experiments with x402 Payments in Xorrabet
          </p>
          <p className="text-base text-muted-foreground/80 max-w-2xl mx-auto">
            Unlocking Web3 micro-payments and experiments.
          </p>
        </div>
      </section>

      <section className="py-4 px-4 flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <ExperimentCard
              href="/fortune"
              disabled={true}
              icon={<Cookie className="w-8 h-8 text-violet-400" />}
              title="Trading Bot Simulator"
              description="Test trading strategies using virtual funds. Demonstrates X402 payment flow."
              price="$0.01 USDC"
            />
            <ExperimentCard
              href="/protected"
              icon={<Zap className="w-8 h-8 text-green-400" />}
              title="Premium x402 Jackpot games"
              description="Access exclusive casino games. Unlock free spins with x402 payments"
              price="$0.05 USDC"
            />
          
          
            <ExperimentCard
              href="/mint"
              disabled={true}
              icon={<Image className="w-8 h-8 text-cyan-400" />}
              title="Sports Betting Arena"
              description="Place virtual bets on games. Shows X402 payment gating. You can enjoy."
              price="$0.02 USDC"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function ExperimentCard({ href, icon, title, description, price, disabled }: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  price: string;
  disabled?: boolean;
}) {
  return (
    <Link href={disabled ? '#' : href}>
      <Card className={disabled ? 'opacity-50 ' : 'link '+" h-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20 cursor-pointer border-muted"}>
        <CardHeader>
          <div className="mb-4">{icon}</div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-cyan-400">{price}</span>
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
