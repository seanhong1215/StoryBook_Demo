import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
import { Empty } from './Empty'

const meta = {
  title: 'Feedback/Empty',
  component: Empty,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Empty communicates an empty dataset and can provide a recovery action.',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    actionText: { control: 'text' },
  },
} satisfies Meta<typeof Empty>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    title: 'No projects yet',
    description: 'Create a project to start validating this component library in Product A.',
  },
}

export const WithAction: Story = {
  args: {
    title: 'No releases found',
    description: 'Build and pack the library before installing it in another product.',
    actionText: 'Create release',
  },
}

export const CustomAction: Story = {
  render: () => (
    <Empty
      title="No pending reviews"
      description="All package changes have been reviewed."
      action={<Button variant="secondary" size="sm">View history</Button>}
    />
  ),
}
