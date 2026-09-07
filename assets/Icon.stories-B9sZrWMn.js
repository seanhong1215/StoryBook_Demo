import{i as e}from"./preload-helper-Cs4UwXAW.js";import{i as t}from"./iframe-GXcRKLmM.js";import{n,t as r}from"./Button-B6kIJZ31.js";import{n as i,t as a}from"./Icon-DXhI3zR8.js";var o,s,c,l,u,d,f,p,m,h;e((()=>{n(),i(),o=t(),s={close:`Modal / Alert / Input 的關閉與清除`,check:`選取、完成`,"check-circle":`Alert type="success"`,"info-circle":`Alert type="info"`,"alert-triangle":`Alert type="warning"`,"x-circle":`Alert type="error"`,"chevron-up":`Table 升冪排序中`,"chevron-down":`Table 降冪排序中、展開收合`,"chevron-left":`上一頁`,"chevron-right":`下一頁`,"chevron-up-down":`Table 可排序但未排序`,search:`搜尋輸入框`,loading:`載入中（搭配 spin）`},c={title:`General/Icon`,component:a,tags:[`autodocs`],parameters:{docs:{description:{component:[`Icon renders one of the built-in line icons as an inline SVG.`,``,`The set is deliberately small — it covers what the components themselves need`,`rather than trying to be a general icon library. Every icon shares the same`,"24×24 grid, 2px stroke and round caps, and is drawn with `currentColor` at","`1em`, so it inherits the colour and size of the surrounding text.",``,"**Accessibility:** icons are decorative by default (`aria-hidden`), because they","usually sit next to text or inside a button that already has an `aria-label`.",'Passing `aria-label` switches the icon to `role="img"` with that name.'].join(`
`)}}},argTypes:{name:{control:`select`,options:Object.keys(s)},size:{control:`text`}}},l={args:{name:`search`,size:24}},u={args:{name:`close`},render:()=>(0,o.jsx)(`div`,{style:{display:`grid`,gap:`var(--spacing-sm)`,gridTemplateColumns:`repeat(auto-fill, minmax(180px, 1fr))`},children:Object.keys(s).map(e=>(0,o.jsxs)(`div`,{style:{alignItems:`center`,border:`1px solid var(--color-border)`,borderRadius:`var(--radius-md)`,display:`flex`,gap:`var(--spacing-sm)`,padding:`var(--spacing-sm)`},children:[(0,o.jsx)(a,{name:e,size:20}),(0,o.jsxs)(`span`,{style:{display:`grid`},children:[(0,o.jsx)(`code`,{style:{fontSize:`var(--font-size-xs)`},children:e}),(0,o.jsx)(`small`,{style:{color:`var(--color-text-muted)`},children:s[e]})]})]},e))})},d={args:{name:`search`},render:()=>(0,o.jsxs)(`div`,{style:{alignItems:`center`,display:`flex`,gap:`var(--spacing-md)`},children:[(0,o.jsx)(a,{name:`search`,size:14}),(0,o.jsx)(a,{name:`search`,size:20}),(0,o.jsx)(a,{name:`search`,size:28}),(0,o.jsxs)(`span`,{style:{fontSize:28},children:[`跟著字級 `,(0,o.jsx)(a,{name:`search`})]})]})},f={args:{name:`loading`,spin:!0,size:20}},p={args:{name:`search`},render:()=>(0,o.jsxs)(`div`,{style:{display:`flex`,gap:`var(--spacing-sm)`},children:[(0,o.jsx)(r,{leftIcon:(0,o.jsx)(a,{name:`search`}),children:`Search`}),(0,o.jsx)(r,{variant:`secondary`,rightIcon:(0,o.jsx)(a,{name:`chevron-down`}),children:`More`}),(0,o.jsx)(r,{variant:`ghost`,"aria-label":`Close panel`,children:(0,o.jsx)(a,{name:`close`})})]})},m={args:{name:`check-circle`},render:()=>(0,o.jsxs)(`div`,{style:{alignItems:`center`,display:`flex`,gap:`var(--spacing-sm)`},children:[(0,o.jsx)(a,{name:`check-circle`,size:20,"aria-label":`Published`}),(0,o.jsx)(`span`,{children:`0.1.0`})]})},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'search',
    size: 24
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'close'
  },
  render: () => <div style={{
    display: 'grid',
    gap: 'var(--spacing-sm)',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))'
  }}>\r
      {(Object.keys(ICON_USAGE) as IconName[]).map(name => <div key={name} style={{
      alignItems: 'center',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-md)',
      display: 'flex',
      gap: 'var(--spacing-sm)',
      padding: 'var(--spacing-sm)'
    }}>\r
          <Icon name={name} size={20} />\r
          <span style={{
        display: 'grid'
      }}>\r
            <code style={{
          fontSize: 'var(--font-size-xs)'
        }}>{name}</code>\r
            <small style={{
          color: 'var(--color-text-muted)'
        }}>{ICON_USAGE[name]}</small>\r
          </span>\r
        </div>)}\r
    </div>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'search'
  },
  render: () => <div style={{
    alignItems: 'center',
    display: 'flex',
    gap: 'var(--spacing-md)'
  }}>\r
      <Icon name="search" size={14} />\r
      <Icon name="search" size={20} />\r
      <Icon name="search" size={28} />\r
      <span style={{
      fontSize: 28
    }}>\r
        跟著字級 <Icon name="search" />\r
      </span>\r
    </div>
}`,...d.parameters?.docs?.source},description:{story:`size 預設是 1em，因此不指定時圖示會跟著父層字級走。`,...d.parameters?.docs?.description}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'loading',
    spin: true,
    size: 20
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'search'
  },
  render: () => <div style={{
    display: 'flex',
    gap: 'var(--spacing-sm)'
  }}>\r
      <Button leftIcon={<Icon name="search" />}>Search</Button>\r
      <Button variant="secondary" rightIcon={<Icon name="chevron-down" />}>More</Button>\r
      <Button variant="ghost" aria-label="Close panel">\r
        <Icon name="close" />\r
      </Button>\r
    </div>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'check-circle'
  },
  render: () => <div style={{
    alignItems: 'center',
    display: 'flex',
    gap: 'var(--spacing-sm)'
  }}>\r
      <Icon name="check-circle" size={20} aria-label="Published" />\r
      <span>0.1.0</span>\r
    </div>
}`,...m.parameters?.docs?.source},description:{story:`圖示本身要傳達意義時（旁邊沒有文字），給 aria-label 讓它變成 role="img"。`,...m.parameters?.docs?.description}}},h=[`Basic`,`Gallery`,`Sizes`,`Spinning`,`InButtons`,`WithAccessibleName`]}))();export{l as Basic,u as Gallery,p as InButtons,d as Sizes,f as Spinning,m as WithAccessibleName,h as __namedExportsOrder,c as default};