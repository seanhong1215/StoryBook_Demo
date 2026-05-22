import '../src/tokens/tokens.css'
import '../src/docs/storybook-docs.css'

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    },
    options: {
      storySort: {
        order: [
          'Components',
          ['Showcase', 'Overview', 'Usage'],
          'General',
          ['Button'],
          'Data Display',
          ['Badge', 'Tag', 'Card', 'Tabs', 'Table'],
          'Data Entry',
          ['Input', 'Textarea', 'Select', 'Checkbox', 'Switch', 'Form'],
          'Feedback',
          ['Alert', 'Modal', 'Empty', 'Tooltip'],
          'Navigation',
          ['Dropdown', 'Pagination'],
          'Layout',
          ['Space'],
          'Foundation',
          ['Tokens'],
        ],
      },
    },
  },
};

export default preview;
