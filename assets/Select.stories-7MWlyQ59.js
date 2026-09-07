import{i as e}from"./preload-helper-Cs4UwXAW.js";import{i as t}from"./iframe-GXcRKLmM.js";import{n,t as r}from"./Select-CO-TmKuy.js";var i,a,o,s,c,l,u,d,f,p,m,h,g;e((()=>{n(),i=t(),{expect:a,fn:o,userEvent:s,within:c}=__STORYBOOK_MODULE_TEST__,l=[{label:`Commerce Pro`,value:`commerce-pro`},{label:`Finance Basic`,value:`finance-basic`},{label:`Internal Tools`,value:`internal-tools`},{label:`Legacy Plan`,value:`legacy`,disabled:!0}],u={title:`Data Entry/Select`,component:r,tags:[`autodocs`],parameters:{docs:{description:{component:[`Select lets users choose one option from a compact list with size, status, and disabled states.`,``,"**Accessibility:** a `<select>` needs an accessible name. The `placeholder` prop only","renders a prompt option — it is not a label. Associate a real `<label>` (via","`id`/`htmlFor`) or pass `aria-label`."].join(`
`)}}},argTypes:{placeholder:{control:`text`}}},d={args:{options:l,placeholder:`Choose a plan`,"aria-label":`Plan`}},f={name:`Placeholder / 預設值`,render:()=>(0,i.jsxs)(`div`,{className:`story-stack`,children:[(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`label`,{htmlFor:`sel-empty`,children:`未選取（value 為空，required 會擋下）`}),(0,i.jsx)(r,{id:`sel-empty`,options:l,placeholder:`Choose a plan`})]}),(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`label`,{htmlFor:`sel-default`,children:`指定 defaultValue（非受控）`}),(0,i.jsx)(r,{id:`sel-default`,options:l,defaultValue:`finance-basic`,placeholder:`Choose a plan`})]}),(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`label`,{htmlFor:`sel-noplaceholder`,children:`不要 placeholder：傳 null，第一個選項會被選中`}),(0,i.jsx)(r,{id:`sel-noplaceholder`,options:l,placeholder:null})]}),(0,i.jsxs)(`form`,{style:{display:`flex`,gap:8,alignItems:`flex-end`},children:[(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`label`,{htmlFor:`sel-required`,children:`原生 required：直接送出會被瀏覽器擋下`}),(0,i.jsx)(r,{id:`sel-required`,options:l,placeholder:`Required`,required:!0,name:`plan`})]}),(0,i.jsx)(`button`,{type:`submit`,children:`Submit`})]})]})},p={render:()=>(0,i.jsxs)(`div`,{className:`story-stack`,children:[(0,i.jsx)(r,{size:`sm`,options:l,placeholder:`Small select`,"aria-label":`Small select`}),(0,i.jsx)(r,{size:`md`,options:l,placeholder:`Medium select`,"aria-label":`Medium select`}),(0,i.jsx)(r,{size:`lg`,options:l,placeholder:`Large select`,"aria-label":`Large select`})]})},m={render:()=>(0,i.jsxs)(`div`,{className:`story-stack`,children:[(0,i.jsx)(r,{status:`error`,options:l,placeholder:`Plan is required`,"aria-label":`Plan, invalid`}),(0,i.jsx)(r,{status:`warning`,options:l,placeholder:`Confirm plan`,"aria-label":`Plan, warning`}),(0,i.jsx)(r,{disabled:!0,options:l,placeholder:`Disabled select`,"aria-label":`Plan, disabled`})]})},h={args:{options:l,placeholder:`Choose a plan`,"aria-label":`Plan`,onChange:o()},play:async({args:e,canvasElement:t})=>{let n=c(t),r=n.getByRole(`combobox`,{name:`Plan`});await a(r).toHaveValue(``),await s.selectOptions(r,`finance-basic`),await a(r).toHaveValue(`finance-basic`),await a(e.onChange).toHaveBeenCalledTimes(1),await a(n.getByRole(`option`,{name:`Legacy Plan`})).toBeDisabled()}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    options,
    placeholder: 'Choose a plan',
    'aria-label': 'Plan'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: 'Placeholder / 預設值',
  render: () => <div className="story-stack">\r
      <div>\r
        <label htmlFor="sel-empty">未選取（value 為空，required 會擋下）</label>\r
        <Select id="sel-empty" options={options} placeholder="Choose a plan" />\r
      </div>\r
      <div>\r
        <label htmlFor="sel-default">指定 defaultValue（非受控）</label>\r
        <Select id="sel-default" options={options} defaultValue="finance-basic" placeholder="Choose a plan" />\r
      </div>\r
      <div>\r
        <label htmlFor="sel-noplaceholder">不要 placeholder：傳 null，第一個選項會被選中</label>\r
        <Select id="sel-noplaceholder" options={options} placeholder={null} />\r
      </div>\r
      <form style={{
      display: 'flex',
      gap: 8,
      alignItems: 'flex-end'
    }}>\r
        <div>\r
          <label htmlFor="sel-required">原生 required：直接送出會被瀏覽器擋下</label>\r
          <Select id="sel-required" options={options} placeholder="Required" required name="plan" />\r
        </div>\r
        <button type="submit">Submit</button>\r
      </form>\r
    </div>
}`,...f.parameters?.docs?.source},description:{story:`未選取時應停在 placeholder，而不是自動跳到第一個選項。\r
這關係到 required 驗證能否運作 —— 若 value 一開始就非空，驗證永遠不會觸發。`,...f.parameters?.docs?.description}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className="story-stack">\r
      <Select size="sm" options={options} placeholder="Small select" aria-label="Small select" />\r
      <Select size="md" options={options} placeholder="Medium select" aria-label="Medium select" />\r
      <Select size="lg" options={options} placeholder="Large select" aria-label="Large select" />\r
    </div>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div className="story-stack">\r
      <Select status="error" options={options} placeholder="Plan is required" aria-label="Plan, invalid" />\r
      <Select status="warning" options={options} placeholder="Confirm plan" aria-label="Plan, warning" />\r
      <Select disabled options={options} placeholder="Disabled select" aria-label="Plan, disabled" />\r
    </div>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    options,
    placeholder: 'Choose a plan',
    'aria-label': 'Plan',
    onChange: fn()
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox', {
      name: 'Plan'
    });

    // placeholder 是 disabled + hidden 的 option，未選取時 value 是空字串，
    // 因此 required 驗證擋得下來
    await expect(select).toHaveValue('');
    await userEvent.selectOptions(select, 'finance-basic');
    await expect(select).toHaveValue('finance-basic');
    await expect(args.onChange).toHaveBeenCalledTimes(1);
    await expect(canvas.getByRole('option', {
      name: 'Legacy Plan'
    })).toBeDisabled();
  }
}`,...h.parameters?.docs?.source}}},g=[`Basic`,`PlaceholderAndDefaults`,`Sizes`,`Status`,`Interaction`]}))();export{d as Basic,h as Interaction,f as PlaceholderAndDefaults,p as Sizes,m as Status,g as __namedExportsOrder,u as default};