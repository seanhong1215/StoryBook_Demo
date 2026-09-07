import{i as e}from"./preload-helper-Cs4UwXAW.js";import{i as t}from"./iframe-GXcRKLmM.js";import{n,t as r}from"./Switch-beaCiC5o.js";var i,a,o,s,c,l,u,d,f,p,m,h,g;e((()=>{n(),i=t(),{expect:a,fn:o,userEvent:s,within:c}=__STORYBOOK_MODULE_TEST__,l={title:`Data Entry/Switch`,component:r,tags:[`autodocs`],parameters:{docs:{description:{component:[`Switch toggles an immediate on/off setting with size, loading, and disabled states.`,``,"**Accessibility:** a Switch with no `checkedChildren`/`unCheckedChildren` has no","accessible name. Always pass `aria-label`, or associate a visible `<label>`."].join(`
`)}}},argTypes:{checkedChildren:{control:`text`},unCheckedChildren:{control:`text`}}},u={args:{defaultChecked:!0,"aria-label":`Enable workspace`}},d={render:()=>(0,i.jsxs)(`div`,{className:`story-surface`,children:[(0,i.jsx)(r,{defaultChecked:!0,checkedChildren:`On`,unCheckedChildren:`Off`}),(0,i.jsx)(r,{checkedChildren:`Yes`,unCheckedChildren:`No`})]})},f={render:()=>(0,i.jsxs)(`div`,{className:`story-surface`,children:[(0,i.jsx)(r,{size:`sm`,defaultChecked:!0,"aria-label":`Small switch`}),(0,i.jsx)(r,{size:`md`,defaultChecked:!0,"aria-label":`Medium switch`}),(0,i.jsx)(r,{size:`lg`,defaultChecked:!0,"aria-label":`Large switch`})]})},p={render:()=>(0,i.jsxs)(`div`,{className:`story-surface`,children:[(0,i.jsx)(r,{defaultChecked:!0,"aria-label":`Checked switch`}),(0,i.jsx)(r,{disabled:!0,"aria-label":`Disabled switch`}),(0,i.jsx)(r,{loading:!0,defaultChecked:!0,"aria-label":`Loading switch`})]})},m={args:{"aria-label":`Enable workspace`,onChange:o()},play:async({args:e,canvasElement:t})=>{let n=c(t).getByRole(`switch`,{name:`Enable workspace`});await a(n).not.toBeChecked(),await s.click(n),await a(n).toBeChecked(),await s.keyboard(` `),await a(n).not.toBeChecked(),await a(e.onChange).toHaveBeenCalledTimes(2)}},h={args:{disabled:!0,"aria-label":`Disabled switch`,onChange:o()},play:async({args:e,canvasElement:t})=>{let n=c(t).getByRole(`switch`);await s.click(n),await a(n).not.toBeChecked(),await a(e.onChange).not.toHaveBeenCalled()}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    defaultChecked: true,
    'aria-label': 'Enable workspace'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="story-surface">\r
      <Switch defaultChecked checkedChildren="On" unCheckedChildren="Off" />\r
      <Switch checkedChildren="Yes" unCheckedChildren="No" />\r
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div className="story-surface">\r
      <Switch size="sm" defaultChecked aria-label="Small switch" />\r
      <Switch size="md" defaultChecked aria-label="Medium switch" />\r
      <Switch size="lg" defaultChecked aria-label="Large switch" />\r
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className="story-surface">\r
      <Switch defaultChecked aria-label="Checked switch" />\r
      <Switch disabled aria-label="Disabled switch" />\r
      <Switch loading defaultChecked aria-label="Loading switch" />\r
    </div>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    'aria-label': 'Enable workspace',
    onChange: fn()
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('switch', {
      name: 'Enable workspace'
    });
    await expect(toggle).not.toBeChecked();
    await userEvent.click(toggle);
    await expect(toggle).toBeChecked();

    // 點擊後焦點在開關上，Space 應該也能切換
    await userEvent.keyboard(' ');
    await expect(toggle).not.toBeChecked();
    await expect(args.onChange).toHaveBeenCalledTimes(2);
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    'aria-label': 'Disabled switch',
    onChange: fn()
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const toggle = within(canvasElement).getByRole('switch');
    await userEvent.click(toggle);
    await expect(toggle).not.toBeChecked();
    await expect(args.onChange).not.toHaveBeenCalled();
  }
}`,...h.parameters?.docs?.source}}},g=[`Basic`,`WithLabels`,`Sizes`,`States`,`Interaction`,`DisabledDoesNotToggle`]}))();export{u as Basic,h as DisabledDoesNotToggle,m as Interaction,f as Sizes,p as States,d as WithLabels,g as __namedExportsOrder,l as default};