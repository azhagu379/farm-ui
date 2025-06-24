
import { Home, Package, ShoppingCart, Users, Store, Settings, User, Sparkles, Gift,  Leaf, Star, TrendingUp, Compass, ShoppingBag, ShieldCheck,  UserCog } from 'lucide-react'; 

// Define the type for a navigation link (already updated, just confirming it's here)
export interface NavLink { 
  href: string; 
  label: string; 
  icon: React.ElementType; 
  roles: ('BUYER' | 'FARMER' | 'ADMIN' | 'PUBLIC')[];  
} 

// Define the type for navigation sections (no change)
export interface NavSection { 
  label?: string; // Optional label for the section 
  links: NavLink[]; 
} 

// The complete navigation configuration for the entire application 
export const navConfig: NavSection[] = [ 
  { 
    label: 'Discover', // New section label for public Browse
    links: [ 
      { 
        href: '/', 
        label: 'Home', 
        icon: Home, 
        roles: ['BUYER', 'FARMER', 'ADMIN', 'PUBLIC'], 
      }, 
      { 
        href: '/products', 
        label: 'All Products', // Renamed for clarity
        icon: Package, 
        roles: ['BUYER', 'FARMER', 'ADMIN', 'PUBLIC'], // Crucially marked as PUBLIC
      }, 
      { 
        href: '/categories', 
        label: 'Shop by Category', 
        icon: Compass, // Changed to Compass for exploration theme
        roles: ['BUYER', 'FARMER', 'ADMIN', 'PUBLIC'], 
      }, 
      { 
        href: '/products/new-arrivals', 
        label: 'New Arrivals', 
        icon: Sparkles, 
        roles: ['BUYER', 'FARMER', 'ADMIN', 'PUBLIC'], 
      }, 
      { 
        href: '/products/seasonal', // New Idea: Highlight seasonal items
        label: 'Seasonal Picks', 
        icon: Leaf, // A leaf icon fits the farming theme
        roles: ['BUYER', 'FARMER', 'ADMIN', 'PUBLIC'], 
      }, 
      { 
        href: '/deals', 
        label: 'Deals & Offers', 
        icon: Gift, 
        roles: ['BUYER', 'FARMER', 'ADMIN', 'PUBLIC'], 
      },
      { 
        href: '/products/bestsellers', // New Idea: Show popular products
        label: 'Best Sellers', 
        icon: TrendingUp, // Icon for trends/growth
        roles: ['BUYER', 'FARMER', 'ADMIN', 'PUBLIC'], 
      },
      { 
        href: '/farmers', 
        label: 'Our Farmers', 
        icon: Users, // Can also use 'Store' or 'LandPlot'
        roles: ['BUYER', 'FARMER', 'ADMIN', 'PUBLIC'], 
      }, 
    ], 
  }, 
  {
    label: 'Your Activity', // New section for authenticated user's personal links
    links: [
      { 
        href: '/orders', 
        label: 'My Orders', 
        icon: ShoppingBag, 
        roles: ['BUYER',], // Accessible to any authenticated user who has orders
      }, 
      {
        href: '/cart', // Direct link to cart page
        label: 'My Cart',
        icon: ShoppingCart, // Or 'ShoppingBag'
        roles: ['BUYER', 'FARMER'], // Anyone with a cart, once logged in
      },
      {
        href: '/wishlist', // New Idea: Personal wishlist
        label: 'My Wishlist',
        icon: Star, // Or 'Heart'
        roles: ['BUYER', 'FARMER',],
      },
    ]
  },
  { 
    label: 'Management', 
    links: [ 
      { 
        href: '/farmer/dashboard', 
        label: 'My Farm', 
        icon: Store, 
        roles: ['FARMER'], 
      }, 
       { 
        href: '/farmer/orders', 
        label: 'Orders', 
        icon: ShoppingBag, 
        roles: ['FARMER'], 
      }, 
      { 
        href: '/admin/dashboard', 
        label: 'Admin Panel', 
        icon: Users, 
        roles: ['ADMIN'], 
      }, 
      {
        href: '/admin/product-approvals',
        label: 'Product Approvals',
        icon: ShieldCheck, // A fitting icon for approvals
        roles: ['ADMIN'],
      },
        {
        href: '/admin/users',
        label: 'Users',
        icon: UserCog, // A fitting icon for approvals
        roles: ['ADMIN'],
      },
    ], 
  }, 
  { 
    label: 'Account', 
    links: [ 
      { 
        href: '/settings', 
        label: 'Settings', 
        icon: Settings, 
        roles: ['BUYER', 'FARMER', 'ADMIN'], 
      }, 
      { 
        href: '/profile', 
        label: 'Profile', 
        icon: User, 
        roles: ['BUYER', 'FARMER', 'ADMIN'], 
      }, 
    ] 
  },
  // {
  //   label: 'Help & Info', // New section for support and information
  //   links: [
  //     {
  //       href: '/how-it-works', // New Idea: Explain the platform's unique model
  //       label: 'How It Works',
  //       icon: HelpCircle, // Or 'Lightbulb'
  //       roles: ['BUYER', 'FARMER', 'ADMIN', 'PUBLIC'],
  //     },
  //     {
  //       href: '/about-us', // New Idea: Company info
  //       label: 'About Us',
  //       icon: Info, // Or 'Building'
  //       roles: ['BUYER', 'FARMER', 'ADMIN', 'PUBLIC'],
  //     },
  //     {
  //       href: '/contact', // New Idea: Contact page
  //       label: 'Contact Us',
  //       icon: Mail,
  //       roles: ['BUYER', 'FARMER', 'ADMIN', 'PUBLIC'],
  //     },
  //   ]
  // }
];