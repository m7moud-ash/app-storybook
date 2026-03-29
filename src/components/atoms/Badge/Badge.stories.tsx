import React from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: [
        'Default',
        'Processing',
        'Announcement',
        'Success',
        'Warning',
        'Error',
        'Extra',
      ],
      description:
        'Semantic type — drives background, indicator dot color, and text color via `badgeColors` tokens.',
    },
    label: {
      control: 'text',
      description: 'Badge text label',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// ─── Individual type stories ──────────────────────────────────────────────────

export const Default: Story = {
  args: { type: 'Default', label: 'Default' },
};

export const Processing: Story = {
  args: { type: 'Processing', label: 'Processing' },
};

export const Announcement: Story = {
  args: { type: 'Announcement', label: 'Announcement' },
};

export const Success: Story = {
  args: { type: 'Success', label: 'Success' },
};

export const Warning: Story = {
  args: { type: 'Warning', label: 'Warning' },
};

export const Error: Story = {
  args: { type: 'Error', label: 'Error' },
};

export const Extra: Story = {
  args: { type: 'Extra', label: 'Extra' },
};

// ─── All types — mirrors the Figma frame exactly ──────────────────────────────

export const AllTypes: Story = {
  name: 'All Types',
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      <Badge type="Default"      label="Default"      />
      <Badge type="Processing"   label="Processing"   />
      <Badge type="Announcement" label="Announcement" />
      <Badge type="Success"      label="Success"      />
      <Badge type="Warning"      label="Warning"      />
      <Badge type="Error"        label="Error"        />
      <Badge type="Extra"        label="Extra"        />
    </View>
  ),
};

// ─── Custom label ─────────────────────────────────────────────────────────────

export const CustomLabels: Story = {
  name: 'Custom Labels',
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      <Badge type="Success"    label="Paid"        />
      <Badge type="Warning"    label="Pending"     />
      <Badge type="Error"      label="Overdue"     />
      <Badge type="Processing" label="In Review"   />
      <Badge type="Default"    label="Draft"       />
      <Badge type="Announcement" label="New"       />
    </View>
  ),
};
