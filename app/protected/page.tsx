import { CheckCircle2, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
                <CardTitle>Featured Video</CardTitle>
                <CardDescription>Thanks for your contribution!</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative w-full bg-black/50 aspect-video">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/OYSL_xsCeHY?autoplay=1&playsinline=1"
                    title="Web3 Presentation"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
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
