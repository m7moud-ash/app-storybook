import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { typography } from '../index';
import { useSurface } from '../theme';

const SAMPLE_EN = 'The quick brown fox jumps over the lazy dog.';
const SAMPLE_AR = 'الثعلب البني السريع يقفز فوق الكلب الكسول';

type WeightKey = keyof typeof typography.fontWeight;
type SizeKey   = keyof typeof typography.fontSize;

const weights = Object.entries(typography.fontWeight) as [WeightKey, string][];
const sizes   = Object.entries(typography.fontSize)   as [SizeKey, number][];

function TypographyPage() {
  const surface = useSurface();

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: surface.background }]}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.pageTitle, { color: surface.text }]}>Typography Tokens</Text>
      <Text style={[styles.pageSubtitle, { color: surface.textMuted }]}>
        Typography/En.Mobile.json · Typography/Ar.Mobile.json
      </Text>

      {/* Font Families */}
      <Text style={[styles.sectionTitle, { color: surface.text }]}>Font Families</Text>
      <View style={[styles.card, { borderColor: surface.divider }]}>
        <View style={styles.row}>
          <View style={styles.labelCol}>
            <Text style={styles.token}>font.Family</Text>
            <Text style={[styles.sub, { color: surface.textMuted }]}>En.Mobile</Text>
          </View>
          <Text style={[{ fontFamily: typography.fontFamily.en, fontSize: 28, color: surface.text }]}>
            Aa Bb Cc
          </Text>
        </View>
        <View style={[styles.divider, { backgroundColor: surface.divider }]} />
        <View style={styles.row}>
          <View style={styles.labelCol}>
            <Text style={styles.token}>font.Family</Text>
            <Text style={[styles.sub, { color: surface.textMuted }]}>Ar.Mobile</Text>
          </View>
          <Text style={[{ fontFamily: typography.fontFamily.ar, fontSize: 28, color: surface.text }]}>
            أ ب ت ث
          </Text>
        </View>
      </View>

      {/* Sizes */}
      <Text style={[styles.sectionTitle, { color: surface.text, marginTop: 32 }]}>Font Sizes</Text>
      <View style={[styles.card, { borderColor: surface.divider }]}>
        {sizes.map(([key, val], i) => (
          <View key={key}>
            {i > 0 && <View style={[styles.divider, { backgroundColor: surface.divider }]} />}
            <View style={styles.row}>
              <View style={styles.labelCol}>
                <Text style={styles.token}>text-{key}</Text>
                <Text style={[styles.value, { color: surface.text }]}>{val}px</Text>
              </View>
              <Text
                style={{ fontFamily: typography.fontFamily.en, fontSize: val, color: surface.text, lineHeight: val * 1.4, flex: 1 }}
                numberOfLines={1}
              >
                {SAMPLE_EN}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Weights */}
      <Text style={[styles.sectionTitle, { color: surface.text, marginTop: 32 }]}>Font Weights</Text>
      <View style={[styles.card, { borderColor: surface.divider }]}>
        {weights.map(([key, val], i) => (
          <View key={key}>
            {i > 0 && <View style={[styles.divider, { backgroundColor: surface.divider }]} />}
            <View style={styles.row}>
              <View style={styles.labelCol}>
                <Text style={styles.token}>{key}</Text>
                <Text style={[styles.value, { color: surface.text }]}>{val}</Text>
              </View>
              <Text
                style={{ fontFamily: typography.fontFamily.en, fontSize: 18, fontWeight: val as any, color: surface.text, flex: 1 }}
              >
                {SAMPLE_EN.slice(0, 32)}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Line Heights */}
      <Text style={[styles.sectionTitle, { color: surface.text, marginTop: 32 }]}>Line Heights</Text>
      <Text style={[styles.sub, { color: surface.textMuted, marginBottom: 10 }]}>EN vs AR — Arabic uses larger line-heights for correct rendering</Text>
      <View style={[styles.card, { borderColor: surface.divider }]}>
        {Object.entries(typography.lineHeight.en).map(([key, val], i) => {
          const arVal = (typography.lineHeight.ar as Record<string, number>)[key];
          return (
            <View key={key}>
              {i > 0 && <View style={[styles.divider, { backgroundColor: surface.divider }]} />}
              <View style={styles.row}>
                <View style={styles.labelCol}>
                  <Text style={styles.token}>leading-{key}</Text>
                  <Text style={[styles.value, { color: surface.text }]}>EN {val} · AR {arVal}</Text>
                </View>
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={{ fontFamily: typography.fontFamily.en, fontSize: 12, lineHeight: val, color: surface.text }}>
                    {SAMPLE_EN.slice(0, 42)}
                  </Text>
                  <Text style={{ fontFamily: typography.fontFamily.ar, fontSize: 12, lineHeight: arVal, color: surface.textMuted, textAlign: 'right' }}>
                    {SAMPLE_AR}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      {/* Letter Spacing */}
      <Text style={[styles.sectionTitle, { color: surface.text, marginTop: 32 }]}>Letter Spacing</Text>
      <View style={[styles.card, { borderColor: surface.divider }]}>
        {Object.entries(typography.letterSpacing).map(([key, val], i) => (
          <View key={key}>
            {i > 0 && <View style={[styles.divider, { backgroundColor: surface.divider }]} />}
            <View style={styles.row}>
              <View style={styles.labelCol}>
                <Text style={styles.token}>tracking-{key}</Text>
                <Text style={[styles.value, { color: surface.text }]}>{val}px</Text>
              </View>
              <Text style={{ fontFamily: typography.fontFamily.en, fontSize: 16, letterSpacing: val, color: surface.text, flex: 1 }}>
                BUTTON LABEL
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const meta: Meta = {
  title: 'Tokens/Typography',
  component: TypographyPage,
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
  sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 10 },
  card: { borderWidth: 1, borderRadius: 8, overflow: 'hidden' },
  divider: { height: 1 },
  row: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 14 },
  labelCol: { width: 120, gap: 3 },
  token: { fontSize: 11, fontFamily: 'monospace', color: '#7047eb' },
  sub: { fontSize: 11 },
  value: { fontSize: 12, fontWeight: '600' },
});
