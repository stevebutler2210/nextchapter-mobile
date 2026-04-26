import Svg, { Path, Circle } from 'react-native-svg';

export function ClubsIcon({ size = 22, color }: { size?: number; color?: string } = {}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <Path d="M4 19.5A2.5 2.5 0 004 22h16V17H6.5A2.5 2.5 0 004 19.5z" />
      <Path d="M4 19.5V4a2 2 0 012-2h14v13" />
    </Svg>
  );
}

export function ScanIcon({ size = 22, color }: { size?: number; color?: string } = {}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M3 8V5a2 2 0 012-2h3" />
      <Path d="M16 3h3a2 2 0 012 2v3" />
      <Path d="M21 16v3a2 2 0 01-2 2h-3" />
      <Path d="M8 21H5a2 2 0 01-2-2v-3" />
      <Path d="M8 8L8 16" />
      <Path d="M10.5 8L10.5 16" />
      <Path d="M13 8L13 16" />
      <Path d="M16 8L16 16" />
    </Svg>
  );
}

export function ProfileIcon({ size = 22, color }: { size?: number; color?: string } = {}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <Circle cx={12} cy={7} r={4} />
    </Svg>
  );
}
