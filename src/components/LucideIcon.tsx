import {
  LucideProps,
  QrCode,
  ArrowRightLeft,
  X,
  Clipboard,
  MapPin,
  FireExtinguisher,
  Search,
  ChevronDown,
  Plus,
  RefreshCw,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowDown,
  LogOut,
} from 'lucide-react-native';

// ----------------------------------------------------------------------

const icons = {
  Add: Plus,
  ArrowRight: ArrowRight,
  ArrowDown: ArrowDown,
  LogOut: LogOut,
  Close: X,
  ChevronDown: ChevronDown,
  Eye: Eye,
  EyeOff: EyeOff,
  Form: Clipboard,
  QrCode: QrCode,
  Search: Search,
  Swap: ArrowRightLeft,
  Refresh: RefreshCw,
  Location: MapPin,
  Extinguisher: FireExtinguisher,
};

export type LucideIconName = keyof typeof icons;

// ----------------------------------------------------------------------

export function LucideIcon({
  icon,
  strokeWidth = 1.5,
  ...props
}: {
  icon: LucideIconName;
  strokeWidth?: number;
  color?: LucideProps['color'];
  width?: LucideProps['width'];
  height?: LucideProps['height'];
  style?: LucideProps['style'];
}) {
  const Icon = icons[icon];

  return <Icon {...props} strokeWidth={strokeWidth} />;
}
