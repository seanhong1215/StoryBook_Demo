import{i as e}from"./preload-helper-Cs4UwXAW.js";import{i as t}from"./iframe-GXcRKLmM.js";import{n,t as r}from"./Button-B6kIJZ31.js";import{n as i,t as a}from"./Badge-Cv40qle6.js";import{n as o,t as s}from"./Card-Bo5Gr8Da.js";var c,l,u,d,f,p,m,h,g,_;e((()=>{o(),n(),i(),c=t(),l={title:`Data Display/Card`,component:s,tags:[`autodocs`],parameters:{docs:{description:{component:[`Card groups related content and optional actions in a contained surface.`,``,`**Card does not set its own width.** It fills whatever container you put it in —`,`width is a layout decision, so constrain it with your own grid/flex container.`,`These stories are wrapped in a 520px container for demonstration.`].join(`
`)}}},decorators:[e=>(0,c.jsx)(`div`,{className:`story-stack`,children:(0,c.jsx)(e,{})})]},u={args:{title:`Project summary`,description:`Use a card when a small group of related information needs to be scanned as one unit.`}},d={render:()=>(0,c.jsx)(s,{title:`Pending changes`,description:`Review the proposed settings before applying them to the workspace.`,footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{variant:`secondary`,size:`sm`,children:`Cancel`}),(0,c.jsx)(r,{variant:`primary`,size:`sm`,children:`Apply`})]})})},f={args:{variant:`elevated`,title:`Usage growth`,description:`Use elevated cards when the item needs more prominence than nearby content.`}},p={args:{as:`a`,href:`#`,interactive:!0,variant:`outlined`,title:`Selectable plan`,description:`Interactive cards can act as a larger selection target while preserving card structure.`}},m={args:{padding:`sm`,title:`Compact summary`,description:`Dense cards help product screens display more information without custom CSS.`}},h={render:()=>(0,c.jsx)(s,{title:`System status`,children:(0,c.jsxs)(`div`,{className:`story-stack`,children:[(0,c.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,gap:`24px`},children:[(0,c.jsx)(`span`,{children:`API gateway`}),(0,c.jsx)(a,{variant:`success`,children:`Active`})]}),(0,c.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,gap:`24px`},children:[(0,c.jsx)(`span`,{children:`Billing sync`}),(0,c.jsx)(a,{variant:`warning`,children:`Pending`})]}),(0,c.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,gap:`24px`},children:[(0,c.jsx)(`span`,{children:`Archive job`}),(0,c.jsx)(a,{variant:`secondary`,children:`Draft`})]})]})})},g={render:()=>(0,c.jsx)(s,{title:`Team access`,description:`Use footer alignment to match product workflow density.`,footerAlign:`between`,footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(a,{variant:`success`,children:`Enabled`}),(0,c.jsx)(r,{variant:`secondary`,size:`sm`,children:`Manage`})]})})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Project summary',
    description: 'Use a card when a small group of related information needs to be scanned as one unit.'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <Card title="Pending changes" description="Review the proposed settings before applying them to the workspace." footer={<>\r
          <Button variant="secondary" size="sm">Cancel</Button>\r
          <Button variant="primary" size="sm">Apply</Button>\r
        </>} />
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'elevated',
    title: 'Usage growth',
    description: 'Use elevated cards when the item needs more prominence than nearby content.'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    as: 'a',
    href: '#',
    interactive: true,
    variant: 'outlined',
    title: 'Selectable plan',
    description: 'Interactive cards can act as a larger selection target while preserving card structure.'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    padding: 'sm',
    title: 'Compact summary',
    description: 'Dense cards help product screens display more information without custom CSS.'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <Card title="System status">\r
      <div className="story-stack">\r
        <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '24px'
      }}>\r
          <span>API gateway</span>\r
          <Badge variant="success">Active</Badge>\r
        </div>\r
        <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '24px'
      }}>\r
          <span>Billing sync</span>\r
          <Badge variant="warning">Pending</Badge>\r
        </div>\r
        <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '24px'
      }}>\r
          <span>Archive job</span>\r
          <Badge variant="secondary">Draft</Badge>\r
        </div>\r
      </div>\r
    </Card>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <Card title="Team access" description="Use footer alignment to match product workflow density." footerAlign="between" footer={<>\r
          <Badge variant="success">Enabled</Badge>\r
          <Button variant="secondary" size="sm">Manage</Button>\r
        </>} />
}`,...g.parameters?.docs?.source}}},_=[`Basic`,`WithFooter`,`Elevated`,`Interactive`,`Dense`,`WithBadge`,`FooterAlignment`]}))();export{u as Basic,m as Dense,f as Elevated,g as FooterAlignment,p as Interactive,h as WithBadge,d as WithFooter,_ as __namedExportsOrder,l as default};