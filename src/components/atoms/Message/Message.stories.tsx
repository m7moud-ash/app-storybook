import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { View } from 'react-native';
import { Message } from './Message';
import { spacing } from '../../../tokens';
import { useSurface } from '../../../tokens/theme';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Message> = {
  title:     'Atoms/Message',
  component: Message,
  tags:      ['autodocs'],
  argTypes: {
    state: {
      description: 'Visual state of the message — controls icon, accent colour and background.',
      control:     { type: 'select' },
      options:     ['Error', 'Normal', 'Success', 'Warning', 'Loading'],
    },
    text: {
      description: 'Message body text. Defaults to a state-appropriate placeholder.',
      control:     { type: 'text' },
    },
  },
  args: {
    state: 'Error',
    text:  '',
  },
};

export default meta;
type Story = StoryObj<typeof Message>;

// ─── Individual states ────────────────────────────────────────────────────────

export const Error: Story = {
  args: { state: 'Error' },
};

export const Normal: Story = {
  args: { state: 'Normal' },
};

export const Success: Story = {
  args: { state: 'Success' },
};

export const Warning: Story = {
  args: { state: 'Warning' },
};

export const Loading: Story = {
  args: { state: 'Loading' },
};

export const CustomText: Story = {
  args: { state: 'Success', text: 'Your changes have been saved.' },
  name: 'Custom Text',
};

// ─── All states ───────────────────────────────────────────────────────────────

function AllStatesGrid() {
  const surface = useSurface();
  const states = ['Error', 'Normal', 'Success', 'Warning', 'Loading'] as const;
  return (
    <View style={{ backgroundColor: surface.background, padding: spacing[4], gap: spacing[3] }}>
      {states.map((s) => (
        <Message key={s} state={s} />
      ))}
    </View>
  );
}

export const AllStates: Story = {
  name:       'All States',
  parameters: { layout: 'fullscreen' },
  render:     () => <AllStatesGrid />,
};
