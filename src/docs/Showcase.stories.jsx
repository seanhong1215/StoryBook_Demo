import { Badge } from '../components/Badge/Badge'
import { Button } from '../components/Button/Button'
import { Card } from '../components/Card/Card'
import { Input } from '../components/Input/Input'
import { Select } from '../components/Select/Select'
import { Space } from '../components/Space/Space'
import { Tag } from '../components/Tag/Tag'
import { ThemeProvider } from '../theme/ThemeProvider'
import portfolioCover from '../assets/portfolio-cover.png'

export default {
  title: 'Components/Showcase',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: null,
    },
  },
}

const Footer = ({ product, links }) => (
  <footer className="template-footer">
    <strong>{product}</strong>
    <nav aria-label={`${product} footer`}>
      {links.map((link) => (
        <a href="#top" key={link}>{link}</a>
      ))}
    </nav>
  </footer>
)

const PortfolioCoverTemplate = () => (
  <ThemeProvider productLine="commerce">
    <main className="portfolio-cover-showcase portfolio-cover-showcase--image">
      <img
        className="portfolio-cover-showcase__image"
        src={portfolioCover}
        alt="React Design System 模板元件庫作品集封面"
      />
    </main>
  </ThemeProvider>
)

const CommerceOperationsTemplate = () => (
  <ThemeProvider productLine="commerce">
    <main className="template-page template-page--commerce" id="top">
      <header className="template-header">
        <strong className="template-brand">RetailOps Cloud</strong>
        <nav aria-label="RetailOps Cloud">
          <a href="#features">營運中樞</a>
          <a href="#workflow">工作流程</a>
          <a href="#contact">導入諮詢</a>
        </nav>
        <Button size="sm" type="primary">安排導入</Button>
      </header>

      <section className="commerce-hero">
        <div className="commerce-hero__copy">
          <Badge variant="primary">小型電商營運後台</Badge>
          <h1>把訂單、庫存與客服異常集中到同一個營運首頁。</h1>
          <p>
            RetailOps Cloud 是給小型電商團隊使用的營運入口。首頁第一屏就能看到
            今日風險、待處理訂單與門市狀態，讓營運主管不用切換多套後台。
          </p>
          <Space wrap>
            <Button type="primary" size="lg">查看今日營運</Button>
            <Button variant="secondary" size="lg">瀏覽版型結構</Button>
          </Space>
        </div>
        <div className="commerce-command">
          <Card title="今日營運概況" extra={<Badge variant="warning">18 筆逾期</Badge>}>
            <div className="commerce-command__grid">
              <Card title="待處理訂單" size="small"><strong>248</strong></Card>
              <Card title="高價值訂單" size="small"><strong>$42.8K</strong></Card>
              <Card title="庫存警示" size="small"><strong>7</strong></Card>
              <Card title="門市回覆率" size="small"><strong>86%</strong></Card>
            </div>
          </Card>
        </div>
      </section>

      <section className="template-section commerce-flow" id="workflow">
        <div>
          <Tag color="blue">主要使用者流程</Tag>
          <h2>首頁就是營運主管的每日工作台。</h2>
          <p>這個版型不是展示元件，而是讓小型電商產品可以直接套用的首頁結構。</p>
        </div>
        <div className="commerce-flow__steps">
          {['查看異常訂單', '分派處理人員', '追蹤出貨與庫存', '產出營運回報'].map((step, index) => (
            <Card title={`0${index + 1}`} key={step}>
              <p>{step}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="template-section" id="features">
        <div className="template-section__header">
          <h2>可直接套用的電商首頁區塊</h2>
          <p>包含 hero、營運指標、流程卡片、功能卡片與 CTA，對應真實電商內部產品首頁。</p>
        </div>
        <div className="template-card-grid">
          {[
            ['訂單異常中心', '把逾期、缺貨、退款與高價值訂單放到同一個處理入口。'],
            ['門市營運視角', '用卡片式資訊呈現門市回覆率、庫存壓力與出貨狀態。'],
            ['營運交接區', '讓早晚班同仁可以清楚知道下一步要處理什麼。'],
          ].map(([title, text]) => (
            <Card title={title} hoverable key={title}>
              <p>{text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="template-cta" id="contact">
        <div>
          <Tag color="green">首頁版型可交付</Tag>
          <h2>適合改成小型電商 SaaS、內部營運後台或門市管理工具。</h2>
        </div>
        <Card title="取得版型">
          <Space direction="vertical" align="stretch">
            <Input placeholder="公司信箱" />
            <Select
              placeholder="營運規模"
              options={[
                { label: '1-5 間門市', value: 'small' },
                { label: '6-20 間門市', value: 'medium' },
                { label: '20 間以上', value: 'large' },
              ]}
            />
            <Button type="primary" block>送出需求</Button>
          </Space>
        </Card>
      </section>

      <Footer product="RetailOps Cloud" links={['隱私權', '服務條款', '聯絡我們']} />
    </main>
  </ThemeProvider>
)

const FinanceServicesTemplate = () => (
  <ThemeProvider productLine="finance">
    <main className="template-page template-page--finance" id="top">
      <header className="finance-header">
        <strong className="template-brand">TrustLedger</strong>
        <nav aria-label="TrustLedger">
          <a href="#risk">風控平台</a>
          <a href="#security">安全合規</a>
          <a href="#contact">預約顧問</a>
        </nav>
        <Button size="sm" type="primary">預約顧問</Button>
      </header>

      <section className="finance-hero">
        <div className="finance-hero__intro">
          <Badge variant="primary">金融服務首頁</Badge>
          <h1>給金融團隊的高信任感風控與案件審查入口。</h1>
          <p>
            TrustLedger 以嚴謹、清楚、可稽核的首頁設計，幫助金融服務產品在第一眼
            建立信任，並引導企業客戶進入風險審查、案件管理與合規諮詢。
          </p>
        </div>
        <Card className="finance-review-card" title="風險審查摘要" extra={<Tag color="blue">安全工作區</Tag>}>
          {[
            ['高風險案件', '11', '需主管覆核'],
            ['KYC 更新', '26', '處理中'],
            ['付款例外', '9', '今日審查'],
          ].map(([label, value, note]) => (
            <div className="finance-review-row" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <Badge variant="warning">{note}</Badge>
            </div>
          ))}
        </Card>
      </section>

      <section className="finance-proof" id="security">
        {[
          ['24/7', '案件監控'],
          ['$2.8B', '審查交易規模'],
          ['SOC 2', '合規敘事'],
          ['99.9%', '服務可用性'],
        ].map(([value, label]) => (
          <Card title={label} key={label}>
            <strong className="template-stat">{value}</strong>
          </Card>
        ))}
      </section>

      <section className="template-section finance-content" id="risk">
        <div className="template-section__header">
          <Tag color="blue">企業級首頁結構</Tag>
          <h2>金融服務首頁需要先建立信任，再談功能。</h2>
          <p>這個版型用較克制的資訊密度，呈現安全、稽核、案件流程與客戶信任。</p>
        </div>
        <div className="finance-content__grid">
          <Card title="合規審查入口">
            <p>把交易風險、KYC 更新與案件覆核整理成清楚的首頁敘事。</p>
          </Card>
          <Card title="客戶信任訊息">
            <p>透過安全標籤、數據證明與服務承諾，建立金融產品需要的可信度。</p>
          </Card>
          <Card title="顧問式轉換">
            <p>CTA 不強迫立即試用，而是引導企業客戶預約顧問或安全審查。</p>
          </Card>
        </div>
      </section>

      <section className="finance-contact" id="contact">
        <div>
          <h2>為金融產品建立可信任的第一屏。</h2>
          <p>適合金融 SaaS、支付平台、合規工具、KYC/AML 審查產品使用。</p>
        </div>
        <Space wrap>
          <Button type="primary" size="lg">預約安全顧問</Button>
          <Button variant="secondary" size="lg">下載產品簡介</Button>
        </Space>
      </section>

      <Footer product="TrustLedger" links={['安全聲明', '合規文件', '聯絡窗口']} />
    </main>
  </ThemeProvider>
)

const SaasServicesTemplate = () => (
  <ThemeProvider productLine="internal">
    <main className="template-page template-page--saas" id="top">
      <header className="template-header">
        <strong className="template-brand">TeamPilot</strong>
        <nav aria-label="TeamPilot">
          <a href="#platform">平台</a>
          <a href="#features">功能</a>
          <a href="#pricing">方案</a>
        </nav>
        <Button size="sm" type="primary">開始試用</Button>
      </header>

      <section className="saas-hero">
        <div className="saas-hero__center">
          <Badge variant="primary">B2B SaaS 首頁</Badge>
          <h1>讓客戶成功團隊更快掌握每個工作區的健康狀態。</h1>
          <p>
            TeamPilot 是給 B2B SaaS 產品使用的首頁版型。它強調清楚價值主張、
            產品畫面感、信任指標與低摩擦轉換，適合直接改成正式產品官網。
          </p>
          <Space wrap>
            <Button type="primary" size="lg">開始免費試用</Button>
            <Button variant="secondary" size="lg">觀看平台介紹</Button>
          </Space>
        </div>
      </section>

      <section className="saas-dashboard" id="platform">
        <Card title="工作區健康度" extra={<Badge variant="success">即時摘要</Badge>}>
          <div className="saas-dashboard__bars" aria-hidden="true">
            <span style={{ height: '72%' }} />
            <span style={{ height: '48%' }} />
            <span style={{ height: '86%' }} />
            <span style={{ height: '64%' }} />
            <span style={{ height: '92%' }} />
          </div>
          <div className="saas-dashboard__summary">
            <Tag color="green">128 個活躍工作區</Tag>
            <Tag color="gold">12 個需追蹤帳戶</Tag>
            <Tag color="blue">41% onboarding 提升</Tag>
          </div>
        </Card>
      </section>

      <section className="template-section" id="features">
        <div className="template-section__header template-section__header--center">
          <Tag color="blue">SaaS template sections</Tag>
          <h2>首頁結構為轉換率服務，而不是為了展示元件。</h2>
          <p>Hero、產品截圖感、指標、功能卡與價格區塊可以直接改成真實 SaaS 官網。</p>
        </div>
        <div className="saas-feature-grid">
          {[
            ['啟用率追蹤', '展示 onboarding、活躍度與客戶健康分數。'],
            ['團隊管理', '呈現 workspace、owner、seat usage 等 SaaS 常見資訊。'],
            ['銷售轉換', '提供清楚 CTA、方案入口與產品可信度訊息。'],
          ].map(([title, text]) => (
            <Card title={title} hoverable key={title}>
              <p>{text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="saas-pricing" id="pricing">
        {[
          ['Starter', '$29', '適合剛起步的小團隊'],
          ['Growth', '$99', '適合需要客戶成功流程的團隊'],
          ['Enterprise', '客製', '適合需要權限與安全審查的企業'],
        ].map(([plan, price, text]) => (
          <Card
            title={plan}
            extra={plan === 'Growth' ? <Badge variant="primary">推薦</Badge> : undefined}
            key={plan}
          >
            <strong className="template-stat">{price}</strong>
            <p>{text}</p>
            <Button type={plan === 'Growth' ? 'primary' : 'default'} block>
              選擇方案
            </Button>
          </Card>
        ))}
      </section>

      <section className="template-cta">
        <div>
          <Tag color="green">可直接套版</Tag>
          <h2>適合 B2B SaaS、內部平台、AI 工具與工作流產品首頁。</h2>
        </div>
        <Card title="申請產品試用">
          <Space direction="vertical" align="stretch">
            <Input placeholder="工作信箱" />
            <Select
              placeholder="公司規模"
              options={[
                { label: '1-20 人', value: 'small' },
                { label: '21-100 人', value: 'medium' },
                { label: '100 人以上', value: 'large' },
              ]}
            />
            <Button type="primary" block>送出申請</Button>
          </Space>
        </Card>
      </section>

      <Footer product="TeamPilot" links={['產品', '價格', '客戶案例', '聯絡我們']} />
    </main>
  </ThemeProvider>
)

export const PortfolioCover = {
  name: '00 Cover 首頁',
  render: () => <PortfolioCoverTemplate />,
}

export const CommerceOperations = {
  name: '01 電商營運首頁',
  render: () => <CommerceOperationsTemplate />,
}

export const FinancialServices = {
  name: '02 金融服務首頁',
  render: () => <FinanceServicesTemplate />,
}

export const SaasService = {
  name: '03 SaaS 服務首頁',
  render: () => <SaasServicesTemplate />,
}
