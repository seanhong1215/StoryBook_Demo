import{i as e}from"./preload-helper-Cs4UwXAW.js";import{c as t,i as n,l as r,n as i,r as a}from"./iframe-GXcRKLmM.js";import{n as o,t as s}from"./Empty-DX4IigG-.js";import{n as c,t as l}from"./Input-CPubDkUP.js";import{n as u,t as d}from"./Select-CO-TmKuy.js";import{n as f,t as p}from"./Pagination-B0u1F_kg.js";var m,h=e((()=>{m={locale:`zh-TW`,alert:{close:`關閉提示`},empty:{title:`沒有資料`},input:{clear:`清除輸入`},modal:{ok:`確定`,cancel:`取消`,close:`關閉對話框`},pagination:{label:`分頁`,previous:`上一頁`,next:`下一頁`,total:e=>`共 ${e} 筆`,page:e=>`第 ${e} 頁`},select:{placeholder:`請選擇`},table:{emptyText:`沒有資料`,loading:`載入中`,selectAll:`全選`,selectRow:e=>`選取 ${e}`}}})),g,_,v,y,b,x,S,C;e((()=>{a(),r(),h(),o(),c(),f(),u(),g=n(),{expect:_,within:v}=__STORYBOOK_MODULE_TEST__,y={title:`Foundation/Localization`,tags:[`autodocs`],parameters:{docs:{description:{component:["`ConfigProvider` supplies the copy that components render themselves — default",`button labels, empty states, and the accessible names of controls that have no`,`visible text (the clear button, the row checkboxes, the page buttons).`,``,`Anything you pass as a prop always wins; the locale is only the default. Without`,"a provider components fall back to `en`, so nothing has to be wrapped just to",`render.`,``,`Values that need a number are functions rather than templates, because the word`,"order differs per language: `共 6 筆` and `6 items` cannot come from one","`{n} …` string."].join(`
`)}}}},b=({locale:e})=>(0,g.jsx)(i,{locale:e,children:(0,g.jsxs)(`div`,{className:`story-stack`,children:[(0,g.jsx)(`strong`,{children:e.locale}),(0,g.jsx)(d,{"aria-label":`plan (${e.locale})`,options:[{label:`Commerce Pro`,value:`a`}]}),(0,g.jsx)(l,{allowClear:!0,defaultValue:`ORD-1024`,"aria-label":`order (${e.locale})`}),(0,g.jsx)(p,{current:2,total:48,pageSize:10}),(0,g.jsx)(s,{})]})}),x={render:()=>(0,g.jsxs)(`div`,{style:{display:`grid`,gap:`var(--spacing-xl)`,gridTemplateColumns:`repeat(2, minmax(0, 1fr))`},children:[(0,g.jsx)(b,{locale:t}),(0,g.jsx)(b,{locale:m})]}),play:async({canvasElement:e})=>{let t=v(e);await _(t.getByText(`請選擇`)).toBeInTheDocument(),await _(t.getByText(`上一頁`)).toBeInTheDocument(),await _(t.getByText(`共 48 筆`)).toBeInTheDocument(),await _(t.getByText(`沒有資料`)).toBeInTheDocument(),await _(t.getByRole(`button`,{name:`清除輸入`})).toBeInTheDocument(),await _(t.getByRole(`button`,{name:`第 3 頁`})).toBeInTheDocument(),await _(t.getByText(`48 items`)).toBeInTheDocument(),await _(t.getByRole(`button`,{name:`Clear input`})).toBeInTheDocument()}},S={render:()=>(0,g.jsx)(i,{locale:m,children:(0,g.jsxs)(`div`,{className:`story-stack`,children:[(0,g.jsx)(p,{current:1,total:30,pageSize:10,label:`核心產品線分頁`}),(0,g.jsx)(i,{productLine:`finance`,children:(0,g.jsx)(p,{current:1,total:30,pageSize:10,label:`金融產品線分頁`})})]})})},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gap: 'var(--spacing-xl)',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
  }}>\r
      <Sample locale={en} />\r
      <Sample locale={zhTW} />\r
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // 元件自己渲染的文案跟著 locale 走
    await expect(canvas.getByText('請選擇')).toBeInTheDocument();
    await expect(canvas.getByText('上一頁')).toBeInTheDocument();
    await expect(canvas.getByText('共 48 筆')).toBeInTheDocument();
    await expect(canvas.getByText('沒有資料')).toBeInTheDocument();

    // 沒有可見文字的控制項，無障礙名稱也跟著換
    await expect(canvas.getByRole('button', {
      name: '清除輸入'
    })).toBeInTheDocument();
    await expect(canvas.getByRole('button', {
      name: '第 3 頁'
    })).toBeInTheDocument();

    // 英文那一側不受影響
    await expect(canvas.getByText('48 items')).toBeInTheDocument();
    await expect(canvas.getByRole('button', {
      name: 'Clear input'
    })).toBeInTheDocument();
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <ConfigProvider locale={zhTW}>\r
      <div className="story-stack">\r
        {/* 同一頁有兩個分頁時要各自命名，否則以 landmark 導覽時分不出來 */}\r
        <Pagination current={1} total={30} pageSize={10} label="核心產品線分頁" />\r
        <ConfigProvider productLine="finance">\r
          <Pagination current={1} total={30} pageSize={10} label="金融產品線分頁" />\r
        </ConfigProvider>\r
      </div>\r
    </ConfigProvider>
}`,...S.parameters?.docs?.source},description:{story:`巢狀時只覆寫有傳的項目：內層只換產品線，語系從外層繼承。`,...S.parameters?.docs?.description}}},C=[`Comparison`,`NestedProviders`]}))();export{x as Comparison,S as NestedProviders,C as __namedExportsOrder,y as default};