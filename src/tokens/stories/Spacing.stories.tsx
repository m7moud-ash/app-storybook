import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { spacing, radius, color, buttonSize } from '../index';
import { useSurface } from '../theme';

function SpacingPage() {
  const surface = useSurface();
  const spacingEntries = Object.entries(spacing) as [string, number][];
  const radiusEntries  = Object.entries(radius)  as [string, number][];

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: surface.background }]}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.pageTitle, { color: surface.text }]}>Spacing & Radius</Text>
      <Text style={[styles.pageSubtitle, { color: surface.textMuted }]}>
        global.json · spacing.space-* · radius.*
      </Text>

      {/* Spacing */}
      <Text style={[styles.sectionTitle, { color: surface.text }]}>Spacing Scale</Text>
      <Text style={[styles.sectionSub, { color: surface.textMuted }]}>Base unit: 4px</Text>
      <View style={[styles.card, { borderColor: surface.divider }]}>
        {spacingEntries.map(([key, val], i) => (
          <View key={key} style={[styles.row, i > 0 && { borderTopWidth: 1, borderTopColor: surface.divider }]}>
            <View style={styles.labelCol}>
              <Text style={styles.token}>space-{key}</Text>
              <Text style={[styles.value, { color: surface.text }]}>{val}px</Text>
            </View>
            <View style={styles.barTrack}>
              <View style={[styles.bar, { width: Math.min(val, 280), backgroundColor: color.blue.brand }]} />
            </View>
            <Text style={[styles.barNum, { color: surface.textMuted }]}>{val}</Text>
          </View>
        ))}
      </View>

      {/* Radius */}
      <Text style={[styles.sectionTitle, { color: surface.text, marginTop: 32 }]}>Border Radius</Text>
      <Text style={[styles.sectionSub, { color: surface.textMuted }]}>radius.* — from sharp (2px) to full pill (360px)</Text>
      <View style={styles.radiusGrid}>
        {radiusEntries.map(([key, val]) => (
          <View key={key} style={[styles.radiusCard, { borderColor: surface.divider, backgroundColor: surface.background }]}>
            <View style={[styles.radiusSwatch, {
              borderRadius: Math.min(val, 48),
              backgroundColor: color.blue[50],
              borderColor: color.blue.brand,
            }]} />
            <Text style={styles.token}>radius.{key}</Text>
            <Text style={[styles.value, { color: surface.text }]}>{val}px</Text>
          </View>
        ))}
      </View>

      {/* Button size reference */}
      <Text style={[styles.sectionTitle, { color: surface.text, marginTop: 32 }]}>Button Size Reference</Text>
      <Text style={[styles.sectionSub, { color: surface.textMuted }]}>How spacing tokens compose into button sizes</Text>
      <View style={[styles.card, { borderColor: surface.divider }]}>
        {(
          [
            { name: 'Large',   tokens: 'h:space-12 · px:space-6 · py:space-3' },
            { name: 'Default', tokens: 'h:space-10 · px:space-5 · py:space-2' },
            { name: 'Small',   tokens: 'h:space-8 · px:space-4 · py:space-2'  },
          ] as const
        ).map((s, i) => {
          const tok = buttonSize[s.name];
          return (
            <View key={s.name} style={[styles.btnRow, i > 0 && { borderTopWidth: 1, borderTopColor: surface.divider }]}>
              <View style={styles.labelCol}>
                <Text style={styles.token}>{s.name}</Text>
                <Text style={[styles.sectionSub, { color: surface.textMuted }]}>{s.tokens}</Text>
              </View>
              <View style={{
                height: tok.height,
                paddingHorizontal: tok.paddingH,
                paddingVertical: tok.paddingV,
                backgroundColor: color.blue.brand,
                borderRadius: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{ color: '#fff', fontSize: tok.fontSize, fontWeight: '600', fontFamily: 'Inter' }}>
                  Button
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const meta: Meta = {
  title: 'Tokens/Spacing & Radius',
  component: SpacingPage,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;
export const Scale: Story = {};

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: { padding: 32, paddingBottom: 64 },
  pageTitle: { fontSize: 28, fontWeight: '700', marginBottom: 6 },
  pageSubtitle: { fontSize: 13, marginBottom: 40, fontFamily: 'monospace' },
  sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 4 },
  sectionSub: { fontSize: 11, fontFamily: 'monospace', marginBottom: 10 },
  card: { borderWidth: 1, borderRadius: 8, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, gap: 12 },
  btnRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 14, gap: 12 },
  labelCol: { width: 150, gap: 2 },
  token: { fontSize: 11, fontFamily: 'monospace', color: '#7047eb' },
  value: { fontSize: 12, fontWeight: '600' },
  barTrack: { flex: 1, height: 16, justifyContent: 'center' },
  bar: { height: 8, borderRadius: 4 },
  barNum: { width: 32, fontSize: 11, textAlign: 'right' },
  radiusGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 4 },
  radiusCard: { width: 104, alignItems: 'center', gap: 8, padding: 12, borderWidth: 1, borderRadius: 8 },
  radiusSwatch: { width: 60, height: 36, borderWidth: 2 },
});
