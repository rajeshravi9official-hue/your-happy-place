import { createFileRoute } from "@tanstack/react-router";

const LOGO = "/task16logo.png";
const PDF =
  "https://raw.githubusercontent.com/0xDarkSeidBull/dao-redbelly/main/task16-rbnt-recovery-playbook/Unstick_Your_RBNT_Recovery_Playbook_BrandKit.pdf";
const DOCX =
  "https://raw.githubusercontent.com/0xDarkSeidBull/dao-redbelly/main/task16-rbnt-recovery-playbook/Unstick_Your_RBNT_Recovery_Playbook_BrandKit.docx";
// raw.githubusercontent serves PDFs as an attachment, which browsers download instead of
// rendering. The jsDelivr mirror of the same file serves it inline for reading in a new tab.
const PDF_INLINE =
  "https://cdn.jsdelivr.net/gh/0xDarkSeidBull/dao-redbelly@main/task16-rbnt-recovery-playbook/Unstick_Your_RBNT_Recovery_Playbook_BrandKit.pdf";
const PDF_VIEWER = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(PDF)}`;


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Unstick Your RBNT: Cross Chain Recovery Playbook" },
      {
        name: "description",
        content:
          "Community guide to the four most common ways RBNT gets stuck across chains: wrong network sends, stuck bridges, thin liquidity swaps. Verified August 2026.",
      },
      { property: "og:title", content: "Unstick Your RBNT: Cross Chain Recovery Playbook" },
      {
        property: "og:description",
        content:
          "Redbelly DAO community support guide covering wrong network sends, stuck bridges, and thin liquidity swaps, with verified contract addresses and bridge fees.",
      },
      { property: "og:image", content: LOGO },
      { name: "twitter:image", content: LOGO },
    ],
  }),
  component: Playbook,
});

const NAV = [
  { id: "before-you-bridge", label: "1. Before You Bridge" },
  { id: "reference-tables", label: "2. Reference Tables" },
  { id: "failure-1", label: "3. Zero Value Swap" },
  { id: "failure-2", label: "4. Quote Unavailable" },
  { id: "failure-3", label: "5. Stranded Stablecoins" },
  { id: "failure-4", label: "6. Wrong CEX Deposit" },
];

function Stamp() {
  return (
    <span className="stamp" aria-label="Independently verified">
      VERIFIED
    </span>
  );
}

function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="paper-card border-t-4 border-t-[#EF5350] p-4 text-base leading-[1.5] sm:p-5">
      {children}
    </div>
  );
}

function SectionShell({
  id,
  index,
  title,
  children,
  stamp,
}: {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
  stamp?: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-[#27323a] pt-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-[#ffb3ae]">SECTION {index}</p>
          <h2 className="mt-2 text-[26px] leading-tight font-semibold tracking-[-0.01em] sm:text-[32px]">{title}</h2>
        </div>
        {stamp ? <Stamp /> : null}
      </div>
      <div className="mt-6 space-y-5">{children}</div>
    </section>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="paper-card rounded-[8px] p-5 sm:p-7">{children}</div>;
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="border border-[#27323a] bg-[#1b252a] text-[#93a4ae] px-3 py-2 text-left font-mono text-[11px] font-medium tracking-widest uppercase">
      {children}
    </th>
  );
}

function Td({
  children,
  mono,
  danger,
}: {
  children: React.ReactNode;
  mono?: boolean;
  danger?: boolean;
}) {
  return (
    <td
      className={`border border-[#27323a] px-3 py-2 align-top text-sm ${
        mono ? "font-mono text-[12px] break-all" : ""
      } ${danger ? "text-[#ffb3ae] font-medium" : ""}`}
    >
      {children}
    </td>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-[#27323a] pt-4 first:border-t-0 first:pt-0">
      <h3 className="font-mono text-xs tracking-[0.18em] text-[#ffb3ae] uppercase">Step {n}</h3>
      <p className="mt-1 font-display text-lg">{title}</p>
      <div className="mt-2 space-y-2 text-base leading-[1.5] text-[#b8c4cc]">{children}</div>
    </div>
  );
}

function Playbook() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-[#121b20]/95 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:gap-6">
          <a href="#top" className="flex shrink-0 items-center self-start lg:self-center" aria-label="Back to top">
            <img
              src={LOGO}
              alt="Redbelly DAO Task 16 mark"
              width={108}
              height={108}
              className="block h-[108px] w-[108px] shrink-0 object-contain"
            />
          </a>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] tracking-wider uppercase">
            {NAV.map((item) => {
              const [num, ...rest] = item.label.split(" ");
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="group border-b border-transparent py-1 font-sans text-[#e4ebf0] transition-colors hover:border-b-[#EF5350] hover:text-[#ffb3ae] focus-visible:text-[#ffb3ae]"
                  >
                    <span className="font-mono text-[#ffb3ae]">{num}</span> {rest.join(" ")}
                  </a>
                </li>
              );
            })}
          </ul>

        </nav>
      </header>

      <main id="top" className="mx-auto max-w-[1280px] px-4 pb-20 sm:px-6 lg:px-16">
        {/* HERO */}
        <section className="py-12 sm:py-16">
          <p className="font-mono text-xs tracking-[0.25em] text-[#ffb3ae] uppercase">
            Redbelly DAO · Community Support Guide
          </p>
          <h1 className="mt-4 text-[36px] leading-[1.05] font-bold tracking-[-0.02em] sm:text-[48px]">Unstick Your RBNT</h1>
          <p className="mt-3 font-display text-[24px] font-semibold tracking-[-0.01em] text-[#b8c4cc] sm:text-[32px]">
            A Cross Chain Recovery Playbook
          </p>
          <p className="mt-5 max-w-2xl text-[18px] leading-[1.55] text-[#b8c4cc]">
            A community support guide for wrong network sends, stuck bridges, and thin liquidity
            swaps. Reflects live, independently verified data as of August 2026.
          </p>

          <div className="mt-8 max-w-2xl">
            <Warning>
              <span className="font-mono text-[11px] tracking-widest text-[#ffb3ae] uppercase">
                Warning
              </span>
              <p className="mt-1">
                Liquidity, fees, and routing conditions change frequently. Confirm current quotes
                before acting on amounts that matter to you.
              </p>
            </Warning>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={PDF_INLINE}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[4px] border border-primary bg-primary px-5 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-[#d94a45]"
            >
              Read PDF
            </a>
            <a
              href={DOCX}
              className="rounded-[4px] border border-[#3a4650] px-5 py-3 font-sans text-sm font-semibold tracking-widest text-[#e4ebf0] uppercase transition-colors hover:border-[#ffb3ae] hover:text-[#ffb3ae]"
            >
              Download DOCX (editable)
            </a>
          </div>
        </section>

        {/* INLINE PDF */}
        <section className="pb-14">
          <p className="mb-3 font-mono text-[12px] font-bold tracking-[0.1em] text-[#93a4ae] uppercase">
            Full document, rendered inline
          </p>
          <iframe
            src={PDF_VIEWER}
            title="Unstick Your RBNT: A Cross Chain Recovery Playbook (PDF)"
            className="h-[700px] w-full border border-border bg-[#1e2a31] sm:h-[820px]"
          />
        </section>

        <div className="space-y-16">
          {/* SECTION 1 */}
          <SectionShell id="before-you-bridge" index="01" title="Before You Bridge">
            <Warning>
              <p>
                Never send RBNT to a centralized exchange deposit address on the wrong network. A
                deposit address is only valid for the exact asset and network the exchange lists it
                for. Sending native RBNT to an address expecting a wrapped version, or sending on a
                chain the exchange does not credit, puts the funds outside normal crediting and into
                a manual recovery process that may fail.
              </p>
            </Warning>

            <Card>
              <h3 className="font-display text-[22px] font-semibold">Where RBNT trades</h3>
              <p className="mt-2 text-base leading-[1.5] text-[#b8c4cc]">
                RBNT trades on four exchanges: <span className="font-mono">Gate</span>,{" "}
                <span className="font-mono">MEXC</span>,{" "}
                <span className="font-mono">WhiteBIT</span>, and{" "}
                <span className="font-mono">BYDFi</span>. Recovery processes are not equivalent
                between them, so the exchange you used determines your realistic options.
              </p>

              <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[8px] border-l-4 border-l-[#EF5350] bg-[#1b252a] px-4 py-3">
                  <dt className="font-mono text-xs tracking-widest text-[#ffb3ae] uppercase">Gate</dt>
                  <dd className="mt-1 text-base text-[#b8c4cc]">
                    Self service recovery form available. You submit the request yourself without
                    waiting for a support agent.
                  </dd>
                </div>
                <div className="rounded-[8px] border-l-4 border-l-[#EF5350] bg-[#1b252a] px-4 py-3">
                  <dt className="font-mono text-xs tracking-widest text-[#ffb3ae] uppercase">MEXC</dt>
                  <dd className="mt-1 text-base text-[#b8c4cc]">
                    Self service recovery form available. MEXC charges a processing fee for wrong
                    deposit returns.
                  </dd>
                </div>
                <div className="rounded-[8px] border-l-4 border-l-[#EF5350] bg-[#1b252a] px-4 py-3">
                  <dt className="font-mono text-xs tracking-widest text-[#ffb3ae] uppercase">BYDFi</dt>
                  <dd className="mt-1 text-base text-[#b8c4cc]">
                    No self service form. Recovery is handled through support, and you must supply
                    the transaction hash and your account ID.
                  </dd>
                </div>
                <div className="rounded-[8px] border-l-4 border-l-[#EF5350] bg-[#1b252a] px-4 py-3">
                  <dt className="font-mono text-xs tracking-widest text-[#ffb3ae] uppercase">WhiteBIT</dt>
                  <dd className="mt-1 text-base text-[#b8c4cc]">
                    Weakest documented process of the four. No dedicated recovery form, and WhiteBIT
                    states that deposits made incorrectly may be irreversibly lost.
                  </dd>
                </div>
              </dl>
            </Card>

            <Card>
              <h3 className="font-display text-[22px] font-semibold">Correct deposit procedure</h3>
              <ol className="mt-3 list-decimal space-y-3 pl-5 text-base leading-[1.5] text-[#b8c4cc]">
                <li>
                  Open the deposit page on the exchange and select RBNT explicitly. Do not reuse an
                  address saved from a previous deposit of a different asset.
                </li>
                <li>
                  Select the exact network the exchange lists for RBNT. If the network you hold funds
                  on is not offered, stop, the exchange cannot credit it.
                </li>
                <li>
                  Copy the freshly generated deposit address and any required memo or tag directly
                  from that page, then paste it into your wallet without editing.
                </li>
                <li>
                  Send a small test amount first, confirm it credits, and only then send the full
                  balance.
                </li>
              </ol>
            </Card>

            <Warning>
              <p>
                If your funds are already sent to the wrong place, skip ahead to Section 6 and start
                collecting evidence now. Never resend funds to the same address hoping to trigger a
                credit, and never click Discord or direct message recovery links. No legitimate
                recovery process starts in your DMs.
              </p>
            </Warning>
          </SectionShell>

          {/* SECTION 2 */}
          <SectionShell id="reference-tables" index="02" title="Reference Tables" stamp>
            <Card>
              <h3 className="font-display text-[22px] font-semibold">Table A. Wrapped RBNT Contract Addresses</h3>
              <p className="mt-2 text-base text-[#b8c4cc]">
                Checked against Redbelly&apos;s own announcements and documentation.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse">
                  <thead>
                    <tr>
                      <Th>Chain</Th>
                      <Th>Contract Address</Th>
                      <Th>Confidence</Th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <Td>Ethereum</Td>
                      <Td mono>0xb45ffb51984d626ee758b336c61cf20990c6bf13</Td>
                      <Td>High (dedicated official announcement)</Td>
                    </tr>
                    <tr>
                      <Td>Solana</Td>
                      <Td mono>2GBVt2ENvbHepuJMWYTPkkfpWUabAhsaXToYw8UphxS3</Td>
                      <Td>High (dedicated official announcement)</Td>
                    </tr>
                    <tr>
                      <Td>Redbelly Network (native chain)</Td>
                      <Td mono>0x6ed1F491e2d31536D6561f6bdB2AdC8F092a6076</Td>
                      <Td>High (confirmed directly)</Td>
                    </tr>
                    <tr>
                      <Td>Base</Td>
                      <Td mono>0x020940df9F5E77338a094D55b5B5914122a804A5</Td>
                      <Td>Medium (listed on Redbelly&apos;s own docs)</Td>
                    </tr>
                    <tr>
                      <Td>BNB Chain</Td>
                      <Td danger>No official token exists</Td>
                      <Td danger>Confirmed absent, impersonator tokens found</Td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>

            <Card>
              <h3 className="font-display text-[22px] font-semibold">Table B. Current Swap Liquidity by Chain</h3>
              <p className="mt-2 text-base text-[#b8c4cc]">
                Checked live, August 2026. Price impact figures are quotes at the time of checking
                and will move as pools change.
              </p>

              <div className="mt-6 space-y-7">
                <div>
                  <h4 className="font-mono text-xs tracking-[0.18em] text-[#ffb3ae] uppercase">
                    Ethereum
                  </h4>
                  <p className="mt-2 text-base leading-[1.5] text-[#b8c4cc]">
                    The WRBNT/WETH pool holds roughly{" "}
                    <span className="font-mono">$33,000</span>. That is enough for modest swaps and
                    punishing for large ones, so size matters more than routing here.
                  </p>
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full min-w-[380px] border-collapse">
                      <thead>
                        <tr>
                          <Th>Swap Size</Th>
                          <Th>Price Impact</Th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <Td mono>100,000 WRBNT</Td>
                          <Td mono>1.5% to 2.9%</Td>
                        </tr>
                        <tr>
                          <Td mono>1,000,000 WRBNT</Td>
                          <Td mono>13% to 14%</Td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-mono text-xs tracking-[0.18em] text-[#ffb3ae] uppercase">
                    Solana
                  </h4>
                  <p className="mt-2 text-base leading-[1.5] text-[#b8c4cc]">
                    Solana liquidity is effectively unusable for meaningful swaps right now. A
                    10,000 WRBNT swap already returns an impact figure that makes execution
                    irrational rather than merely expensive.
                  </p>
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full min-w-[380px] border-collapse">
                      <thead>
                        <tr>
                          <Th>Swap Size</Th>
                          <Th>Price Impact (Raydium)</Th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <Td mono>10,000 WRBNT</Td>
                          <Td mono danger>
                            86.77%
                          </Td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-mono text-xs tracking-[0.18em] text-[#ffb3ae] uppercase">
                    Base
                  </h4>
                  <p className="mt-2 text-base leading-[1.5] text-[#b8c4cc]">
                    Base currently shows lower price impact than Ethereum at matched sizes, despite
                    having no dedicated official liquidity announcement from Redbelly. Quotes also
                    diverge noticeably between aggregators, so check more than one before executing.
                  </p>
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full min-w-[420px] border-collapse">
                      <thead>
                        <tr>
                          <Th>Swap Size</Th>
                          <Th>Price Impact</Th>
                          <Th>Source</Th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <Td mono>1,000,000 RBNT</Td>
                          <Td mono>7.9% to 8.0%</Td>
                          <Td>Two aggregators</Td>
                        </tr>
                        <tr>
                          <Td mono>100,000 RBNT</Td>
                          <Td mono>13.4%</Td>
                          <Td>Separate widget</Td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Card>
          </SectionShell>

          {/* SECTION 3 */}
          <SectionShell
            id="failure-1"
            index="03"
            title="Failure Mode 1. Wrapped RBNT Zero Value or Swap Fail"
          >
            <Card>
              <div className="space-y-5">
                <Step n="1" title="Confirm the contract address">
                  <p>
                    Compare the token contract in your wallet against Table A in Section 2, character
                    by character, including the leading characters. A wrapped token showing zero
                    value is very often the wrong contract rather than a broken one. On BNB Chain
                    there is no official token at all, so any RBNT looking asset there is an
                    impersonator and has no recoverable value.
                  </p>
                </Step>
                <Step n="2" title="Check pool depth before swapping">
                  <p>
                    If the contract is correct, look at pool depth for your chain in Table B. A large
                    price impact warning is the pool being honest with you, not a bug. On Solana, a
                    10,000 WRBNT swap quoting 86.77% impact means the pool cannot absorb your order,
                    and forcing it through by raising slippage would hand most of the value away.
                  </p>
                  <p>
                    Reduce size, split the swap, or move to a chain with deeper liquidity instead of
                    overriding the warning.
                  </p>
                </Step>
                <Step n="3" title="Rule out ordinary transaction issues">
                  <p>
                    If the contract is right and the pool is deep enough, the cause is usually
                    mundane: insufficient native gas on the chain you are swapping on, a quote that
                    expired while you were confirming, or a slippage tolerance set too tight for
                    current conditions. Refresh the quote, confirm your gas balance, and retry once
                    with a realistic slippage setting.
                  </p>
                </Step>
              </div>
            </Card>
          </SectionShell>

          {/* SECTION 4 */}
          <SectionShell
            id="failure-2"
            index="04"
            title="Failure Mode 2. Quote Unavailable Bridging RBNT Back to Redbelly Network"
          >
            <Card>
              <p className="text-base leading-[1.5] text-[#b8c4cc]">
                Redbelly&apos;s own developer documentation names{" "}
                <span className="font-mono">Lucid Labs Bridge</span> as the official route for
                bridging RBNT back to Redbelly Network. It supports nine source chains. If your
                source chain is not one of them, no quote will appear, and that is the expected
                behaviour rather than a fault in your wallet.
              </p>
            </Card>

            <Card>
              <h3 className="font-display text-[22px] font-semibold">Verified Bridge Routes</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[620px] border-collapse">
                  <thead>
                    <tr>
                      <Th>Source Chain</Th>
                      <Th>Asset</Th>
                      <Th>Route</Th>
                      <Th>Fee</Th>
                      <Th>Time</Th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <Td>Ethereum</Td>
                      <Td mono>RBNT</Td>
                      <Td>Stargate</Td>
                      <Td mono>0.00016 ETH</Td>
                      <Td mono>About 109 min</Td>
                    </tr>
                    <tr>
                      <Td>Ethereum</Td>
                      <Td mono>WRBNT</Td>
                      <Td>Polymer</Td>
                      <Td mono>0.000015 ETH plus 10 WRBNT</Td>
                      <Td mono>About 2 min</Td>
                    </tr>
                    <tr>
                      <Td>Base</Td>
                      <Td mono>RBNT</Td>
                      <Td>Stargate</Td>
                      <Td mono>0.00016 ETH</Td>
                      <Td mono>About 1 min</Td>
                    </tr>
                    <tr>
                      <Td>Base</Td>
                      <Td mono>WRBNT</Td>
                      <Td>Polymer</Td>
                      <Td mono>0.000015 ETH plus 10 WRBNT</Td>
                      <Td mono>About 10 sec</Td>
                    </tr>
                    <tr>
                      <Td>BSC</Td>
                      <Td mono>RBNT</Td>
                      <Td>Stargate</Td>
                      <Td mono>0.0005 BNB</Td>
                      <Td mono>About 124 min</Td>
                    </tr>
                    <tr>
                      <Td>Arbitrum</Td>
                      <Td mono>RBNT</Td>
                      <Td>Stargate</Td>
                      <Td mono>0.00017 ETH</Td>
                      <Td mono>About 172 min</Td>
                    </tr>
                    <tr>
                      <Td>Polygon</Td>
                      <Td mono>RBNT</Td>
                      <Td>Stargate</Td>
                      <Td mono>4.43 POL</Td>
                      <Td mono>About 190 min</Td>
                    </tr>
                    <tr>
                      <Td>Avalanche</Td>
                      <Td mono>RBNT</Td>
                      <Td>Stargate</Td>
                      <Td mono>0.05 AVAX</Td>
                      <Td mono>About 62 min</Td>
                    </tr>
                    <tr>
                      <Td>Sonic</Td>
                      <Td mono>RBNT</Td>
                      <Td>Stargate</Td>
                      <Td mono>14.21 S</Td>
                      <Td mono>About 93 min</Td>
                    </tr>
                    <tr className="bg-[#1b252a]">
                      <Td danger>⚠ Solana</Td>
                      <Td mono danger>
                        RBNT
                      </Td>
                      <Td danger>No route found</Td>
                      <Td mono danger>
                        N/A
                      </Td>
                      <Td mono danger>
                        N/A
                      </Td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-base leading-[1.5] text-[#b8c4cc]">
                Solana is the one confirmed unresolvable case. There is no supported route from
                Solana back to Redbelly Network through the official bridge at the time of checking.
                This will not resolve by retrying, by changing wallets, or by adjusting the amount.
              </p>
            </Card>

            <Card>
              <h3 className="font-display text-[22px] font-semibold">What to do</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-[1.5] text-[#b8c4cc]">
                <li>
                  Do not repeatedly retry. Repeated attempts cost gas and produce the same result.
                </li>
                <li>
                  Check Lucid Labs directly for current chain support, since supported chains can be
                  added over time.
                </li>
                <li>
                  Consider moving your funds to a working chain first, if a supported path exists
                  from where you hold them.
                </li>
                <li>
                  Never use an unofficial bridge to work around a missing route. An unsupported route
                  is a limitation, an unofficial bridge is a risk of total loss.
                </li>
              </ul>
            </Card>
          </SectionShell>

          {/* SECTION 5 */}
          <SectionShell
            id="failure-3"
            index="05"
            title="Failure Mode 3. Stablecoins Stranded on Ethereum Mainnet"
          >
            <Card>
              <p className="text-base leading-[1.5] text-[#b8c4cc]">
                <span className="font-mono">reddex</span> is Redbelly&apos;s official interface for
                this route. Use it rather than a third party front end, and treat any other
                interface offering the same transfer as unverified.
              </p>
              <h3 className="mt-6 font-display text-[22px] font-semibold">Route and Fee</h3>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[420px] border-collapse">
                  <thead>
                    <tr>
                      <Th>Asset</Th>
                      <Th>Route</Th>
                      <Th>Fee</Th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <Td mono>USDT</Td>
                      <Td>Lucid Labs (Polymer)</Td>
                      <Td mono>1%</Td>
                    </tr>
                    <tr>
                      <Td mono>USDC</Td>
                      <Td>Lucid Labs (Polymer)</Td>
                      <Td mono>1%</Td>
                    </tr>
                    <tr>
                      <Td mono>WRBNT</Td>
                      <Td>Lucid Labs (Polymer)</Td>
                      <Td mono>1%</Td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>

            <Card>
              <div className="space-y-5">
                <Step n="1" title="Confirm the source transaction on Etherscan">
                  <p>
                    Look up your transaction hash and confirm the transfer actually succeeded on
                    Ethereum mainnet, with the correct token contract, amount, and destination. If
                    the source transaction failed, nothing left your wallet and there is nothing to
                    recover.
                  </p>
                </Step>
                <Step n="2" title="Give it time">
                  <p>
                    Polymer transfers normally complete in 10 seconds to a few minutes. Anything past
                    30 minutes is a genuine delay worth investigating, but the first few minutes are
                    normal operation, not a stuck transfer.
                  </p>
                </Step>
                <Step n="3" title="Check reddex directly for status">
                  <p>
                    Open reddex and check the status of the transfer there rather than judging by
                    your wallet balance alone. The interface is the authoritative view of whether the
                    destination leg has been delivered.
                  </p>
                </Step>
                <Step n="4" title="If still stuck, collect evidence and contact support">
                  <p>Gather the following before you open a ticket:</p>
                  <ul className="list-disc space-y-1 pl-5">
                    <li>Transaction hash</li>
                    <li>Amount and asset</li>
                    <li>Timestamp</li>
                    <li>Destination address</li>
                  </ul>
                  <p>
                    Contact Redbelly or reddex support directly with that evidence. Never resend the
                    funds, and never click Discord or direct message links offering to unstick the
                    transfer for you.
                  </p>
                </Step>
              </div>
            </Card>
          </SectionShell>

          {/* SECTION 6 */}
          <SectionShell
            id="failure-4"
            index="06"
            title="Failure Mode 4. Native RBNT Sent to a CEX Deposit Address by Mistake"
          >
            <Card>
              <p className="text-base leading-[1.5] text-[#b8c4cc]">
                Recovery is possible here, but it is never guaranteed on any of the four exchanges.
                Each one runs a manual process with its own rules, fees, and limits, and each
                reserves the right to decline. Act quickly and keep your evidence tidy, because a
                complete first message is the single biggest factor you control.
              </p>

              <h3 className="mt-6 font-display text-[22px] font-semibold">Evidence to collect first</h3>
              <ul className="mt-3 space-y-2 text-base text-[#b8c4cc]">
                {[
                  "Transaction hash of the deposit",
                  "The exact deposit address you sent to",
                  "The exact asset and network used",
                  "Amount and timestamp",
                  "Your account identifier on the exchange (UID or registered email)",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="font-mono text-[#ffb3ae]">
                      ☐
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <h3 className="font-mono text-xs tracking-widest text-[#ffb3ae] uppercase">Gate</h3>
                <p className="mt-2 text-base leading-[1.5] text-[#b8c4cc]">
                  Self service &quot;Deposit Not Received, Recovery Request&quot; tool. You submit
                  the request yourself with the transaction details.
                </p>
              </Card>
              <Card>
                <h3 className="font-mono text-xs tracking-widest text-[#ffb3ae] uppercase">MEXC</h3>
                <p className="mt-2 text-base leading-[1.5] text-[#b8c4cc]">
                  Dedicated &quot;Wrong Deposit Return Application&quot;. A processing fee applies,
                  and funds are returned to the original sending address, not credited to your MEXC
                  balance.
                </p>
              </Card>
              <Card>
                <h3 className="font-mono text-xs tracking-widest text-[#ffb3ae] uppercase">BYDFi</h3>
                <p className="mt-2 text-base leading-[1.5] text-[#b8c4cc]">
                  No self service form. Contact Customer Support directly with the transaction ID and
                  your UID.
                </p>
              </Card>
              <Card>
                <h3 className="font-mono text-xs tracking-widest text-[#ffb3ae] uppercase">WhiteBIT</h3>
                <p className="mt-2 text-base leading-[1.5] text-[#b8c4cc]">
                  Weakest documented process of the four. General support ticket only, with no
                  dedicated recovery tool.
                </p>
              </Card>
            </div>

            <Warning>
              <span className="font-mono text-[11px] tracking-widest text-[#ffb3ae] uppercase">
                Warning
              </span>
              <p className="mt-1">
                None of these processes guarantee recovery. Never send additional funds to the same
                address, and never click links claiming to expedite recovery in exchange for a fee or
                your wallet credentials.
              </p>
            </Warning>
          </SectionShell>
        </div>
      </main>

      <footer className="border-t border-[#27323a] bg-[#0a1216] py-10">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="font-mono text-[12px] font-bold tracking-[0.1em] text-[#93a4ae] uppercase">
            Research deliverable · Redbelly DAO
          </p>
          <p className="mt-3 text-base text-[#b8c4cc]">
            Built with{" "}
            <span aria-label="love" className="text-primary">
              ♥
            </span>{" "}
            by{" "}
            <a
              href="https://github.com/0xDarkSeidBull"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-primary"
            >
              0xDarkSeidBull
            </a>
          </p>
          <p className="mt-5 text-[13px] leading-relaxed text-[#93a4ae] italic">
            This guide reflects live, independently verified data as of August 2026. Liquidity, fees,
            and routing conditions change frequently, always confirm current quotes before acting on
            amounts that matter to you.
          </p>
        </div>
      </footer>
    </div>
  );
}
