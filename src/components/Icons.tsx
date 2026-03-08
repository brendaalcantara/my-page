import { ReactNode } from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export function HouseIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 10L12 3L21 10V20C21 20.6 20.6 21 20 21H4C3.4 21 3 20.6 3 20V10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 21V14H15V21" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="1.5" fill="var(--color-neon-blue)" opacity="0.7" />
    </svg>
  );
}

export function GraduationCapIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3L1 9L12 15L23 9L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M5 11V17C5 17 8 20 12 20C16 20 19 17 19 17V11" stroke="var(--color-neon-blue)" strokeWidth="1.5" />
      <path d="M23 9V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function UniversityIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M2 20H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 20V10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 20V10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 20V10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20 20V10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1 10L12 4L23 10" stroke="var(--color-neon-purple)" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function GamepadIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 11H2C2 11 1 11 1 13V15C1 17 2 19 4 19C6 19 7 17 8 15L10 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 11H22C22 11 23 11 23 13V15C23 17 22 19 20 19C18 19 17 17 16 15L14 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="6" y="6" width="12" height="10" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9" cy="11" r="1" fill="var(--color-neon-blue)" />
      <circle cx="15" cy="11" r="1" fill="var(--color-neon-purple)" />
    </svg>
  );
}

export function TerminalIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="3" width="20" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 10L10 13L6 16" stroke="var(--color-neon-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 16H18" stroke="var(--color-neon-purple)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function RocketIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2C12 2 8 6 8 14L6 17H18L16 14C16 6 12 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 21L12 18L14 21" stroke="var(--color-neon-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="11" r="2" stroke="var(--color-neon-purple)" strokeWidth="1.2" />
    </svg>
  );
}

export function GearIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="var(--color-neon-blue)" strokeWidth="1.5" />
      <path d="M19.4 15C19.2 15.3 19.2 15.7 19.4 16L20.7 18.1C20.8 18.3 20.8 18.5 20.6 18.7L18.7 20.6C18.5 20.8 18.3 20.8 18.1 20.7L16 19.4C15.7 19.2 15.3 19.2 15 19.4L14.4 19.7C14.1 19.9 13.9 20.2 13.9 20.5L13.7 22.9C13.7 23.1 13.5 23.3 13.3 23.3H10.7C10.5 23.3 10.3 23.1 10.3 22.9L10.1 20.5C10.1 20.2 9.9 19.9 9.6 19.7L9 19.4C8.7 19.2 8.3 19.2 8 19.4L5.9 20.7C5.7 20.8 5.5 20.8 5.3 20.6L3.4 18.7C3.2 18.5 3.2 18.3 3.3 18.1L4.6 16C4.8 15.7 4.8 15.3 4.6 15L4.3 14.4C4.1 14.1 3.8 13.9 3.5 13.9L1.1 13.7C0.9 13.7 0.7 13.5 0.7 13.3V10.7C0.7 10.5 0.9 10.3 1.1 10.3L3.5 10.1C3.8 10.1 4.1 9.9 4.3 9.6L4.6 9C4.8 8.7 4.8 8.3 4.6 8L3.3 5.9C3.2 5.7 3.2 5.5 3.4 5.3L5.3 3.4C5.5 3.2 5.7 3.2 5.9 3.3L8 4.6C8.3 4.8 8.7 4.8 9 4.6L9.6 4.3C9.9 4.1 10.1 3.8 10.1 3.5L10.3 1.1C10.3 0.9 10.5 0.7 10.7 0.7H13.3C13.5 0.7 13.7 0.9 13.7 1.1L13.9 3.5C13.9 3.8 14.1 4.1 14.4 4.3L15 4.6C15.3 4.8 15.7 4.8 16 4.6L18.1 3.3C18.3 3.2 18.5 3.2 18.7 3.4L20.6 5.3C20.8 5.5 20.8 5.7 20.7 5.9L19.4 8C19.2 8.3 19.2 8.7 19.4 9L19.7 9.6C19.9 9.9 20.2 10.1 20.5 10.1L22.9 10.3C23.1 10.3 23.3 10.5 23.3 10.7V13.3C23.3 13.5 23.1 13.7 22.9 13.7L20.5 13.9C20.2 13.9 19.9 14.1 19.7 14.4L19.4 15Z" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function CartIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M1 1H5L7.68 14.39C7.77 14.87 8.19 15.21 8.68 15.21H19.4C19.86 15.21 20.26 14.89 20.38 14.44L22 7H5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="19" r="2" stroke="var(--color-neon-blue)" strokeWidth="1.5" />
      <circle cx="19" cy="19" r="2" stroke="var(--color-neon-purple)" strokeWidth="1.5" />
    </svg>
  );
}

export function PhoneIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="5" y="1" width="14" height="22" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 4H14" stroke="var(--color-neon-blue)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="19" r="1.2" stroke="currentColor" strokeWidth="1" />
      <path d="M9 10L11 12L15 8" stroke="var(--color-neon-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StarIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2L15 8.5L22 9.3L17 14L18.2 21L12 17.5L5.8 21L7 14L2 9.3L9 8.5L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 2L15 8.5L22 9.3L17 14L18.2 21L12 17.5L5.8 21L7 14L2 9.3L9 8.5L12 2Z" fill="var(--color-neon-blue)" opacity="0.15" />
    </svg>
  );
}

export function KeyboardIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="1" y="5" width="22" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="5" y="9" width="2" height="2" rx="0.5" fill="var(--color-neon-blue)" opacity="0.6" />
      <rect x="9" y="9" width="2" height="2" rx="0.5" fill="var(--color-neon-purple)" opacity="0.6" />
      <rect x="13" y="9" width="2" height="2" rx="0.5" fill="var(--color-neon-blue)" opacity="0.6" />
      <rect x="17" y="9" width="2" height="2" rx="0.5" fill="var(--color-neon-purple)" opacity="0.6" />
      <rect x="7" y="14" width="10" height="2" rx="0.5" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

export function BuildingIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="7" y="7" width="3" height="3" rx="0.5" stroke="var(--color-neon-blue)" strokeWidth="1" />
      <rect x="14" y="7" width="3" height="3" rx="0.5" stroke="var(--color-neon-blue)" strokeWidth="1" />
      <rect x="7" y="13" width="3" height="3" rx="0.5" stroke="var(--color-neon-purple)" strokeWidth="1" />
      <rect x="14" y="13" width="3" height="3" rx="0.5" stroke="var(--color-neon-purple)" strokeWidth="1" />
      <path d="M10 21V18H14V21" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function SearchCodeIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15 15L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 8L9 10L7 12" stroke="var(--color-neon-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 12H13" stroke="var(--color-neon-purple)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function UsersIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 20C2 16.7 4.7 14 8 14H10C13.3 14 16 16.7 16 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="17" cy="8" r="2.5" stroke="var(--color-neon-blue)" strokeWidth="1.2" />
      <path d="M19 14.5C20.7 15.3 22 17.1 22 19.2" stroke="var(--color-neon-blue)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function SignalIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="14" width="4" height="7" rx="1" fill="var(--color-neon-purple)" opacity="0.5" />
      <rect x="10" y="9" width="4" height="12" rx="1" fill="var(--color-neon-blue)" opacity="0.7" />
      <rect x="17" y="4" width="4" height="17" rx="1" fill="var(--color-neon-blue)" />
      <circle cx="12" cy="4" r="2" fill="var(--color-neon-purple)" />
    </svg>
  );
}

export function MountainIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 4L20 20H4L12 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 4L20 20H4L12 4Z" fill="var(--color-neon-blue)" opacity="0.1" />
      <path d="M7 20L10 14L13 17L16 12" stroke="var(--color-neon-purple)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChatIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M21 12C21 16.4 16.97 20 12 20C10.46 20 9 19.64 7.73 19L3 20L4.3 16.1C3.47 14.87 3 13.48 3 12C3 7.58 7.03 4 12 4C16.97 4 21 7.58 21 12Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 11H8.01" stroke="var(--color-neon-blue)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M12 11H12.01" stroke="var(--color-neon-purple)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M16 11H16.01" stroke="var(--color-neon-blue)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function HandshakeIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M2 11L7 7L10 9L14 6L17 8L22 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 7V18" stroke="var(--color-neon-blue)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 8V19" stroke="var(--color-neon-purple)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 12L14 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 15L14 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function GlobeSmallIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path d="M3 12H21" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <path d="M4.5 7.5H19.5" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
      <path d="M4.5 16.5H19.5" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
      <circle cx="16" cy="8" r="1.5" fill="var(--color-neon-blue)" opacity="0.5" />
      <circle cx="8" cy="15" r="1.5" fill="var(--color-neon-purple)" opacity="0.5" />
    </svg>
  );
}

export function BookOpenIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 6C12 6 10 3 5 4V20C10 19 12 22 12 22C12 22 14 19 19 20V4C14 3 12 6 12 6Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 6V22" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      <path d="M7 8H9" stroke="var(--color-neon-blue)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 11H9.5" stroke="var(--color-neon-blue)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 8H17" stroke="var(--color-neon-purple)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 11H16.5" stroke="var(--color-neon-purple)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function TargetIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="5" stroke="var(--color-neon-blue)" strokeWidth="1.2" opacity="0.6" />
      <circle cx="12" cy="12" r="1.5" fill="var(--color-neon-purple)" />
      <path d="M12 3V6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M12 18V21" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M3 12H6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M18 12H21" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function LightningIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M13 2L4 14H12L11 22L20 10H12L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M13 2L4 14H12L11 22L20 10H12L13 2Z" fill="var(--color-neon-blue)" opacity="0.15" />
    </svg>
  );
}

export function FlagBRIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2" fill="#009739" />
      <path d="M12 5.5L21 12L12 18.5L3 12L12 5.5Z" fill="#FEDD00" />
      <circle cx="12" cy="12" r="3.5" fill="#012169" />
      <path d="M9 11.5H15" stroke="white" strokeWidth="0.5" />
    </svg>
  );
}

export function FlagESIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2" fill="#AA151B" />
      <rect x="2" y="8" width="20" height="8" fill="#F1BF00" />
    </svg>
  );
}

export function FlagGBIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2" fill="#012169" />
      <path d="M2 4L22 20M22 4L2 20" stroke="white" strokeWidth="2" />
      <path d="M2 4L22 20M22 4L2 20" stroke="#C8102E" strokeWidth="1" />
      <path d="M12 4V20M2 12H22" stroke="white" strokeWidth="3.5" />
      <path d="M12 4V20M2 12H22" stroke="#C8102E" strokeWidth="2" />
    </svg>
  );
}

export function HeartPulseIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 21C12 21 3 14 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 12 5C12.09 3.81 13.76 3 15.5 3C18.58 3 21 5.42 21 8.5C21 14 12 21 12 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4 12H8L10 9L12 15L14 11L16 12H20" stroke="var(--color-neon-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const levelIconComponents: ReactNode[] = [
  <HouseIcon key="l0" size={22} />,
  <GraduationCapIcon key="l1" size={22} />,
  <UniversityIcon key="l2" size={22} />,
  <GamepadIcon key="l3" size={22} />,
  <TerminalIcon key="l4" size={22} />,
  <RocketIcon key="l5" size={22} />,
  <GearIcon key="l6" size={22} />,
  <CartIcon key="l7" size={22} />,
  <PhoneIcon key="l8" size={22} />,
  <StarIcon key="l9" size={22} />,
];

export function GitPRIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="6" cy="6" r="3" stroke="var(--color-neon-blue)" strokeWidth="1.5" />
      <circle cx="18" cy="18" r="3" stroke="var(--color-neon-purple)" strokeWidth="1.5" />
      <circle cx="18" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 9V18" stroke="var(--color-neon-blue)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 6H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 9V15" stroke="var(--color-neon-purple)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function RepoIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 19.5C4 18.12 5.12 17 6.5 17H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 2H20V22H6.5C5.12 22 4 20.88 4 19.5V4.5C4 3.12 5.12 2 6.5 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 7H15" stroke="var(--color-neon-blue)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 11H13" stroke="var(--color-neon-purple)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export const statsIconComponents: ReactNode[] = [
  <KeyboardIcon key="s0" size={28} />,
  <BuildingIcon key="s1" size={28} />,
  <GitPRIcon key="s2" size={28} />,
  <SearchCodeIcon key="s3" size={28} />,
  <RepoIcon key="s4" size={28} />,
  <UsersIcon key="s5" size={28} />,
  <SignalIcon key="s6" size={28} />,
];

export const softSkillIconComponents: ReactNode[] = [
  <MountainIcon key="sk0" size={22} />,
  <ChatIcon key="sk1" size={22} />,
  <HandshakeIcon key="sk2" size={22} />,
  <GlobeSmallIcon key="sk3" size={22} />,
  <BookOpenIcon key="sk4" size={22} />,
  <TargetIcon key="sk5" size={22} />,
  <LightningIcon key="sk6" size={22} />,
];
