import{i as e}from"./preload-helper-Cs4UwXAW.js";import{i as t}from"./iframe-GXcRKLmM.js";import{n,t as r}from"./Textarea-hWVxTcU5.js";var i,a,o,s,c,l,u;e((()=>{n(),i=t(),a={title:`Data Entry/Textarea`,component:r,tags:[`autodocs`],parameters:{docs:{description:{component:[`Textarea captures longer text values with size, validation status, row count, and character count.`,``,"**Accessibility:** a `placeholder` is not a label — it disappears once the user types.","Associate a real `<label>` (via `id`/`htmlFor`) or pass `aria-label`."].join(`
`)}}}},o={args:{placeholder:`Describe the release changes`,"aria-label":`Release notes`}},s={args:{defaultValue:`Updated package installation workflow.`,maxLength:120,showCount:!0,"aria-label":`Release notes`}},c={name:`搭配可見 label`,render:()=>(0,i.jsxs)(`div`,{className:`story-stack`,children:[(0,i.jsx)(`label`,{htmlFor:`release-notes`,children:`Release notes`}),(0,i.jsx)(r,{id:`release-notes`,placeholder:`Describe the release changes`})]})},l={render:()=>(0,i.jsxs)(`div`,{className:`story-stack`,children:[(0,i.jsx)(r,{status:`error`,placeholder:`Release notes are required`,"aria-label":`Release notes, invalid`}),(0,i.jsx)(r,{status:`warning`,placeholder:`Review before publishing`,"aria-label":`Release notes, warning`}),(0,i.jsx)(r,{disabled:!0,placeholder:`Disabled textarea`,"aria-label":`Release notes, disabled`})]})},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Describe the release changes',
    'aria-label': 'Release notes'
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: 'Updated package installation workflow.',
    maxLength: 120,
    showCount: true,
    'aria-label': 'Release notes'
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: '搭配可見 label',
  render: () => <div className="story-stack">\r
      <label htmlFor="release-notes">Release notes</label>\r
      <Textarea id="release-notes" placeholder="Describe the release changes" />\r
    </div>
}`,...c.parameters?.docs?.source},description:{story:`實務上的正確寫法：用真正的 <label> 搭配 id/htmlFor。`,...c.parameters?.docs?.description}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="story-stack">\r
      <Textarea status="error" placeholder="Release notes are required" aria-label="Release notes, invalid" />\r
      <Textarea status="warning" placeholder="Review before publishing" aria-label="Release notes, warning" />\r
      <Textarea disabled placeholder="Disabled textarea" aria-label="Release notes, disabled" />\r
    </div>
}`,...l.parameters?.docs?.source}}},u=[`Basic`,`WithCount`,`WithVisibleLabel`,`Status`]}))();export{o as Basic,l as Status,s as WithCount,c as WithVisibleLabel,u as __namedExportsOrder,a as default};