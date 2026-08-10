import { createFileRoute } from '@tanstack/react-router'
import { cn } from '#/lib/utils'
import { AboutNextLink, AboutTitle } from './-components/about-detail'

export const Route = createFileRoute('/about/history')({
  component: RouteComponent,
})

const timeline = [
  {
    year: '1973',
    title: '協會成立',
    description: '由警備總部籌備組成中華民國馬術協會，為確保國際會籍與國際舞台奠定組織基礎。',
  },
  {
    year: '1975',
    title: '成為 FEI 會員',
    description: '於國際馬術總會 FEI 年度大會獲多數支持，成功取得會員國資格，完成重要國際任務。',
  },
  {
    year: '1976',
    title: '前進蒙特婁奧運',
    description: '選訓選手與馬匹赴加拿大參加蒙特婁奧運馬場馬術賽，展現我國爭取國際賽場的努力。',
  },
  {
    year: '1985',
    title: '國際賽事扎根',
    description: '爭取辦理國際馬場馬術賽與國際障礙超越賽，延續為今日挑戰杯與國際障礙賽事基礎。',
  },
  {
    year: '1989',
    title: '首奪國際獎牌',
    description:
      '參加第一屆亞洲馬術障礙超越賽，鄭益昌獲金牌、高經清獲銅牌，寫下協會國際錦標賽獎牌紀錄。',
  },
  {
    year: '1993',
    title: '轉型民間領導',
    description: '第六屆改選後由康文雄接任理事長，協會正式由軍方轉至民間，延續組織發展。',
  },
  {
    year: '1994',
    title: '廣島亞運雙項奪牌',
    description: '馬場馬術項目獲團體銅牌，障礙超越項目獲團體銀牌，提升我國馬術在亞洲賽場的能見度。',
  },
  {
    year: '2006',
    title: '杜哈亞運再添銀牌',
    description:
      '青少年女將陳少曼於杜哈亞運勇奪個人賽銀牌，延續我國馬術運動在亞洲競技舞台的代表性成績。',
  },
] as const

function RouteComponent() {
  return (
    <>
      <AboutTitle
        className="border-b border-border pb-8 sm:pb-10"
        eyebrow="History"
        title="協會歷史"
      />
      <section
        className="mt-10 grid gap-14 sm:mt-14 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.75fr)] lg:items-start lg:gap-16"
        aria-label="協會歷史"
      >
        <div className="lg:col-start-2 lg:row-start-1">
          <div className="grid border-l border-border pl-6 sm:pl-10">
            {timeline.map((item, index) => (
              <article
                key={item.year}
                className="relative border-t border-border py-7 first:border-t-0 first:pt-0 sm:py-8"
              >
                <span
                  className={cn(
                    'absolute -left-7.75 size-3 rounded-full border border-ctea-gold-ornament bg-background ring-4 ring-background sm:-left-[47px]',
                    index === 0 ? 'top-1' : 'top-8',
                  )}
                  aria-hidden="true"
                />
                <p className="font-sport text-meta font-semibold tabular-nums text-ctea-brown">
                  {item.year}
                </p>
                <h3 className="mt-2 font-display text-card-title text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 font-body text-body-sm text-muted-foreground">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
        <div className="min-w-0 lg:col-start-1 lg:row-start-1">
          <HistoryTexts />
        </div>
      </section>
      <div className="mt-14 sm:mt-20">
        <AboutNextLink label="閱讀協會宗旨" to="/about/mission" />
      </div>
    </>
  )
}

function HistoryTexts({ className, ...props }: React.ComponentProps<'article'>) {
  return (
    <article
      {...props}
      className={cn(
        'max-w-3xl space-y-6 font-body text-body text-foreground/90',
        className,
      )}
    >
      <p className="font-sport text-meta text-ctea-brown">
        {'\u3000'}
        {'\u3000'}
        文章作者 / 馬協老人
      </p>
      <p>
        {'\u3000'}
        {'\u3000'}
        民國62年，我國體育當局為突破國際姑息氣氛，確保國際會籍與國際舞台，於五月十五日由警備總部籌備組成中華民國馬術協會。首屆理事長尹俊，繼之為田樹樟、汪敬熙、鍾棫祥、周世斌等諸位將軍，歷五任理事會。自82年10月2日第六屆改選，由康文雄先生接任，本會正式由軍方轉至民間，第七屆林武郎，第八屆第一任許安進、第二任陳國和，第九（本）屆呂台年各位先生相繼領導，繼續向前邁進。
      </p>
      <p>
        {'\u3000'}
        {'\u3000'}
        依據會章，本會設置理事會、監事會，祕書處、各委員會及基層組織（團體與個人會員）。以促進養馬事業，發展全民馬術運動，舉辦訓練、比賽，培育教練、裁判、選手與掌工，俾能參與亞運，進軍奧運為主要任務。
      </p>
      <p>
        {'\u3000'}
        {'\u3000'}
        成立後的首要任務是必須領先對岸加入時由安妮公主為會長的國際馬術總會，為因應國際馬總祕書長戴蒙頓爵士的入會申請考察，理事長尹俊總司令決定在后里馬場增闢符合標準之競賽場地一座並於一個月內完成，這座競賽場結合后里馬場是我國第一座也是迄今最俱國際規模的馬術競賽場，她與我國馬術運動的發展息息相關，意義重大。此外，再於台北市青年路（原克難街）青年公園旁建立台北騎馬俱樂部（已關閉），推動北部地區的騎馬風潮。我會早期之馬術教練、裁判、選手有九成以上均出身於這兩個馬術基地。
      </p>
      <p>
        {'\u3000'}
        {'\u3000'}
        行政方面，則由中央社工會鄭副主任森綮，戴總幹事立言，內政部陳專門委員榮盛，教育部曾科長德錦，奧會原組長振文，馬協張總幹事嶸生，魏國際組長漢與朱行政組長瑞文等組專案小組由朱瑞文組長為承辦人，同時派曾任駐聯合國軍事代表團團長的廬福寧將軍和本會魏漢組長在國際間合縱連橫，努力奮鬥，終得以於1975年在國際馬總FEI年度大會上獲32票支持，21票反對，2票棄權的多數，成功成為會員國，圓滿達成任務，對岸則在次年入會。
      </p>
      <p>
        {'\u3000'}
        {'\u3000'}
        為了改善馬術環境，積極提升專業知識和技術，在艱難的條件下，本會仍以人材培訓為重點工作，曾持續遴選如孫清廉、林增雄、陳慶文、白捷勇、楊敦義、蔡惠祥、彭惟珂、鍾彥暉、吳上林、趙善德、李政憲，劉泓邑、梁永昌等次第出國接受教練、裁判訓練，用以充實本會之發展。同時延聘外籍教練如崔文鎬（韓）、田山熙（日）、雷耶斯（玻）、史威爾（德）、愛遜羅（德）等先後來華擔任教職，使我選手獲益良多。更在77年5月聘請香港賽馬會掌工師譚鈴泰先生來臺作為期兩週的掌工技術與觀念提升訓練，學員15人，至今仍為國內掌工之主流骨幹。
      </p>
      <p>
        {'\u3000'}
        {'\u3000'}
        74年本會向國際總會爭取辦理約翰海格杯國際馬場馬術賽與泰美克國際障礙超越賽，經總會批准並於當年起，每年遴派國際裁判或正式國際裁判蒞台主持賽事同時給予選手馬術課程，不但提升選手素質，也使本會和國內之馬術同仁有與國際保持接觸和相互交流的機會。這兩項競賽即為今日挑戰杯國際馬場馬術賽和國際障礙超越賽的前身。
      </p>
      <p>
        {'\u3000'}
        {'\u3000'}
        海外競賽方面，為鞏固會籍，本會選訓選手孫清廉同時購買馬匹「我的回憶」，聘請雷耶斯為教練，由國際組長魏漢任領隊率隊員林增雄共計四人一馬於1976年自西班牙經紐約赴加拿大之蒙特婁參加當屆的奧林匹克運動會之馬場馬術賽。我馬術代表隊人馬雖已在開幕報到前完成進駐選手村，但終因政治干擾使我國代表團受阻於紐約，最後馬術代表隊奉代表團總領隊沈家銘主席電令，人馬撤離蒙特婁至紐約與代表團會合一同返國。
      </p>
      <p>
        {'\u3000'}
        {'\u3000'}
        1989年韓國舉辦第一屆亞洲馬術障礙超越賽，我會派吳東賢任領隊，蔡惠祥、林增雄為教練率選手周明坤、謝煥祥、鄭益昌、高經清參加競賽，結果鄭益昌得金牌，高經清獲銅牌，謝煥祥第六名，這是本會成立以來第一次獲得國際正式錦標賽獎牌。1994年日本廣島亞運會上，我會聘德籍愛遜羅為總教練，鍾彥暉、林增雄為教練，參加馬術賽，馬場馬術項目，藍忠雄、陳祥甫、康瑜三位選手獲得團體銅牌，障礙超越項目，黃漢文、周明坤、陳輝銘、蘇政宏四位選手獲得團體銀牌；2006年杜哈亞運會，更由青少年女將陳少曼過關斬將，在各國實戰經驗雄厚的對手環伺之下，勇奪個人賽銀牌!!使我國馬術運動在亞洲具有不容小覷的地位。
        馬協三十而立了，三十多年，雖不長亦不短矣，有辛酸、甜蜜，有艱苦、快樂。馬術是較特殊的運動項目，參與的朋友都是因愛馬而因馬結緣，我們感念前輩創會的艱辛歷程也感謝先進們的守成不易的努力奮鬥，期望馬友同心同力為馬術運動打拼，來開創一個光明燦爛的前程。
      </p>
      <p>
        {'\u3000'}
        {'\u3000'}
        誌於癸未年菊月
      </p>
    </article>
  )
}
