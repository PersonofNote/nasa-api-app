'use client';

import StarField from './StarField';
import { useTheme } from './useTheme';

export default function StarFieldGate() {
  const theme = useTheme();
  if (theme !== 'dark') return null;
  return <StarField />;
}
