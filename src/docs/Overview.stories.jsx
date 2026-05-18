const groups = [
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
    name: 'Foundation',
    components: [
      {
        name: 'Usage',
        href: '/?path=/story/components-usage--usage',
        description: 'How products import components and apply product-line themes.',
      },
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
      <h1 className="docs-title">Components Overview</h1>
      <p className="docs-lede">
        Browse the system by usage category. Start here when you are choosing a component,
        then open the component page for variants, controls, and implementation examples.
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
