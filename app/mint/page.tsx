import { MintContent } from "@/components/mintContent";


export default function MintPage() {
  

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            Upload & Mint NFT
          </h1>
          <p className="text-lg text-muted-foreground">
            Transform your creation into a unique digital asset
          </p>
        </div>
      
        <MintContent />
        
      </div>
    </div>
  );
}
