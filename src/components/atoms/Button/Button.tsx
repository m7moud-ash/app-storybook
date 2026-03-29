import React from 'react';
import {
  Pressable,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  type PressableProps,
  type ViewStyle,
  type TextStyle,
} from 'react-native';

import { buttonSize, buttonRadius, typography } from '../../../tokens';
import { useButtonColors } from '../../../tokens/theme';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ButtonType       = 'Primary' | 'Secondary' | 'Tertiary' | 'Borderless';
export type ButtonSize       = keyof typeof buttonSize;
export type ButtonAppearance = 'Normal' | 'Danger' | 'Success' | 'Information' | 'Warning';

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  label:       string;
  type?:       ButtonType;
  size?:       ButtonSize;
  appearance?: ButtonAppearance;
  disabled?:   boolean;
  loading?:    boolean;
  fullWidth?:  boolean;
  leftIcon?:   React.ReactNode;
  rightIcon?:  React.ReactNode;
  onPress?:    () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Button({
  label,
  type       = 'Primary',
  size       = 'Default',
  appearance = 'Normal',
  disabled   = false,
  loading    = false,
  fullWidth  = false,
  leftIcon,
  rightIcon,
  onPress,
  ...rest
}: ButtonProps) {
  const colors     = useButtonColors();   // ← switches between light/dark automatically
  const tok        = buttonSize[size];
  const isDisabled = disabled || loading;

  const containerStyle = resolveContainer(type, appearance, tok, isDisabled, colors);
  const labelStyle     = resolveLabel(type, appearance, tok, isDisabled, colors);
  const spinnerColor   = resolveSpinnerColor(type, appearance, colors);

  return (
    <Pressable
      style={({ pressed }) => [
        containerStyle,
        fullWidth && styles.fullWidth,
        pressed && !isDisabled && styles.pressed,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={spinnerColor} />
      ) : (
        <>
          {leftIcon ? (
            <View style={{ width: tok.iconSize, height: tok.iconSize, marginRight: tok.gap }}>
              {leftIcon}
            </View>
          ) : null}
          <Text style={labelStyle}>{label}</Text>
          {rightIcon ? (
            <View style={{ width: tok.iconSize, height: tok.iconSize, marginLeft: tok.gap }}>
              {rightIcon}
            </View>
          ) : null}
        </>
      )}
    </Pressable>
  );
}

// ─── Style resolvers ──────────────────────────────────────────────────────────

type Colors = ReturnType<typeof useButtonColors>;

function resolveContainer(
  type:       ButtonType,
  appearance: ButtonAppearance,
  tok:        typeof buttonSize[ButtonSize],
  disabled:   boolean,
  colors:     Colors,
): ViewStyle {
  const base: ViewStyle = {
    height:            tok.height,
    paddingHorizontal: tok.paddingH,
    paddingVertical:   tok.paddingV,
    borderRadius:      buttonRadius,
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'center',
    alignSelf:         'flex-start',
  };

  switch (type) {
    case 'Primary': {
      const t = colors.primary[appearance];
      return { ...base, backgroundColor: disabled ? t.backgroundDisabled : t.background };
    }
    case 'Secondary': {
      const t = colors.secondary[appearance];
      return {
        ...base,
        backgroundColor: t.background,
        borderWidth: 1,
        borderColor: disabled ? t.borderDisabled : t.border,
      };
    }
    case 'Tertiary': {
      const t = colors.tertiary[appearance];
      return {
        ...base,
        backgroundColor: t.background,
        borderWidth: 1,
        borderColor: disabled ? t.borderDisabled : t.border,
      };
    }
    case 'Borderless':
      return { ...base, backgroundColor: 'transparent' };
  }
}

function resolveLabel(
  type:       ButtonType,
  appearance: ButtonAppearance,
  tok:        typeof buttonSize[ButtonSize],
  disabled:   boolean,
  colors:     Colors,
): TextStyle {
  const base: TextStyle = {
    fontFamily:    typography.fontFamily.en,
    fontWeight:    typography.fontWeight.semibold,
    fontSize:      tok.fontSize,
    lineHeight:    tok.lineHeight,
    letterSpacing: typography.letterSpacing.normal,
  };

  switch (type) {
    case 'Primary': {
      const t = colors.primary[appearance];
      return { ...base, color: disabled ? t.textDisabled : t.text };
    }
    case 'Secondary': {
      const t = colors.secondary[appearance];
      return { ...base, color: disabled ? t.textDisabled : t.text };
    }
    case 'Tertiary': {
      const t = colors.tertiary[appearance];
      return { ...base, color: disabled ? t.textDisabled : t.text };
    }
    case 'Borderless': {
      const t = colors.borderless[appearance];
      return { ...base, color: disabled ? t.textDisabled : t.text };
    }
  }
}

function resolveSpinnerColor(type: ButtonType, appearance: ButtonAppearance, colors: Colors): string {
  if (type === 'Primary')   return colors.primary[appearance].text;
  if (type === 'Secondary') return colors.secondary[appearance].text;
  if (type === 'Tertiary')  return colors.tertiary[appearance].text;
  return colors.borderless[appearance].text;
}

// ─── Shared styles ────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  pressed:   { opacity: 0.75 },
  fullWidth: { alignSelf: 'stretch' },
});
