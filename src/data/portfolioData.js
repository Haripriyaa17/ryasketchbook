// Portfolio Content Data
// Replace all placeholders with your actual content

export const portfolioData = {
  // Header / Hero Section
  hero: {
    videoUrl: "/images/videos/intro.mp4", // Add your hero video here
    videoPlaceholder: "/images/hero-placeholder.jpg",
  },

  // About Section
  about: {
    title: "about me.",
    videoUrl: "/images/videos/about.mp4", // Auto-playing video
    videoPoster: "/images/about-poster.jpg",
  },

  // Crochet Products
  crochet: {
    title: "🧶 crocheted",
    description: "by ryasketchbook",
    products: [
      {
        id: 1,
        name: "Apple Keychain",
        price: 100,
        image: "public/images/crochet/apple.jpeg",
      },
      {
        id: 2,
        name: "Bow Keychain",
        price: 80,
        image: "public/images/crochet/bow.jpeg",
      },
      {
        id: 3,
        name: "Miffy Keychain",
        price: 300,
        image: "public/images/crochet/bunny.jpeg",
      },
      {
        id: 4,
        name: "Butterfly Keychain",
        price: 130,
        image: "public/images/crochet/butterfly.jpeg",
      },
      {
        id: 5,
        name: "Cinnamorol Keychain",
        price: 100,
        image: "public/images/crochet/cinnamorol.jpeg",
      },
      {
        id: 6,
        name: "Evil Eye Keychain",
        price: 150,
        image: "public/images/crochet/evil-eye.jpeg",
      },
      {
        id: 7,
        name: "Flower Coaster",
        price: 150,
        image: "public/images/crochet/flower-coaster.jpeg",
      },
      {
        id: 8,
        name: "Jam Biscuit Keychain",
        price: 150,
        image: "public/images/crochet/jimjam.jpeg",
      },
      {
        id: 9,
        name: "Lemon Keychain",
        price: 150,
        image: "public/images/crochet/lemon.jpeg",
      },
      {
        id: 10,
        name: "Wallet",
        price: 300,
        image: "public/images/crochet/purse-pink.jpeg",
      },
    ],
  },

  // All Crochet Products (for separate store page)
  crochetStore: [
    // Add all your crochet products here
    // Same structure as above, but with more items
  ],

  // Video Editing Portfolio
  videos: {
    title: "🎬 video editing",
    background: "#151361", // Navy blue primary color
    items: [
      {
        id: 1,
        instagramUrl:
          "https://www.instagram.com/reel/DTpEDQ4Eret/?utm_source=ig_web_copy_link",
        coverImage: "public/images/videos/_ (1).jpeg",
      },
      {
        id: 2,
        instagramUrl:
          "https://www.instagram.com/reel/DQzGe4cEgI-/?utm_source=ig_web_copy_link",
        coverImage: "public/images/videos/_ (2).jpeg",
      },
      {
        id: 3,
        instagramUrl:
          "https://www.instagram.com/reel/DQhJn76EpcD/?utm_source=ig_web_copy_link",
        coverImage: "public/images/videos/_ (3).jpeg",
      },
      {
        id: 4,
        instagramUrl:
          "https://www.instagram.com/reel/DQov4itEvOp/?utm_source=ig_web_copy_link",
        coverImage: "public/images/videos/_.jpeg",
      },
      {
        id: 5,
        instagramUrl:
          "https://www.instagram.com/reel/DS73lspEpok/?utm_source=ig_web_copy_link",
        coverImage: "public/images/videos/Hibiscus Flower Widget.jpeg",
      },
      {
        id: 6,
        instagramUrl:
          "https://www.instagram.com/reel/DS2gyDUEukQ/?utm_source=ig_web_copy_link",
        coverImage: "public/images/videos/pretty kityy🌷🎀.jpeg",
      },
    ],
  },

  // Portrait/Art Gallery
  portraits: {
    title: "🎨 digital templates",
    description:
      "Notion templates designed for creators, freelancers, and small teams.",
    badges: ["⚡ Instant Delivery", "🕐 Lifetime Access", "🔒 Secure Payment"],
    items: [
      {
        id: 1,
        image: "public/images/portraits/6.jpeg",
      },
      {
        id: 2,
        image: "public/images/portraits/5.jpeg",
      },
      {
        id: 3,
        image: "public/images/portraits/4.jpeg",
      },
      {
        id: 4,
        image: "public/images/portraits/3.jpeg",
      },
      {
        id: 5,
        image: "public/images/portraits/2.jpeg",
      },
      {
        id: 6,
        image: "public/images/portraits/1.jpeg",
      },
    ],
  },

  // Contact Information
  contact: {
    general: "ryasketchbook@gmail.com",
    business: {
      tradeName: "ryasketchbook",
      category: "Handmade Artisan Crafts",
      address: "Bengaluru, Karnataka - 560061, India",
    },
    social: {
      instagram: "@ryasketchbook",
      email: "ryasketchbook@gmail.com",
    },
    responseTime:
      "We respond to emails within 24-48 hours during business days.",
    location: "Bengaluru, India",
  },
};

// Navigation menu items
export const navigationItems = [
  { name: "explore", items: ["about me", "youtube", "templates", "collab"] },
  {
    name: "legal",
    items: [
      "about us",
      "privacy policy",
      "terms & conditions",
      "shipping & delivery",
    ],
  },
  {
    name: "support",
    items: ["refund policy", "cancellation policy", "contact us"],
  },
  { name: "get in touch", items: [] },
];
