export interface Tab {
  id: string;
  icon: string;
  label: string;
  disabled?: boolean;  // Make it optional with '?'
  badgeCount?: number; // Optional badge count
}