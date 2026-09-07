import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{a as n,i as r,j as i,o as a}from"./iframe-GXcRKLmM.js";import{n as o,t as s}from"./Button-B6kIJZ31.js";import{n as c,t as l}from"./usePopup-C7uwENyT.js";import{n as u,t as d}from"./Space-DBh1_b87.js";import{r as f,t as p}from"./focusable-V4Bj4IJN.js";var m=e((()=>{})),h,g,_,v=e((()=>{h=t(i(),1),n(),f(),l(),m(),g=r(),_=(0,h.forwardRef)(({title:e,placement:t=`top`,children:n,className:r=``,open:i,defaultOpen:o=!1,mouseEnterDelay:s=100,mouseLeaveDelay:l=100,onOpenChange:u},d)=>{let{getPopupContainer:f}=a(),[m,_]=(0,h.useState)(o),v=i!==void 0,y=e!=null&&e!==``,b=(v?i:m)&&y,x=(0,h.useRef)(void 0),S=(0,h.useRef)(null),[C,w]=(0,h.useState)(!1),T=e=>{v||_(e),u?.(e)},{anchorRef:E,popupRef:D,popupId:O,placement:k,popupStyle:A,renderPopup:j}=c({open:b,placement:t,container:f?.(),onClose:()=>T(!1)});(0,h.useImperativeHandle)(d,()=>E.current,[E]),(0,h.useEffect)(()=>()=>clearTimeout(x.current),[]),(0,h.useEffect)(()=>{let e=E.current;if(!e)return;let t=e.querySelector(p);S.current=t??e,w(!t)},[E,n]),(0,h.useEffect)(()=>{let e=S.current;if(!(!e||!b))return e.setAttribute(`aria-describedby`,O),()=>e.removeAttribute(`aria-describedby`)},[b,O]);let M=(e,t)=>{if(clearTimeout(x.current),t<=0){T(e);return}x.current=setTimeout(()=>T(e),t)};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(`span`,{ref:E,className:[`mds-tooltip`,r].filter(Boolean).join(` `),tabIndex:C&&y?0:void 0,onPointerEnter:()=>M(!0,s),onPointerLeave:()=>M(!1,l),onFocus:()=>{clearTimeout(x.current),T(!0)},onBlur:()=>{clearTimeout(x.current),T(!1)},children:n}),j((0,g.jsx)(`div`,{ref:D,id:O,className:`mds-popup mds-tooltip__content`,"data-placement":k,style:A,role:`tooltip`,children:e}))]})}),_.displayName=`Tooltip`;try{_.displayName=`Tooltip`,_.__docgenInfo={description:`ref 指向外層 wrapper（也是定位的基準元素）。`,displayName:`Tooltip`,filePath:`D:/shang/技術開發/dev/技術學習/面試作品/storybook/src/components/Tooltip/Tooltip.tsx`,methods:[],props:{title:{defaultValue:null,declarations:[{fileName:`storybook/src/components/Tooltip/Tooltip.tsx`,name:`TooltipProps`}],description:`Content shown inside the tooltip bubble.`,name:`title`,parent:{fileName:`storybook/src/components/Tooltip/Tooltip.tsx`,name:`TooltipProps`},required:!1,tags:{},type:{name:`ReactNode`}},placement:{defaultValue:{value:`top`},declarations:[{fileName:`storybook/src/components/Tooltip/Tooltip.tsx`,name:`TooltipProps`}],description:`Preferred bubble position; flips automatically when it would overflow the viewport.`,name:`placement`,parent:{fileName:`storybook/src/components/Tooltip/Tooltip.tsx`,name:`TooltipProps`},required:!1,tags:{},type:{name:`enum`,raw:`PopupPlacement | undefined`,value:[{value:`undefined`},{value:`"top"`},{value:`"bottom"`},{value:`"left"`},{value:`"right"`},{value:`"top-start"`},{value:`"bottom-start"`},{value:`"left-start"`},{value:`"right-start"`},{value:`"top-end"`},{value:`"bottom-end"`},{value:`"left-end"`},{value:`"right-end"`}]}},children:{defaultValue:null,declarations:[{fileName:`storybook/src/components/Tooltip/Tooltip.tsx`,name:`TooltipProps`}],description:`Trigger element.`,name:`children`,parent:{fileName:`storybook/src/components/Tooltip/Tooltip.tsx`,name:`TooltipProps`},required:!1,tags:{},type:{name:`ReactNode`}},className:{defaultValue:{value:``},declarations:[{fileName:`storybook/src/components/Tooltip/Tooltip.tsx`,name:`TooltipProps`}],description:``,name:`className`,parent:{fileName:`storybook/src/components/Tooltip/Tooltip.tsx`,name:`TooltipProps`},required:!1,tags:{},type:{name:`string | undefined`}},open:{defaultValue:null,declarations:[{fileName:`storybook/src/components/Tooltip/Tooltip.tsx`,name:`TooltipProps`}],description:`Controlled visibility. Leave undefined for hover/focus behaviour.`,name:`open`,parent:{fileName:`storybook/src/components/Tooltip/Tooltip.tsx`,name:`TooltipProps`},required:!1,tags:{},type:{name:`boolean | undefined`}},defaultOpen:{defaultValue:{value:`false`},declarations:[{fileName:`storybook/src/components/Tooltip/Tooltip.tsx`,name:`TooltipProps`}],description:`Initial visibility for uncontrolled usage.`,name:`defaultOpen`,parent:{fileName:`storybook/src/components/Tooltip/Tooltip.tsx`,name:`TooltipProps`},required:!1,tags:{},type:{name:`boolean | undefined`}},mouseEnterDelay:{defaultValue:{value:`100`},declarations:[{fileName:`storybook/src/components/Tooltip/Tooltip.tsx`,name:`TooltipProps`}],description:`Delay before showing on pointer enter, in milliseconds.`,name:`mouseEnterDelay`,parent:{fileName:`storybook/src/components/Tooltip/Tooltip.tsx`,name:`TooltipProps`},required:!1,tags:{},type:{name:`number | undefined`}},mouseLeaveDelay:{defaultValue:{value:`100`},declarations:[{fileName:`storybook/src/components/Tooltip/Tooltip.tsx`,name:`TooltipProps`}],description:`Delay before hiding on pointer leave, in milliseconds.`,name:`mouseLeaveDelay`,parent:{fileName:`storybook/src/components/Tooltip/Tooltip.tsx`,name:`TooltipProps`},required:!1,tags:{},type:{name:`number | undefined`}},onOpenChange:{defaultValue:null,declarations:[{fileName:`storybook/src/components/Tooltip/Tooltip.tsx`,name:`TooltipProps`}],description:`Called when the tooltip opens or closes.`,name:`onOpenChange`,parent:{fileName:`storybook/src/components/Tooltip/Tooltip.tsx`,name:`TooltipProps`},required:!1,tags:{},type:{name:`((open: boolean) => void) | undefined`}}},tags:{}}}catch{}})),y,b,x,S,C,w,T,E,D,O,k,A,j,M;e((()=>{o(),u(),v(),y=r(),{expect:b,screen:x,userEvent:S,waitFor:C,within:w}=__STORYBOOK_MODULE_TEST__,T={title:`Feedback/Tooltip`,component:_,tags:[`autodocs`],parameters:{docs:{description:{component:[`Tooltip provides short contextual help on hover or keyboard focus.`,``,"The bubble is rendered through a portal and positioned by the shared `usePopup`",`hook, so it flips when it would overflow the viewport and is never clipped by a`,"parent's `overflow: hidden`.",``,`**Accessibility:** while open, the tooltip is linked to the trigger with`,"`aria-describedby`, and `Escape` dismisses it. If `children` is not focusable",`(plain text, for example), the wrapper becomes the tab stop so keyboard users can`,`still reach the tooltip — a focusable child keeps its own single tab stop.`].join(`
`)}}},argTypes:{title:{control:`text`}}},E={args:{title:`Build and pack before installing in Product A.`,children:(0,y.jsx)(s,{variant:`secondary`,children:`Hover me`})}},D={render:()=>(0,y.jsxs)(d,{children:[(0,y.jsx)(_,{title:`Top placement`,placement:`top`,children:(0,y.jsx)(s,{variant:`secondary`,children:`Top`})}),(0,y.jsx)(_,{title:`Bottom placement`,placement:`bottom`,children:(0,y.jsx)(s,{variant:`secondary`,children:`Bottom`})}),(0,y.jsx)(_,{title:`Left placement`,placement:`left`,children:(0,y.jsx)(s,{variant:`secondary`,children:`Left`})}),(0,y.jsx)(_,{title:`Right placement`,placement:`right`,children:(0,y.jsx)(s,{variant:`secondary`,children:`Right`})})]})},O={args:{title:`This library is published to GitHub Packages, so installing it needs an authenticated .npmrc.`,children:(0,y.jsx)(s,{variant:`secondary`,children:`Install notes`})}},k={args:{title:`Semantic version of the published package.`,children:(0,y.jsx)(`span`,{style:{borderBottom:`1px dotted currentColor`},children:`0.1.0`})}},A={args:{title:`Not enough room above, so this flipped below.`,placement:`top`,open:!0,children:(0,y.jsx)(s,{variant:`secondary`,children:`Near the top edge`})},play:async()=>{let e=await x.findByRole(`tooltip`);await C(()=>b(e).toHaveAttribute(`data-placement`,`bottom`))}},j={args:{title:`Shown on focus, dismissed with Escape.`,children:(0,y.jsx)(s,{variant:`secondary`,children:`Focus me`})},play:async({canvasElement:e})=>{let t=w(e).getByRole(`button`,{name:`Focus me`});t.focus();let n=await x.findByRole(`tooltip`);await C(()=>b(t).toHaveAttribute(`aria-describedby`,n.id)),await S.keyboard(`{Escape}`),await C(()=>b(x.queryByRole(`tooltip`)).not.toBeInTheDocument()),await b(t).not.toHaveAttribute(`aria-describedby`)}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Build and pack before installing in Product A.',
    children: <Button variant="secondary">Hover me</Button>
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <Space>\r
      <Tooltip title="Top placement" placement="top">\r
        <Button variant="secondary">Top</Button>\r
      </Tooltip>\r
      <Tooltip title="Bottom placement" placement="bottom">\r
        <Button variant="secondary">Bottom</Button>\r
      </Tooltip>\r
      <Tooltip title="Left placement" placement="left">\r
        <Button variant="secondary">Left</Button>\r
      </Tooltip>\r
      <Tooltip title="Right placement" placement="right">\r
        <Button variant="secondary">Right</Button>\r
      </Tooltip>\r
    </Space>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'This library is published to GitHub Packages, so installing it needs an authenticated .npmrc.',
    children: <Button variant="secondary">Install notes</Button>
  }
}`,...O.parameters?.docs?.source},description:{story:`長內容會換行，不會像舊版 white-space: nowrap 那樣衝出泡泡。`,...O.parameters?.docs?.description}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Semantic version of the published package.',
    children: <span style={{
      borderBottom: '1px dotted currentColor'
    }}>0.1.0</span>
  }
}`,...k.parameters?.docs?.source},description:{story:`children 不可 focus 時，wrapper 會接手成為 tab stop。`,...k.parameters?.docs?.description}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Not enough room above, so this flipped below.',
    placement: 'top',
    open: true,
    children: <Button variant="secondary">Near the top edge</Button>
  },
  play: async () => {
    const tooltip = await screen.findByRole('tooltip');
    await waitFor(() => expect(tooltip).toHaveAttribute('data-placement', 'bottom'));
  }
}`,...A.parameters?.docs?.source},description:{story:`觸發元素貼著視窗上緣時，placement="top" 會自動翻到下方。\r
舊版純 CSS 定位沒有邊界偵測，這裡會直接被切掉。`,...A.parameters?.docs?.description}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Shown on focus, dismissed with Escape.',
    children: <Button variant="secondary">Focus me</Button>
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', {
      name: 'Focus me'
    });

    // 鍵盤 focus 立即顯示（不套用 mouseEnterDelay）
    trigger.focus();
    const tooltip = await screen.findByRole('tooltip');

    // aria-describedby 掛在真正被 focus 的 <button> 上，而不是外層 wrapper
    await waitFor(() => expect(trigger).toHaveAttribute('aria-describedby', tooltip.id));
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
    await expect(trigger).not.toHaveAttribute('aria-describedby');
  }
}`,...j.parameters?.docs?.source}}},M=[`Basic`,`Placements`,`LongContent`,`PlainTextTrigger`,`FlipsNearViewportEdge`,`KeyboardAndEscape`]}))();export{E as Basic,A as FlipsNearViewportEdge,j as KeyboardAndEscape,O as LongContent,D as Placements,k as PlainTextTrigger,M as __namedExportsOrder,T as default};