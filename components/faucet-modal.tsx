'use client';

import { useState } from 'react';
import { Droplets, CheckCircle2, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFaucetModal } from '@/lib/faucet-modal-store';

export function FaucetModal() {
  const { isOpen, close } = useFaucetModal();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClaim = async () => {
    if (!address) return;

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      setAddress('');
      close();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <DialogTitle className="text-2xl">Request Test Tokens</DialogTitle>
          </div>
          <DialogDescription>
            Claim test tokens for Base Sepolia testnet. No login required.
          </DialogDescription>
        </DialogHeader>

        {!success ? (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="address">Your Wallet Address</Label>
              <Input
                id="address"
                placeholder="0x..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="font-mono text-sm"
              />
            </div>

            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p className="text-sm font-medium">You will receive:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 0.1 ETH (Base Sepolia)</li>
                <li>• 100 USDC (Test tokens)</li>
              </ul>
            </div>

            <Button
              onClick={handleClaim}
              disabled={!address || loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Droplets className="w-4 h-4 mr-2" />
                  Claim Tokens
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Tokens Claimed!</h3>
              <p className="text-sm text-muted-foreground">
                Test tokens have been sent to your wallet.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
