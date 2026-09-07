import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{i as n,j as r}from"./iframe-GXcRKLmM.js";import{n as i,t as a}from"./Button-B6kIJZ31.js";import{n as o,t as s}from"./Alert-CsFjMwk7.js";import{n as c,t as l}from"./Card-Bo5Gr8Da.js";import{n as u,t as d}from"./Checkbox-DxIxxwZ_.js";import{n as f,t as p}from"./Input-CPubDkUP.js";import{n as m,t as h}from"./Select-CO-TmKuy.js";import{n as g,t as _}from"./Space-DBh1_b87.js";import{n as v,t as y}from"./Switch-beaCiC5o.js";import{n as b,t as x}from"./Textarea-hWVxTcU5.js";var S,C,w,T,ee=e((()=>{S={value:void 0,error:void 0},C=async(e,t=[])=>{for(let n of t){if(n.required&&(e==null||e===``))return n.message||`This field is required.`;if(n.pattern&&e&&!n.pattern.test(String(e)))return n.message||`This field format is invalid.`;if(n.validator){let t=await n.validator(e);if(t)return t}}},w=class extends Error{values;errors;constructor(e,t){super(`Form validation failed`),this.name=`FormValidationError`,this.values=e,this.errors=t}},T=class{values={};initialValues={};errors={};fields=new Map;listeners=new Map;snapshots=new Map;formElement=null;setInitialValues(e){this.initialValues=e,this.values={...e}}attachElement(e){this.formElement=e}subscribe(e,t){if(!e)return()=>{};let n=this.listeners.get(e)??new Set;return this.listeners.set(e,n),n.add(t),()=>{n.delete(t)}}getFieldSnapshot(e){if(!e)return S;let t=this.snapshots.get(e),n=this.values[e],r=this.errors[e];if(t&&t.value===n&&t.error===r)return t;let i={value:n,error:r};return this.snapshots.set(e,i),i}registerField(e,t){return this.fields.set(e,t),()=>{this.fields.delete(e)}}notify(e){this.listeners.get(e)?.forEach(e=>e())}notifyAll(){this.listeners.forEach(e=>e.forEach(e=>e()))}setError(e,t){this.errors[e]!==t&&(this.errors[e]=t,this.notify(e))}async validateField(e){let t=this.fields.get(e);if(!t)return;let n=await C(this.values[e],t.getRules());return this.setError(e,n),n}getFieldsValue(){return{...this.values}}getFieldValue(e){return this.values[e]}getFieldError(e){return this.errors[e]}setFieldValue(e,t,n){this.values[e]=t;let r=n?.validate||this.errors[e]!==void 0;this.notify(e),r&&this.validateField(e)}setFieldsValue(e){Object.entries(e).forEach(([e,t])=>{this.values[e]=t}),this.notifyAll()}resetFields(){this.values={...this.initialValues},this.errors={},this.notifyAll()}async validateFields(){let e={};for(let[t,n]of this.fields){let r=await C(this.values[t],n.getRules());r&&(e[t]=r)}if(this.errors=e,this.notifyAll(),Object.keys(e).length>0)throw new w(this.getFieldsValue(),e);return this.getFieldsValue()}submit(){this.formElement?.requestSubmit()}}})),te=e((()=>{})),E,D,O,k,A,j,M,N,P,F,ne=e((()=>{E=t(r(),1),i(),ee(),te(),D=n(),O=(0,E.createContext)(null),k=new T,A=()=>{let[e]=(0,E.useState)(()=>new T);return e},j=(e,t)=>{if(e&&typeof e==`object`&&`target`in e){let n=e.target;return t===`checked`?n.checked:n.value}return e},M=(0,E.forwardRef)(({form:e,initialValues:t,onFinish:n,onFinishFailed:r,layout:i=`vertical`,validateTrigger:a=`onSubmit`,children:o,className:s=``,...c},l)=>{let u=A(),d=e??u;(0,E.useState)(()=>d.setInitialValues(t??{}));let f=(0,E.useRef)(null);(0,E.useImperativeHandle)(l,()=>f.current,[]),(0,E.useEffect)(()=>(d.attachElement(f.current),()=>d.attachElement(null)),[d]);let p=async e=>{e.preventDefault();try{let e=await d.validateFields();n?.(e)}catch(e){if(e instanceof w){r?.({values:e.values,errors:e.errors});return}throw e}},m=(0,E.useMemo)(()=>({store:d,validateTrigger:a}),[d,a]);return(0,D.jsx)(O.Provider,{value:m,children:(0,D.jsx)(`form`,{ref:f,className:[`mds-form`,`mds-form--${i}`,s].filter(Boolean).join(` `),onSubmit:p,...c,children:o})})}),M.displayName=`Form`,N=(0,E.forwardRef)(({name:e,label:t,rules:n=[],valuePropName:r=`value`,getValueFromEvent:i,validateTrigger:a,children:o,extra:s},c)=>{let l=(0,E.useContext)(O),u=l?.store??k,d=!!l&&!!e,f=a??l?.validateTrigger??`onSubmit`,p=(0,E.useCallback)(t=>u.subscribe(e,t),[u,e]),m=(0,E.useCallback)(()=>u.getFieldSnapshot(e),[u,e]),{value:h,error:g}=(0,E.useSyncExternalStore)(p,m,m),_=(0,E.useRef)(n),v=(0,E.useId)(),y=o?.props.id??`${v}-control`,b=`${v}-error`,x=`${v}-extra`,S=!!s&&!g,C=[g?b:``,S?x:``].filter(Boolean).join(` `);(0,E.useEffect)(()=>{_.current=n},[n]),(0,E.useEffect)(()=>{if(!(!d||!e))return u.registerField(e,{getRules:()=>_.current})},[d,e,u]);let w=o?{id:y,"aria-invalid":g?!0:void 0,"aria-describedby":C||void 0}:{},T=o&&(0,E.cloneElement)(o,d&&e?{...w,[r]:h??(r===`checked`?!1:``),status:g?`error`:o.props.status,onChange:(...t)=>{let n=i?i(...t):j(t[0],r);u.setFieldValue(e,n,{validate:f===`onChange`}),o.props.onChange?.(...t)},...f===`onBlur`?{onBlur:(...t)=>{u.validateField(e),o.props.onBlur?.(...t)}}:{}}:w);return(0,D.jsxs)(`div`,{ref:c,className:[`mds-form-item`,g?`mds-form-item--error`:``].filter(Boolean).join(` `),children:[t&&(0,D.jsx)(`label`,{className:`mds-form-item__label`,htmlFor:y,children:t}),(0,D.jsx)(`div`,{className:`mds-form-item__control`,children:T}),g&&(0,D.jsx)(`div`,{className:`mds-form-item__message`,id:b,role:`alert`,children:g}),S&&(0,D.jsx)(`div`,{className:`mds-form-item__extra`,id:x,children:s})]})}),N.displayName=`FormItem`,P=()=>A(),F=Object.assign(M,{Item:N,Submit:a,useForm:P});try{FormInstance.displayName=`FormInstance`,FormInstance.__docgenInfo={description:"`Form.useForm()` 回傳的操作介面。",displayName:`FormInstance`,filePath:`D:/shang/技術開發/dev/技術學習/面試作品/storybook/src/components/Form/Form.tsx`,methods:[],props:{},tags:{}}}catch{}try{N.displayName=`FormItem`,N.__docgenInfo={description:``,displayName:`FormItem`,filePath:`D:/shang/技術開發/dev/技術學習/面試作品/storybook/src/components/Form/Form.tsx`,methods:[],props:{name:{defaultValue:null,declarations:[{fileName:`storybook/src/components/Form/Form.tsx`,name:`FormItemProps`}],description:`Field name; connects the child control to the form state.`,name:`name`,parent:{fileName:`storybook/src/components/Form/Form.tsx`,name:`FormItemProps`},required:!1,tags:{},type:{name:`string | undefined`}},label:{defaultValue:null,declarations:[{fileName:`storybook/src/components/Form/Form.tsx`,name:`FormItemProps`}],description:`Field label.`,name:`label`,parent:{fileName:`storybook/src/components/Form/Form.tsx`,name:`FormItemProps`},required:!1,tags:{},type:{name:`ReactNode`}},rules:{defaultValue:{value:`[]`},declarations:[{fileName:`storybook/src/components/Form/Form.tsx`,name:`FormItemProps`}],description:`Validation rules applied on submit.`,name:`rules`,parent:{fileName:`storybook/src/components/Form/Form.tsx`,name:`FormItemProps`},required:!1,tags:{},type:{name:`FormRule[] | undefined`}},valuePropName:{defaultValue:{value:`value`},declarations:[{fileName:`storybook/src/components/Form/Form.tsx`,name:`FormItemProps`}],description:`Child prop receiving the field value (e.g. 'checked' for Checkbox).`,name:`valuePropName`,parent:{fileName:`storybook/src/components/Form/Form.tsx`,name:`FormItemProps`},required:!1,tags:{},type:{name:`string | undefined`}},getValueFromEvent:{defaultValue:null,declarations:[{fileName:`storybook/src/components/Form/Form.tsx`,name:`FormItemProps`}],description:`Derives the field value from the child's onChange arguments.`,name:`getValueFromEvent`,parent:{fileName:`storybook/src/components/Form/Form.tsx`,name:`FormItemProps`},required:!1,tags:{},type:{name:`((...args: unknown[]) => unknown) | undefined`}},validateTrigger:{defaultValue:{value:`onSubmit`},declarations:[{fileName:`storybook/src/components/Form/Form.tsx`,name:`FormItemProps`}],description:`Overrides the form-level validate trigger for this field.`,name:`validateTrigger`,parent:{fileName:`storybook/src/components/Form/Form.tsx`,name:`FormItemProps`},required:!1,tags:{},type:{name:`enum`,raw:`ValidateTrigger | undefined`,value:[{value:`undefined`},{value:`"onBlur"`},{value:`"onChange"`},{value:`"onSubmit"`}]}},children:{defaultValue:null,declarations:[{fileName:`storybook/src/components/Form/Form.tsx`,name:`FormItemProps`}],description:`A single form control element.`,name:`children`,parent:{fileName:`storybook/src/components/Form/Form.tsx`,name:`FormItemProps`},required:!1,tags:{},type:{name:`ReactElement<FieldElementProps, string | JSXElementConstructor<any>> | undefined`}},extra:{defaultValue:null,declarations:[{fileName:`storybook/src/components/Form/Form.tsx`,name:`FormItemProps`}],description:`Helper text shown when there is no error.`,name:`extra`,parent:{fileName:`storybook/src/components/Form/Form.tsx`,name:`FormItemProps`},required:!1,tags:{},type:{name:`ReactNode`}}},tags:{}}}catch{}try{F.displayName=`Form`,F.__docgenInfo={description:``,displayName:`Form`,filePath:`D:/shang/技術開發/dev/技術學習/面試作品/storybook/src/components/Form/Form.tsx`,methods:[],props:{form:{defaultValue:null,declarations:[{fileName:`storybook/src/components/Form/Form.tsx`,name:`FormProps`}],description:"Form instance from `Form.useForm()`; omit to let Form manage its own.",name:`form`,parent:{fileName:`storybook/src/components/Form/Form.tsx`,name:`FormProps`},required:!1,tags:{},type:{name:`FormInstance | undefined`}},initialValues:{defaultValue:null,declarations:[{fileName:`storybook/src/components/Form/Form.tsx`,name:`FormProps`}],description:`Initial field values keyed by field name. Applied once, on mount.`,name:`initialValues`,parent:{fileName:`storybook/src/components/Form/Form.tsx`,name:`FormProps`},required:!1,tags:{},type:{name:`FormValues | undefined`}},onFinish:{defaultValue:null,declarations:[{fileName:`storybook/src/components/Form/Form.tsx`,name:`FormProps`}],description:`Called with the values when submit passes validation.`,name:`onFinish`,parent:{fileName:`storybook/src/components/Form/Form.tsx`,name:`FormProps`},required:!1,tags:{},type:{name:`((values: FormValues) => void) | undefined`}},onFinishFailed:{defaultValue:null,declarations:[{fileName:`storybook/src/components/Form/Form.tsx`,name:`FormProps`}],description:`Called with values and errors when submit fails validation.`,name:`onFinishFailed`,parent:{fileName:`storybook/src/components/Form/Form.tsx`,name:`FormProps`},required:!1,tags:{},type:{name:`((info: { values: FormValues; errors: Record<string, string>; }) => void) | undefined`}},layout:{defaultValue:{value:`vertical`},declarations:[{fileName:`storybook/src/components/Form/Form.tsx`,name:`FormProps`}],description:`Label and control arrangement.`,name:`layout`,parent:{fileName:`storybook/src/components/Form/Form.tsx`,name:`FormProps`},required:!1,tags:{},type:{name:`enum`,raw:`"horizontal" | "vertical" | undefined`,value:[{value:`undefined`},{value:`"horizontal"`},{value:`"vertical"`}]}},validateTrigger:{defaultValue:{value:`onSubmit`},declarations:[{fileName:`storybook/src/components/Form/Form.tsx`,name:`FormProps`}],description:`When fields validate. Individual items can override it.`,name:`validateTrigger`,parent:{fileName:`storybook/src/components/Form/Form.tsx`,name:`FormProps`},required:!1,tags:{},type:{name:`enum`,raw:`ValidateTrigger | undefined`,value:[{value:`undefined`},{value:`"onBlur"`},{value:`"onChange"`},{value:`"onSubmit"`}]}}},tags:{}}}catch{}})),I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$;e((()=>{o(),i(),c(),u(),f(),m(),g(),v(),b(),ne(),I=n(),{expect:L,fn:R,userEvent:z,waitFor:B,within:V}=__STORYBOOK_MODULE_TEST__,H=[{label:`Commerce Pro`,value:`commerce-pro`},{label:`Finance Basic`,value:`finance-basic`},{label:`Internal Tools`,value:`internal-tools`}],U={title:`Data Entry/Form`,component:F,tags:[`autodocs`],parameters:{docs:{description:{component:[`Form manages field values, validation, and the submit flow, wiring controlled`,"props onto a single child control per `Form.Item`.",``,`**Validation timing:** fields validate on submit by default. A field that already`,`has an error re-validates as you type, so the message clears the moment it is`,'fixed. Set `validateTrigger="onBlur"` or `"onChange"` — on the form or on one',`item — for earlier feedback.`,``,"**`Form.useForm()`** returns an instance for reading and writing from outside:","`getFieldsValue`, `setFieldsValue`, `resetFields`, `validateFields`, `submit`.",``,`Values live in an external store rather than in context, so typing in one field`,`only re-renders that field.`].join(`
`)}}}},W=()=>{let e=F.useForm();return(0,I.jsx)(l,{title:`Create workspace`,children:(0,I.jsxs)(F,{form:e,initialValues:{inviteTeam:!0,enabled:!0},onFinish:e=>console.log(`submit`,e),children:[(0,I.jsx)(F.Item,{name:`name`,label:`Workspace name`,rules:[{required:!0,message:`Workspace name is required.`}],children:(0,I.jsx)(p,{placeholder:`Acme workspace`})}),(0,I.jsx)(F.Item,{name:`plan`,label:`Plan`,rules:[{required:!0,message:`Choose a plan.`}],children:(0,I.jsx)(h,{options:H,placeholder:`Choose a plan`})}),(0,I.jsx)(F.Item,{name:`notes`,label:`Release notes`,children:(0,I.jsx)(x,{rows:3,placeholder:`Describe the workspace setup`})}),(0,I.jsx)(F.Item,{name:`inviteTeam`,valuePropName:`checked`,children:(0,I.jsx)(d,{children:`Invite team members`})}),(0,I.jsx)(F.Item,{name:`enabled`,valuePropName:`checked`,children:(0,I.jsx)(y,{checkedChildren:`On`,unCheckedChildren:`Off`})}),(0,I.jsxs)(_,{children:[(0,I.jsx)(a,{variant:`secondary`,onClick:()=>e.resetFields(),children:`Reset`}),(0,I.jsx)(a,{type:`primary`,htmlType:`submit`,children:`Create`})]})]})})},G={render:()=>(0,I.jsx)(W,{})},K={render:()=>(0,I.jsxs)(F,{onFinishFailed:({errors:e})=>console.log(`errors`,e),children:[(0,I.jsx)(s,{type:`info`,message:`Submit the empty form to see validation states.`}),(0,I.jsx)(F.Item,{name:`email`,label:`Owner email`,rules:[{required:!0,message:`Owner email is required.`},{pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,message:`Enter a valid email.`}],children:(0,I.jsx)(p,{placeholder:`owner@example.com`})}),(0,I.jsx)(a,{type:`primary`,htmlType:`submit`,children:`Submit`})]}),play:async({canvasElement:e})=>{let t=V(e);await z.click(t.getByRole(`button`,{name:`Submit`})),await B(()=>L(t.getByText(`Owner email is required.`)).toBeInTheDocument());let n=t.getByLabelText(`Owner email`);await z.type(n,`not-an-email`),await B(()=>L(t.getByText(`Enter a valid email.`)).toBeInTheDocument()),await z.clear(n),await z.type(n,`owner@example.com`),await B(()=>L(t.queryByText(`Enter a valid email.`)).not.toBeInTheDocument())}},q={render:()=>(0,I.jsxs)(F,{validateTrigger:`onBlur`,children:[(0,I.jsx)(F.Item,{name:`email`,label:`Owner email`,rules:[{required:!0,message:`Owner email is required.`}],children:(0,I.jsx)(p,{placeholder:`owner@example.com`})}),(0,I.jsx)(F.Item,{name:`notes`,label:`Notes`,children:(0,I.jsx)(p,{placeholder:`Anything else`})})]}),play:async({canvasElement:e})=>{let t=V(e);t.getByLabelText(`Owner email`).focus(),await z.tab(),await B(()=>L(t.getByText(`Owner email is required.`)).toBeInTheDocument())}},J=({onFinish:e})=>{let t=F.useForm();return(0,I.jsxs)(`div`,{className:`story-stack`,children:[(0,I.jsxs)(_,{children:[(0,I.jsx)(a,{variant:`secondary`,onClick:()=>t.setFieldsValue({name:`Acme workspace`,plan:`commerce-pro`}),children:`Fill example`}),(0,I.jsx)(a,{variant:`secondary`,onClick:()=>t.resetFields(),children:`Reset`}),(0,I.jsx)(a,{variant:`secondary`,onClick:()=>t.submit(),children:`Submit from outside`})]}),(0,I.jsxs)(F,{form:t,initialValues:{name:``},onFinish:e,children:[(0,I.jsx)(F.Item,{name:`name`,label:`Workspace name`,rules:[{required:!0,message:`Required.`}],children:(0,I.jsx)(p,{placeholder:`Acme workspace`})}),(0,I.jsx)(F.Item,{name:`plan`,label:`Plan`,children:(0,I.jsx)(h,{options:H})})]})]})},Y={args:{onFinish:R()},render:({onFinish:e})=>(0,I.jsx)(J,{onFinish:e}),play:async({args:e,canvasElement:t})=>{let n=V(t),r=n.getByLabelText(`Workspace name`);await z.click(n.getByRole(`button`,{name:`Fill example`})),await B(()=>L(r).toHaveValue(`Acme workspace`)),await z.click(n.getByRole(`button`,{name:`Submit from outside`})),await B(()=>L(e.onFinish).toHaveBeenCalledWith(L.objectContaining({name:`Acme workspace`,plan:`commerce-pro`}))),await z.click(n.getByRole(`button`,{name:`Reset`})),await B(()=>L(r).toHaveValue(``))}},X=new Map,Z=({trackKey:e,...t})=>{let n=(X.get(e)??0)+1;return X.set(e,n),(0,I.jsxs)(`span`,{className:`story-stack`,children:[(0,I.jsx)(p,{...t}),(0,I.jsx)(`small`,{style:{color:`var(--color-text-muted)`},children:`${e} renders: ${n}`})]})},Q={render:()=>(0,I.jsxs)(F,{children:[(0,I.jsx)(F.Item,{name:`first`,label:`First field`,children:(0,I.jsx)(Z,{trackKey:`first`})}),(0,I.jsx)(F.Item,{name:`second`,label:`Second field`,children:(0,I.jsx)(Z,{trackKey:`second`})})]}),play:async({canvasElement:e})=>{let t=V(e),n=t.getByText(/^second renders:/).textContent;await z.type(t.getByLabelText(`First field`),`hello`),await B(()=>L(t.getByLabelText(`First field`)).toHaveValue(`hello`)),await L(t.getByText(/^second renders:/)).toHaveTextContent(n)}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <BasicForm />
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => <Form onFinishFailed={({
    errors
  }) => console.log('errors', errors)}>\r
      <Alert type="info" message="Submit the empty form to see validation states." />\r
      <Form.Item name="email" label="Owner email" rules={[{
      required: true,
      message: 'Owner email is required.'
    }, {
      pattern: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
      message: 'Enter a valid email.'
    }]}>\r
        <Input placeholder="owner@example.com" />\r
      </Form.Item>\r
      <Button type="primary" htmlType="submit">Submit</Button>\r
    </Form>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Submit'
    }));
    await waitFor(() => expect(canvas.getByText('Owner email is required.')).toBeInTheDocument());

    // 已經出錯的欄位，打字時立刻重驗 —— 不用再送出一次才知道格式也不對
    const input = canvas.getByLabelText('Owner email');
    await userEvent.type(input, 'not-an-email');
    await waitFor(() => expect(canvas.getByText('Enter a valid email.')).toBeInTheDocument());

    // 修好之後錯誤立刻消失
    await userEvent.clear(input);
    await userEvent.type(input, 'owner@example.com');
    await waitFor(() => expect(canvas.queryByText('Enter a valid email.')).not.toBeInTheDocument());
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => <Form validateTrigger="onBlur">\r
      <Form.Item name="email" label="Owner email" rules={[{
      required: true,
      message: 'Owner email is required.'
    }]}>\r
        <Input placeholder="owner@example.com" />\r
      </Form.Item>\r
      <Form.Item name="notes" label="Notes">\r
        <Input placeholder="Anything else" />\r
      </Form.Item>\r
    </Form>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // 只是進去又離開，沒有送出，錯誤就已經出現
    canvas.getByLabelText('Owner email').focus();
    await userEvent.tab();
    await waitFor(() => expect(canvas.getByText('Owner email is required.')).toBeInTheDocument());
  }
}`,...q.parameters?.docs?.source},description:{story:'`validateTrigger="onBlur"`：離開欄位就驗，不必等到送出。',...q.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    onFinish: fn()
  },
  render: ({
    onFinish
  }) => <InstanceForm onFinish={onFinish!} />,
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Workspace name');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Fill example'
    }));
    await waitFor(() => expect(input).toHaveValue('Acme workspace'));

    // submit() 走原生 requestSubmit()，跟使用者按送出鈕是同一條路徑
    await userEvent.click(canvas.getByRole('button', {
      name: 'Submit from outside'
    }));
    await waitFor(() => expect(args.onFinish).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Acme workspace',
      plan: 'commerce-pro'
    })));
    await userEvent.click(canvas.getByRole('button', {
      name: 'Reset'
    }));
    await waitFor(() => expect(input).toHaveValue(''));
  }
}`,...Y.parameters?.docs?.source},description:{story:"`Form.useForm()` 讓表單外的按鈕也能讀寫、重設與送出。",...Y.parameters?.docs?.description}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  render: () => <Form>\r
      <Form.Item name="first" label="First field">\r
        <CountedInput trackKey="first" />\r
      </Form.Item>\r
      <Form.Item name="second" label="Second field">\r
        <CountedInput trackKey="second" />\r
      </Form.Item>\r
    </Form>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const secondCountBefore = canvas.getByText(/^second renders:/).textContent;
    await userEvent.type(canvas.getByLabelText('First field'), 'hello');
    await waitFor(() => expect(canvas.getByLabelText('First field')).toHaveValue('hello'));

    // 第二個欄位完全沒有重繪，計數停在原地
    await expect(canvas.getByText(/^second renders:/)).toHaveTextContent(secondCountBefore!);
  }
}`,...Q.parameters?.docs?.source},description:{story:`值放在外部 store、每個欄位各自訂閱，因此在一個欄位打字不會讓其他欄位重繪。\r
值若放在 context，下面兩個計數會一起往上跳。`,...Q.parameters?.docs?.description}}},$=[`Basic`,`Validation`,`ValidateOnBlur`,`WithFormInstance`,`IsolatedRerenders`]}))();export{G as Basic,Q as IsolatedRerenders,q as ValidateOnBlur,K as Validation,Y as WithFormInstance,$ as __namedExportsOrder,U as default};