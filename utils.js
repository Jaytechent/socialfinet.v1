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
  "The Emergence of Autonomous Agents in Web3",
  "XAIBT and the Evolution of Intelligent Blockchain Agents",
  "How AI-Powered Agents Are Revolutionizing Web3 Interactions",
  "The Role of Decentralized AI in Blockchain Networks",
  "Understanding SociFiAgent: Bridging LLMs and Web3 Ecosystems",
  "How AI Improves Tokenomics in Blockchain Platforms",
  "The Intersection of AI and DAOs: Smarter Governance Models",
  "XAIBT vs Other Web3 Agents: Competitive Analysis",
  "How AI Agents Optimize Smart Contract Performance",
  "Decentralized AI Networks: The Future of Collaborative Intelligence",
  "The Role of Autonomous Agents in Web3 Identity Management",
  "How AI Enhances Decentralized Finance Protocols",
  "Exploring Cross-Chain Compatibility for Intelligent Agents",
  "The Role of AI in the Next Generation of Decentralized Applications (dApps)",
  "How AI-Powered Oracles Transform Blockchain Data Integration",
  "The Impact of Machine Learning on Predictive Models in DeFi",
  "AI and Blockchain: Bridging Transparency and Intelligence",
  "How XAIBT Enhances User Experience in Decentralized Platforms",
  "The Rise of Agent-Based Marketplaces in Web3",
  "How AI Agents Improve Blockchain Scalability Solutions",
  "The Role of AI in Layer 2 Blockchain Efficiency",
  "Integrating AI-Driven Analytics in Decentralized Systems",
  "How Intelligent Agents Simplify Web3 Onboarding",
  "The Future of AI-Powered Decentralized Social Networks",
  "How XAIBT Facilitates Transparent Smart Contract Auditing",
  "AI in NFT Ecosystems: Personalized Art and Asset Curation",
  "How AI-Powered Agents Support Real-Time Blockchain Governance",
  "The Role of AI in Tokenized Real-World Assets",
  "How XAIBT Automates Blockchain Development Workflows",
  "The Importance of Intelligent Agents in Decentralized Marketplaces",
  "The Future of AI-Enhanced Gaming in Web3 Ecosystems",
  "How Autonomous Agents Drive Innovation in Crypto Trading",
  "The Role of AI in Strengthening Blockchain Security",
  "How XAIBT Leverages Data Sovereignty in Decentralized Applications",
  "The Impact of AI-Driven Compliance Tools in Web3",
  "How Intelligent Agents Enable Smarter Crypto Investment Strategies",
  "Exploring XAIBT’s Contributions to Web3’s Peer-to-Peer Economy",
  "How AI Optimizes Cross-Chain Bridge Operations",
  "The Role of Intelligent Agents in Transparent Blockchain Crowdfunding",
  "How AI Advances Renewable Energy Integration in Web3",
  "The Importance of AI in Blockchain Interoperability",
  "How XAIBT Redefines Consumer Privacy in Decentralized Ecosystems",
  "The Future of AI in Web3 Identity Verification and Security",
  "How Decentralized AI Agents Revolutionize Supply Chain Management",
  "The Role of AI in Transparent and Fair Elections via Blockchain",
  "How AI-Driven DAOs Enable Autonomous Community Management",
  "The Benefits of XAIBT in Streamlining Decentralized Collaboration",
  "The Role of Intelligent Agents in Scaling Web3 Infrastructure",
  "How AI Empowers Creators in the Decentralized Creator Economy",
  "The Future of AI and Web3 in Real-World Asset Tokenization"
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
