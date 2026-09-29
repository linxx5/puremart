import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = { title: 'Basics/Button', component: Button };
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { children: 'Pay into Escrow' } };
export const Secondary: Story = { args: { variant: 'secondary', children: 'Track Order' } };
export const Danger: Story = { args: { variant: 'danger', children: 'Open Dispute' } };
export const Ghost: Story = { args: { variant: 'ghost', children: 'Cancel' } };
export const Disabled: Story = { args: { disabled: true, children: 'Confirming…' } };
export const Small: Story = { args: { size: 'sm', variant: 'secondary', children: 'Small action' } };
