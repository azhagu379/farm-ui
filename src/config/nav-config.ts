import { Home, Package, ShoppingCart, Users, Store, Settings, User } from 'lucide-react';

// Define the type for a navigation link
export interface NavLink {
  href: string;
  label: string;
  icon: React.ElementType;
  roles: ('BUYER' | 'FARMER' | 'ADMIN')[]; // Roles that can see this link
}

// Define the type for navigation sections
export interface NavSection {
  label?: string; // Optional label for the section
  links: NavLink[];
}

// The complete navigation configuration for the entire application
export const navConfig: NavSection[] = [
  {
    links: [
      {
        href: '/',
        label: 'Dashboard',
        icon: Home,
        roles: ['BUYER', 'FARMER', 'ADMIN'],
      },
      {
        href: '/products',
        label: 'Browse Products',
        icon: Package,
        roles: ['BUYER', 'FARMER', 'ADMIN'],
      },
      {
        href: '/orders',
        label: 'My Orders',
        icon: ShoppingCart,
        roles: ['BUYER', 'FARMER'],
      },
    ],
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
        href: '/admin/dashboard',
        label: 'Admin Panel',
        icon: Users,
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
  }
];
