import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { radius, spacing, typography } from '../../../tokens';
import { useMessageColors } from '../../../tokens/theme';

// ─── Types ────────────────────────────────────────────────────────────────────

export type MessageState = 'Error' | 'Normal' | 'Success' | 'Warning' | 'Loading';

export interface MessageProps {
  state?: MessageState;
  /** The message text displayed next to the icon. */
  text?: string;
}

// ─── SVG icons ────────────────────────────────────────────────────────────────
// Rendered via raw DOM element names (compatible with React Native Web / Vite).
// Using `React.createElement('svg', ...)` keeps RN types happy while still
// producing real SVG output in the browser.

const Svg   = (p: React.SVGProps<SVGSVGElement>)    => React.createElement('svg',    p);
const Circle= (p: React.SVGProps<SVGCircleElement>) => React.createElement('circle', p);
const Path  = (p: React.SVGProps<SVGPathElement>)   => React.createElement('path',   p);

function ErrorIcon({ fill }: { fill: string }) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" style={{ display: 'block' }}>
      <Circle cx={12} cy={12} r={10} fill={fill} />
      <Path d="M8.5 8.5l7 7M15.5 8.5l-7 7" stroke="white" strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

function NormalIcon({ fill }: { fill: string }) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" style={{ display: 'block' }}>
      <Circle cx={12} cy={12} r={10} fill={fill} />
      <Path d="M12 8v4" stroke="white" strokeWidth={2.2} strokeLinecap="round" />
      <Circle cx={12} cy={15.5} r={1.1} fill="white" />
    </Svg>
  );
}

function SuccessIcon({ fill }: { fill: string }) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" style={{ display: 'block' }}>
      <Circle cx={12} cy={12} r={10} fill={fill} />
      <Path d="M8 12.5l3 3 5-6.5" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function WarningIcon({ fill }: { fill: string }) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" style={{ display: 'block' }}>
      <Circle cx={12} cy={12} r={10} fill={fill} />
      <Path d="M12 8.5v3.5" stroke="white" strokeWidth={2.2} strokeLinecap="round" />
      <Circle cx={12} cy={15.5} r={1.1} fill="white" />
    </Svg>
  );
}

function LoadingIcon({ arc, track }: { arc: string; track: string }) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" style={{ display: 'block' }}>
      {/* full ring track */}
      <Circle cx={12} cy={12} r={9} fill="none" stroke={track} strokeWidth={2} />
      {/* quarter-arc accent — static; the parent Animated.View provides rotation */}
      <Path d="M12 3a9 9 0 0 1 9 9" fill="none" stroke={arc} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

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
    if (state === 'Loading') {
      const { icon, iconTrack } = tok as typeof colors['Loading'];
      return (
        <Animated.View style={{ transform: [{ rotate }] }}>
          <LoadingIcon arc={icon} track={iconTrack} />
        </Animated.View>
      );
    }
    const fill = tok.icon;
    switch (state) {
      case 'Error':   return <ErrorIcon   fill={fill} />;
      case 'Normal':  return <NormalIcon  fill={fill} />;
      case 'Success': return <SuccessIcon fill={fill} />;
      case 'Warning': return <WarningIcon fill={fill} />;
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
    alignSelf:        'flex-start',
    borderRadius:     radius.sm,       // 4px
    paddingHorizontal: spacing[4],     // 16px
    paddingVertical:   spacing[3],     // 12px
    // Shadow/lg — works in React Native Web via CSS shadow properties
    shadowColor:   '#121217',
    shadowOffset:  { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius:  6,
    elevation:     3,
  },
  row: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           spacing[2],   // 8px
  },
  icon: {
    width:  24,
    height: 24,
  },
  text: {
    fontFamily:    typography.fontFamily.en,
    fontWeight:    typography.fontWeight.regular,
    fontSize:      typography.fontSize.base,     // 16px
    lineHeight:    typography.lineHeight.en[6],  // 22px  (font/line-height/md)
    letterSpacing: typography.letterSpacing.normal,
  },
});
