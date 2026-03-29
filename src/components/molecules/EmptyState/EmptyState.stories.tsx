import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { fn } from 'storybook/test';
import { View } from 'react-native';
import { EmptyState } from './EmptyState';
import { useSurface } from '../../../tokens/theme';
import { spacing } from '../../../tokens';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof EmptyState> = {
  title:     'Molecules/EmptyState',
  component: EmptyState,
  tags:      ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    title: {
      description: 'Bold heading displayed beneath the illustration.',
      control:     { type: 'text' },
    },
    description: {
      description: 'Optional supporting copy. Leave empty to hide.',
      control:     { type: 'text' },
    },
    icon: {
      description:  'Pass `null` to hide the icon; omit to show the default wifi-off illustration.',
      control:      false,
    },
    primaryAction: {
      description: 'Outlined CTA button. Pass `undefined` to hide.',
      control:     false,
    },
    secondaryAction: {
      description: 'Borderless CTA button. Pass `undefined` to hide.',
      control:     false,
    },
  },
  args: {
    title:       "You're Offline",
    description: "We couldn't find anything matching your search. Try different keywords or check your spelling.",
    primaryAction:   { label: 'Try Again',     onPress: fn() },
    secondaryAction: { label: 'Go to Home',    onPress: fn() },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {};

// ─── Icon only (no description, no actions) ───────────────────────────────────

export const IconOnly: Story = {
  name: 'Icon Only',
  args: {
    description:     undefined,
    primaryAction:   undefined,
    secondaryAction: undefined,
  },
};

// ─── With description, no actions ─────────────────────────────────────────────

export const WithDescription: Story = {
  name: 'With Description',
  args: {
    primaryAction:   undefined,
    secondaryAction: undefined,
  },
};

// ─── One action ───────────────────────────────────────────────────────────────

export const SingleAction: Story = {
  name: 'Single Action',
  args: {
    secondaryAction: undefined,
  },
};

// ─── No icon ──────────────────────────────────────────────────────────────────

export const NoIcon: Story = {
  name: 'No Icon',
  args: {
    icon: null,
  },
};

// ─── Custom title — no results ────────────────────────────────────────────────

export const NoResults: Story = {
  name: 'No Results',
  args: {
    title:           'No Results Found',
    description:     'Try adjusting your filters or search for something else.',
    primaryAction:   { label: 'Clear Filters', onPress: fn() },
    secondaryAction: { label: 'Browse All',    onPress: fn() },
  },
};

// ─── Custom title — coming soon ───────────────────────────────────────────────

export const ComingSoon: Story = {
  name: 'Coming Soon',
  args: {
    title:           'Coming Soon',
    description:     'We are working hard to bring this feature to you. Stay tuned!',
    primaryAction:   undefined,
    secondaryAction: { label: 'Notify Me', onPress: fn() },
  },
};

// ─── All variants stacked ─────────────────────────────────────────────────────

function AllVariantsGrid() {
  const surface = useSurface();
  return (
    <View style={{ backgroundColor: surface.background, padding: spacing[6], gap: spacing[8], alignItems: 'center' }}>
      <EmptyState
        title="You're Offline"
        description="We couldn't find anything matching your search. Try different keywords or check your spelling."
        primaryAction={{ label: 'Try Again',  onPress: fn() }}
        secondaryAction={{ label: 'Go to Home', onPress: fn() }}
      />
      <EmptyState
        title="No Results Found"
        description="Try adjusting your filters or search for something else."
        primaryAction={{ label: 'Clear Filters', onPress: fn() }}
      />
      <EmptyState
        icon={null}
        title="Coming Soon"
        description="We are working hard to bring this feature to you."
        secondaryAction={{ label: 'Notify Me', onPress: fn() }}
      />
    </View>
  );
}

export const AllVariants: Story = {
  name:       'All Variants',
  parameters: { layout: 'fullscreen' },
  render:     () => <AllVariantsGrid />,
};
