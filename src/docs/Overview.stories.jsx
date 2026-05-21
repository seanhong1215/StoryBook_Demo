const groups = [
  {
    name: 'Portfolio Entry',
    components: [
      {
        name: 'Showcase',
        href: '/?path=/story/components-showcase--admin-dashboard',
        description: 'A composed admin UI that demonstrates how Product A can use this library.',
      },
      {
        name: 'Usage',
        href: '/?path=/story/components-usage--usage',
        description: 'Local npm pack, file dependency, and theme adoption workflow.',
      },
    ],
  },
  {
    name: 'General',
    components: [
      {
        name: 'Button',
        href: '/?path=/docs/general-button--docs',
        description: 'Trigger actions with clear visual priority and predictable sizing.',
      },
    ],
  },
  {
    name: 'Data Display',
    components: [
      {
        name: 'Badge',
        href: '/?path=/docs/data-display-badge--docs',
        description: 'Surface compact status, category, or count information.',
      },
      {
        name: 'Card',
        href: '/?path=/docs/data-display-card--docs',
        description: 'Group related content, actions, and supporting metadata.',
      },
    ],
  },
  {
    name: 'Data Entry',
    components: [
      {
        name: 'Input',
        href: '/?path=/docs/data-entry-input--docs',
        description: 'Capture short text values with status, size, and affix controls.',
      },
      {
        name: 'Select',
        href: '/?path=/docs/data-entry-select--docs',
        description: 'Choose one option from a compact list with size and validation states.',
      },
      {
        name: 'Checkbox',
        href: '/?path=/docs/data-entry-checkbox--docs',
        description: 'Capture binary or indeterminate choices for product settings.',
      },
      {
        name: 'Switch',
        href: '/?path=/docs/data-entry-switch--docs',
        description: 'Toggle immediate on/off settings with loading and disabled states.',
      },
    ],
  },
  {
    name: 'Feedback',
    components: [
      {
        name: 'Alert',
        href: '/?path=/docs/feedback-alert--docs',
        description: 'Display contextual success, info, warning, and error feedback.',
      },
    ],
  },
  {
    name: 'Layout',
    components: [
      {
        name: 'Space',
        href: '/?path=/docs/layout-space--docs',
        description: 'Control gaps between inline or stacked children without custom CSS.',
      },
    ],
  },
  {
    name: 'Foundation',
    components: [
      {
        name: 'Tokens',
        href: '/?path=/story/foundation-tokens--colors',
        description: 'Shared colors, spacing, radius, type, and elevation values.',
      },
    ],
  },
]

export default {
  title: 'Components/Overview',
  parameters: {
    layout: 'padded',
    docs: {
      page: null,
    },
  },
}

export const Overview = {
  render: () => (
    <main className="docs-page">
      <p className="docs-kicker">Design System</p>
      <h1 className="docs-title">Ant Design-inspired React UI Library</h1>
      <p className="docs-lede">
        A portfolio-ready component library for small internal products. It focuses on
        local package installation, reusable design tokens, Storybook documentation, and
        practical components that can compose a real admin workflow.
      </p>

      {groups.map((group) => (
        <section className="docs-section" key={group.name}>
          <div className="docs-section-header">
            <h2 className="docs-section-title">{group.name}</h2>
            <span className="docs-count">{group.components.length} items</span>
          </div>
          <div className="component-grid">
            {group.components.map((component) => (
              <a className="component-link" href={component.href} key={component.name}>
                <h3 className="component-link__name">{component.name}</h3>
                <p className="component-link__description">{component.description}</p>
              </a>
            ))}
          </div>
        </section>
      ))}
    </main>
  ),
}
