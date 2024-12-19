import { log } from "@/src/utils/logger";

// Topics for our satirical articles
const topics = [
    "technology",
    "science",
    "politics",
    "business",
    "lifestyle",
    "environment",
    "health",
    "education",
    "social media",
    "entertainment",
    "sports",
    "food",
    "transportation",
    "workplace",
    "relationships",
    "artificial intelligence",
    "virtual reality",
    "quantum computing",
    "blockchain",
    "cybersecurity",
    "cloud computing",
    "robotics",
    "internet of things",
    "5G networks",
    "digital privacy",
    "space exploration",
    "genetic engineering",
    "neuroscience",
    "renewable energy",
    "nanotechnology",
    "climate science",
    "biotechnology",
    "quantum physics",
    "marine biology",
    "gaming",
    "fashion",
    "art",
    "music",
    "cinema",
    "literature",
    "social movements",
    "generational divides",
    "cultural trends",
    "internet culture",
    "memes",
    "viral phenomena",
    "startups",
    "cryptocurrencies",
    "gig economy",
    "e-commerce",
    "venture capital",
    "digital marketing",
    "remote work culture",
    "corporate culture",
    "financial technology",
    "sharing economy",
    "mindfulness",
    "fitness trends",
    "diet fads",
    "self-improvement",
    "productivity hacks",
    "work-life balance",
    "mental health",
    "alternative medicine",
    "sleep optimization",
    "digital detox",
    "smart cities",
    "urban planning",
    "sustainable living",
    "digital nomads",
    "micro-mobility",
    "co-living spaces",
    "urban farming",
    "zero-waste lifestyle",
    "minimalism",
    "international relations",
    "global trade",
    "diplomacy",
    "geopolitical tensions",
    "economic sanctions",
    "trade agreements",
    "international organizations",
    "global governance",
    "territorial disputes",
    "military alliances",
    "cyber warfare",
    "intelligence agencies",
    "peacekeeping operations",
    "international law",
    "global supply chains",
    "currency markets",
    "energy politics",
    "maritime security",
    "space sovereignty",
    "information warfare",
];

// Narrative angles for our stories
const angles = [
    "unexpected success",
    "comical failure",
    "absurd misunderstanding",
    "bizarre trend",
    "ridiculous solution",
    "overreaction",
    "unnecessary innovation",
    "pointless achievement",
    "ironic situation",
    "mundane event treated as extraordinary",
    "spectacular backfire",
    "unintended consequences",
    "dramatic revelation",
    "mysterious disappearance",
    "unlikely hero emerges",
    "surprising alliance",
    "accidental discovery",
    "paradoxical outcome",
    "karmic justice",
    "moral panic",
    "generational divide",
    "cultural misappropriation",
    "tech dystopia",
    "first world problems",
    "social media outrage",
    "cancel culture backfire",
    "virtue signaling gone wrong",
    "startup pivot disaster",
    "AI gone rogue",
    "blockchain solution to nothing",
    "unnecessary digitization",
    "app for everything",
    "tech bubble absurdity",
    "corporate buzzword overflow",
    "automation mishap",
    "self-improvement obsession",
    "productivity hack addiction",
    "mindfulness extremism",
    "wellness trend gone too far",
    "life-hack backfire",
    "optimization overdose",
    "digital age crisis",
    "social media dependency",
    "subscription fatigue",
    "smart device rebellion",
    "algorithm uprising",
    "zoom call chaos",
    "delivery app dependency",
    "streaming service overload",
    "diplomatic incident",
    "trade war escalation",
    "sanctions announcement",
    "treaty negotiation",
    "international summit",
    "currency crisis",
    "border dispute",
    "alliance formation",
    "intelligence leak",
    "cyber sovereignty declaration",
    "trade route disruption",
    "global resource dispute",
    "international space incident",
    "maritime zone conflict",
    "diplomatic protocol breach",
    "international arbitration",
    "economic bloc formation",
    "strategic partnership announcement",
    "global supply chain crisis",
    "international tribunal hearing",
    "cultural misunderstanding",
    "diplomatic faux pas",
    "international space race",
    "global currency launch",
    "sovereign data dispute",
    "artificial island crisis",
    "quantum encryption breach",
    "digital border incident",
    "autonomous zone declaration",
    "global meme conflict",
];

// Character types that might appear
const characters = [
    "local resident",
    "scientist",
    "CEO",
    "politician",
    "influencer",
    "expert",
    "self-proclaimed guru",
    "concerned parent",
    "startup founder",
    "committee",
    "AI",
    "pet",
    "inanimate object given sentience",
    "crypto millionaire",
    "tech evangelist",
    "digital nomad",
    "robot rights activist",
    "AI ethics consultant",
    "data scientist",
    "quantum computing skeptic",
    "blockchain prophet",
    "VR addict",
    "disgruntled employee",
    "middle manager",
    "corporate consultant",
    "venture capitalist",
    "gig economy worker",
    "digital marketer",
    "productivity coach",
    "workplace culture expert",
    "content creator",
    "social media manager",
    "life coach",
    "wellness influencer",
    "mindfulness consultant",
    "biohacker",
    "digital minimalist",
    "sustainability expert",
    "sentient chatbot",
    "smart fridge",
    "automated assistant",
    "virtual influencer",
    "meme account",
    "algorithm",
    "diplomatic corps",
    "trade negotiator",
    "international mediator",
    "sanctions committee",
    "cyber defense unit",
    "global logistics coordinator",
    "international observers",
    "treaty compliance officer",
    "maritime security expert",
    "intelligence analyst",
    "economic bloc spokesperson",
    "international arbitrator",
    "supply chain diplomat",
    "space sovereignty advocate",
    "cyber sovereignty council",
    "trade alliance representative",
    "global governance expert",
    "international crisis manager",
    "resource allocation committee",
    "strategic partnership liaison",
];

// Types of events or situations
const situations = [
    "groundbreaking study",
    "new app launch",
    "viral trend",
    "revolutionary product",
    "policy change",
    "public announcement",
    "discovery",
    "invention",
    "crisis",
    "celebration",
    "protest",
    "award ceremony",
    "press conference",
    "AI malfunction",
    "data breach",
    "platform outage",
    "algorithm update",
    "virtual reality incident",
    "cyber attack",
    "blockchain fork",
    "quantum breakthrough",
    "robot uprising",
    "startup pivot",
    "corporate merger",
    "IPO disaster",
    "workplace culture initiative",
    "remote work experiment",
    "digital transformation",
    "agile methodology crisis",
    "viral challenge",
    "social media exodus",
    "cancel culture incident",
    "meme war",
    "influencer controversy",
    "platform migration",
    "digital detox movement",
    "virtual flash mob",
    "subscription service revolt",
    "smart home rebellion",
    "digital identity crisis",
    "zoom meeting disaster",
    "delivery app apocalypse",
    "streaming war casualty",
    "AI consciousness awakening",
    "virtual reality leak",
    "quantum entanglement accident",
    "blockchain paradox",
    "metaverse property dispute",
    "NFT existential crisis",
    "diplomatic incident",
    "trade war escalation",
    "sanctions announcement",
    "treaty negotiation",
    "international summit",
    "currency crisis",
    "border dispute",
    "alliance formation",
    "intelligence leak",
    "cyber sovereignty declaration",
    "trade route disruption",
    "global resource dispute",
    "international space incident",
    "maritime zone conflict",
    "diplomatic protocol breach",
    "international arbitration",
    "economic bloc formation",
    "strategic partnership announcement",
    "global supply chain crisis",
    "international tribunal hearing",
    "cultural misunderstanding",
    "diplomatic faux pas",
    "international space race",
    "global currency launch",
    "sovereign data dispute",
    "artificial island crisis",
    "quantum encryption breach",
    "digital border incident",
    "autonomous zone declaration",
    "global meme conflict",
];

// Contemporary themes to reference
const contemporaryThemes = [
    "AI and automation",
    "social media addiction",
    "remote work",
    "cryptocurrency",
    "sustainability",
    "wellness trends",
    "digital privacy",
    "streaming services",
    "smart devices",
    "subscription economy",
    "metaverse",
    "viral challenges",
    "quantum supremacy",
    "web3 revolution",
    "AI consciousness",
    "digital immortality",
    "brain-computer interfaces",
    "autonomous vehicles",
    "space tourism",
    "synthetic biology",
    "cancel culture",
    "digital tribalism",
    "virtual relationships",
    "internet fame",
    "digital nomadism",
    "online authenticity",
    "virtual influence",
    "digital citizenship",
    "four-day workweek",
    "universal basic income",
    "hybrid workplaces",
    "productivity monitoring",
    "workplace surveillance",
    "automated management",
    "algorithmic hiring",
    "biohacking",
    "digital wellness",
    "mindfulness tech",
    "sleep optimization",
    "quantified self",
    "virtual therapy",
    "tech-life balance",
    "digital minimalism",
    "carbon footprint apps",
    "virtual power plants",
    "digital waste",
    "cloud computing emissions",
    "sustainable blockchain",
    "green AI",
    "eco-friendly NFTs",
    "global power dynamics",
    "digital sovereignty",
    "techno-nationalism",
    "cyber deterrence",
    "digital colonialism",
    "information warfare",
    "algorithmic governance",
    "digital silk road",
    "quantum diplomacy",
    "cyber peacekeeping",
    "digital trade routes",
    "virtual sovereignty",
    "data colonialism",
    "digital mercantilism",
    "cyber neutrality",
    "digital protectionism",
    "virtual territorialism",
    "algorithmic warfare",
    "digital hegemony",
];

// Additional prompt elements for more variety
const tones = [
    "deadpan serious",
    "increasingly absurd",
    "academically rigorous",
    "unnecessarily technical",
    "overly enthusiastic",
    "conspiracy theorist",
    "passive-aggressive",
    "extremely optimistic",
    "completely oblivious",
    "professionally skeptical",
    "diplomatically vague",
    "bureaucratically precise",
    "intentionally ambiguous",
    "strategically unclear",
    "officially unofficial",
    "cautiously optimistic",
    "deeply concerned",
    "mildly threatening",
    "passive-aggressively diplomatic",
    "formally informal",
    "aggressively cheerful",
    "chaotically organized",
    "sarcastically sincere",
    "apocalyptically calm",
    "existentially confused",
    "mathematically poetic",
    "philosophically practical",
    "scientifically whimsical",
    "legally ambiguous",
    "economically irrational",
    "politically neutral yet biased",
    "artificially authentic",
    "digitally organic",
    "quantum-level uncertain",
    "statistically emotional",
    "theoretically practical",
    "metaphysically concrete",
    "paradoxically consistent",
    "objectively biased",
    "precisely vague",
    "authentically synthetic",
    "virtually tangible",
    "chronically temporal",
    "sustainably apocalyptic",
    "mindfully mindless",
    "traditionally disruptive",
    "conservatively radical",
    "minimally excessive",
    "seriously playful",
    "methodically chaotic"
];

const locations = [
    "Silicon Valley startup hub",
    "remote mountain retreat",
    "underground bunker",
    "virtual reality meetup",
    "blockchain commune",
    "AI research facility",
    "digital detox camp",
    "smart city prototype",
    "metaverse embassy",
    "quantum computing lab",
    "international space station",
    "underwater data center",
    "arctic research base",
    "digital free trade zone",
    "autonomous smart city",
    "floating tech hub",
    "lunar mining colony",
    "orbital satellite network",
    "deep sea server farm",
    "quantum-secured facility",
    "digital diplomatic quarter",
    "virtual united nations",
    "cyber defense command",
    "global trade port",
    "artificial island datacenter",
    "Shenzhen tech market",
    "Tokyo robot district",
    "Dubai smart oasis",
    "Singapore vertical farm",
    "Moscow crypto vault",
    "London fintech hub",
    "Berlin hackspace colony",
    "Seoul gaming district",
    "Tel Aviv innovation zone",
    "Bangalore tech campus",
    "São Paulo drone port",
    "Cape Town space launch site",
    "Sydney quantum lab",
    "Toronto AI sanctuary",
    "Mumbai digital bazaar",
    "Amsterdam data harbor",
    "Geneva quantum embassy",
    "Rio digital carnival",
    "Cairo tech pyramid",
    "Stockholm eco-tech dome",
    "Hong Kong sky-net hub",
    "Vancouver bio-tech forest",
    "Dublin crypto castle",
    "Oslo quantum fjord",
    "Wellington digital reserve",
    "Reykjavik geothermal datacenter",
    "Antarctic research station",
    "Sahara solar farm",
    "Amazon tech preserve",
    "Himalayan cloud server",
    "Pacific floating city",
    "Mariana Trench data vault",
    "Mars colony beta",
    "Lunar dark side base",
    "Asteroid mining outpost",
    "Orbital hacker space",
    "Quantum realm portal",
    "Digital nomad caravan",
    "Underground crypto bunker",
    "Stratospheric data balloon",
    "Desert tech oasis",
    "Jungle server farm",
    "Mountain peak observatory",
    "Volcanic bitcoin mine",
    "Arctic seed vault",
    "Autonomous vehicle city",
    "Holographic concert hall",
    "Quantum meditation retreat",
    "AI monk monastery",
    "Cybernetic wildlife reserve",
    "Virtual reality theme park",
    "Augmented reality arena",
    "Blockchain art gallery",
    "Neural network nursery",
    "Digital detox monastery",
    "Quantum gaming arena",
    "Cyborg repair shop",
    "Robot retirement home",
    "AI ethics courthouse",
    "Meme research facility",
    "Digital archaeology site",
    "Quantum time capsule",
    "Holographic parliament",
    "Cyberpunk underground",
    "Cloud city platform",
    "Space elevator terminal",
    "Quantum entanglement lab",
    "Digital spirit shrine",
    "Tech shamans' grove",
    "Autonomous drone port",
    "Nanotech fabrication plant",
    "Quantum consciousness center",
    "Digital feng shui garden",
    "Cyber security fortress",
    "Holographic zoo",
    "AI poetry cafe",
    "Virtual reality dojo",
    "Digital wellness spa",
    "Quantum prophecy center",
    "Blockchain democracy hub",
    "Neural interface clinic",
    "Digital karma bank",
    "Quantum reality lab",
    "Martian zen garden",
    "Lunar comedy club",
    "Orbital meditation pod",
    "Suborbital dating venue",
    "Zero-gravity art studio",
    "Interplanetary meme archive",
    "Quantum cat sanctuary",
    "Digital philosophy plaza",
    "Holographic history museum",
    "Cybernetic forest reserve",
    "AI-powered monastery",
    "Virtual reality courthouse",
    "Blockchain-secured prison",
    "Digital democracy forum",
    "Quantum voting booth",
    "Metaverse marriage office",
    "Neural network nursery school",
    "Crypto-anarchist commune",
    "Tech-shamanic temple",
    "Post-apocalyptic startup incubator",
    "Time-traveling coworking space",
    "Interdimensional coffee shop",
    "Quantum superposition park",
    "Digital enlightenment center",
    "Cybernetic meditation cave",
    "Holographic nature reserve",
    "AI-generated art gallery",
    "Virtual reality asylum",
    "Blockchain-powered utopia",
    "Quantum psychology clinic",
    "Digital reincarnation center",
    "Cyber-spiritual retreat",
    "Meme archaeology site",
    "Neural network nature park",
    "Quantum bureaucracy office",
    "Digital democracy plaza",
    "Virtual reality court",
    "Blockchain ethics committee",
    "AI consciousness research lab",
    "Quantum philosophy department",
    "Digital anthropology museum",
    "Cyber-shamanic sanctuary",
    "Metaverse memorial garden",
    "Neural network therapy center",
    "Quantum sociology institute",
    "Digital mythology archive",
    "Virtual reality monastery",
    "Blockchain marriage registry",
    "AI ethics tribunal",
    "Quantum consciousness cafe",
    "Digital enlightenment pod",
    "Cyber-meditation dome",
    "Metaverse spirit realm",
    "Neural network dream lab",
    "Quantum reality counseling",
    "Digital karma processing",
    "Virtual mindfulness zone",
    "Blockchain soul storage",
    "AI empathy training center",
    "Quantum emotion simulator",
    "Digital wisdom library",
    "Cyber-consciousness clinic",
    "Metaverse meditation maze",
    "Neural network nirvana",
    "Quantum karma cleanser",
    "Digital dharma center",
    "Virtual virtue vault",
    "Blockchain blessing bank",
    "AI awakening arena",
    "Quantum questing ground"
];

function getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

// function capitalizeFirstLetter(string: string): string {
//     return string.charAt(0).toUpperCase() + string.slice(1);
// }

export function generatePrompt(): string {
    const topic = getRandomElement(topics);
    const angle = getRandomElement(angles);
    const character = getRandomElement(characters);
    const situation = getRandomElement(situations);
    const theme = getRandomElement(contemporaryThemes);
    const tone = getRandomElement(tones);
    const location = getRandomElement(locations);

    // Different prompt templates for variety
    const templates = [
        `Write a ${tone} news article about a ${character} who encounters a ${angle} while dealing with ${theme} at a ${location}.`,
        `Create a news story about a ${situation} that leads to an unexpected ${angle} in the world of ${topic}, as reported by a ${character}.`,
        `Report on a ${character}'s attempt to revolutionize ${topic} through a ${situation} at ${location}, resulting in a ${angle}.`,
        `Cover a breaking news story about how a ${situation} related to ${theme} has caused a ${angle} for a ${character} in ${location}.`,
        `Write about a ${character} who claims to have solved ${topic} through a ${angle} involving ${theme}, leading to a ${situation}.`,
        `Document the chaos that unfolds when a ${character} introduces a solution for ${topic} using ${theme}, leading to an unexpected ${angle}.`,
        `Investigate why a group of ${character}s at ${location} are experiencing a collective ${angle} related to ${theme}.`,
        `Report on the controversial decision by a ${character} to address ${topic} through an unconventional ${situation}.`,
    ];

    const basePrompt = getRandomElement(templates);

    const fullPrompt = `${basePrompt}

The article should be humorous and absurd while maintaining a ${tone} news-like tone.
Include quotes from relevant parties that highlight the absurdity of the situation.
Add specific details that make the story more believable despite its ridiculousness.
Format the response as JSON with the following structure:
{
  "title": "A catchy, clickbait-style headline that captures the absurdity",
  "summary": "A brief 1-2 sentence summary that hooks the reader",
  "content": "The full article content with proper paragraphing"
}`;

    log("debug", "Generated new prompt", {
        topic,
        angle,
        character,
        situation,
        theme,
        tone,
        location,
        template: basePrompt,
    });

    return fullPrompt;
}
