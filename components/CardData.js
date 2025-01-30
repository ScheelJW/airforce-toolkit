// components/CardData.js

// Import required icons from MUI
import SecurityIcon from "@mui/icons-material/Security";
import PublicIcon from "@mui/icons-material/Public";
import EditIcon from "@mui/icons-material/Edit";
import ForumIcon from "@mui/icons-material/Forum";
import BookIcon from "@mui/icons-material/MenuBook";
import CreateIcon from "@mui/icons-material/Create";

// Define the card data as an array of objects with added `url` properties
const cardData = [
  {
    icon: <SecurityIcon className="text-blue-500 text-7xl mb-4" />, // JSX element
    title: "Safety & Standards Briefings",
    description: "Create tailored safety and standards briefings.",
    url: "/safety-standards-briefings", // URL for navigation
  },
  {
    icon: <EditIcon className="text-yellow-500 text-7xl mb-4" />, // JSX element
    title: "EPB/OPB Drafter",
    description: "Draft content and receive tailored suggestions.",
    url: "/epb-opb-drafter", // URL for navigation
  },
  {
    icon: <PublicIcon className="text-green-500 text-7xl mb-4" />, // JSX element
    title: "News & Updates",
    description: "Stay updated with the latest developments.",
    url: "/news-updates", // URL for navigation
  },
  {
    icon: <ForumIcon className="text-purple-500 text-7xl mb-4" />, // JSX element
    title: "Social Hub",
    description: "A community-driven space for Airmen and Guardians.",
    url: "/social-hub", // URL for navigation
  },
  {
    icon: <BookIcon className="text-yellow-400 text-7xl mb-4" />, // JSX element
    title: "Guides & How-Tos",
    description: "Explore guides and step-by-step how-tos.",
    url: "/guides-howtos", // URL for navigation
  },
  {
    icon: <CreateIcon className="text-pink-500 text-7xl mb-4" />, // JSX element
    title: "DAF Writing Tools",
    description: "Enhance your Air Force & Space Force writing tasks.",
    url: "/daf-writing-tools", // URL for navigation
  },
];

// Export the cardData array so it can be easily imported
export default cardData;