import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { color } from '../index';
import { useSurface } from '../theme';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isLight(hex: string): boolean {
  const c = hex.replace('#', '').slice(0, 6);
  if (c.length < 6) return true;
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 155;
}

function Swatch({ name, value, dark = false }: { name: string; value: string; dark?: boolean }) {
  const textOnSwatch = isLight(value) ? '#121217' : '#ffffff';
  const mutedOnSwatch = isLight(value) ? '#55556d' : '#ffffffcc';
  return (
    <View style={[styles.swatch, { backgroundColor: value }, dark && styles.swatchDark]}>
      <Text style={[styles.swatchLabel, { color: textOnSwatch }]}>{name}</Text>
      <Text style={[styles.swatchHex, { color: mutedOnSwatch }]}>{value}</Text>
    </View>
  );
}

function SwatchRow({
  label,
  shades,
  dark = false,
}: {
  label: string;
  shades: Record<string | number, string>;
  dark?: boolean;
}) {
  const surface = useSurface();
  return (
    <View style={styles.group}>
      <Text style={[styles.groupLabel, { color: surface.textMuted }]}>{label}</Text>
      <View style={[styles.row, dark && { backgroundColor: '#1a1a1a', padding: 12, borderRadius: 8 }]}>
        {Object.entries(shades).map(([key, val]) => (
          <Swatch key={key} name={String(key)} value={val} dark={dark} />
        ))}
      </View>
    </View>
  );
}

// ─── Story component ──────────────────────────────────────────────────────────

function ColorPalette() {
  const surface = useSurface();
  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: surface.background }]}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.pageTitle, { color: surface.text }]}>Color Tokens</Text>
      <Text style={[styles.pageSubtitle, { color: surface.textMuted }]}>
        Primitive color scale · source: Primitives/p-Light.json
      </Text>

      <SwatchRow label="Gray" shades={color.gray} />
      <SwatchRow
        label="Blue  (brand = #0056d6)"
        shades={{ ...color.blue }}
      />
      <SwatchRow label="Red" shades={{ ...color.red, disabled: color.red.disabled }} />
      <SwatchRow label="Green" shades={color.green} />
      <SwatchRow label="Yellow" shades={color.yellow} />
      <SwatchRow label="Orange" shades={color.orange} />
      <SwatchRow label="Purple" shades={{ ...color.purple, disabled: color.purple.disabled }} />
      <SwatchRow label="Pink" shades={color.pink} />
      <SwatchRow label="White (opacity scale — dark surfaces)" shades={color.white} dark />

      <View style={styles.group}>
        <Text style={[styles.groupLabel, { color: surface.textMuted }]}>Surface</Text>
        <View style={styles.row}>
          {Object.entries(color.surface).map(([key, val]) => (
            <Swatch
              key={key}
              name={key}
              value={val === '#00000000' ? '#f0f0f0' : val}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Tokens/Colors',
  component: ColorPalette,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;
export const Palette: Story = {};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: { padding: 32, paddingBottom: 64 },
  pageTitle: { fontSize: 28, fontWeight: '700', marginBottom: 6 },
  pageSubtitle: { fontSize: 13, marginBottom: 40, fontFamily: 'monospace' },
  group: { marginBottom: 32 },
  groupLabel: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
  },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  swatch: {
    width: 88,
    height: 72,
    borderRadius: 6,
    padding: 8,
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  swatchDark: { borderColor: 'rgba(255,255,255,0.08)' },
  swatchLabel: { fontSize: 11, fontWeight: '600', marginBottom: 2 },
  swatchHex: { fontSize: 10, fontFamily: 'monospace' },
});
