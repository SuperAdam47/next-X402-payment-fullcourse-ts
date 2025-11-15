# Xorrabets – Experiments with x402 Payments

Xorrabets is a collection of **Web3 micro‑payment experiments** built using **Next.js**, **Tailwind CSS**, and the **x402 payment protocol** (Coinbase).  
The goal is to explore how the internet can integrate seamless, programmable, pay‑per‑use access powered by blockchain.  
All features are currently **mocked** (no real backend, no Supabase, no on‑chain transactions) and intended for learning and experimentation.

---

## 🧪 Experiments

| Feature | Description | Route |
|----------|-------------|--------|
| **Pay‑to‑View Page** | Requires a mock 0.05 USDC payment via x402 to unlock hidden content. | `/pay-to-view` |
| **Web3 Fortune Cookie** | User “pays” ~$0.01 (mock) and receives a random crypto‑themed fortune. | `/fortune-cookie` |
| **Upload & Mint NFT** | User uploads a file and “pays” to simulate NFT creation. | `/upload-mint-nft` |

---

## 🎨 UI / UX Highlights

- Clean, futuristic **dark theme** with cyan and violet accents  
- **Responsive layout**: 90% width on mobile, 50% width on desktop  
- Header with project title **“Xorrabets”** and **“Request Faucet”** button  
- Banner showing **“Running on Base Sepolia Testnet”**  
- Interactive hover animations and consistent typography  
- Mock feedback states (loading, success, error) for every flow  

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn installed

### Installation
```bash
git clone https://github.com/jbqneto/next-x402.git
cd next-x402
npm install
```

### Running in Development
```bash
npm run dev
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Start
```bash
npm run build
npm run start
```

---

## ⚙️ Configuration

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_X402_FACILITATOR_URL=http://localhost:8080
```

For now, this only stores mock environment variables.

---

## 📁 Project Structure

```
next-x402/
├── app/                # Next.js routes (App Router)
│   ├── protected/
│   ├── fortune-cookie/
│   └── upload-mint-nft/
├── components/         # Shared UI components
├── public/images/      # Static assets
├── lib/                # Mock services (simulated x402, NFT, faucet, etc.)
├── styles/             # Tailwind global styles
├── tailwind.config.js  # Tailwind configuration
└── README.md
```

---

## 💡 Mock Services

- “Request Faucet” button → opens mock modal that simulates token claim  
- “Pay‑to‑View” → simulates x402 payment and unlocks page content  
- “Fortune Cookie” → generates random crypto fortune  
- “Upload & Mint NFT” → simulates NFT creation after mock payment  

No tokens are transferred and no blockchain interaction occurs.

---

## 🧠 Future Enhancements

- Replace mocks with real **x402** API integrations  
- Add **on‑chain payment** and wallet connection (Base network)  
- Integrate **NFT minting** with smart contracts  
- Add persistent backend using Supabase or PostgreSQL  

---

## 🙌 Acknowledgements

- Built by **José Neto (jbqneto)** for educational and experimental purposes  
- Inspired by **Coinbase x402 Protocol**  
- Running on **Base Sepolia Testnet**  

---

## 📜 License

This project is licensed under the **MIT License**.