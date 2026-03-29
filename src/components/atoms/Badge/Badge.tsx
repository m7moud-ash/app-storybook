import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { spacing, radius, typography } from '../../../tokens';
import { useBadgeColors } from '../../../tokens/theme';

// ─── Types ────────────────────────────────────────────────────────────────────

export type BadgeType =
  | 'Default'
  | 'Processing'
  | 'Announcement'
  | 'Success'
  | 'Warning'
  | 'Error'
  | 'Extra';

export interface BadgeProps {
  label:  string;
  type?:  BadgeType;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Badge({ label, type = 'Default' }: BadgeProps) {
  const colors = useBadgeColors();
  const tok    = colors[type];

  return (
    <View style={[styles.container, { backgroundColor: tok.background }]}>
      <View style={[styles.dot, { borderColor: tok.dot }]} />
      <Text style={[styles.label, { color: tok.text }]}>{label}</Text>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
// Exact values from Figma node 3501:42498:
//   padding: spacing.space-2 (8px) horizontal, spacing.space-1 (4px) vertical
//   gap:     spacing.space-1 (4px)
//   radius:  radius.rounded-sm (4px)  ← Figma uses rounded-xs = 4px
//   dot:     12px circle with colored border, no fill
//   font:    Inter Medium, 12px / 16px, tracking 0

const styles = StyleSheet.create({
  container: {
    flexDirection:   'row',
    alignItems:      'center',
    alignSelf:       'flex-start',
    gap:             spacing[1],   // 4px
    paddingHorizontal: spacing[2], // 8px
    paddingVertical:   spacing[1], // 4px
    borderRadius:    radius.sm,    // 4px
  },
  dot: {
    width:        12,
    height:       12,
    borderRadius: 6,
    borderWidth:  1,
    backgroundColor: 'transparent',
  },
  label: {
    fontFamily:    typography.fontFamily.en,
    fontWeight:    typography.fontWeight.medium,
    fontSize:      typography.fontSize.xs,      // 12px
    lineHeight:    typography.lineHeight.en[4],  // 16px
    letterSpacing: typography.letterSpacing.normal,
  },
});
