import{i as e}from"./preload-helper-Cs4UwXAW.js";import{i as t}from"./iframe-GXcRKLmM.js";import{n,t as r}from"./Button-B6kIJZ31.js";import{n as i,t as a}from"./Alert-CsFjMwk7.js";var o,s,c,l,u,d,f,p,m,h,g;e((()=>{n(),i(),o=t(),{expect:s,fn:c,userEvent:l,within:u}=__STORYBOOK_MODULE_TEST__,d={title:`Feedback/Alert`,component:a,tags:[`autodocs`],parameters:{docs:{description:{component:`Alert displays contextual feedback for success, info, warning, and error states.`}}}},f={args:{type:`info`,message:`New update available`,description:`Review the release notes before applying the update.`}},p={render:()=>(0,o.jsxs)(`div`,{className:`story-stack`,children:[(0,o.jsx)(a,{type:`success`,message:`Saved successfully`}),(0,o.jsx)(a,{type:`info`,message:`Information message`}),(0,o.jsx)(a,{type:`warning`,message:`Quota almost reached`}),(0,o.jsx)(a,{type:`error`,message:`Payment failed`})]})},m={render:()=>(0,o.jsx)(a,{type:`warning`,message:`Subscription expires soon`,description:`Update billing details to keep this workspace active.`,action:(0,o.jsx)(r,{size:`sm`,variant:`secondary`,children:`Manage`})})},h={args:{type:`warning`,message:`Quota almost reached`,closable:!0,onClose:c()},play:async({args:e,canvasElement:t})=>{let n=u(t);await l.click(n.getByRole(`button`,{name:`Close alert`})),await s(e.onClose).toHaveBeenCalledTimes(1),await s(n.getByText(`Quota almost reached`)).toBeInTheDocument()}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'info',
    message: 'New update available',
    description: 'Review the release notes before applying the update.'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className="story-stack">\r
      <Alert type="success" message="Saved successfully" />\r
      <Alert type="info" message="Information message" />\r
      <Alert type="warning" message="Quota almost reached" />\r
      <Alert type="error" message="Payment failed" />\r
    </div>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Alert type="warning" message="Subscription expires soon" description="Update billing details to keep this workspace active." action={<Button size="sm" variant="secondary">Manage</Button>} />
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'warning',
    message: 'Quota almost reached',
    closable: true,
    onClose: fn()
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Alert 不會自己消失 —— 要不要移除由使用端決定
    await userEvent.click(canvas.getByRole('button', {
      name: 'Close alert'
    }));
    await expect(args.onClose).toHaveBeenCalledTimes(1);
    await expect(canvas.getByText('Quota almost reached')).toBeInTheDocument();
  }
}`,...h.parameters?.docs?.source}}},g=[`Info`,`Types`,`WithAction`,`Closable`]}))();export{h as Closable,f as Info,p as Types,m as WithAction,g as __namedExportsOrder,d as default};