import FortuneCard from "@/components/fortuneCard";

export default function FortunePage() {


  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-cyan-500 bg-clip-text text-transparent">
            Web3 Fortune Cookie
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover your crypto destiny for just a penny
          </p>
        </div>
        <FortuneCard />
      </div>
    </div>
  );
}
