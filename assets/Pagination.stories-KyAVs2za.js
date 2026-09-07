import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{i as n,j as r}from"./iframe-GXcRKLmM.js";import{n as i,t as a}from"./Pagination-B0u1F_kg.js";var o,s,c,l,u,d,f,p,m,h,g,_,v,y;e((()=>{o=t(r(),1),i(),s=n(),{expect:c,fn:l,userEvent:u,within:d}=__STORYBOOK_MODULE_TEST__,f={title:`Navigation/Pagination`,component:a,tags:[`autodocs`],parameters:{docs:{description:{component:`Pagination lets users move through a dataset with current page, total count, and page size controls.`}}}},p=()=>{let[e,t]=(0,o.useState)(2);return(0,s.jsx)(a,{current:e,total:86,pageSize:10,onChange:t})},m={render:()=>(0,s.jsx)(p,{})},h={args:{current:1,total:24,pageSize:8,showTotal:!1}},g={args:{current:3,total:86,disabled:!0}},_={args:{current:1,total:30,pageSize:10,onChange:l()},play:async({args:e,canvasElement:t})=>{let n=d(t);await c(n.getByRole(`button`,{name:`Previous`})).toBeDisabled(),await u.click(n.getByRole(`button`,{name:`Next`})),await c(e.onChange).toHaveBeenCalledWith(2),await u.click(n.getByRole(`button`,{name:`Page 3`})),await c(e.onChange).toHaveBeenCalledWith(3),await u.click(n.getByRole(`button`,{name:`Page 1`})),await c(e.onChange).toHaveBeenCalledTimes(2)}},v={args:{current:3,total:30,pageSize:10,onChange:l()},play:async({canvasElement:e})=>{let t=d(e);await c(t.getByRole(`button`,{name:`Next`})).toBeDisabled(),await c(t.getByRole(`button`,{name:`Page 3`})).toHaveAttribute(`aria-current`,`page`)}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <ControlledPagination />
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    current: 1,
    total: 24,
    pageSize: 8,
    showTotal: false
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    current: 3,
    total: 86,
    disabled: true
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    current: 1,
    total: 30,
    pageSize: 10,
    onChange: fn()
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // 第一頁時「上一頁」停用，不會送出 page 0
    await expect(canvas.getByRole('button', {
      name: 'Previous'
    })).toBeDisabled();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Next'
    }));
    await expect(args.onChange).toHaveBeenCalledWith(2);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Page 3'
    }));
    await expect(args.onChange).toHaveBeenCalledWith(3);

    // 點目前這一頁不該重複觸發
    await userEvent.click(canvas.getByRole('button', {
      name: 'Page 1'
    }));
    await expect(args.onChange).toHaveBeenCalledTimes(2);
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    current: 3,
    total: 30,
    pageSize: 10,
    onChange: fn()
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', {
      name: 'Next'
    })).toBeDisabled();
    await expect(canvas.getByRole('button', {
      name: 'Page 3'
    })).toHaveAttribute('aria-current', 'page');
  }
}`,...v.parameters?.docs?.source}}},y=[`Basic`,`Compact`,`Disabled`,`Interaction`,`LastPageDisablesNext`]}))();export{m as Basic,h as Compact,g as Disabled,_ as Interaction,v as LastPageDisablesNext,y as __namedExportsOrder,f as default};