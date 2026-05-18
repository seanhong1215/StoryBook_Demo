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
      showPanel: false,
      storySort: {
        order: [
          'Components',
          ['Overview', 'Usage'],
          'General',
          ['Button'],
          'Data Display',
          ['Badge', 'Card'],
          'Foundation',
          ['Tokens'],
        ],
      },
    },
  },
};

export default preview;
