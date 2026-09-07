import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{i as n,j as r}from"./iframe-GXcRKLmM.js";import{n as i,t as a}from"./Input-CPubDkUP.js";var o,s,c,l,u,d,f,p,m,h,g,_,v,y,b;e((()=>{o=t(r(),1),i(),s=n(),{expect:c,userEvent:l,waitFor:u,within:d}=__STORYBOOK_MODULE_TEST__,f={title:`Data Entry/Input`,component:a,tags:[`autodocs`],parameters:{docs:{description:{component:[`Input captures short text values with size, status, prefix, suffix, and clear`,`affordances.`,``,"`allowClear` clears by writing to the real DOM node and dispatching a real input","event, so `onChange` receives a normal event — `event.target.name`,","`event.target.form` and validity all work, and libraries that read the event",`(react-hook-form, for example) behave the same as for typing. It works`,`controlled and uncontrolled.`].join(`
`)}}},argTypes:{prefix:{control:`text`},suffix:{control:`text`}}},p={args:{placeholder:`Search products`}},m={render:()=>(0,s.jsxs)(`div`,{className:`story-stack`,children:[(0,s.jsx)(a,{size:`sm`,placeholder:`Small input`}),(0,s.jsx)(a,{size:`md`,placeholder:`Medium input`}),(0,s.jsx)(a,{size:`lg`,placeholder:`Large input`})]})},h={render:()=>(0,s.jsxs)(`div`,{className:`story-stack`,children:[(0,s.jsx)(a,{prefix:`https://`,suffix:`.com`,placeholder:`domain`}),(0,s.jsx)(a,{prefix:`$`,placeholder:`Amount`})]})},g={render:()=>(0,s.jsxs)(`div`,{className:`story-stack`,children:[(0,s.jsx)(a,{status:`error`,placeholder:`Required field`}),(0,s.jsx)(a,{status:`warning`,placeholder:`Check this value`}),(0,s.jsx)(a,{disabled:!0,placeholder:`Disabled input`})]})},_={args:{allowClear:!0,defaultValue:`ORD-1024`,"aria-label":`Order number`},play:async({canvasElement:e})=>{let t=d(e),n=t.getByRole(`textbox`,{name:`Order number`});await l.click(t.getByRole(`button`,{name:`Clear input`})),await u(()=>c(n).toHaveValue(``)),await c(t.queryByRole(`button`,{name:`Clear input`})).not.toBeInTheDocument(),await c(n).toHaveFocus(),await l.type(n,`ORD-2048`),await u(()=>c(t.getByRole(`button`,{name:`Clear input`})).toBeInTheDocument())}},v=()=>{let[e,t]=(0,o.useState)(`ORD-1024`),[n,r]=(0,o.useState)(`—`);return(0,s.jsxs)(`div`,{className:`story-stack`,children:[(0,s.jsx)(a,{allowClear:!0,name:`keyword`,"aria-label":`Keyword`,value:e,onChange:e=>{t(e.target.value),r(`name=${e.target.name} value="${e.target.value}"`)}}),(0,s.jsxs)(`small`,{style:{color:`var(--color-text-muted)`},children:[`最後一次 onChange 收到的 event.target：`,n]})]})},y={render:()=>(0,s.jsx)(v,{}),play:async({canvasElement:e})=>{let t=d(e),n=t.getByRole(`textbox`,{name:`Keyword`});await l.click(t.getByRole(`button`,{name:`Clear input`})),await u(()=>c(n).toHaveValue(``)),await c(t.getByText(/name=keyword value=""/)).toBeInTheDocument()}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Search products'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div className="story-stack">\r
      <Input size="sm" placeholder="Small input" />\r
      <Input size="md" placeholder="Medium input" />\r
      <Input size="lg" placeholder="Large input" />\r
    </div>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div className="story-stack">\r
      <Input prefix="https://" suffix=".com" placeholder="domain" />\r
      <Input prefix="$" placeholder="Amount" />\r
    </div>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div className="story-stack">\r
      <Input status="error" placeholder="Required field" />\r
      <Input status="warning" placeholder="Check this value" />\r
      <Input disabled placeholder="Disabled input" />\r
    </div>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    allowClear: true,
    defaultValue: 'ORD-1024',
    'aria-label': 'Order number'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', {
      name: 'Order number'
    });
    await userEvent.click(canvas.getByRole('button', {
      name: 'Clear input'
    }));
    await waitFor(() => expect(input).toHaveValue(''));
    // 清空後按鈕自己收起來，焦點回到輸入框可以直接接著打字
    await expect(canvas.queryByRole('button', {
      name: 'Clear input'
    })).not.toBeInTheDocument();
    await expect(input).toHaveFocus();
    await userEvent.type(input, 'ORD-2048');
    await waitFor(() => expect(canvas.getByRole('button', {
      name: 'Clear input'
    })).toBeInTheDocument());
  }
}`,..._.parameters?.docs?.source},description:{story:`非受控用法：清除鈕會依「欄位裡目前有沒有字」出現，\r
按下去輸入框真的會清空（不是只有 onChange 收到通知）。`,..._.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <ControlledClearInput />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', {
      name: 'Keyword'
    });
    await userEvent.click(canvas.getByRole('button', {
      name: 'Clear input'
    }));
    await waitFor(() => expect(input).toHaveValue(''));
    // target 是真的 DOM 節點，所以 name 拿得到（假事件時是 undefined）
    await expect(canvas.getByText(/name=keyword value=""/)).toBeInTheDocument();
  }
}`,...y.parameters?.docs?.source},description:{story:"受控用法：清除送出的是真事件，`event.target` 就是那個 `<input>`。",...y.parameters?.docs?.description}}},b=[`Basic`,`Sizes`,`WithAffixes`,`Status`,`AllowClearUncontrolled`,`AllowClearControlled`]}))();export{y as AllowClearControlled,_ as AllowClearUncontrolled,p as Basic,m as Sizes,g as Status,h as WithAffixes,b as __namedExportsOrder,f as default};