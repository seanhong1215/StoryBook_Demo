import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{a as n,i as r,j as i,s as a}from"./iframe-GXcRKLmM.js";import{n as o,t as s}from"./Button-B6kIJZ31.js";import{n as c,t as l}from"./Icon-DXhI3zR8.js";import{n as u,t as d}from"./Badge-Cv40qle6.js";import{n as f,t as p}from"./Checkbox-DxIxxwZ_.js";import{n as m,t as h}from"./Empty-DX4IigG-.js";import{n as g,t as _}from"./Pagination-B0u1F_kg.js";import{n as v,t as y}from"./Tag-Bz5DYx4_.js";var b=e((()=>{})),x,S,C,w,T,E,D=e((()=>{x=t(i(),1),n(),f(),m(),c(),g(),b(),S=r(),C=(e,t)=>typeof t==`function`?t(e):e[t],w=(e,t)=>{let n=e==null||e===``,r=t==null||t===``;return n||r?n&&r?0:n?-1:1:typeof e==`number`&&typeof t==`number`?e-t:typeof e==`boolean`&&typeof t==`boolean`?Number(e)-Number(t):e instanceof Date&&t instanceof Date?e.getTime()-t.getTime():String(e).localeCompare(String(t),void 0,{numeric:!0})},T=({columns:e=[],dataSource:t=[],rowKey:n=`key`,loading:r=!1,pagination:i={},sort:o,defaultSort:s=null,manual:c=!1,rowSelection:u,emptyText:d,className:f=``,onChange:m},g)=>{let v=a(),y=i===!1?null:i,b=y?.pageSize??5,T=o!==void 0,[E,D]=(0,x.useState)(s),O=T?o:E,k=y?.current!==void 0,[A,j]=(0,x.useState)(1),M=y?.current??A,N=(0,x.useMemo)(()=>{if(c||!O)return t;let n=e.find(e=>(e.key||e.dataIndex)===O.columnKey);if(!n?.sorter)return t;let r=typeof n.sorter==`function`?n.sorter:(e,t)=>w(n.dataIndex&&e[n.dataIndex],n.dataIndex&&t[n.dataIndex]);return[...t].sort((e,t)=>{let n=r(e,t);return O.order===`ascend`?n:-n})},[e,t,O,c]),P=y?.total??N.length,F=Math.max(1,Math.ceil(P/b)),I=Math.min(M,F),L=y&&!c?N.slice((I-1)*b,I*b):N,R=(e,t)=>{m?.({current:e,pageSize:b,total:P},t)},z=e=>{k||j(e),R(e,O)},B=u?.selectedRowKeys||[],V=L.map(e=>C(e,n)),H=V.length>0&&V.every(e=>B.includes(e)),U=V.some(e=>B.includes(e))&&!H,W=e=>{if(!e.sorter)return;let t=e.key||e.dataIndex;if(!t)return;let n=!O||O.columnKey!==t?{columnKey:t,order:`ascend`}:O.order===`ascend`?{columnKey:t,order:`descend`}:null;T||D(n),k||j(1),R(1,n)},G=()=>{let e=H?B.filter(e=>!V.includes(e)):[...new Set([...B,...V])];u?.onChange?.(e)},K=e=>{let t=B.includes(e)?B.filter(t=>t!==e):[...B,e];u?.onChange?.(t)};return(0,S.jsxs)(`div`,{ref:g,className:[`mds-table`,r?`mds-table--loading`:``,f].filter(Boolean).join(` `),"aria-busy":r||void 0,children:[(0,S.jsxs)(`div`,{className:`mds-table__scroll`,children:[(0,S.jsxs)(`table`,{className:`mds-table__element`,children:[(0,S.jsx)(`thead`,{children:(0,S.jsxs)(`tr`,{children:[u&&(0,S.jsx)(`th`,{className:`mds-table__selection`,children:(0,S.jsx)(p,{checked:H,indeterminate:U,onChange:G,"aria-label":v.table.selectAll})}),e.map(e=>{let t=e.key||e.dataIndex,n=O&&O.columnKey===t?O.order:void 0;return(0,S.jsx)(`th`,{"aria-sort":e.sorter?n===`ascend`?`ascending`:n===`descend`?`descending`:`none`:void 0,children:e.sorter?(0,S.jsxs)(`button`,{className:`mds-table__sort`,type:`button`,onClick:()=>W(e),children:[e.title,(0,S.jsx)(`span`,{className:`mds-table__sort-indicator`,children:(0,S.jsx)(l,{name:n===`ascend`?`chevron-up`:n===`descend`?`chevron-down`:`chevron-up-down`,size:14})})]}):e.title},t)})]})}),(0,S.jsx)(`tbody`,{children:L.map((t,r)=>{let i=C(t,n);return(0,S.jsxs)(`tr`,{children:[u&&(0,S.jsx)(`td`,{className:`mds-table__selection`,children:(0,S.jsx)(p,{checked:B.includes(i),onChange:()=>K(i),"aria-label":v.table.selectRow(i)})}),e.map(e=>{let n=e.dataIndex?t[e.dataIndex]:void 0,i=e.key||e.dataIndex;return(0,S.jsx)(`td`,{children:e.render?e.render(n,t,r):n},i)})]},i)})})]}),L.length===0&&(0,S.jsx)(h,{title:d??v.table.emptyText})]}),r&&(0,S.jsx)(`div`,{className:`mds-table__loading`,role:`status`,children:v.table.loading}),y&&P>b&&(0,S.jsx)(`div`,{className:`mds-table__pagination`,children:(0,S.jsx)(_,{current:I,total:P,pageSize:b,onChange:z})})]})},E=(0,x.forwardRef)(T);try{E.displayName=`Table`,E.__docgenInfo={description:`forwardRef 會把泛型參數抹成 unknown，因此包完之後 cast 回帶 <T> 的函式型別，
保留 columns / dataSource / rowKey 之間的型別推導。`,displayName:`Table`,filePath:`D:/shang/技術開發/dev/技術學習/面試作品/storybook/src/components/Table/Table.tsx`,methods:[],props:{columns:{defaultValue:{value:`[]`},declarations:[{fileName:`storybook/src/components/Table/Table.tsx`,name:`TableProps`}],description:`Column definitions.`,name:`columns`,parent:{fileName:`storybook/src/components/Table/Table.tsx`,name:`TableProps`},required:!1,tags:{},type:{name:`TableColumn<T>[] | undefined`}},dataSource:{defaultValue:{value:`[]`},declarations:[{fileName:`storybook/src/components/Table/Table.tsx`,name:`TableProps`}],description:"Row records. With `manual`, only the rows of the current page.",name:`dataSource`,parent:{fileName:`storybook/src/components/Table/Table.tsx`,name:`TableProps`},required:!1,tags:{},type:{name:`T[] | undefined`}},rowKey:{defaultValue:{value:`'key' as Extract<keyof T, string>`},declarations:[{fileName:`storybook/src/components/Table/Table.tsx`,name:`TableProps`}],description:`Record field used as the row key, or a function deriving it.`,name:`rowKey`,parent:{fileName:`storybook/src/components/Table/Table.tsx`,name:`TableProps`},required:!1,tags:{},type:{name:`string | ((record: T) => TableRowKey) | undefined`}},loading:{defaultValue:{value:`false`},declarations:[{fileName:`storybook/src/components/Table/Table.tsx`,name:`TableProps`}],description:`Shows the loading overlay.`,name:`loading`,parent:{fileName:`storybook/src/components/Table/Table.tsx`,name:`TableProps`},required:!1,tags:{},type:{name:`boolean | undefined`}},pagination:{defaultValue:{value:`{}`},declarations:[{fileName:`storybook/src/components/Table/Table.tsx`,name:`TableProps`}],description:`Pagination settings; false disables pagination.`,name:`pagination`,parent:{fileName:`storybook/src/components/Table/Table.tsx`,name:`TableProps`},required:!1,tags:{},type:{name:`false | TablePaginationConfig | undefined`}},sort:{defaultValue:null,declarations:[{fileName:`storybook/src/components/Table/Table.tsx`,name:`TableProps`}],description:`Controlled sort state; null means unsorted.`,name:`sort`,parent:{fileName:`storybook/src/components/Table/Table.tsx`,name:`TableProps`},required:!1,tags:{},type:{name:`TableSort | null | undefined`}},defaultSort:{defaultValue:{value:`null`},declarations:[{fileName:`storybook/src/components/Table/Table.tsx`,name:`TableProps`}],description:`Initial sort state for uncontrolled usage.`,name:`defaultSort`,parent:{fileName:`storybook/src/components/Table/Table.tsx`,name:`TableProps`},required:!1,tags:{},type:{name:`TableSort | null | undefined`}},manual:{defaultValue:{value:`false`},declarations:[{fileName:`storybook/src/components/Table/Table.tsx`,name:`TableProps`}],description:"Leaves sorting and paging to the caller — typically a server.\n\nTable then renders `dataSource` as-is instead of sorting and slicing it,\nand reports the requested state through `onChange`.",name:`manual`,parent:{fileName:`storybook/src/components/Table/Table.tsx`,name:`TableProps`},required:!1,tags:{},type:{name:`boolean | undefined`}},rowSelection:{defaultValue:null,declarations:[{fileName:`storybook/src/components/Table/Table.tsx`,name:`TableProps`}],description:`Enables row selection checkboxes.`,name:`rowSelection`,parent:{fileName:`storybook/src/components/Table/Table.tsx`,name:`TableProps`},required:!1,tags:{},type:{name:`TableRowSelection | undefined`}},emptyText:{defaultValue:null,declarations:[{fileName:`storybook/src/components/Table/Table.tsx`,name:`TableProps`}],description:`Title of the built-in empty state.`,name:`emptyText`,parent:{fileName:`storybook/src/components/Table/Table.tsx`,name:`TableProps`},required:!1,tags:{},type:{name:`ReactNode`}},className:{defaultValue:{value:``},declarations:[{fileName:`storybook/src/components/Table/Table.tsx`,name:`TableProps`}],description:``,name:`className`,parent:{fileName:`storybook/src/components/Table/Table.tsx`,name:`TableProps`},required:!1,tags:{},type:{name:`string | undefined`}},onChange:{defaultValue:null,declarations:[{fileName:`storybook/src/components/Table/Table.tsx`,name:`TableProps`}],description:`Called when the page or the sort changes.`,name:`onChange`,parent:{fileName:`storybook/src/components/Table/Table.tsx`,name:`TableProps`},required:!1,tags:{},type:{name:`((pagination: TableChangeInfo, sort: TableSort | null) => void) | undefined`}},ref:{defaultValue:null,declarations:[{fileName:`storybook/src/components/Table/Table.tsx`,name:`TypeLiteral`}],description:``,name:`ref`,required:!1,tags:{},type:{name:`Ref<HTMLDivElement> | undefined`}}},tags:{}}}catch{}})),O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y;e((()=>{O=t(i(),1),u(),o(),v(),D(),k=r(),{expect:A,userEvent:j,waitFor:M,within:N}=__STORYBOOK_MODULE_TEST__,P=[{key:`1`,order:`ORD-1024`,customer:`Acme Studio`,plan:`Commerce Pro`,amount:1280,status:`Active`},{key:`2`,order:`ORD-1025`,customer:`Northwind`,plan:`Finance Basic`,amount:860,status:`Pending`},{key:`3`,order:`ORD-1026`,customer:`Orbit Ops`,plan:`Internal Tools`,amount:420,status:`Draft`},{key:`4`,order:`ORD-1027`,customer:`Bluebird`,plan:`Commerce Pro`,amount:1460,status:`Active`},{key:`5`,order:`ORD-1028`,customer:`Summit`,plan:`Finance Basic`,amount:970,status:`Pending`},{key:`6`,order:`ORD-1029`,customer:`Atlas`,plan:`Internal Tools`,amount:610,status:`Active`}],F={Active:`success`,Pending:`warning`,Draft:`secondary`},I=[{title:`Order`,dataIndex:`order`,sorter:!0},{title:`Customer`,dataIndex:`customer`},{title:`Plan`,dataIndex:`plan`,render:e=>(0,k.jsx)(y,{color:`primary`,children:e})},{title:`Amount`,dataIndex:`amount`,sorter:!0,render:e=>`$${e}`},{title:`Status`,dataIndex:`status`,render:(e,t)=>(0,k.jsx)(d,{variant:F[t.status],children:t.status})}],L={title:`Data Display/Table`,component:E,tags:[`autodocs`],parameters:{docs:{description:{component:[`Table displays structured data with sorting, row selection, pagination, loading,`,`and empty states.`,``,"Sorting and paging run locally by default. Pass `manual` together with","controlled `sort` / `pagination` and an `onChange` handler to let a server do","the work — Table then renders `dataSource` as-is and only reports what the user",`asked for.`].join(`
`)}}},argTypes:{emptyText:{control:`text`}}},R={args:{columns:I,dataSource:P}},z=()=>{let[e,t]=(0,O.useState)([`1`]);return(0,k.jsx)(E,{columns:I,dataSource:P,rowSelection:{selectedRowKeys:e,onChange:t}})},B={render:()=>(0,k.jsx)(z,{})},V={args:{columns:I,dataSource:[],emptyText:`No orders found`}},H={args:{columns:I,dataSource:P,pagination:!1},play:async({canvasElement:e})=>{let t=N(e);await j.click(t.getByRole(`button`,{name:/Amount/})),await M(()=>{A(t.getAllByRole(`row`).slice(1).map(e=>e.cells[3].textContent)).toEqual([`$420`,`$610`,`$860`,`$970`,`$1280`,`$1460`])})}},U=()=>{let[e,t]=(0,O.useState)(!1);return(0,k.jsxs)(`div`,{className:`story-stack`,children:[(0,k.jsx)(s,{variant:`secondary`,onClick:()=>t(!0),children:`Filter down to 2 rows`}),(0,k.jsx)(E,{columns:I,dataSource:e?P.slice(0,2):P,pagination:{pageSize:2}})]})},W={render:()=>(0,k.jsx)(U,{}),play:async({canvasElement:e})=>{let t=N(e);await j.click(t.getByRole(`button`,{name:`Page 3`})),await M(()=>A(t.getByText(`ORD-1029`)).toBeInTheDocument()),await j.click(t.getByRole(`button`,{name:`Filter down to 2 rows`})),await M(()=>{A(t.getByText(`ORD-1024`)).toBeInTheDocument(),A(t.queryByText(`No data`)).not.toBeInTheDocument()})}},G=2,K=(e,t)=>({rows:(t?[...P].sort((e,n)=>{let r=t.order===`ascend`?1:-1;return(t.columnKey===`amount`?e.amount-n.amount:e.order.localeCompare(n.order))*r}):P).slice((e-1)*G,e*G),total:P.length}),q=()=>{let[e,t]=(0,O.useState)(1),[n,r]=(0,O.useState)(null),{rows:i,total:a}=(0,O.useMemo)(()=>K(e,n),[e,n]);return(0,k.jsx)(E,{manual:!0,columns:I,dataSource:i,sort:n,pagination:{current:e,pageSize:G,total:a},onChange:(e,n)=>{t(e.current),r(n)}})},J={render:()=>(0,k.jsx)(q,{}),play:async({canvasElement:e})=>{let t=N(e);await A(t.getAllByRole(`row`)).toHaveLength(3),await A(t.getByText(`ORD-1024`)).toBeInTheDocument(),await j.click(t.getByRole(`button`,{name:`Next`})),await M(()=>A(t.getByText(`ORD-1026`)).toBeInTheDocument()),await j.click(t.getByRole(`button`,{name:/Amount/})),await M(()=>{A(t.getByText(`$420`)).toBeInTheDocument(),A(t.getByRole(`button`,{name:`Page 1`})).toHaveAttribute(`aria-current`,`page`)})}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    columns,
    dataSource
  }
}`,...R.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <SelectableTable />
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    columns,
    dataSource: [],
    emptyText: 'No orders found'
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    columns,
    dataSource,
    pagination: false
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: /Amount/
    }));
    await waitFor(() => {
      const amounts = canvas.getAllByRole('row').slice(1).map(row => (row as HTMLTableRowElement).cells[3].textContent);
      expect(amounts).toEqual(['$420', '$610', '$860', '$970', '$1280', '$1460']);
    });
  }
}`,...H.parameters?.docs?.source},description:{story:"`sorter: true` 用內建比較：數字依數值排序，而不是把 1280 當字串排在 420 前面。",...H.parameters?.docs?.description}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => <ShrinkingTable />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Page 3'
    }));
    await waitFor(() => expect(canvas.getByText('ORD-1029')).toBeInTheDocument());
    await userEvent.click(canvas.getByRole('button', {
      name: 'Filter down to 2 rows'
    }));
    await waitFor(() => {
      expect(canvas.getByText('ORD-1024')).toBeInTheDocument();
      expect(canvas.queryByText('No data')).not.toBeInTheDocument();
    });
  }
}`,...W.parameters?.docs?.source},description:{story:`停在最後一頁時上層把資料篩掉大半，頁碼會被夾回有效範圍。\r
沒有這個夾制的話 slice 會取到空陣列，畫面變成一張空表格。`,...W.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => <ServerSideTable />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // 第 1 頁只拿到 2 筆，總數仍是 6，所以分頁器顯示 3 頁
    await expect(canvas.getAllByRole('row')).toHaveLength(3);
    await expect(canvas.getByText('ORD-1024')).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Next'
    }));
    await waitFor(() => expect(canvas.getByText('ORD-1026')).toBeInTheDocument());

    // 排序後回到第 1 頁，資料由「後端」重新給
    await userEvent.click(canvas.getByRole('button', {
      name: /Amount/
    }));
    await waitFor(() => {
      expect(canvas.getByText('$420')).toBeInTheDocument();
      expect(canvas.getByRole('button', {
        name: 'Page 1'
      })).toHaveAttribute('aria-current', 'page');
    });
  }
}`,...J.parameters?.docs?.source},description:{story:"`manual` 模式：Table 不排序也不切片，只回報使用者要求的狀態，\r\n由外部去後端取那一頁的資料。排序改變時頁碼會回到第 1 頁。",...J.parameters?.docs?.description}}},Y=[`Basic`,`RowSelection`,`EmptyState`,`NumericSorting`,`PageClampsWhenDataShrinks`,`ServerSide`]}))();export{R as Basic,V as EmptyState,H as NumericSorting,W as PageClampsWhenDataShrinks,B as RowSelection,J as ServerSide,Y as __namedExportsOrder,L as default};