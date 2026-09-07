import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{i as n,j as r,t as i}from"./iframe-GXcRKLmM.js";var a,o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w;e((()=>{a=t(r(),1),i(),o=n(),s={title:`Foundation/Tokens`,parameters:{docs:{description:{component:`Tokens define the shared visual decisions used by every component.`}}}},c=({name:e,value:t})=>(0,o.jsxs)(`div`,{className:`token-row`,children:[(0,o.jsx)(`div`,{className:`token-swatch`,style:{background:t}}),(0,o.jsxs)(`div`,{children:[(0,o.jsx)(`div`,{className:`token-name`,children:e}),(0,o.jsx)(`div`,{className:`token-value`,children:t})]}),(0,o.jsx)(`code`,{children:t})]}),l=({name:e,swatch:t=`color`})=>{let n=(0,a.useRef)(null),[r,i]=(0,a.useState)(``);return(0,a.useEffect)(()=>{n.current&&i(getComputedStyle(n.current).getPropertyValue(e).trim())},[e]),(0,o.jsxs)(`div`,{className:`token-row`,ref:n,children:[(0,o.jsx)(`div`,{className:`token-swatch`,style:t===`shadow`?{background:`var(--color-surface)`,boxShadow:`var(${e})`}:{background:`var(${e})`}}),(0,o.jsxs)(`div`,{children:[(0,o.jsx)(`div`,{className:`token-name`,children:e}),(0,o.jsx)(`div`,{className:`token-value`,children:r||`—`})]})]})},u=({theme:e,names:t,swatch:n})=>(0,o.jsxs)(`div`,{"data-theme":e,style:{background:`var(--color-bg)`,color:`var(--color-text)`,border:`1px solid var(--color-border)`,borderRadius:`var(--radius-md)`,flex:`1 1 320px`,minWidth:0,padding:`var(--spacing-md)`},children:[(0,o.jsx)(`h3`,{style:{marginTop:0,fontSize:`var(--font-size-sm)`,textTransform:`uppercase`},children:e}),(0,o.jsx)(`div`,{className:`token-list`,children:t.map(e=>(0,o.jsx)(l,{name:e,swatch:n},e))})]}),d=({title:e,names:t,swatch:n,note:r})=>(0,o.jsxs)(`div`,{className:`docs-page`,children:[(0,o.jsx)(`h2`,{className:`docs-section-title`,children:e}),r&&(0,o.jsx)(`p`,{className:`docs-lede`,children:r}),(0,o.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`var(--spacing-md)`},children:[(0,o.jsx)(u,{theme:`light`,names:t,swatch:n}),(0,o.jsx)(u,{theme:`dark`,names:t,swatch:n})]})]}),f=({name:e,value:t,preview:n})=>(0,o.jsxs)(`div`,{className:`token-row token-row--preview`,children:[(0,o.jsx)(`div`,{className:`token-preview`,children:n}),(0,o.jsxs)(`div`,{children:[(0,o.jsx)(`div`,{className:`token-name`,children:e}),(0,o.jsx)(`div`,{className:`token-value`,children:t})]}),(0,o.jsx)(`code`,{children:t})]}),p={name:`Colors / Brand layer`,render:()=>(0,o.jsxs)(`div`,{className:`docs-page`,children:[(0,o.jsx)(`h2`,{className:`docs-section-title`,children:`Brand Layer`}),(0,o.jsxs)(`p`,{className:`docs-lede`,children:[`只由 `,(0,o.jsx)(`code`,{children:`[data-product-line]`}),` 覆寫，不隨主題改變。`]}),(0,o.jsxs)(`div`,{className:`token-list`,children:[(0,o.jsx)(c,{name:`--color-primary`,value:`#0066FF`}),(0,o.jsx)(c,{name:`--color-primary-hover`,value:`#0052CC`}),(0,o.jsx)(c,{name:`--color-secondary`,value:`#6B7280`}),(0,o.jsx)(c,{name:`--color-success`,value:`#10B981`}),(0,o.jsx)(c,{name:`--color-danger`,value:`#EF4444`}),(0,o.jsx)(c,{name:`--color-warning`,value:`#F59E0B`}),(0,o.jsx)(c,{name:`--color-on-brand`,value:`#FFFFFF`})]})]})},m={name:`Colors / Surface layer`,render:()=>(0,o.jsx)(d,{title:`Surface Layer`,note:(0,o.jsxs)(o.Fragment,{children:[`只由 `,(0,o.jsx)(`code`,{children:`[data-theme]`}),` 覆寫，不隨產品線改變。`]}),names:[`--color-bg`,`--color-bg-subtle`,`--color-surface`,`--color-surface-hover`,`--color-border`,`--color-text`,`--color-text-muted`,`--color-inverse-surface`,`--color-inverse-text`]})},h={name:`Colors / Semantic tones`,render:()=>(0,o.jsx)(d,{title:`Semantic Tones`,note:(0,o.jsxs)(o.Fragment,{children:[`Alert / Tag / Badge 的彩色淺底。用 `,(0,o.jsx)(`code`,{children:`color-mix()`}),` 由品牌色與表面色即時混出， 因此同時跟隨產品線與主題，不需要維護 4×2 組色票。`]}),names:[`--tone-info-bg`,`--tone-info-border`,`--tone-info-text`,`--tone-success-bg`,`--tone-success-border`,`--tone-success-text`,`--tone-warning-bg`,`--tone-warning-border`,`--tone-warning-text`,`--tone-danger-bg`,`--tone-danger-border`,`--tone-danger-text`]})},g={render:()=>(0,o.jsxs)(`div`,{className:`docs-page`,children:[(0,o.jsx)(`h2`,{className:`docs-section-title`,children:`Radius Tokens`}),(0,o.jsx)(`div`,{className:`token-list`,children:[{name:`--radius-sm`,value:`4px`},{name:`--radius-md`,value:`8px`},{name:`--radius-lg`,value:`12px`},{name:`--radius-full`,value:`9999px`}].map(({name:e,value:t})=>(0,o.jsx)(f,{name:e,value:t,preview:(0,o.jsx)(`span`,{className:`token-shape`,style:{borderRadius:t}})},e))})]})},_={render:()=>(0,o.jsx)(d,{title:`Shadow Tokens`,note:`暗底上柔和陰影幾乎不可見，暗色主題改用更深更大的陰影撐出層次。`,swatch:`shadow`,names:[`--shadow-sm`,`--shadow-md`,`--shadow-lg`,`--shadow-focus`]})},v={render:()=>(0,o.jsxs)(`div`,{className:`docs-page`,children:[(0,o.jsx)(`h2`,{className:`docs-section-title`,children:`Size Tokens`}),(0,o.jsx)(`div`,{className:`token-list`,children:[{name:`--size-xs`,value:`24px`},{name:`--size-sm`,value:`32px`},{name:`--size-md`,value:`40px`},{name:`--size-lg`,value:`48px`},{name:`--size-xl`,value:`64px`}].map(({name:e,value:t})=>(0,o.jsx)(f,{name:e,value:t,preview:(0,o.jsx)(`span`,{className:`token-size-box`,style:{width:t,height:t}})},e))})]})},y={render:()=>(0,o.jsxs)(`div`,{className:`docs-page`,children:[(0,o.jsx)(`h2`,{className:`docs-section-title`,children:`Border Tokens`}),(0,o.jsx)(`div`,{className:`token-list`,children:[{name:`--border-width-sm`,value:`1px`,style:`solid`},{name:`--border-width-md`,value:`2px`,style:`solid`},{name:`--border-width-lg`,value:`4px`,style:`solid`},{name:`--border-style-dashed`,value:`dashed`,width:`2px`,style:`dashed`}].map(({name:e,value:t,width:n=t,style:r})=>(0,o.jsx)(f,{name:e,value:t,preview:(0,o.jsx)(`span`,{className:`token-shape token-shape--surface`,style:{borderWidth:n,borderStyle:r}})},e))})]})},b={render:()=>(0,o.jsxs)(`div`,{className:`docs-page`,children:[(0,o.jsx)(`h2`,{className:`docs-section-title`,children:`Opacity Tokens`}),(0,o.jsx)(`div`,{className:`token-list`,children:[{name:`--opacity-disabled`,value:`0.45`},{name:`--opacity-muted`,value:`0.64`},{name:`--opacity-overlay`,value:`0.72`}].map(({name:e,value:t})=>(0,o.jsx)(f,{name:e,value:t,preview:(0,o.jsx)(`span`,{className:`token-shape`,style:{opacity:t}})},e))})]})},x={render:()=>(0,o.jsxs)(`div`,{className:`docs-page`,children:[(0,o.jsx)(`h2`,{className:`docs-section-title`,children:`Transition Tokens`}),(0,o.jsx)(`div`,{className:`token-list`,children:[{name:`--transition-fast`,value:`120ms ease`},{name:`--transition-base`,value:`160ms ease`},{name:`--transition-slow`,value:`240ms ease`}].map(({name:e,value:t})=>(0,o.jsx)(f,{name:e,value:t,preview:(0,o.jsx)(`span`,{className:`token-transition-dot`,style:{transition:`transform ${t}`}})},e))})]})},S={render:()=>(0,o.jsxs)(`div`,{className:`docs-page`,children:[(0,o.jsx)(`h2`,{className:`docs-section-title`,children:`Spacing Tokens`}),(0,o.jsx)(`div`,{className:`token-list`,children:[{name:`--spacing-xs`,value:`4px`},{name:`--spacing-sm`,value:`8px`},{name:`--spacing-md`,value:`16px`},{name:`--spacing-lg`,value:`24px`},{name:`--spacing-xl`,value:`32px`}].map(({name:e,value:t})=>(0,o.jsxs)(`div`,{className:`token-row`,children:[(0,o.jsx)(`div`,{className:`token-swatch`,style:{background:`#0066FF`,width:t}}),(0,o.jsx)(`div`,{className:`token-name`,children:e}),(0,o.jsx)(`code`,{children:t})]},e))})]})},C={render:()=>(0,o.jsxs)(`div`,{className:`docs-page`,children:[(0,o.jsx)(`h2`,{className:`docs-section-title`,children:`Typography Tokens`}),(0,o.jsx)(`div`,{className:`token-list`,children:[{name:`--font-size-xs`,value:`12px`},{name:`--font-size-sm`,value:`14px`},{name:`--font-size-base`,value:`16px`},{name:`--font-size-lg`,value:`20px`},{name:`--font-size-xl`,value:`24px`}].map(({name:e,value:t})=>(0,o.jsxs)(`div`,{className:`token-row`,children:[(0,o.jsx)(`span`,{style:{fontSize:t,fontWeight:600},children:`Aa`}),(0,o.jsx)(`div`,{className:`token-name`,children:e}),(0,o.jsx)(`code`,{children:t})]},e))})]})},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Colors / Brand layer',
  render: () => <div className="docs-page">\r
      <h2 className="docs-section-title">Brand Layer</h2>\r
      <p className="docs-lede">\r
        只由 <code>[data-product-line]</code> 覆寫，不隨主題改變。\r
      </p>\r
      <div className="token-list">\r
        <TokenBox name="--color-primary" value="#0066FF" />\r
        <TokenBox name="--color-primary-hover" value="#0052CC" />\r
        <TokenBox name="--color-secondary" value="#6B7280" />\r
        <TokenBox name="--color-success" value="#10B981" />\r
        <TokenBox name="--color-danger" value="#EF4444" />\r
        <TokenBox name="--color-warning" value="#F59E0B" />\r
        <TokenBox name="--color-on-brand" value="#FFFFFF" />\r
      </div>\r
    </div>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Colors / Surface layer',
  render: () => <ThemeCompare title="Surface Layer" note={<>只由 <code>[data-theme]</code> 覆寫，不隨產品線改變。</>} names={['--color-bg', '--color-bg-subtle', '--color-surface', '--color-surface-hover', '--color-border', '--color-text', '--color-text-muted', '--color-inverse-surface', '--color-inverse-text']} />
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Colors / Semantic tones',
  render: () => <ThemeCompare title="Semantic Tones" note={<>\r
          Alert / Tag / Badge 的彩色淺底。用 <code>color-mix()</code> 由品牌色與表面色即時混出，\r
          因此同時跟隨產品線與主題，不需要維護 4×2 組色票。\r
        </>} names={['--tone-info-bg', '--tone-info-border', '--tone-info-text', '--tone-success-bg', '--tone-success-border', '--tone-success-text', '--tone-warning-bg', '--tone-warning-border', '--tone-warning-text', '--tone-danger-bg', '--tone-danger-border', '--tone-danger-text']} />
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div className="docs-page">\r
      <h2 className="docs-section-title">Radius Tokens</h2>\r
      <div className="token-list">\r
        {[{
        name: '--radius-sm',
        value: '4px'
      }, {
        name: '--radius-md',
        value: '8px'
      }, {
        name: '--radius-lg',
        value: '12px'
      }, {
        name: '--radius-full',
        value: '9999px'
      }].map(({
        name,
        value
      }) => <TokenRow name={name} value={value} key={name} preview={<span className="token-shape" style={{
        borderRadius: value
      }} />} />)}\r
      </div>\r
    </div>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <ThemeCompare title="Shadow Tokens" note="暗底上柔和陰影幾乎不可見，暗色主題改用更深更大的陰影撐出層次。" swatch="shadow" names={['--shadow-sm', '--shadow-md', '--shadow-lg', '--shadow-focus']} />
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div className="docs-page">\r
      <h2 className="docs-section-title">Size Tokens</h2>\r
      <div className="token-list">\r
        {[{
        name: '--size-xs',
        value: '24px'
      }, {
        name: '--size-sm',
        value: '32px'
      }, {
        name: '--size-md',
        value: '40px'
      }, {
        name: '--size-lg',
        value: '48px'
      }, {
        name: '--size-xl',
        value: '64px'
      }].map(({
        name,
        value
      }) => <TokenRow name={name} value={value} key={name} preview={<span className="token-size-box" style={{
        width: value,
        height: value
      }} />} />)}\r
      </div>\r
    </div>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div className="docs-page">\r
      <h2 className="docs-section-title">Border Tokens</h2>\r
      <div className="token-list">\r
        {[{
        name: '--border-width-sm',
        value: '1px',
        style: 'solid'
      }, {
        name: '--border-width-md',
        value: '2px',
        style: 'solid'
      }, {
        name: '--border-width-lg',
        value: '4px',
        style: 'solid'
      }, {
        name: '--border-style-dashed',
        value: 'dashed',
        width: '2px',
        style: 'dashed'
      }].map(({
        name,
        value,
        width = value,
        style
      }) => <TokenRow name={name} value={value} key={name} preview={<span className="token-shape token-shape--surface" style={{
        borderWidth: width,
        borderStyle: style
      }} />} />)}\r
      </div>\r
    </div>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div className="docs-page">\r
      <h2 className="docs-section-title">Opacity Tokens</h2>\r
      <div className="token-list">\r
        {[{
        name: '--opacity-disabled',
        value: '0.45'
      }, {
        name: '--opacity-muted',
        value: '0.64'
      }, {
        name: '--opacity-overlay',
        value: '0.72'
      }].map(({
        name,
        value
      }) => <TokenRow name={name} value={value} key={name} preview={<span className="token-shape" style={{
        opacity: value
      }} />} />)}\r
      </div>\r
    </div>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div className="docs-page">\r
      <h2 className="docs-section-title">Transition Tokens</h2>\r
      <div className="token-list">\r
        {[{
        name: '--transition-fast',
        value: '120ms ease'
      }, {
        name: '--transition-base',
        value: '160ms ease'
      }, {
        name: '--transition-slow',
        value: '240ms ease'
      }].map(({
        name,
        value
      }) => <TokenRow name={name} value={value} key={name} preview={<span className="token-transition-dot" style={{
        transition: \`transform \${value}\`
      }} />} />)}\r
      </div>\r
    </div>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <div className="docs-page">\r
      <h2 className="docs-section-title">Spacing Tokens</h2>\r
      <div className="token-list">\r
        {[{
        name: '--spacing-xs',
        value: '4px'
      }, {
        name: '--spacing-sm',
        value: '8px'
      }, {
        name: '--spacing-md',
        value: '16px'
      }, {
        name: '--spacing-lg',
        value: '24px'
      }, {
        name: '--spacing-xl',
        value: '32px'
      }].map(({
        name,
        value
      }) => <div className="token-row" key={name}>\r
            <div className="token-swatch" style={{
          background: '#0066FF',
          width: value
        }} />\r
            <div className="token-name">{name}</div>\r
            <code>{value}</code>\r
          </div>)}\r
      </div>\r
    </div>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <div className="docs-page">\r
      <h2 className="docs-section-title">Typography Tokens</h2>\r
      <div className="token-list">\r
        {[{
        name: '--font-size-xs',
        value: '12px'
      }, {
        name: '--font-size-sm',
        value: '14px'
      }, {
        name: '--font-size-base',
        value: '16px'
      }, {
        name: '--font-size-lg',
        value: '20px'
      }, {
        name: '--font-size-xl',
        value: '24px'
      }].map(({
        name,
        value
      }) => <div className="token-row" key={name}>\r
            <span style={{
          fontSize: value,
          fontWeight: 600
        }}>Aa</span>\r
            <div className="token-name">{name}</div>\r
            <code>{value}</code>\r
          </div>)}\r
      </div>\r
    </div>
}`,...C.parameters?.docs?.source}}},w=[`BrandColors`,`SurfaceColors`,`SemanticTones`,`Radius`,`Shadow`,`Size`,`Border`,`Opacity`,`Transition`,`Spacing`,`Typography`]}))();export{y as Border,p as BrandColors,b as Opacity,g as Radius,h as SemanticTones,_ as Shadow,v as Size,S as Spacing,m as SurfaceColors,x as Transition,C as Typography,w as __namedExportsOrder,s as default};