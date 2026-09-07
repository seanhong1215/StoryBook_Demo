import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{a as n,i as r,j as i,o as a}from"./iframe-GXcRKLmM.js";import{n as o,t as s}from"./usePopup-C7uwENyT.js";var c=e((()=>{})),l,u,d,f=e((()=>{l=t(i(),1),n(),s(),c(),u=r(),d=(0,l.forwardRef)(({items:e=[],trigger:t,label:n,placement:r=`bottom-start`,disabled:i=!1,className:s=``,open:c,defaultOpen:d=!1,onOpenChange:f,onSelect:p},m)=>{let{getPopupContainer:h}=a(),g=(0,l.useRef)(null);(0,l.useImperativeHandle)(m,()=>g.current,[]);let[_,v]=(0,l.useState)(d),y=c!==void 0,b=y?c:_,x=(0,l.useId)(),[S,C]=(0,l.useState)(-1),w=(0,l.useRef)([]),T=(0,l.useRef)(`first`),E=(0,l.useRef)(!1),D=e=>{i||(y||v(e),f?.(e))},{anchorRef:O,popupRef:k,popupId:A,placement:j,popupStyle:M,renderPopup:N}=o({open:b,placement:r,offset:6,container:h?.(),closeOnEscape:!1,onClose:()=>D(!1)}),P=e=>{D(!1),e&&O.current?.focus()},F=e=>{T.current=e,D(!0)};(0,l.useEffect)(()=>{if(!b){E.current=!1;return}if(E.current)return;E.current=!0;let t=T.current;T.current=`first`;let n=e.map((e,t)=>e.disabled?-1:t).filter(e=>e>=0);if(n.length===0){k.current?.focus();return}let r=t===`last`?n[n.length-1]:n[0];C(r),w.current[r]?.focus()},[b,e,k]);let I=e=>{C(e),w.current[e]?.focus()},L=()=>e.map((e,t)=>e.disabled?-1:t).filter(e=>e>=0),R=e=>{let t=L();if(t.length===0)return;let n=t.indexOf(S);I(t[n===-1?e>0?0:t.length-1:(n+e+t.length)%t.length])},z=e=>{let t=L();t.length!==0&&I(e===`first`?t[0]:t[t.length-1])},B=e=>{e.disabled||(p?.(e),P(!0))};return(0,u.jsxs)(`div`,{className:[`mds-dropdown`,s].filter(Boolean).join(` `),ref:g,children:[(0,u.jsx)(`button`,{ref:O,id:x,className:`mds-dropdown__trigger`,type:`button`,disabled:i,"aria-label":n,"aria-haspopup":`menu`,"aria-expanded":b,"aria-controls":b?A:void 0,onClick:()=>b?P(!1):F(`first`),onKeyDown:e=>{e.key===`ArrowDown`?(e.preventDefault(),F(`first`)):e.key===`ArrowUp`&&(e.preventDefault(),F(`last`))},children:t}),N((0,u.jsx)(`div`,{ref:k,id:A,className:`mds-popup mds-dropdown__menu`,"data-placement":j,style:M,role:`menu`,"aria-labelledby":x,tabIndex:-1,onKeyDown:e=>{switch(e.key){case`ArrowDown`:e.preventDefault(),R(1);break;case`ArrowUp`:e.preventDefault(),R(-1);break;case`Home`:e.preventDefault(),z(`first`);break;case`End`:e.preventDefault(),z(`last`);break;case`Escape`:e.preventDefault(),P(!0);break;case`Tab`:e.preventDefault(),P(!0);break;default:break}},children:e.map((e,t)=>(0,u.jsx)(`button`,{ref:e=>{w.current[t]=e},className:`mds-dropdown__item`,type:`button`,role:`menuitem`,disabled:e.disabled,tabIndex:t===S?0:-1,onClick:()=>B(e),children:e.label},e.key))}))]})}),d.displayName=`Dropdown`;try{d.displayName=`Dropdown`,d.__docgenInfo={description:`ref 指向外層 root div。
內部另有 anchorRef（觸發按鈕，定位基準）與 popupRef（選單），由 usePopup 提供。`,displayName:`Dropdown`,filePath:`D:/shang/技術開發/dev/技術學習/面試作品/storybook/src/components/Dropdown/Dropdown.tsx`,methods:[],props:{items:{defaultValue:{value:`[]`},declarations:[{fileName:`storybook/src/components/Dropdown/Dropdown.tsx`,name:`DropdownProps`}],description:`Menu items.`,name:`items`,parent:{fileName:`storybook/src/components/Dropdown/Dropdown.tsx`,name:`DropdownProps`},required:!1,tags:{},type:{name:`DropdownItem[] | undefined`}},trigger:{defaultValue:null,declarations:[{fileName:`storybook/src/components/Dropdown/Dropdown.tsx`,name:`DropdownProps`}],description:"Content of the built-in trigger button — text or an icon.\n\nDo not pass a `<Button>` here: Dropdown already renders its own `<button>`,\nso it would nest interactive controls (invalid HTML, breaks keyboard nav).",name:`trigger`,parent:{fileName:`storybook/src/components/Dropdown/Dropdown.tsx`,name:`DropdownProps`},required:!1,tags:{},type:{name:`ReactNode`}},label:{defaultValue:null,declarations:[{fileName:`storybook/src/components/Dropdown/Dropdown.tsx`,name:`DropdownProps`}],description:`Accessible name of the trigger.

Required when \`trigger\` is icon-only — the button would otherwise have no
name at all. Give each row's menu its own name in a table.`,name:`label`,parent:{fileName:`storybook/src/components/Dropdown/Dropdown.tsx`,name:`DropdownProps`},required:!1,tags:{},type:{name:`string | undefined`}},placement:{defaultValue:{value:`bottom-start`},declarations:[{fileName:`storybook/src/components/Dropdown/Dropdown.tsx`,name:`DropdownProps`}],description:`Preferred menu position; flips automatically when it would overflow the viewport.`,name:`placement`,parent:{fileName:`storybook/src/components/Dropdown/Dropdown.tsx`,name:`DropdownProps`},required:!1,tags:{},type:{name:`enum`,raw:`PopupPlacement | undefined`,value:[{value:`undefined`},{value:`"top"`},{value:`"bottom"`},{value:`"left"`},{value:`"right"`},{value:`"top-start"`},{value:`"bottom-start"`},{value:`"left-start"`},{value:`"right-start"`},{value:`"top-end"`},{value:`"bottom-end"`},{value:`"left-end"`},{value:`"right-end"`}]}},disabled:{defaultValue:{value:`false`},declarations:[{fileName:`storybook/src/components/Dropdown/Dropdown.tsx`,name:`DropdownProps`}],description:`Disables the trigger.`,name:`disabled`,parent:{fileName:`storybook/src/components/Dropdown/Dropdown.tsx`,name:`DropdownProps`},required:!1,tags:{},type:{name:`boolean | undefined`}},className:{defaultValue:{value:``},declarations:[{fileName:`storybook/src/components/Dropdown/Dropdown.tsx`,name:`DropdownProps`}],description:``,name:`className`,parent:{fileName:`storybook/src/components/Dropdown/Dropdown.tsx`,name:`DropdownProps`},required:!1,tags:{},type:{name:`string | undefined`}},open:{defaultValue:null,declarations:[{fileName:`storybook/src/components/Dropdown/Dropdown.tsx`,name:`DropdownProps`}],description:`Controlled open state. Leave undefined to let Dropdown manage it.`,name:`open`,parent:{fileName:`storybook/src/components/Dropdown/Dropdown.tsx`,name:`DropdownProps`},required:!1,tags:{},type:{name:`boolean | undefined`}},defaultOpen:{defaultValue:{value:`false`},declarations:[{fileName:`storybook/src/components/Dropdown/Dropdown.tsx`,name:`DropdownProps`}],description:`Initial open state for uncontrolled usage.`,name:`defaultOpen`,parent:{fileName:`storybook/src/components/Dropdown/Dropdown.tsx`,name:`DropdownProps`},required:!1,tags:{},type:{name:`boolean | undefined`}},onOpenChange:{defaultValue:null,declarations:[{fileName:`storybook/src/components/Dropdown/Dropdown.tsx`,name:`DropdownProps`}],description:`Called when the menu opens or closes.`,name:`onOpenChange`,parent:{fileName:`storybook/src/components/Dropdown/Dropdown.tsx`,name:`DropdownProps`},required:!1,tags:{},type:{name:`((open: boolean) => void) | undefined`}},onSelect:{defaultValue:null,declarations:[{fileName:`storybook/src/components/Dropdown/Dropdown.tsx`,name:`DropdownProps`}],description:`Called when an enabled item is clicked or activated with the keyboard.`,name:`onSelect`,parent:{fileName:`storybook/src/components/Dropdown/Dropdown.tsx`,name:`DropdownProps`},required:!1,tags:{},type:{name:`((item: DropdownItem) => void) | undefined`}}},tags:{}}}catch{}})),p,m,h,g,_,v,y,b,x,S,C,w,T,E,D;e((()=>{f(),p=r(),{expect:m,fn:h,screen:g,userEvent:_,waitFor:v,within:y}=__STORYBOOK_MODULE_TEST__,b=[{key:`preview`,label:`Preview package`},{key:`pack`,label:`Run npm pack`},{key:`publish`,label:`Publish release`},{key:`archive`,label:`Archive`,disabled:!0}],x={title:`Navigation/Dropdown`,component:d,tags:[`autodocs`],parameters:{docs:{description:{component:[`Dropdown reveals contextual actions from a trigger button.`,``,"The menu is rendered through a portal and positioned by the shared `usePopup`",`hook, so it flips when it would overflow the viewport and is never clipped by a`,"parent's `overflow: hidden`.",``,"**Keyboard:** `ArrowDown` / `ArrowUp` open the menu and move between items,","`Home` / `End` jump to the first / last item, `Escape` and `Tab` close it and",`return focus to the trigger. Disabled items are skipped.`,``,"`trigger` is the **content** of the built-in trigger button — pass text or an icon.","Do not pass a `<Button>`: it would render a button inside a button, which is invalid",`HTML and breaks keyboard navigation.`].join(`
`)}}}},S={args:{items:b,trigger:`Actions`}},C={args:{items:b,placement:`bottom-end`,trigger:`Release menu`}},w={args:{items:b,trigger:`Actions`},render:e=>(0,p.jsx)(`div`,{style:{border:`1px dashed var(--color-border)`,borderRadius:`var(--radius-md)`,height:72,overflow:`hidden`,padding:`var(--spacing-md)`,width:260},children:(0,p.jsx)(d,{...e})})},T={args:{items:b,trigger:`Actions`},play:async({canvasElement:e})=>{let t=y(e).getByRole(`button`,{name:`Actions`});t.focus(),await _.keyboard(`{ArrowDown}`);let n=y(await g.findByRole(`menu`)).getAllByRole(`menuitem`);await v(()=>m(n[0]).toHaveFocus()),await _.keyboard(`{ArrowDown}`),await v(()=>m(n[1]).toHaveFocus()),await _.keyboard(`{End}`),await v(()=>m(n[2]).toHaveFocus()),await _.keyboard(`{ArrowDown}`),await v(()=>m(n[0]).toHaveFocus()),await _.keyboard(`{Escape}`),await v(()=>m(g.queryByRole(`menu`)).not.toBeInTheDocument()),await m(t).toHaveFocus(),await m(t).toHaveAttribute(`aria-expanded`,`false`)}},E={args:{items:b,trigger:`Actions`,onSelect:h()},play:async({args:e,canvasElement:t})=>{let n=y(t).getByRole(`button`,{name:`Actions`});await _.click(n);let r=await g.findByRole(`menu`);await _.click(y(r).getByRole(`menuitem`,{name:`Run npm pack`})),await m(e.onSelect).toHaveBeenCalledWith(m.objectContaining({key:`pack`})),await v(()=>m(g.queryByRole(`menu`)).not.toBeInTheDocument()),await m(n).toHaveFocus()}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    items,
    trigger: 'Actions'
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    items,
    placement: 'bottom-end',
    trigger: 'Release menu'
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    items,
    trigger: 'Actions'
  },
  render: args => <div style={{
    border: '1px dashed var(--color-border)',
    borderRadius: 'var(--radius-md)',
    height: 72,
    overflow: 'hidden',
    padding: 'var(--spacing-md)',
    width: 260
  }}>\r
      <Dropdown {...args} />\r
    </div>
}`,...w.parameters?.docs?.source},description:{story:`選單 portal 到 body，因此不會被父層的 overflow: hidden 裁掉。`,...w.parameters?.docs?.description}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    items,
    trigger: 'Actions'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', {
      name: 'Actions'
    });

    // ArrowDown 開啟選單並把焦點放到第一項
    trigger.focus();
    await userEvent.keyboard('{ArrowDown}');
    const menu = await screen.findByRole('menu');
    const menuItems = within(menu).getAllByRole('menuitem');
    await waitFor(() => expect(menuItems[0]).toHaveFocus());

    // 往下移動；disabled 的 Archive 會被跳過，直接繞回第一項
    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => expect(menuItems[1]).toHaveFocus());
    await userEvent.keyboard('{End}');
    await waitFor(() => expect(menuItems[2]).toHaveFocus());
    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => expect(menuItems[0]).toHaveFocus());

    // Escape 關閉選單，焦點回到觸發按鈕
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    await expect(trigger).toHaveFocus();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    items,
    trigger: 'Actions',
    onSelect: fn()
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', {
      name: 'Actions'
    });
    await userEvent.click(trigger);
    const menu = await screen.findByRole('menu');
    await userEvent.click(within(menu).getByRole('menuitem', {
      name: 'Run npm pack'
    }));
    await expect(args.onSelect).toHaveBeenCalledWith(expect.objectContaining({
      key: 'pack'
    }));
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    await expect(trigger).toHaveFocus();
  }
}`,...E.parameters?.docs?.source}}},D=[`Basic`,`EndAligned`,`InsideClippingContainer`,`KeyboardNavigation`,`SelectingAnItem`]}))();export{S as Basic,C as EndAligned,w as InsideClippingContainer,T as KeyboardNavigation,E as SelectingAnItem,D as __namedExportsOrder,x as default};