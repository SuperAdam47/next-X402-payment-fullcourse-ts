import { CheckCircle2, Eye, ShoppingCart, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PayToViewPage() {

  return (
    <div className="dark min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            Premium page
          </h1>
          {/* <p className="text-lg text-muted-foreground">
            Unlock exclusive content with a micro-payment
          </p> */}
        </div>

          <div className="space-y-6 animate-in fade-in duration-500">
            
          <Card className="border-green-900/30">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Payment Successful!</CardTitle>
                <CardDescription className="text-base">
                  Content unlocked. Enjoy your exclusive access.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-violet-900/30 overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-violet-400" />
                  <CardTitle>Jacket Pot</CardTitle>
                </div>
                <CardDescription>Experience the thrill of the Jacket Pot game!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative w-full bg-gradient-to-br from-violet-900/30 via-purple-900/20 to-fuchsia-900/30 rounded-lg overflow-hidden aspect-video border border-violet-800/30">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/50">
                        <Sparkles className="w-12 h-12 text-white" />
                      </div>
                      <p className="text-violet-300 font-semibold text-lg">Jacket Pot Game</p>
                      <p className="text-violet-400/70 text-sm">Premium Casino Experience</p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-violet-500/20 text-violet-300 text-xs font-semibold rounded border border-violet-400/30">
                      NEW
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-violet-950/20 rounded-lg border border-violet-800/20">
                    <div>
                      <p className="text-sm text-violet-300 font-medium">Game Access</p>
                      <p className="text-xs text-violet-400/70">Unlock full game features</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-violet-400">0.1 USDC</p>
                      <p className="text-xs text-violet-400/60">One-time purchase</p>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold"
                    size="lg"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Purchase Game Access
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-cyan-900/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-cyan-400" />
                  <CardTitle>Exclusive Web3 Insights</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="prose prose-invert max-w-none">
                <h3 className="text-xl font-semibold mb-4 text-cyan-400">
                  The Future of Micro-Payments in Web3
                </h3>
                <p className="text-muted-foreground mb-4">
                  The x402 protocol represents a paradigm shift in how we think about content monetization
                  on the internet. By enabling seamless micro-payments with minimal friction, creators can
                  now monetize individual pieces of content without requiring subscriptions or paywalls.
                </p>
                <p className="text-muted-foreground mb-4">
                  Key benefits of x402 payments:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• No sign-up required - pay with your wallet directly</li>
                  <li>• Sub-cent transactions become economically viable</li>
                  <li>• Instant settlement on Layer 2 networks</li>
                  <li>• True ownership of payment history</li>
                  <li>• Programmable payment flows with smart contracts</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  This technology unlocks new business models for creators, developers, and platforms
                  that were previously impossible due to high transaction fees and processing times.
                </p>
              </CardContent>
            </Card>
          </div>
      </div>
    </div>
  );
}
