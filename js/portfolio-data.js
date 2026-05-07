const portfolioData = [
  {
    id: 1,
    type: "image",
    category: "web",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
      "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=1200&q=80",
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=80"
    ],
    title: "Web Design Project",
    date: "2024",
    description: "A comprehensive web design project showcasing modern UI/UX principles.",
    links: [
      { label: "View Live", url: "#" },
      { label: "Case Study", url: "#" }
    ]
  },
  {
    id: 2,
    type: "video",
    category: "video",
    thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    images: [
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1200&q=80"
    ],
    title: "Motion Design Reel",
    date: "2024",
    description: "A collection of motion graphics and animation work.",
    links: [
      { label: "Full Video", url: "#" }
    ]
  },
  {
    id: 3,
    type: "image",
    category: "still",
    thumbnail: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=1200&q=80",
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&q=80"
    ],
    title: "Photography Series",
    date: "2023",
    description: "Architectural photography exploring urban landscapes.",
    links: []
  },
  {
    id: 4,
    type: "image",
    category: "web",
    thumbnail: "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=1200&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
    ],
    title: "Dashboard Interface",
    date: "2024",
    description: "Data visualization dashboard for enterprise clients.",
    links: [
      { label: "Prototype", url: "#" }
    ]
  },
  {
    id: 5,
    type: "image",
    category: "still",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80"
    ],
    title: "Product Photography",
    date: "2023",
    description: "Commercial product photography for various brands.",
    links: []
  },
  {
    id: 6,
    type: "video",
    category: "video",
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    images: [
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=80"
    ],
    title: "Brand Documentary",
    date: "2024",
    description: "Documentary-style brand film production.",
    links: []
  },
  {
    id: 7,
    type: "image",
    category: "web",
    thumbnail: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&q=80",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80"
    ],
    title: "Mobile App Design",
    date: "2024",
    description: "iOS and Android app interface design.",
    links: [
      { label: "App Store", url: "#" }
    ]
  },
  {
    id: 8,
    type: "image",
    category: "still",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"
    ],
    title: "Landscape Series",
    date: "2023",
    description: "Nature and landscape photography collection.",
    links: []
  },
  {
    id: 9,
    type: "video",
    category: "video",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    images: [
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80"
    ],
    title: "Event Coverage",
    date: "2023",
    description: "Live event videography and production.",
    links: []
  },
  {
    id: 10,
    type: "image",
    category: "web",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80"
    ],
    title: "E-commerce Platform",
    date: "2024",
    description: "Full e-commerce website design and development.",
    links: []
  },
  {
    id: 11,
    type: "image",
    category: "still",
    thumbnail: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1200&q=80"
    ],
    title: "Architecture Study",
    date: "2022",
    description: "Architectural documentation and artistic interpretation.",
    links: []
  },
  {
    id: 12,
    type: "image",
    category: "still",
    thumbnail: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1200&q=80"
    ],
    title: "Nature Photography",
    date: "2023",
    description: "Capturing the beauty of natural environments.",
    links: []
  },
  {
    id: 13,
    type: "image",
    category: "web",
    thumbnail: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80"
    ],
    title: "Creative Agency Site",
    date: "2024",
    description: "Website design for a creative agency.",
    links: []
  },
  {
    id: 14,
    type: "video",
    category: "video",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    images: [
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&q=80"
    ],
    title: "Commercial Spot",
    date: "2024",
    description: "Television commercial production.",
    links: []
  },
  {
    id: 15,
    type: "image",
    category: "still",
    thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80"
    ],
    title: "Fog Mountains",
    date: "2022",
    description: "Atmospheric mountain photography.",
    links: []
  },
  {
    id: 16,
    type: "image",
    category: "web",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80"
    ],
    title: "Developer Portfolio",
    date: "2024",
    description: "Portfolio website for software developers.",
    links: []
  },
  {
    id: 17,
    type: "image",
    category: "still",
    thumbnail: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=80"
    ],
    title: "Coastal Views",
    date: "2023",
    description: "Seascape and coastal photography.",
    links: []
  },
  {
    id: 18,
    type: "image",
    category: "web",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&q=80"
    ],
    title: "SaaS Landing Page",
    date: "2024",
    description: "Landing page design for software products.",
    links: []
  }
];

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = portfolioData;
}
