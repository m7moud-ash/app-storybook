import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { fn } from 'storybook/test';
import { Button } from './Button';
import { color, buttonSize, buttonRadius } from '../../../tokens';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['Primary', 'Secondary', 'Tertiary', 'Borderless'],
      description:
        'Visual hierarchy — filled, outlined, neutral-outlined, or text-only.\n\n' +
        '`Primary` → filled background\n`Secondary` → outlined brand border\n`Tertiary` → outlined neutral border\n`Borderless` → no border/bg',
    },
    appearance: {
      control: 'select',
      options: ['Normal', 'Danger', 'Success', 'Information', 'Warning'],
      description:
        'Semantic color token.\n\n' +
        `Normal → \`color.blue.brand\` ${color.blue.brand}\n` +
        `Danger → \`color.red.500\` ${color.red[500]}\n` +
        `Success → \`color.green.500\` ${color.green[500]}\n` +
        `Information → \`color.blue.500\` ${color.blue[500]}\n` +
        `Warning → \`color.orange.600\` ${color.orange[600]}`,
    },
    size: {
      control: 'select',
      options: ['Large', 'Default', 'Small'],
      description:
        `Large → h:${buttonSize.Large.height}px / px:${buttonSize.Large.paddingH}px / ${buttonSize.Large.fontSize}px font\n` +
        `Default → h:${buttonSize.Default.height}px / px:${buttonSize.Default.paddingH}px / ${buttonSize.Default.fontSize}px font\n` +
        `Small → h:${buttonSize.Small.height}px / px:${buttonSize.Small.paddingH}px / ${buttonSize.Small.fontSize}px font\n\n` +
        `Border radius: \`radius['2xs']\` = ${buttonRadius}px`,
    },
    label: {
      control: 'text',
      description: 'Button text — uses `typography.fontFamily.en` (Inter) at semibold weight',
    },
    disabled: {
      control: 'boolean',
      description: 'Switches to disabled color tokens and blocks interaction',
    },
    loading: {
      control: 'boolean',
      description: 'Shows `<ActivityIndicator>` in place of label; also disables interaction',
    },
    onPress: { action: 'onPress' },
  },
  args: {
    onPress: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ─── Type variants ────────────────────────────────────────────────────────────

export const Primary: Story = {
  args: { type: 'Primary', appearance: 'Normal', size: 'Default', label: 'Button' },
};

export const Secondary: Story = {
  args: { type: 'Secondary', appearance: 'Normal', size: 'Default', label: 'Button' },
};

export const Tertiary: Story = {
  args: { type: 'Tertiary', appearance: 'Normal', size: 'Default', label: 'Button' },
};

export const Borderless: Story = {
  args: { type: 'Borderless', appearance: 'Normal', size: 'Default', label: 'Button' },
};

// ─── Size variants ────────────────────────────────────────────────────────────

export const SizeLarge: Story = {
  name: 'Size / Large',
  args: { type: 'Primary', appearance: 'Normal', size: 'Large', label: 'Button' },
};

export const SizeDefault: Story = {
  name: 'Size / Default',
  args: { type: 'Primary', appearance: 'Normal', size: 'Default', label: 'Button' },
};

export const SizeSmall: Story = {
  name: 'Size / Small',
  args: { type: 'Primary', appearance: 'Normal', size: 'Small', label: 'Button' },
};

// ─── Appearance variants ──────────────────────────────────────────────────────

export const AppearanceNormal: Story = {
  name: 'Appearance / Normal',
  args: { type: 'Primary', appearance: 'Normal', size: 'Default', label: 'Button' },
};

export const AppearanceDanger: Story = {
  name: 'Appearance / Danger',
  args: { type: 'Primary', appearance: 'Danger', size: 'Default', label: 'Button' },
};

export const AppearanceSuccess: Story = {
  name: 'Appearance / Success',
  args: { type: 'Primary', appearance: 'Success', size: 'Default', label: 'Button' },
};

export const AppearanceInformation: Story = {
  name: 'Appearance / Information',
  args: { type: 'Primary', appearance: 'Information', size: 'Default', label: 'Button' },
};

export const AppearanceWarning: Story = {
  name: 'Appearance / Warning',
  args: { type: 'Primary', appearance: 'Warning', size: 'Default', label: 'Button' },
};

// ─── State variants ───────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: { type: 'Primary', appearance: 'Normal', size: 'Default', label: 'Button', disabled: true },
};

export const Loading: Story = {
  args: { type: 'Primary', appearance: 'Normal', size: 'Default', label: 'Button', loading: true },
};

// ─── Secondary × Appearance ───────────────────────────────────────────────────

export const SecondaryDanger: Story = {
  name: 'Secondary / Danger',
  args: { type: 'Secondary', appearance: 'Danger', size: 'Default', label: 'Button' },
};

export const SecondarySuccess: Story = {
  name: 'Secondary / Success',
  args: { type: 'Secondary', appearance: 'Success', size: 'Default', label: 'Button' },
};

export const SecondaryWarning: Story = {
  name: 'Secondary / Warning',
  args: { type: 'Secondary', appearance: 'Warning', size: 'Default', label: 'Button' },
};
