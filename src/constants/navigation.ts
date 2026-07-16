import type { NavItem, SocialLink } from '@/types/navigation'

export const NAV_ITEMS: NavItem[] = [
  { label: 'Jogos', href: '/games' },
  { label: 'Categorias', href: '/categories' },
  { label: 'Sobre', href: '/about' },
]

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Twitter', href: '#', icon: 'twitter' },
  { label: 'Discord', href: '#', icon: 'discord' },
  { label: 'GitHub', href: '#', icon: 'github' },
]
