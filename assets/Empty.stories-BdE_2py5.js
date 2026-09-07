import{i as e}from"./preload-helper-Cs4UwXAW.js";import{i as t}from"./iframe-GXcRKLmM.js";import{n,t as r}from"./Button-B6kIJZ31.js";import{n as i,t as a}from"./Empty-DX4IigG-.js";var o,s,c,l,u,d;e((()=>{n(),i(),o=t(),s={title:`Feedback/Empty`,component:a,tags:[`autodocs`],parameters:{docs:{description:{component:`Empty communicates an empty dataset and can provide a recovery action.`}}},argTypes:{title:{control:`text`},description:{control:`text`},actionText:{control:`text`}}},c={args:{title:`No projects yet`,description:`Create a project to start validating this component library in Product A.`}},l={args:{title:`No releases found`,description:`Build and pack the library before installing it in another product.`,actionText:`Create release`}},u={render:()=>(0,o.jsx)(a,{title:`No pending reviews`,description:`All package changes have been reviewed.`,action:(0,o.jsx)(r,{variant:`secondary`,size:`sm`,children:`View history`})})},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'No projects yet',
    description: 'Create a project to start validating this component library in Product A.'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'No releases found',
    description: 'Build and pack the library before installing it in another product.',
    actionText: 'Create release'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <Empty title="No pending reviews" description="All package changes have been reviewed." action={<Button variant="secondary" size="sm">View history</Button>} />
}`,...u.parameters?.docs?.source}}},d=[`Basic`,`WithAction`,`CustomAction`]}))();export{c as Basic,u as CustomAction,l as WithAction,d as __namedExportsOrder,s as default};