import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// Figma layer "lucide/wifi-off" → WifiOff
import { WifiOff } from 'lucide-react-native';
import { radius, spacing, typography } from '../../../tokens';
import { useSurface } from '../../../tokens/theme';
import { Button } from '../../atoms/Button/Button';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface EmptyStateAction {
  label:   string;
  onPress: () => void;
}

export interface EmptyStateProps {
  /** Large illustration shown above the text block. Pass `null` to hide. */
  icon?:             React.ReactNode;
  /** Bold heading — e.g. "You're Offline" */
  title:             string;
  /** Optional supporting copy beneath the title. */
  description?:      string;
  /** Primary CTA — rendered as an outlined (Secondary) button. */
  primaryAction?:    EmptyStateAction;
  /** Secondary CTA — rendered as a borderless button. */
  secondaryAction?:  EmptyStateAction;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function EmptyState({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
}: EmptyStateProps) {
  const surface = useSurface();

  const iconNode = icon !== undefined
    ? icon
    : <WifiOff size={64} color={surface.text} strokeWidth={1.5} />;

  return (
    <View style={styles.container}>
      {/* Icon */}
      {iconNode !== null && (
        <View style={styles.iconWrapper}>{iconNode}</View>
      )}

      {/* Text block */}
      <View style={styles.textBlock}>
        <Text style={[styles.title, { color: surface.text }]}>{title}</Text>
        {description ? (
          <Text style={[styles.description, { color: surface.textSubtle }]}>
            {description}
          </Text>
        ) : null}
      </View>

      {/* Actions */}
      {(primaryAction || secondaryAction) && (
        <View style={styles.actions}>
          {primaryAction && (
            <Button
              label={primaryAction.label}
              onPress={primaryAction.onPress}
              type="Secondary"
              appearance="Normal"
              size="Default"
              fullWidth
            />
          )}
          {secondaryAction && (
            <Button
              label={secondaryAction.label}
              onPress={secondaryAction.onPress}
              type="Borderless"
              appearance="Normal"
              size="Default"
              fullWidth
            />
          )}
        </View>
      )}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
// Exact values from Figma node 53528:2367:
//   container:   width 390px, px-16, gap-12 (space-3), items-center
//   text block:  gap-8, text-center
//   title:       18px SemiBold / 28px (BodyXl/font-semibold)
//   description: 14px Regular / 20px (BodyM/font-normal), color text.subtle
//   actions:     gap-8, full width (358px → fill container minus 16px padding each side)

const styles = StyleSheet.create({
  container: {
    width:          390,
    alignItems:     'center',
    paddingHorizontal: spacing[4],   // 16px
    gap:            spacing[3],      // 12px
  },
  iconWrapper: {
    width:  64,
    height: 64,
  },
  textBlock: {
    alignSelf:  'stretch',
    alignItems: 'center',
    gap:        spacing[2],          // 8px
  },
  title: {
    fontFamily:    typography.fontFamily.en,
    fontWeight:    typography.fontWeight.semibold,
    fontSize:      typography.fontSize['2xl'],    // 18px
    lineHeight:    typography.lineHeight.en[9],   // 28px — font/line-height/leading-7
    letterSpacing: typography.letterSpacing.normal,
    textAlign:     'center',
  },
  description: {
    fontFamily:    typography.fontFamily.en,
    fontWeight:    typography.fontWeight.regular,
    fontSize:      typography.fontSize.sm,        // 14px
    lineHeight:    typography.lineHeight.en.md,   // 20px — font/line-height/leading-5
    letterSpacing: typography.letterSpacing.normal,
    textAlign:     'center',
  },
  actions: {
    alignSelf:  'stretch',
    gap:        spacing[2],          // 8px
  },
});
