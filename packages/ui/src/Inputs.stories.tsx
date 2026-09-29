import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchInput } from './SearchInput';
import { TextInput } from './TextInput';

const meta: Meta<typeof TextInput> = { title: 'Basics/Inputs', component: TextInput };
export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = { args: { label: 'Full name', placeholder: 'e.g. Adaeze Okafor', hint: 'Use the name on your ID for verification.' } };
export const Error: Story = { args: { label: 'Phone number', defaultValue: '0803', error: 'Enter a valid 11-digit Nigerian number.' } };
export const Disabled: Story = { args: { label: 'Verification', defaultValue: 'Locked during review', disabled: true } };

export const Search: StoryObj<typeof SearchInput> = {
  render: () => <SearchInput label="Search products" placeholder="Best toothpaste under ₦5,000" />,
};
