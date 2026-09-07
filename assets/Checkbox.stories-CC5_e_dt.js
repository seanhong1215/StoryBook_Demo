import{i as e}from"./preload-helper-Cs4UwXAW.js";import{i as t}from"./iframe-GXcRKLmM.js";import{n,t as r}from"./Checkbox-DxIxxwZ_.js";var i,a,o,s,c,l,u,d,f,p,m,h,g,_;e((()=>{n(),i=t(),{expect:a,fn:o,userEvent:s,within:c}=__STORYBOOK_MODULE_TEST__,l={title:`Data Entry/Checkbox`,component:r,tags:[`autodocs`],parameters:{docs:{description:{component:`Checkbox captures binary choices and supports checked, disabled, and indeterminate states.`}}},argTypes:{children:{control:`text`}}},u={args:{children:`Receive product updates`}},d={args:{defaultChecked:!0,children:`Enable workspace access`}},f={args:{indeterminate:!0,children:`Select all permissions`}},p={render:()=>(0,i.jsxs)(`div`,{className:`story-stack`,children:[(0,i.jsx)(r,{defaultChecked:!0,children:`Read access`}),(0,i.jsx)(r,{defaultChecked:!0,children:`Write access`}),(0,i.jsx)(r,{children:`Billing access`}),(0,i.jsx)(r,{disabled:!0,children:`Owner access`})]})},m={args:{children:`Receive product updates`,onChange:o()},play:async({args:e,canvasElement:t})=>{let n=c(t).getByRole(`checkbox`,{name:`Receive product updates`});await a(n).not.toBeChecked(),await s.click(n),await a(n).toBeChecked(),await a(e.onChange).toHaveBeenCalledTimes(1)}},h={args:{indeterminate:!0,children:`Select all permissions`},play:async({canvasElement:e})=>{let t=c(e).getByRole(`checkbox`);await a(t.indeterminate).toBe(!0),await a(t).not.toBeChecked()}},g={args:{disabled:!0,children:`Owner access`,onChange:o()},play:async({args:e,canvasElement:t})=>{let n=c(t).getByRole(`checkbox`);await s.click(n),await a(n).not.toBeChecked(),await a(e.onChange).not.toHaveBeenCalled()}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Receive product updates'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    defaultChecked: true,
    children: 'Enable workspace access'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    indeterminate: true,
    children: 'Select all permissions'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className="story-stack">\r
      <Checkbox defaultChecked>Read access</Checkbox>\r
      <Checkbox defaultChecked>Write access</Checkbox>\r
      <Checkbox>Billing access</Checkbox>\r
      <Checkbox disabled>Owner access</Checkbox>\r
    </div>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Receive product updates',
    onChange: fn()
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const box = canvas.getByRole('checkbox', {
      name: 'Receive product updates'
    });
    await expect(box).not.toBeChecked();
    await userEvent.click(box);
    await expect(box).toBeChecked();
    await expect(args.onChange).toHaveBeenCalledTimes(1);
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    indeterminate: true,
    children: 'Select all permissions'
  },
  play: async ({
    canvasElement
  }) => {
    const box = within(canvasElement).getByRole('checkbox') as HTMLInputElement;
    await expect(box.indeterminate).toBe(true);
    // 半選不等於已選：value 仍然是未勾選
    await expect(box).not.toBeChecked();
  }
}`,...h.parameters?.docs?.source},description:{story:`indeterminate 沒有對應的 HTML 屬性，只能透過 DOM property 設定。`,...h.parameters?.docs?.description}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    children: 'Owner access',
    onChange: fn()
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const box = within(canvasElement).getByRole('checkbox');
    await userEvent.click(box);
    await expect(box).not.toBeChecked();
    await expect(args.onChange).not.toHaveBeenCalled();
  }
}`,...g.parameters?.docs?.source}}},_=[`Basic`,`Checked`,`Indeterminate`,`Group`,`Interaction`,`IndeterminateIsDomOnly`,`DisabledDoesNotToggle`]}))();export{u as Basic,d as Checked,g as DisabledDoesNotToggle,p as Group,f as Indeterminate,h as IndeterminateIsDomOnly,m as Interaction,_ as __namedExportsOrder,l as default};