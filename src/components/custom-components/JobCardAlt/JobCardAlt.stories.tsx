import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { View } from 'react-native';
import { JobCardAlt } from './JobCardAlt';
import { spacing } from '../../../tokens';
import { useSurface } from '../../../tokens/theme';

const meta: Meta<typeof JobCardAlt> = {
  title: 'Custom Components/JobCardAlt',
  component: JobCardAlt,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    lang: {
      control: 'select',
      options: ['en', 'ar'],
      description: 'Language and layout direction: `en` = LTR, `ar` = RTL.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof JobCardAlt>;

export const EnglishLTR: Story = {
  name: 'English / LTR',
  args: { lang: 'en' },
};

export const ArabicRTL: Story = {
  name: 'Arabic / RTL',
  args: { lang: 'ar' },
};

function DualLanguagePreview() {
  const surface = useSurface();
  return (
    <View style={{ backgroundColor: surface.backgroundSubtle, padding: spacing[4], gap: spacing[4], alignItems: 'center' }}>
      <JobCardAlt lang="en" />
      <JobCardAlt lang="ar" />
    </View>
  );
}

export const BothStates: Story = {
  name: 'Both States (LTR + RTL)',
  parameters: { layout: 'fullscreen' },
  render: () => <DualLanguagePreview />,
};
