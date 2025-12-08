export const data = [
  {
    userId: 1,
    name: "Lalit",
    age: 28,
    roles: ["admin", "editor"],
    purchases: [
      {
        id: "p1",
        amount: 199,
        date: "2024-01-12",
        items: [
          { sku: "A1", qty: 2, category: "electronics", price: 50 },
          { sku: "B1", qty: 1, category: "books", price: 99 }
        ]
      },
      {
        id: "p2",
        amount: 349,
        date: "2024-02-10",
        items: [
          { sku: "A1", qty: 1, category: "electronics", price: 50 },
          { sku: "C1", qty: 3, category: "clothes", price: 99 }
        ]
      },
    ],
    address: {
      city: "Surat",
      pincodes: [395006, 395007],
      previous: [
        { city: "Bardoli", years: 2 },
        { city: "Navsari", years: 1 },
      ]
    },
    activityLog: [
      { type: "login", timestamp: 1707055000 },
      { type: "purchase", timestamp: 1707060000, ref: "p1" },
      { type: "logout", timestamp: 1707070000 },
    ]
  },
  {
    userId: 2,
    name: "Ravi",
    age: 23,
    roles: ["user"],
    purchases: [
      {
        id: "p3",
        amount: 89,
        date: "2024-01-15",
        items: [
          { sku: "B1", qty: 2, category: "books", price: 49 },
        ]
      }
    ],
    address: {
      city: "Mumbai",
      pincodes: [400001],
      previous: [{ city: "Pune", years: 3 }]
    },
    activityLog: [
      { type: "login", timestamp: 1707058000 },
      { type: "view", timestamp: 1707059000, page: "home" },
      { type: "logout", timestamp: 1707065000 },
    ]
  },
  {
    userId: 3,
    name: "Aman",
    age: 31,
    roles: ["editor", "user"],
    purchases: [],
    address: {
      city: "Delhi",
      pincodes: [110001, 110002],
      previous: []
    },
    activityLog: [
      { type: "login", timestamp: 1707051000 },
      { type: "view", timestamp: 1707052000, page: "dashboard" },
      { type: "purchase", timestamp: 1707053000, ref: "none" },
      { type: "logout", timestamp: 1707054000 },
    ]
  }
];
