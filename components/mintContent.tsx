"use client"

import { useState } from 'react';
import { Upload, Image as ImageIcon, Loader2, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';


export function MintContent() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [step, setStep] = useState<'upload' | 'processing' | 'minted'>('upload');
  const [tokenId, setTokenId] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleMint = async () => {
    setStep('processing');
    await new Promise(resolve => setTimeout(resolve, 3000));
    setTokenId(`#${Math.floor(Math.random() * 10000)}`);
    setStep('minted');
  };

  const canMint = file && title && description;

  return (
    <>
    {step === 'upload' && (
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-cyan-900/30">
              <CardHeader>
                <CardTitle>Upload Your File</CardTitle>
                <CardDescription>
                  Select an image to mint as an NFT
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center hover:border-cyan-500/50 transition-colors">
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    {preview ? (
                      <div className="space-y-4">
                        <img
                          src={preview}
                          alt="Preview"
                          className="max-h-64 mx-auto rounded-lg"
                        />
                        <p className="text-sm text-muted-foreground">
                          {file?.name}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex justify-center">
                          <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center">
                            <Upload className="w-8 h-8 text-cyan-400" />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">Click to upload</p>
                          <p className="text-sm text-muted-foreground">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              </CardContent>
            </Card>

            <Card className="border-violet-900/30">
              <CardHeader>
                <CardTitle>NFT Metadata</CardTitle>
                <CardDescription>
                  Add details about your creation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="My Awesome NFT"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your NFT..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                  />
                </div>

                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <p className="text-sm font-medium">Minting Details</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Network</span>
                    <span className="font-semibold">Base Sepolia</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Cost</span>
                    <span className="font-semibold text-cyan-400">~0.001 ETH</span>
                  </div>
                </div>

                <Button
                  onClick={handleMint}
                  disabled={!canMint}
                  className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600"
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Mint NFT
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'processing' && (
          <Card className="border-cyan-900/30">
            <CardContent className="py-16 text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center animate-pulse">
                  <Loader2 className="w-10 h-10 text-white animate-spin" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Preparing Your NFT...</h2>
                <p className="text-muted-foreground">
                  Uploading to IPFS, minting on-chain, and adding metadata
                </p>
              </div>
              <div className="max-w-md mx-auto space-y-2">
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Uploading image to IPFS</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                  <span>Minting NFT on Base Sepolia</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-4 h-4 rounded-full border-2 border-muted" />
                  <span>Finalizing metadata</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'minted' && (
          <div className="space-y-6 animate-in fade-in duration-700">
            <Card className="border-green-900/30">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                <CardTitle className="text-2xl">NFT Minted Successfully!</CardTitle>
                <CardDescription className="text-base">
                  Your creation is now on the blockchain
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-cyan-900/30">
                <CardContent className="pt-6">
                  {preview && (
                    <img
                      src={preview}
                      alt="Minted NFT"
                      className="w-full rounded-lg shadow-2xl shadow-cyan-500/20"
                    />
                  )}
                </CardContent>
              </Card>

              <Card className="border-violet-900/30">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-violet-400" />
                    <CardTitle>{title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{description}</p>

                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Token ID</span>
                      <span className="font-mono font-semibold text-cyan-400">
                        {tokenId}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Network</span>
                      <span className="font-semibold">Base Sepolia</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Contract</span>
                      <span className="font-mono text-xs">0x1234...5678</span>
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <Button className="w-full" variant="outline">
                      View on Explorer
                    </Button>
                    <Button
                      className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600"
                      onClick={() => {
                        setStep('upload');
                        setFile(null);
                        setPreview('');
                        setTitle('');
                        setDescription('');
                      }}
                    >
                      Mint Another NFT
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
    </>
  );
}