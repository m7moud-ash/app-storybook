import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
// Figma layer → Lucide icon mapping (confirmed from updated Figma with Lucide icons):
//   "lucide/circle-x"       → CircleX      (Error)
//   "lucide/circle-alert"   → CircleAlert  (Warning)
//   "lucide/circle-check"   → CircleCheck  (Success)
//   "lucide/info"           → Info         (Normal — informational)
//   "lucide/loader-2"       → Loader2      (Loading)
import { CircleX, CircleAlert, Info, CircleCheck, Loader2 } from 'lucide-react';
import { radius, spacing, typography } from '../../../tokens';
import { useMessageColors } from '../../../tokens/theme';

// ─── Types ────────────────────────────────────────────────────────────────────

export type MessageState = 'Error' | 'Normal' | 'Success' | 'Warning' | 'Loading';

export interface MessageProps {
  state?: MessageState;
  /** The message text displayed next to the icon. */
  text?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

const ICON_SIZE = 24;

export function Message({ state = 'Error', text }: MessageProps) {
  const colors = useMessageColors();
  const tok    = colors[state];

  const defaultText: Record<MessageState, string> = {
    Error:   'Error message',
    Normal:  'Normal message',
    Success: 'Success message',
    Warning: 'Warning message',
    Loading: 'Loading message',
  };

  // Continuous rotation for the loading spinner
  const spinAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (state !== 'Loading') { spinAnim.setValue(0); return; }
    const loop = Animated.loop(
      Animated.timing(spinAnim, {
        toValue:         1,
        duration:        900,
        easing:          Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [state, spinAnim]);

  const rotate = spinAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  const renderIcon = () => {
    const { icon } = tok;
    switch (state) {
      case 'Error':
        return <CircleX     size={ICON_SIZE} color={icon} strokeWidth={2} />;
      case 'Normal':
        return <Info        size={ICON_SIZE} color={icon} strokeWidth={2} />;
      case 'Success':
        return <CircleCheck size={ICON_SIZE} color={icon} strokeWidth={2} />;
      case 'Warning':
        return <CircleAlert size={ICON_SIZE} color={icon} strokeWidth={2} />;
      case 'Loading':
        return (
          <Animated.View style={{ transform: [{ rotate }] }}>
            <Loader2 size={ICON_SIZE} color={icon} strokeWidth={2} />
          </Animated.View>
        );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: tok.background }]}>
      <View style={styles.row}>
        <View style={styles.icon}>{renderIcon()}</View>
        <Text style={[styles.text, { color: tok.text }]}>{text ?? defaultText[state]}</Text>
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
// Exact values from Figma node 170:4001:
//   padding:    16px horizontal, 12px vertical
//   gap:        8px between icon and text
//   radius:     4px (radius.sm)
//   shadow/lg:  0 4px 6px rgba(18,18,23,0.05), 0 0 15px rgba(18,18,23,0.08)
//   text:       Inter Regular 16/22

const styles = StyleSheet.create({
  container: {
    alignSelf:         'flex-start',
    borderRadius:      radius.sm,       // 4px
    paddingHorizontal: spacing[4],      // 16px
    paddingVertical:   spacing[3],      // 12px
    shadowColor:       '#121217',
    shadowOffset:      { width: 0, height: 4 },
    shadowOpacity:     0.05,
    shadowRadius:      6,
    elevation:         3,
  },
  row: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           spacing[2],   // 8px
  },
  icon: {
    width:  ICON_SIZE,
    height: ICON_SIZE,
  },
  text: {
    fontFamily:    typography.fontFamily.en,
    fontWeight:    typography.fontWeight.regular,
    fontSize:      typography.fontSize.base,     // 16px
    lineHeight:    typography.lineHeight.en[6],  // 22px
    letterSpacing: typography.letterSpacing.normal,
  },
});
