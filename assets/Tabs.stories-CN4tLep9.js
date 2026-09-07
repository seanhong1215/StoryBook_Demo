import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{i as n,j as r}from"./iframe-GXcRKLmM.js";import{n as i,t as a}from"./Badge-Cv40qle6.js";import{n as o,t as s}from"./Card-Bo5Gr8Da.js";var c=e((()=>{})),l,u,d,f=e((()=>{l=t(r(),1),c(),u=n(),d=(0,l.forwardRef)(({items:e=[],activeKey:t,defaultActiveKey:n,size:r=`md`,type:i=`line`,label:a,onChange:o,className:s=``},c)=>{let d=(0,l.useId)(),f=(0,l.useRef)({}),p=e[0]?.key,[m,h]=(0,l.useState)(n??p),g=t??m,_=e.find(e=>e.key===g),v=e=>`${d}-tab-${e}`,y=e=>`${d}-panel-${e}`,b=(e,n)=>{n||(t===void 0&&h(e),o?.(e))},x=e=>{b(e),f.current[e]?.focus()};return(0,u.jsxs)(`div`,{ref:c,className:[`mds-tabs`,`mds-tabs--${r}`,`mds-tabs--${i}`,s].filter(Boolean).join(` `),children:[(0,u.jsx)(`div`,{className:`mds-tabs__list`,role:`tablist`,"aria-label":a,onKeyDown:t=>{let n=e.filter(e=>!e.disabled).map(e=>e.key);if(n.length===0)return;let r=g===void 0?-1:n.indexOf(g),i=e=>r===-1?e>0?n[0]:n[n.length-1]:n[(r+e+n.length)%n.length];switch(t.key){case`ArrowRight`:t.preventDefault(),x(i(1));break;case`ArrowLeft`:t.preventDefault(),x(i(-1));break;case`Home`:t.preventDefault(),x(n[0]);break;case`End`:t.preventDefault(),x(n[n.length-1]);break;default:break}},children:e.map(e=>{let t=e.key===g;return(0,u.jsx)(`button`,{ref:t=>{f.current[e.key]=t},id:v(e.key),className:`mds-tabs__tab`,type:`button`,role:`tab`,"aria-selected":t,"aria-controls":t?y(e.key):void 0,tabIndex:t?0:-1,disabled:e.disabled,onClick:()=>b(e.key,e.disabled),children:e.label},e.key)})}),_&&(0,u.jsx)(`div`,{className:`mds-tabs__panel`,role:`tabpanel`,id:y(_.key),"aria-labelledby":v(_.key),tabIndex:0,children:_.children})]})}),d.displayName=`Tabs`;try{d.displayName=`Tabs`,d.__docgenInfo={description:``,displayName:`Tabs`,filePath:`D:/shang/技術開發/dev/技術學習/面試作品/storybook/src/components/Tabs/Tabs.tsx`,methods:[],props:{items:{defaultValue:{value:`[]`},declarations:[{fileName:`storybook/src/components/Tabs/Tabs.tsx`,name:`TabsProps`}],description:`Tab definitions.`,name:`items`,parent:{fileName:`storybook/src/components/Tabs/Tabs.tsx`,name:`TabsProps`},required:!1,tags:{},type:{name:`TabItem[] | undefined`}},activeKey:{defaultValue:null,declarations:[{fileName:`storybook/src/components/Tabs/Tabs.tsx`,name:`TabsProps`}],description:`Controlled active tab key.`,name:`activeKey`,parent:{fileName:`storybook/src/components/Tabs/Tabs.tsx`,name:`TabsProps`},required:!1,tags:{},type:{name:`string | undefined`}},defaultActiveKey:{defaultValue:null,declarations:[{fileName:`storybook/src/components/Tabs/Tabs.tsx`,name:`TabsProps`}],description:`Initial active tab key for uncontrolled usage.`,name:`defaultActiveKey`,parent:{fileName:`storybook/src/components/Tabs/Tabs.tsx`,name:`TabsProps`},required:!1,tags:{},type:{name:`string | undefined`}},size:{defaultValue:{value:`md`},declarations:[{fileName:`storybook/src/components/Tabs/Tabs.tsx`,name:`TabsProps`}],description:`Tab density.`,name:`size`,parent:{fileName:`storybook/src/components/Tabs/Tabs.tsx`,name:`TabsProps`},required:!1,tags:{},type:{name:`enum`,raw:`"sm" | "md" | "lg" | undefined`,value:[{value:`undefined`},{value:`"sm"`},{value:`"md"`},{value:`"lg"`}]}},type:{defaultValue:{value:`line`},declarations:[{fileName:`storybook/src/components/Tabs/Tabs.tsx`,name:`TabsProps`}],description:`Visual presentation of the tab list.`,name:`type`,parent:{fileName:`storybook/src/components/Tabs/Tabs.tsx`,name:`TabsProps`},required:!1,tags:{},type:{name:`enum`,raw:`"line" | "card" | undefined`,value:[{value:`undefined`},{value:`"line"`},{value:`"card"`}]}},label:{defaultValue:null,declarations:[{fileName:`storybook/src/components/Tabs/Tabs.tsx`,name:`TabsProps`}],description:`Accessible name of the tab list.

Worth setting when a page has more than one set of tabs — otherwise they are
announced identically when navigating by role.`,name:`label`,parent:{fileName:`storybook/src/components/Tabs/Tabs.tsx`,name:`TabsProps`},required:!1,tags:{},type:{name:`string | undefined`}},onChange:{defaultValue:null,declarations:[{fileName:`storybook/src/components/Tabs/Tabs.tsx`,name:`TabsProps`}],description:`Called with the tab key when the active tab changes.`,name:`onChange`,parent:{fileName:`storybook/src/components/Tabs/Tabs.tsx`,name:`TabsProps`},required:!1,tags:{},type:{name:`((key: string) => void) | undefined`}},className:{defaultValue:{value:``},declarations:[{fileName:`storybook/src/components/Tabs/Tabs.tsx`,name:`TabsProps`}],description:``,name:`className`,parent:{fileName:`storybook/src/components/Tabs/Tabs.tsx`,name:`TabsProps`},required:!1,tags:{},type:{name:`string | undefined`}}},tags:{}}}catch{}})),p,m,h,g,_,v,y,b,x,S,C,w,T;e((()=>{i(),o(),f(),p=n(),{expect:m,userEvent:h,waitFor:g,within:_}=__STORYBOOK_MODULE_TEST__,v=[{key:`overview`,label:`Overview`,children:(0,p.jsx)(s,{title:`Overview`,description:`Track product health and package adoption.`})},{key:`usage`,label:`Usage`,children:(0,p.jsx)(s,{title:`Usage`,description:`Inspect local npm pack and Product A install workflow.`})},{key:`issues`,label:`Issues`,children:(0,p.jsx)(a,{variant:`warning`,children:`3 pending reviews`})}],y={title:`Data Display/Tabs`,component:d,tags:[`autodocs`],parameters:{docs:{description:{component:[`Tabs organize related content into switchable sections with line or card`,`presentation.`,``,`**Keyboard:** the tab list is a single tab stop (roving tabindex). Arrow keys`,"move between tabs and switch immediately (automatic activation), `Home` / `End`",`jump to the first / last tab, and disabled tabs are skipped. The panel itself is`,`focusable so its content can be scrolled from the keyboard.`].join(`
`)}}}},b={args:{items:v,defaultActiveKey:`overview`}},x={args:{items:v,type:`card`,defaultActiveKey:`usage`}},S={args:{items:[...v,{key:`billing`,label:`Billing`,disabled:!0,children:`Billing is disabled.`}]}},C=[...v,{key:`billing`,label:`Billing`,disabled:!0,children:`Billing is disabled.`}],w={args:{items:C,label:`Product sections`},play:async({canvasElement:e})=>{let t=_(e),n=e=>t.getByRole(`tab`,{name:e});await m(n(`Overview`)).toHaveAttribute(`aria-selected`,`true`),await m(n(`Usage`)).toHaveAttribute(`tabindex`,`-1`),n(`Overview`).focus(),await h.keyboard(`{ArrowRight}`),await g(()=>m(n(`Usage`)).toHaveFocus()),await m(n(`Usage`)).toHaveAttribute(`aria-selected`,`true`),await h.keyboard(`{ArrowRight}`),await g(()=>m(n(`Issues`)).toHaveFocus()),await h.keyboard(`{ArrowRight}`),await g(()=>m(n(`Overview`)).toHaveFocus()),await h.keyboard(`{End}`),await g(()=>m(n(`Issues`)).toHaveFocus());let r=t.getByRole(`tabpanel`);await m(r).toHaveAttribute(`aria-labelledby`,n(`Issues`).id),await m(n(`Issues`)).toHaveAttribute(`aria-controls`,r.id)}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    items,
    defaultActiveKey: 'overview'
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    items,
    type: 'card',
    defaultActiveKey: 'usage'
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    items: [...items, {
      key: 'billing',
      label: 'Billing',
      disabled: true,
      children: 'Billing is disabled.'
    }]
  }
}`,...S.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    items: withDisabled,
    label: 'Product sections'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const tab = (name: string) => canvas.getByRole('tab', {
      name
    });

    // 沒指定 defaultActiveKey 時預設選第一個
    await expect(tab('Overview')).toHaveAttribute('aria-selected', 'true');
    // roving tabindex：整組分頁只有一個 tab stop
    await expect(tab('Usage')).toHaveAttribute('tabindex', '-1');
    tab('Overview').focus();
    await userEvent.keyboard('{ArrowRight}');
    await waitFor(() => expect(tab('Usage')).toHaveFocus());
    await expect(tab('Usage')).toHaveAttribute('aria-selected', 'true');

    // 方向鍵會跳過停用中的 Billing，直接繞回第一個
    await userEvent.keyboard('{ArrowRight}');
    await waitFor(() => expect(tab('Issues')).toHaveFocus());
    await userEvent.keyboard('{ArrowRight}');
    await waitFor(() => expect(tab('Overview')).toHaveFocus());

    // End 落在最後一個「可用」的分頁，不是 Billing
    await userEvent.keyboard('{End}');
    await waitFor(() => expect(tab('Issues')).toHaveFocus());

    // tab 與 tabpanel 互相關聯
    const panel = canvas.getByRole('tabpanel');
    await expect(panel).toHaveAttribute('aria-labelledby', tab('Issues').id);
    await expect(tab('Issues')).toHaveAttribute('aria-controls', panel.id);
  }
}`,...w.parameters?.docs?.source}}},T=[`Line`,`CardTabs`,`DisabledTab`,`KeyboardNavigation`]}))();export{x as CardTabs,S as DisabledTab,w as KeyboardNavigation,b as Line,T as __namedExportsOrder,y as default};