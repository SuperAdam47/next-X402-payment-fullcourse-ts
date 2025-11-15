'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Cookie, Loader2, Sparkles } from "lucide-react";
import { Button } from "./ui/button";



const fortunes = [
  "HODL strong, for the moon is closer than you think.",
  "A bull market is in your future... or maybe just another dip.",
  "Beware of rug pulls, trust only audited contracts.",
  "Your seed phrase is your treasure. Guard it with your life.",
  "Gas fees will be high today. Choose your transactions wisely.",
  "A whale is watching your trades. Don't panic sell.",
  "The bear market builds character. Stack sats and be patient.",
  "Your NFT will appreciate... in sentimental value at least.",
  "Not your keys, not your crypto. Remember this always.",
  "A DeFi opportunity awaits, but DYOR first.",
  "The blockchain never lies, but Twitter does. Verify everything.",
  "Your airdrop is coming... eventually. Stay eligible.",
];

export default function FortuneCard() {
  const [revealed, setRevealed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fortune, setFortune] = useState('');

  const handlePayment = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    setFortune(randomFortune);
    setLoading(false);
    setRevealed(true);
  };

  const handleReset = () => {
    setRevealed(false);
    setFortune('');
  };

  return (

          <Card className="border-violet-900/30">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center animate-pulse">
                <Cookie className="w-10 h-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl">
              {revealed ? 'Your Fortune Awaits' : 'Crack Open Your Fortune'}
            </CardTitle>
            <CardDescription className="text-base">
              {revealed
                ? 'The blockchain has spoken...'
                : 'Pay $0.01 to reveal your crypto-themed fortune'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!revealed ? (
              <>
                <div className="bg-muted p-6 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Price</span>
                    <span className="font-semibold text-violet-400">$0.01 USD</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Equivalent</span>
                    <span className="font-semibold">~0.01 USDC</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Network</span>
                    <span className="font-semibold">Base Sepolia</span>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-lg py-6"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Consulting the Oracle...
                    </>
                  ) : (
                    <>
                      <Cookie className="w-5 h-5 mr-2" />
                      Pay & Reveal Fortune
                    </>
                  )}
                </Button>
              </>
            ) : (
              <div className="space-y-6 animate-in fade-in duration-700">
                <div className="bg-gradient-to-br from-violet-900/30 to-cyan-900/30 p-8 rounded-lg border border-violet-500/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 animate-pulse" />
                  <div className="relative flex items-start gap-4">
                    <Sparkles className="w-6 h-6 text-violet-400 flex-shrink-0 mt-1" />
                    <p className="text-xl md:text-2xl font-medium leading-relaxed">
                      {fortune}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="flex-1"
                  >
                    Try Again
                  </Button>
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(fortune);
                    }}
                    className="flex-1 bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600"
                  >
                    Share Fortune
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
  )
}