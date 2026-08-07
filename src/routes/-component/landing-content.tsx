import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'

type BrandIconProps = React.ComponentProps<'svg'>

function FacebookIcon(props: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M14 21v-8h3l.5-3H14V8.2c0-.9.3-1.7 1.8-1.7H18V3.8c-.4-.1-1.6-.2-2.8-.2-2.8 0-4.7 1.7-4.7 4.8V10H8v3h2.5v8H14Z"
        fill="currentColor"
      />
    </svg>
  )
}

function InstagramIcon(props: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="4.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.8" r="1" fill="currentColor" />
    </svg>
  )
}

function YoutubeIcon(props: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M21 12c0 2.3-.3 4.4-.8 5.2-.4.7-1.1 1.1-1.9 1.3-1.5.4-4.3.4-6.3.4s-4.8 0-6.3-.4c-.8-.2-1.5-.6-1.9-1.3C3.3 16.4 3 14.3 3 12s.3-4.4.8-5.2c.4-.7 1.1-1.1 1.9-1.3C7.2 5.1 10 5.1 12 5.1s4.8 0 6.3.4c.8.2 1.5.6 1.9 1.3.5.8.8 2.9.8 5.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="m10 9 5 3-5 3V9Z" fill="currentColor" />
    </svg>
  )
}

const newsItems = [
  {
    date: '2026.06.08',
    category: '賽事公告',
    title: '115年度全國馬術錦標賽競賽規程與報名資訊',
    excerpt: '年度重點賽事即將展開，敬請參賽選手、教練與所屬單位依公告時程完成報名。',
    featured: true,
  },
  {
    date: '2026.05.26',
    category: '協會消息',
    title: '國家代表隊培訓計畫及選拔作業說明',
    excerpt: '公布培訓期程、選拔原則與相關申請文件。',
  },
  {
    date: '2026.05.12',
    category: '教育推廣',
    title: '馬術教練暨裁判增能研習開放報名',
    excerpt: '以國際規範與實務案例為核心，持續提升專業人才培育品質。',
  },
  {
    date: '2026.04.30',
    category: '國際交流',
    title: '亞洲馬術交流會議代表團成果紀要',
    excerpt: '深化區域合作，持續推動我國馬術運動與國際制度接軌。',
  },
] as const

const partners = [
  ['SA', '教育部體育署', 'Sports Administration'],
  ['CTOC', '中華奧林匹克委員會', 'Chinese Taipei Olympic Committee'],
  ['FEI', '國際馬術總會', 'International Federation for Equestrian Sports'],
  ['AEF', '亞洲馬術總會', 'Asian Equestrian Federation'],
] as const

function SectionHeading({
  eyebrow,
  title,
  english,
  align = 'left',
}: {
  eyebrow: string
  title: string
  english: string
  align?: 'left' | 'center'
}) {
  return (
    <header className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="font-sport text-kicker text-[#a77d35] uppercase dark:text-[#c6a465]">
        {eyebrow}
      </p>
      <h2 className="mt-5 font-display text-section text-[#151310] dark:text-[#f1eade]">
        {title}
      </h2>
      <p className="mt-3 font-sport text-meta text-[#7e5f2e] uppercase dark:text-[#a99267]">
        {english}
      </p>
    </header>
  )
}

function EditorialLink({ children, href = '#' }: { children: React.ReactNode; href?: string }) {
  return (
    <a
      href={href}
      className="group inline-flex min-h-11 items-center gap-5 border-b border-[rgba(182,140,67,.65)] font-body text-action transition-colors duration-200 hover:border-[#a77d35] hover:text-[#a77d35] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9b742e] dark:border-[#52606b] dark:hover:border-[#c6a465] dark:hover:text-[#ddc28d] dark:focus-visible:outline-[#c6a465]"
    >
      {children}
      <ArrowUpRight
        className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={1.3}
      />
    </a>
  )
}

function LatestNews() {
  const [featured, ...secondary] = newsItems

  return (
    <section
      id="news"
      className="relative bg-[#fbf6ed] px-5 py-24 transition-colors duration-200 dark:bg-[#0b1825] md:px-10 md:py-32 lg:px-16 lg:py-36"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[rgba(182,140,67,.38)] dark:bg-[#3a4752]" />
      <div className="mx-auto max-w-[1500px]">
        <div className="flex items-end justify-between gap-8 max-md:block">
          <SectionHeading
            eyebrow="News & Announcements"
            title="最新消息"
            english="Association News"
          />
          <div className="max-md:mt-8">
            <EditorialLink href="#all-news">查看所有消息</EditorialLink>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-x-10 border-t border-[rgba(182,140,67,.38)] dark:border-[#3a4752] max-lg:gap-x-6 max-md:mt-12 max-md:block">
          <a
            href="#featured-news"
            className="group col-span-7 grid min-h-[560px] grid-rows-[1fr_auto] overflow-hidden border-r border-[rgba(182,140,67,.38)] dark:border-[#3a4752] pr-10 focus-visible:outline-2 focus-visible:outline-offset-6 focus-visible:outline-[#9b742e] dark:focus-visible:outline-[#c6a465] max-lg:col-span-6 max-lg:pr-6 max-md:min-h-0 max-md:border-r-0 max-md:border-b max-md:pr-0 max-md:pb-12"
          >
            <div className="relative mt-10 min-h-[330px] overflow-hidden [clip-path:ellipse(90%_88%_at_42%_46%)] max-md:mt-8 max-md:aspect-[4/3] max-md:min-h-0">
              <img
                src="/ctea-4.webp"
                alt="馬術賽事騎手與黑馬"
                className="h-full w-full object-cover object-[38%_center] transition-transform duration-700 ease-out group-hover:scale-[1.018]"
                loading="lazy"
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,246,237,.05),rgba(251,246,237,.18))] dark:bg-[linear-gradient(90deg,transparent,rgba(11,24,37,.28))]"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-8 pt-8 max-sm:grid-cols-1 max-sm:gap-3">
              <div>
                <time className="font-sport text-meta text-[#7e5f2e] tabular-nums dark:text-[#a99267]">
                  {featured.date}
                </time>
                <p className="mt-2 font-body text-meta text-[#a77d35] dark:text-[#c6a465]">
                  {featured.category}
                </p>
              </div>
              <div>
                <h3 className="font-display text-feature-title transition-colors duration-200 group-hover:text-[#8d682d] dark:group-hover:text-[#ddc28d]">
                  {featured.title}
                </h3>
                <p className="mt-4 max-w-2xl font-body text-body text-[#62615e] dark:text-[#b3aa99]">
                  {featured.excerpt}
                </p>
              </div>
            </div>
          </a>

          <div className="col-span-5 max-lg:col-span-6">
            {secondary.map((item) => (
              <a
                href="#news-detail"
                className="group grid min-h-[178px] grid-cols-[120px_1fr_auto] items-center gap-6 border-b border-[rgba(182,140,67,.38)] dark:border-[#3a4752] py-7 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#9b742e] dark:focus-visible:outline-[#c6a465] max-sm:grid-cols-[1fr_auto] max-sm:gap-4"
                key={item.title}
              >
                <div className="max-sm:col-span-2">
                  <time className="font-sport text-meta text-[#7e5f2e] tabular-nums dark:text-[#a99267]">
                    {item.date}
                  </time>
                  <p className="mt-2 font-body text-meta text-[#a77d35] dark:text-[#c6a465]">
                    {item.category}
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-card-title transition-colors duration-200 group-hover:text-[#8d682d] dark:group-hover:text-[#ddc28d]">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-body text-body-sm text-[#62615e] dark:text-[#b3aa99]">
                    {item.excerpt}
                  </p>
                </div>
                <ArrowUpRight
                  className="size-5 text-[#a77d35] dark:text-[#c6a465] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.2}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SocialFeed() {
  return (
    <section
      id="social"
      className="relative overflow-hidden bg-[#f8f2e8] px-5 py-24 transition-colors duration-200 dark:bg-[#0B1825] md:px-10 md:py-32 lg:px-16 lg:py-36"
    >
      <img
        src="/media/ctea-sketch-ivory-bg.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35"
        loading="lazy"
      />
      <div className="relative mx-auto grid max-w-[1500px] grid-cols-12 items-start gap-10 max-lg:gap-6 max-md:block">
        <div className="col-span-4">
          <SectionHeading eyebrow="From Our Community" title="馬術現場" english="Social Stories" />
          <p className="mt-8 max-w-sm font-body text-body text-[#62615e] dark:text-[#b3aa99]">
            從賽場、訓練到國際交流，透過社群紀錄每一次專注、合作與成長。
          </p>
          <div className="mt-10 flex gap-3">
            <a
              className="grid size-12 place-items-center border border-[rgba(182,140,67,.38)] text-[#7e5f2e] transition-colors duration-200 hover:bg-[#122b43] hover:text-[#fbf6ed] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#9b742e] dark:border-[#3a4752] dark:text-[#a99267] dark:hover:bg-[#172a3c] dark:hover:text-[#f1eade] dark:focus-visible:outline-[#c6a465]"
              href="https://www.facebook.com/profile.php?id=100068596600748"
              aria-label="Facebook"
            >
              <FacebookIcon className="size-5" />
            </a>
            <a
              className="grid size-12 place-items-center border border-[rgba(182,140,67,.38)] text-[#7e5f2e] transition-colors duration-200 hover:bg-[#122b43] hover:text-[#fbf6ed] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#9b742e] dark:border-[#3a4752] dark:text-[#a99267] dark:hover:bg-[#172a3c] dark:hover:text-[#f1eade] dark:focus-visible:outline-[#c6a465]"
              href="https://www.instagram.com/chinese_taipei_ea/"
              aria-label="Instagram"
            >
              <InstagramIcon className="size-5" />
            </a>
          </div>
        </div>

        <div className="col-span-8 grid grid-cols-2 gap-8 max-lg:gap-5 max-md:mt-14 max-sm:grid-cols-1">
          <article className="border border-[rgba(182,140,67,.38)] bg-[rgba(251,248,241,.85)] p-3 shadow-[0_20px_55px_rgba(78,58,27,.07)] transition-[background,border-color,box-shadow] duration-200 dark:border-[#3a4752] dark:bg-[#122231] dark:shadow-[0_20px_55px_rgba(2,8,14,.35)]">
            <div className="flex min-h-14 items-center justify-between border-b border-[rgba(182,140,67,.38)] dark:border-[#3a4752] px-3">
              <span className="flex items-center gap-3 font-sport text-action">
                <FacebookIcon className="size-5 text-[#a77d35] dark:text-[#c6a465]" /> Facebook
              </span>
              <span className="font-sport text-overline text-[#7e5f2e] uppercase dark:text-[#a99267]">
                Official Feed
              </span>
            </div>
            <div className="relative aspect-4/5 overflow-hidden bg-[#eee4d5]">
              <iframe
                title="Facebook 社群貼文"
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D100068596600748&tabs=timeline&width=380&height=625&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </div>
          </article>

          <article className="border border-[rgba(182,140,67,.38)] bg-[rgba(251,248,241,.85)] p-3 shadow-[0_20px_55px_rgba(78,58,27,.07)] transition-[background,border-color,box-shadow] duration-200 dark:border-[#3a4752] dark:bg-[#122231] dark:shadow-[0_20px_55px_rgba(2,8,14,.35)]">
            <div className="flex min-h-14 items-center justify-between border-b border-[rgba(182,140,67,.38)] dark:border-[#3a4752] px-3">
              <span className="flex items-center gap-3 font-sport text-action">
                <InstagramIcon className="size-5 text-[#a77d35] dark:text-[#c6a465]" /> Instagram
              </span>
              <span className="font-sport text-overline text-[#7e5f2e] uppercase dark:text-[#a99267]">
                Latest Post
              </span>
            </div>
            <div className="relative aspect-4/5 overflow-hidden bg-[#eee4d5] dark:bg-[#213140]">
              <iframe
                title="Instagram 社群貼文"
                src="https://www.instagram.com/chinese_taipei_ea/embed/"
                className="absolute inset-0 h-full w-full border-0 bg-white"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function LatestVideo() {
  return (
    <section
      id="video"
      className="relative overflow-hidden bg-[#122b43] px-5 py-24 text-[#fbf6ed] transition-colors duration-200 dark:bg-[#122231] dark:text-[#f1eade] md:px-10 md:py-32 lg:px-16 lg:py-36"
    >
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_78%_24%,rgba(197,161,93,.45),transparent_31%),linear-gradient(120deg,transparent_25%,rgba(255,255,255,.06),transparent_64%)]" />
      <div className="relative mx-auto max-w-[1500px]">
        <div className="grid grid-cols-12 items-end gap-10 max-md:block">
          <header className="col-span-7">
            <p className="font-sport text-kicker text-[#c5a15d] uppercase dark:text-[#c6a465]">
              Latest Films
            </p>
            <h2 className="mt-5 font-display text-section">
              最新影音
            </h2>
            <p className="mt-3 font-sport text-meta text-[#d8c49e] uppercase dark:text-[#a99267]">
              Equestrian Films & Highlights
            </p>
          </header>
          <p className="col-span-5 max-w-lg justify-self-end font-body text-body text-[rgba(229,220,205,.78)] dark:text-[#b3aa99] max-md:mt-8">
            精選國際賽事、選手故事與馬術教育內容，從影像看見人馬之間的默契與競技精神。
          </p>
        </div>

        <div className="mt-14 grid grid-cols-[minmax(0,1fr)_280px] gap-8 border-y border-[rgba(197,161,93,.45)] py-8 dark:border-[rgba(198,164,101,.5)] max-lg:grid-cols-1">
          <div className="relative aspect-video overflow-hidden border border-[rgba(197,161,93,.6)] bg-black shadow-[0_24px_65px_rgba(0,0,0,.24)] dark:border-[#c6a465]">
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube-nocookie.com/embed/Y0WHt-kUwdg?rel=0"
              title="第48屆全國中正盃馬場馬術錦標賽(積分第2站)"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <aside className="flex flex-col justify-between border-l border-[rgba(197,161,93,.35)] pl-8 dark:border-[rgba(198,164,101,.45)] max-lg:border-l-0 max-lg:border-t max-lg:pt-8 max-lg:pl-0">
            <div>
              <YoutubeIcon className="size-8 text-[#c5a15d] dark:text-[#c6a465]" />
              <p className="mt-8 font-sport text-kicker text-[#d8c49e] uppercase dark:text-[#a99267]">
                Featured Playlist
              </p>
              <h3 className="mt-4 font-display text-card-title">
                2026年FEI障礙超越世界挑戰賽(第1場)暨全國公開賽
              </h3>
              <p className="mt-4 font-body text-body-sm text-[rgba(229,220,205,.78)] dark:text-[#b3aa99]">
                透過官方影音頻道，持續掌握最新馬術動態。
              </p>
            </div>
            <a
              href="https://www.youtube.com/channel/UCiBcihOoWBIBvu6-UM2i9tw/playlists"
              className="group mt-10 inline-flex min-h-11 items-center gap-4 self-start border-b border-[rgba(197,161,93,.7)] font-body text-action text-[#fbf6ed] transition-colors hover:text-[#c5a15d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5a15d] dark:border-[#c6a465] dark:text-[#f1eade] dark:hover:text-[#c6a465] dark:focus-visible:outline-[#c6a465]"
            >
              前往 YouTube 頻道
              <ArrowUpRight
                className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.2}
              />
            </a>
          </aside>
        </div>
      </div>
    </section>
  )
}

function PartnerMark({ code, zh, en }: { code: string; zh: string; en: string }) {
  return (
    <div className="group flex min-h-28 items-center gap-5 border-r border-[rgba(182,140,67,.38)] dark:border-[#3a4752] px-7 last:border-r-0 max-lg:border-b max-lg:border-r-0 max-sm:px-2">
      <span className="grid size-14 shrink-0 place-items-center border border-[rgba(182,140,67,.65)] font-sport text-meta text-[#a77d35] transition-colors duration-200 group-hover:bg-[#122b43] group-hover:text-[#fbf6ed] dark:border-[#52606b] dark:text-[#c6a465] dark:group-hover:bg-[#172a3c] dark:group-hover:text-[#f1eade]">
        {code}
      </span>
      <span>
        <strong className="block font-body text-body-sm font-semibold">
          {zh}
        </strong>
        <small className="mt-2 block font-sport text-overline text-[#7e5f2e] uppercase dark:text-[#a99267]">
          {en}
        </small>
      </span>
    </div>
  )
}

function SiteFooter() {
  return (
    <footer className="bg-[#fbf6ed] text-[#151310] transition-colors duration-200 dark:bg-[#0b1825] dark:text-[#f1eade]">
      <section className="border-b border-[rgba(182,140,67,.38)] px-5 py-20 dark:border-[#3a4752] md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1500px]">
          <header className="flex items-end justify-between gap-8 max-md:block">
            <div>
              <p className="font-sport text-kicker text-[#a77d35] uppercase">
                Sponsors & Partners
              </p>
              <h2 className="mt-4 font-display text-feature-title">
                贊助商與合作夥伴
              </h2>
            </div>
            <p className="max-w-md font-body text-body-sm text-[#62615e] dark:text-[#b3aa99] max-md:mt-5">
              感謝各界夥伴共同支持臺灣馬術運動的長期發展。
            </p>
          </header>
          <div className="mt-12 grid grid-cols-4 border-y border-[rgba(182,140,67,.38)] dark:border-[#3a4752] max-lg:grid-cols-2 max-sm:grid-cols-1">
            {partners.map(([code, zh, en]) => (
              <PartnerMark code={code} zh={zh} en={en} key={code} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="footer"
        className="relative overflow-hidden bg-[#11283e] px-5 pt-20 pb-8 text-[#fbf6ed] transition-colors duration-200 dark:bg-[#0b1825] dark:text-[#f1eade] md:px-10 lg:px-16"
      >
        <img
          src="/media/ctea-sketch-ivory-bg.webp"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.055] mix-blend-screen"
          loading="lazy"
        />
        <div className="relative mx-auto max-w-[1500px]">
          <div className="grid grid-cols-12 gap-10 pb-20 max-lg:grid-cols-2 max-md:block">
            <div className="col-span-5 max-lg:col-span-2">
              <p className="font-brand text-xl font-semibold tracking-brand">
                中華民國馬術協會
              </p>
              <p className="mt-3 font-sport text-meta text-[#d8c49e] uppercase dark:text-[#a99267]">
                Chinese Taipei Equestrian Association
              </p>
              <p className="mt-8 max-w-md font-body text-body-sm text-[#e5dccd]/75">
                推動馬術競技、教育培訓與國際交流，建立安全、專業且永續的馬術運動環境。
              </p>
            </div>

            <address className="col-span-4 not-italic max-lg:col-span-1 max-md:mt-12">
              <p className="font-sport text-kicker text-[#c5a15d] uppercase dark:text-[#c6a465]">
                Contact
              </p>
              <div className="mt-6 grid gap-5 font-body text-body-sm text-[rgba(229,220,205,.78)] dark:text-[#b3aa99]">
                <a
                  href="tel:+886227512142"
                  className="flex min-h-11 items-center gap-4 transition-colors hover:text-white"
                >
                  <Phone className="size-4 text-[#c5a15d] dark:text-[#c6a465]" strokeWidth={1.3} />{' '}
                  +886 2 2751 2142
                </a>
                <a
                  href="mailto:service@ctea.org.tw"
                  className="flex min-h-11 items-center gap-4 transition-colors hover:text-white dark:hover:text-[#f1eade]"
                >
                  <Mail className="size-4 text-[#c5a15d] dark:text-[#c6a465]" strokeWidth={1.3} />{' '}
                  service@ctea.org.tw
                </a>
                <p className="flex items-start gap-4">
                  <MapPin
                    className="mt-1.5 size-4 shrink-0 text-[#c5a15d] dark:text-[#c6a465]"
                    strokeWidth={1.3}
                  />{' '}
                  104 臺北市中山區朱崙街20號
                </p>
              </div>
            </address>

            <div className="col-span-3 max-lg:col-span-1 max-md:mt-12">
              <p className="font-sport text-kicker text-[#c5a15d] uppercase dark:text-[#c6a465]">
                Follow
              </p>
              <div className="mt-6 flex gap-3">
                {[
                  [FacebookIcon, 'Facebook', 'https://www.facebook.com/'],
                  [InstagramIcon, 'Instagram', 'https://www.instagram.com/'],
                  [YoutubeIcon, 'YouTube', 'https://www.youtube.com/'],
                ].map(([Icon, label, href]) => (
                  <a
                    href={String(href)}
                    aria-label={String(label)}
                    className="grid size-12 place-items-center border border-[rgba(197,161,93,.5)] text-[#d8c49e] transition-colors duration-200 hover:bg-[#fbf6ed] hover:text-[#122b43] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#c5a15d] dark:border-[rgba(198,164,101,.55)] dark:text-[#a99267] dark:hover:bg-[#f1eade] dark:hover:text-[#122b43] dark:focus-visible:outline-[#c6a465]"
                    key={String(label)}
                  >
                    <Icon className="size-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex min-h-16 items-end justify-between gap-8 border-t border-[rgba(197,161,93,.35)] pt-7 font-body text-overline text-[rgba(229,220,205,.58)] dark:border-[rgba(198,164,101,.4)] dark:text-[rgba(179,170,153,.68)] max-sm:block max-sm:leading-7">
            <p>© 2026 Chinese Taipei Equestrian Association. All Rights Reserved.</p>
            <div className="flex gap-7 max-sm:mt-3">
              <a href="#privacy" className="hover:text-white dark:hover:text-[#f1eade]">
                隱私權政策
              </a>
              <a href="#terms" className="hover:text-white dark:hover:text-[#f1eade]">
                網站使用條款
              </a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  )
}

export function LandingContent() {
  return (
    <>
      <LatestNews />
      <SocialFeed />
      <LatestVideo />
      <SiteFooter />
    </>
  )
}
