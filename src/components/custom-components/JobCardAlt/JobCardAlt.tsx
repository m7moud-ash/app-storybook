import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Bookmark, Building2, MapPin } from 'lucide-react';
import { color, spacing, typography } from '../../../tokens';
import { useSurface } from '../../../tokens/theme';

export type JobCardLang = 'en' | 'ar';

export interface JobCardAltProps {
  lang?: JobCardLang;
  title?: string;
  company?: string;
  tags?: [string, string];
  location?: string;
  postedAgo?: string;
}

export function JobCardAlt({
  lang = 'en',
  title,
  company,
  tags,
  location,
  postedAgo = '2d',
}: JobCardAltProps) {
  const isRtl = lang === 'ar';
  const surface = useSurface();

  const content = isRtl
    ? {
        title: title ?? 'Junior Frontend Developer',
        company: company ?? 'TechStart Inc.',
        tags: tags ?? ['سهل', 'خرج جديد'],
        location: location ?? 'بعيد',
      }
    : {
        title: title ?? 'Junior Frontend Developer',
        company: company ?? 'TechStart Inc.',
        tags: tags ?? ['Easy', '#Fresh Grad'],
        location: location ?? 'Remote',
      };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: surface.background,
          borderColor: isRtl ? color.white[100] : '#ebedf0',
          flexDirection: isRtl ? 'row-reverse' : 'row',
        },
      ]}
    >
      <View style={styles.iconWrap}>
        <Building2 size={28} color={color.blue.brand} strokeWidth={2} />
      </View>

      <View style={[styles.content, { alignItems: isRtl ? 'flex-end' : 'flex-start' }]}>
        <Text
          style={[
            styles.title,
            { color: surface.text, textAlign: isRtl ? 'right' : 'left', writingDirection: isRtl ? 'rtl' : 'ltr' },
          ]}
        >
          {content.title}
        </Text>
        <Text
          style={[
            styles.company,
            { color: surface.text, textAlign: isRtl ? 'right' : 'left', writingDirection: isRtl ? 'rtl' : 'ltr' },
          ]}
        >
          {content.company}
        </Text>

        <View style={[styles.tagsRow, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
          <StatusChip label={content.tags[0]} />
          <StatusChip label={content.tags[1]} />
        </View>

        <View style={[styles.metaRow, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
          <MapPin size={12} color={surface.text} strokeWidth={2} />
          <Text
            style={[
              styles.metaText,
              { color: surface.text, textAlign: isRtl ? 'right' : 'left', writingDirection: isRtl ? 'rtl' : 'ltr' },
            ]}
          >
            {content.location}
          </Text>
          <View style={[styles.dot, { backgroundColor: surface.textMuted }]} />
          <Text style={[styles.metaTime, { color: surface.textMuted }]}>{postedAgo}</Text>
        </View>
      </View>

      <View style={[styles.bookmarkWrap, isRtl ? styles.bookmarkLeft : styles.bookmarkRight]}>
        <Bookmark size={24} color={surface.textMuted} strokeWidth={2} />
      </View>
    </View>
  );
}

function StatusChip({ label }: { label: string }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 14,
    padding: spacing[4],
    gap: spacing[4],
    alignItems: 'flex-start',
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: '#dce8fc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    gap: spacing[2],
  },
  title: {
    fontFamily: typography.fontFamily.en,
    fontWeight: typography.fontWeight.semibold,
    fontSize: typography.fontSize.sm,
    lineHeight: 22.5,
  },
  company: {
    fontFamily: typography.fontFamily.en,
    fontWeight: typography.fontWeight.regular,
    fontSize: typography.fontSize.xs,
    lineHeight: 18,
  },
  tagsRow: {
    gap: spacing[2],
  },
  chip: {
    backgroundColor: color.green[50],
    borderRadius: 8,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
  },
  chipText: {
    fontFamily: typography.fontFamily.en,
    fontWeight: typography.fontWeight.regular,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.lineHeight.en.md,
    color: '#219b56',
  },
  metaRow: {
    alignItems: 'center',
    gap: spacing[1],
    height: 16.5,
  },
  metaText: {
    fontFamily: typography.fontFamily.en,
    fontWeight: typography.fontWeight.regular,
    fontSize: typography.fontSize.xs,
    lineHeight: 16.5,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  metaTime: {
    fontFamily: typography.fontFamily.en,
    fontWeight: typography.fontWeight.regular,
    fontSize: typography.fontSize.xs,
    lineHeight: 16.5,
  },
  bookmarkWrap: {
    position: 'absolute',
    top: spacing[4],
  },
  bookmarkRight: { right: spacing[4] },
  bookmarkLeft: { left: spacing[4] },
});
