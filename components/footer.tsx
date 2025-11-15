export function Footer() {
  return (
    <footer className="border-t border-border/40 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
              <span className="text-sm font-bold text-white">W3</span>
            </div>
            <span className="text-sm text-muted-foreground">Xorrabets</span>
          </div>

          <p className="text-sm text-muted-foreground text-center md:text-right max-w-2xl">
            Built for experimentation with x402 protocol (mock flows).
            <br className="hidden md:block" />
            <span className="text-cyan-400/80"> Running on Base Sepolia testnet.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
