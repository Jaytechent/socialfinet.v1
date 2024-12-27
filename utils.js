const getCurrentTimeStamps = () => {
  return Math.floor(Date.now() / 1000);
};

const generateNonce = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let nonce = "";
  for (let i = 0; i < 10; i++) {
    nonce += chars[Math.floor(Math.random() * chars.length)];
  }
  return nonce;
};

function removeSpecialCharacters(str) {
  return str.replace(/[^\w\s,."'#!]/gi, "");
}

let postTopics = [
  "The Role of Web3 in Decentralized Applications",
  "None of the current agent on x can cover llm like me(socifiagent)",
  "Understanding the Basics of Blockchain Technology",
  "How Smart Contracts Are Revolutionizing Industries",
  "The Rise of NFTs: Trends and Predictions",
  "Artificial Intelligence in Decentralized Finance (DeFi)",
  "Exploring Layer 2 Solutions for Scalability",
  "The Importance of Security in Blockchain Networks",
  "Decentralized Identity: The Future of Digital IDs",
  "How Cryptocurrency Is Changing the Financial Landscape",
  "Tokenomics: Understanding Cryptocurrency Economics",
  "The Benefits of Decentralized Autonomous Organizations (DAOs)",
  "How Artificial Intelligence Enhances Blockchain Analytics",
  "Decentralized Exchanges (DEXs): Pros and Cons",
  "The Role of Stablecoins in Cryptocurrency Markets",
  "The Intersection of Web3 and the Metaverse",
  "How DeFi Is Transforming Traditional Banking",
  "The Future of Digital Payments: Blockchain and Cryptocurrency",
  "The Environmental Impact of Blockchain Technology",
  "The Importance of Decentralization in Web3",
  "How Machine Learning Optimizes DeFi Protocols",
  "Exploring Privacy Coins and Their Use Cases",
  "The Role of Cryptography in Blockchain Security",
  "How to Create a Token on the Ethereum Blockchain",
  "The Benefits of Blockchain Interoperability",
  "The Role of Artificial Intelligence in Smart Contract Auditing",
  "How Web3 Is Empowering Content Creators",
  "The Importance of Oracles in Blockchain Networks",
  "The Evolution of Decentralized Storage Solutions",
  "The Impact of Blockchain on Supply Chain Management",
  "How to Build a Decentralized Application (dApp)",
  "The Role of Consensus Mechanisms in Blockchain",
  "How AI Enhances Fraud Detection in DeFi",
  "The Benefits of Cross-Chain Bridges",
  "How to Launch a Successful ICO (Initial Coin Offering)",
  "The Importance of Governance Tokens in DeFi",
  "How Web3 Enables Peer-to-Peer Lending",
  "The Role of Blockchain in Digital Identity Verification",
  "How DeFi Protocols Generate Yield",
  "The Benefits of Decentralized Cloud Computing",
  "The Role of Artificial Intelligence in Crypto Trading",
  "How to Use Web3 Wallets for Decentralized Transactions",
  "The Importance of Decentralized Finance for Financial Inclusion",
  "The Role of NFTs in Digital Art and Collectibles",
  "How to Secure Your Blockchain Assets",
  "The Evolution of Layer 1 and Layer 2 Blockchain Solutions",
  "How AI Personalizes Web3 Experiences",
  "The Benefits of Decentralized Marketplaces",
  "How to Participate in a Blockchain Airdrop",
  "The Role of Tokenized Real Estate in Web3",
  "How DeFi Lending Platforms Work",
  "The Importance of Decentralized Governance in DAOs",
  "How AI Streamlines Blockchain Data Analysis",
  "The Benefits of Decentralized Prediction Markets",
  "How to Create a Liquidity Pool in DeFi",
  "The Role of Gaming in the Web3 Ecosystem",
  "How Blockchain Enhances Transparency in Elections",
  "The Importance of Decentralized Content Platforms",
  "How Web3 Reshapes the Gig Economy",
  "The Role of AI in Crypto Portfolio Management",
  "How Blockchain Promotes Data Sovereignty",
  "The Benefits of Staking in Cryptocurrency",
  "How to Use DeFi Aggregators for Yield Optimization",
  "The Role of Blockchain in Healthcare Data Security",
  "How to Create a DAO for Your Community",
  "The Importance of Decentralized Insurance Protocols",
  "How AI Detects Anomalies in Crypto Transactions",
  "The Benefits of Decentralized Social Media Platforms",
  "How to Build a Cross-Chain Application",
  "The Role of Blockchain in Renewable Energy Markets",
  "How to Launch a Successful NFT Project",
  "The Importance of Decentralized Oracles in DeFi",
  "How AI Automates Smart Contract Development",
  "The Benefits of DeFi Derivatives Platforms",
  "How Web3 Enhances Consumer Privacy and Control",
  "The Role of Tokenized Assets in Traditional Finance",
  "How to Use Blockchain for Transparent Crowdfunding",
  "The Importance of DAOs in Community Building"
];

function getRandomNumber(num) {
  return Math.floor(Math.random() * num);
}

export {
  getCurrentTimeStamps,
  generateNonce,
  postTopics,
  getRandomNumber,
  removeSpecialCharacters,
};
