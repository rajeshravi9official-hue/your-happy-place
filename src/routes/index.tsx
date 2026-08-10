import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, Check, Copy, ExternalLink, FileText, FileCode2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LOGO = "/dao-logo-on-dark.png";
const REPO = "https://github.com/0xDarkSeidBull/dao-redbelly";
const PDF =
  "https://github.com/0xDarkSeidBull/dao-redbelly/blob/main/task16-rbnt-recovery-playbook/unstick-your-rbnt-recovery-playbook.pdf";
const MD =
  "https://github.com/0xDarkSeidBull/dao-redbelly/blob/main/task16-rbnt-recovery-playbook/unstick-your-rbnt-recovery-playbook.md";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Unstick Your RBNT: Cross-Chain Recovery Playbook" },
      {
        name: "description",
        content:
          "Recovery guide for stuck RBNT across Ethereum, Base, Solana and Redbelly Network: verified contracts, official bridges, exchange recovery forms and failure modes.",
      },
      { property: "og:title", content: "Unstick Your RBNT: Cross-Chain Recovery Playbook" },
      {
        property: "og:description",
        content:
          "TASK-16, Redbelly DAO Task Board. Verified contract addresses, live swap links, official bridges and step-by-step fixes for stuck RBNT.",
      },
    ],
  }),
  component: Playbook,
});

const NAV = [
  { id: "before-you-bridge", label: "Before You Bridge" },
  { id: "contracts", label: "Contracts" },
  { id: "bridges", label: "Bridges" },
  { id: "failure-modes", label: "Failure Modes" },
];

/* ---------- primitives ---------- */

function Mono({ children }: { children: React.ReactNode }) {
  return <span className="font-mono">{children}</span>;
}

function Card({
  children,
  accent,
  className = "",
}: {
  children: React.ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-border bg-card p-6 sm:p-7 ${
        accent ? "border-l-4 border-l-primary" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

function OutLink({
  href,
  children,
  variant = "ghost",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
}) {
  const base =
    "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        variant === "solid"
          ? `${base} bg-primary text-primary-foreground hover:bg-primary/85`
          : `${base} border border-border text-foreground hover:border-primary hover:text-primary`
      }
    >
      {children}
      <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
    </a>
  );
}

function SectionShell({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-border pt-12">
      <p className="font-mono text-xs tracking-[0.22em] text-primary uppercase">{label}</p>
      <h2 className="mt-2 text-[28px] leading-tight font-bold tracking-[-0.01em] text-primary sm:text-[34px]">
        {title}
      </h2>
      <div className="mt-7 space-y-6">{children}</div>
    </section>
  );
}

function CopyAddress({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const short = value.length > 22 ? `${value.slice(0, 10)}…${value.slice(-8)}` : value;
  return (
    <span className="inline-flex items-center gap-2">
      <span className="font-mono text-[12px]" title={value}>
        {short}
      </span>
      <button
        type="button"
        aria-label={`Copy ${value}`}
        onClick={() => {
          void navigator.clipboard?.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="rounded p-1 text-muted-foreground transition-colors hover:text-primary"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
        )}
      </button>
    </span>
  );
}

function Badge({ level }: { level: "High" | "Medium" | "N/A" }) {
  const styles: Record<string, string> = {
    High: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    Medium: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    "N/A": "bg-primary/15 text-primary border-primary/40",
  };
  return (
    <span
      className={`inline-block rounded-md border px-2 py-0.5 font-mono text-[11px] tracking-wider uppercase ${styles[level]}`}
    >
      {level}
    </span>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="border-b border-border px-3 py-2 text-left font-mono text-[11px] font-medium tracking-widest text-muted-foreground uppercase">
      {children}
    </th>
  );
}

function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <td className={`border-b border-border px-3 py-3 align-top text-sm ${className}`}>{children}</td>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <li className="border-t border-border pt-4 first:border-t-0 first:pt-0">
      <p className="font-semibold text-foreground">
        <span className="font-mono text-primary">{n}.</span> {title}
      </p>
      <div className="mt-2 space-y-2 text-[15px] leading-relaxed text-muted-foreground">
        {children}
      </div>
    </li>
  );
}

function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline underline-offset-4 hover:opacity-80"
    >
      {children}
    </a>
  );
}

/* ---------- data ---------- */

const ETH = "0xb45ffb51984d626ee758b336c61cf20990c6bf13";
const BASE = "0x020940df9F5E77338a094D55b5B5914122a804A5";
const SOL = "2GBVt2ENvbHepuJMWYTPkkfpWUabAhsaXToYw8UphxS3";
const RBN = "0x6ed1F491e2d31536D6561f6bdB2AdC8F092a6076";

const EXCHANGES = [
  {
    name: "GATE",
    body: "Self service recovery form available. You submit the request yourself without waiting for a support agent.",
    href: "https://www.gate.com/help/guide/deposit_withdrawa/26321/how-to-submit-a-retri_-application",
  },
  {
    name: "MEXC",
    body: "Self service recovery form available. MEXC charges a processing fee for wrong deposit returns.",
    href: "https://www.mexc.com/support/article/what-is-the-uncredited-deposit-return-application-17827791526274",
  },
  {
    name: "BYDFI",
    body: "No self service form. Recovery is handled through support, and you must supply the transaction hash and your account ID.",
    href: "https://support.bydfi.com/hc/en-us/articles/5698786544143-Deposits-Haven-t-Been-Credited-to-Your-BYDFi-Account",
  },
  {
    name: "WHITEBIT",
    body: "Weakest documented process of the four. No dedicated recovery form, and WhiteBIT states that deposits made incorrectly may be irreversibly lost.",
    href: "https://help.whitebit.com/hc/en/requests/new",
  },
];

const EX_LINK = Object.fromEntries(EXCHANGES.map((e) => [e.name, e.href])) as Record<string, string>;

const CONTRACT_ROWS: {
  chain: string;
  address: string;
  level: "High" | "Medium" | "N/A";
  source: string;
  absent?: boolean;
}[] = [
  { chain: "Ethereum", address: ETH, level: "High", source: "Redbelly's own X post" },
  { chain: "Solana", address: SOL, level: "High", source: "Redbelly's own X post" },
  {
    chain: "Redbelly Network (native)",
    address: RBN,
    level: "High",
    source: "Redbelly's own Medium blog",
  },
  { chain: "Base", address: BASE, level: "Medium", source: "Redbelly developer docs" },
  {
    chain: "BNB Chain",
    address: "No official token exists",
    level: "N/A",
    source: "Confirmed absent, do not trust any RBNT token found here",
    absent: true,
  },
];

const SWAPS: {
  chain: string;
  contract: string;
  dexes: { name: string; href: string }[];
  impact: string[];
  warn?: string;
}[] = [
  {
    chain: "Ethereum",
    contract: ETH,
    dexes: [
      { name: "1inch", href: `https://1inch.com/swap?src=1:${ETH}&dst=1:USDT` },
      {
        name: "OKX DEX",
        href: `https://web3.okx.com/dex-swap?chain=ethereum,ethereum&token=${ETH},0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48`,
      },
      {
        name: "Bitget",
        href: "https://web3.bitget.com/en/swap/eth/0xb45fFB51984d626Ee758b336C61Cf20990c6bF13",
      },
    ],
    impact: ["100,000 WRBNT = 1.51% to 2.87%", "1,000,000 WRBNT = 13% to 14%"],
  },
  {
    chain: "Base",
    contract: BASE,
    dexes: [
      {
        name: "KyberSwap",
        href: "https://kyberswap.com/swap/base/0x020940df9f5e77338a094d55b5b5914122a804a5-to-usdc",
      },
      {
        name: "1inch",
        href: "https://1inch.com/swap?src=8453:0x020940df9f5e77338a094d55b5b5914122a804a5&dst=8453:USDC",
      },
      {
        name: "OKX DEX",
        href: "https://web3.okx.com/dex-swap?chain=base,base&token=0x020940df9f5e77338a094d55b5b5914122a804a5,0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca",
      },
      {
        name: "Bitget",
        href: "https://web3.bitget.com/en/swap/base/0x020940df9F5E77338a094D55b5B5914122a804A5",
      },
    ],
    impact: ["1,000,000 RBNT = 7.88% to 8.04%", "100,000 RBNT = 13.36%"],
  },
  {
    chain: "Solana",
    contract: SOL,
    dexes: [
      {
        name: "Raydium",
        href: `https://raydium.io/swap/?inputMint=${SOL}&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`,
      },
    ],
    impact: ["10,000 WRBNT = 86.77%"],
    warn: "Effectively unusable at this size.",
  },
  {
    chain: "Redbelly Network (native chain)",
    contract: RBN,
    dexes: [
      {
        name: "reddex, RBNT to USDC.e",
        href: "https://www.reddex.io/swap?chain=redbelly&inputCurrency=NATIVE&outputCurrency=0x8201c02d4AB2214471E8C3AD6475C8b0CD9F2D06",
      },
      {
        name: "reddex, WRBNT to USDC.e",
        href: `https://www.reddex.io/swap?chain=redbelly&inputCurrency=${RBN}&outputCurrency=0x8201c02d4AB2214471E8C3AD6475C8b0CD9F2D06`,
      },
    ],
    impact: [],
  },
];

/* ---------- page ---------- */

function Playbook() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <nav className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:flex lg:justify-between">
          <a href="#top" className="flex min-w-0 shrink-0 items-center p-[11px]" aria-label="Back to top">
            <img src={LOGO} alt="Redbelly DAO logo" width={78} height={40} className="block h-10 w-auto shrink-0" />
          </a>
          <ul className="col-span-2 flex flex-wrap gap-x-5 gap-y-1 text-[12px] tracking-wider uppercase lg:col-span-1">
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="border-b border-transparent py-1 transition-colors hover:border-b-primary hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <section className="py-14 sm:py-20">
          <h1 className="text-[38px] leading-[1.05] font-bold tracking-[-0.02em] text-primary sm:text-[54px]">
            Unstick Your RBNT
          </h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted-foreground sm:text-[19px]">
            Cross-Chain Recovery Playbook — TASK-16, Redbelly DAO Task Board
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <OutLink href={PDF} variant="solid">
              <FileText className="h-4 w-4" aria-hidden="true" />
              View PDF
            </OutLink>
            <OutLink href={MD}>
              <FileCode2 className="h-4 w-4" aria-hidden="true" />
              View Markdown Source
            </OutLink>
          </div>
        </section>

        <div className="space-y-16">
          {/* SECTION 1 */}
          <SectionShell id="before-you-bridge" label="Section 01" title="Before You Bridge">
            <Card>
              <h3 className="text-[22px] font-semibold text-primary">Where RBNT trades</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                RBNT trades on four exchanges: <Mono>Gate</Mono>, <Mono>MEXC</Mono>,{" "}
                <Mono>WhiteBIT</Mono>, and <Mono>BYDFi</Mono>. Recovery processes are not equivalent
                between them, so the exchange you used determines your realistic options.
              </p>
            </Card>

            <div className="grid gap-5 md:grid-cols-2">
              {EXCHANGES.map((ex) => (
                <Card key={ex.name} accent>
                  <h3 className="font-mono text-sm tracking-[0.18em] text-primary uppercase">
                    {ex.name}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{ex.body}</p>
                  <div className="mt-5">
                    <OutLink href={ex.href}>Recovery Process</OutLink>
                  </div>
                </Card>
              ))}
            </div>

            <Card>
              <h3 className="text-[20px] font-semibold text-primary">Correct deposit procedure</h3>
              <ol className="mt-4 list-decimal space-y-3 pl-5 text-[15px] leading-relaxed text-muted-foreground">
                <li>Confirm the exchange actually lists RBNT before generating a deposit address.</li>
                <li>
                  Confirm the exact network the exchange lists for RBNT, and that it matches the
                  chain you are sending from.
                </li>
                <li>Send a small test amount first and wait for it to credit.</li>
                <li>
                  Keep the transaction hash, deposit address, and timestamp as evidence in case
                  anything goes wrong.
                </li>
              </ol>
            </Card>
          </SectionShell>

          {/* SECTION 2 */}
          <SectionShell id="contracts" label="Section 02" title="Verified Contract Addresses">
            <Card className="p-0 sm:p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse">
                  <thead>
                    <tr>
                      <Th>Chain</Th>
                      <Th>Contract Address</Th>
                      <Th>Confidence</Th>
                      <Th>Source</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {CONTRACT_ROWS.map((row) => (
                      <tr key={row.chain}>
                        <Td>{row.chain}</Td>
                        <Td>
                          {row.absent ? (
                            <span className="font-mono text-[12px] text-primary">{row.address}</span>
                          ) : (
                            <CopyAddress value={row.address} />
                          )}
                        </Td>
                        <Td>
                          <Badge level={row.level} />
                        </Td>
                        <Td className="text-muted-foreground">{row.source}</Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <div>
              <h3 className="text-[20px] font-semibold text-primary">Live Swap Links, by chain</h3>
              <Accordion type="multiple" className="mt-4 space-y-3">
                {SWAPS.map((s) => (
                  <AccordionItem
                    key={s.chain}
                    value={s.chain}
                    className="rounded-xl border border-border border-l-4 border-l-primary bg-card px-5"
                  >
                    <AccordionTrigger className="text-left">
                      <span className="font-mono text-sm tracking-[0.15em] text-primary uppercase">
                        {s.chain}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-[13px] break-all text-muted-foreground">
                        Contract <Mono>{s.contract}</Mono>
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        {s.dexes.map((d) => (
                          <OutLink key={d.name} href={d.href}>
                            {d.name}
                          </OutLink>
                        ))}
                      </div>
                      {s.impact.length > 0 && (
                        <div className="mt-5 rounded-lg bg-muted p-4">
                          <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                            Measured price impact
                          </p>
                          <ul className="mt-2 space-y-1 font-mono text-[13px]">
                            {s.impact.map((i) => (
                              <li key={i}>{i}</li>
                            ))}
                          </ul>
                          {s.warn && (
                            <p className="mt-3 flex items-center gap-2 text-[13px] font-semibold text-primary">
                              <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
                              {s.warn}
                            </p>
                          )}
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </SectionShell>

          {/* SECTION 3 */}
          <SectionShell id="bridges" label="Section 03" title="Official Bridges">
            <div className="grid gap-5 md:grid-cols-2">
              <Card accent>
                <h3 className="font-mono text-sm tracking-[0.18em] text-primary uppercase">
                  Lucid Labs Bridge
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  Official route for bringing RBNT and WRBNT back to Redbelly Network from 9 chains:
                  Ethereum, Arbitrum, Optimism, Base, BSC, Polygon, Avalanche, Sonic, and Solana
                  (Solana route currently unavailable).
                </p>
                <div className="mt-6">
                  <OutLink href="https://bridge.lucidlabs.fi/" variant="solid">
                    Open Lucid Labs Bridge
                  </OutLink>
                </div>
              </Card>
              <Card accent>
                <h3 className="font-mono text-sm tracking-[0.18em] text-primary uppercase">
                  Reddex Bridge
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  Official route for bridging USDC and USDT into Redbelly Network. Runs on the same
                  Lucid Labs / Polymer infrastructure. Flat 1% fee.
                </p>
                <div className="mt-6">
                  <OutLink href="https://www.reddex.io/bridge" variant="solid">
                    Open Reddex Bridge
                  </OutLink>
                </div>
              </Card>
            </div>
          </SectionShell>

          {/* SECTION 4 */}
          <SectionShell id="failure-modes" label="Section 04" title="Failure Modes">
            <Tabs defaultValue="zero" className="w-full">
              <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 bg-muted p-1.5">
                <TabsTrigger value="zero">Zero Value / Swap Fail</TabsTrigger>
                <TabsTrigger value="quote">Quote Unavailable</TabsTrigger>
                <TabsTrigger value="stable">Stablecoin Stuck</TabsTrigger>
                <TabsTrigger value="cex">Wrong CEX Deposit</TabsTrigger>
              </TabsList>

              <TabsContent value="zero" className="mt-5">
                <Card>
                  <ol className="space-y-5">
                    <Step n={1} title="Confirm the contract address">
                      <p>
                        Compare the token contract in your wallet against the table above, character
                        by character. A wrapped token showing zero value is very often the wrong
                        contract rather than a broken one. On BNB Chain there is no official token at
                        all, so any RBNT looking asset there is an impersonator with no recoverable
                        value.
                      </p>
                    </Step>
                    <Step n={2} title="Check pool depth before swapping">
                      <p>
                        A large price impact warning is the pool being honest with you, not a bug. On
                        Solana (<Mono>{SOL}</Mono>) a 10,000 WRBNT swap quoting 86.77% impact means
                        the pool cannot absorb your order. Reduce size, split the swap, or move to a
                        chain with deeper liquidity instead of raising slippage.
                      </p>
                    </Step>
                    <Step n={3} title="Rule out ordinary transaction issues">
                      <p>
                        If the contract is right and the pool is deep enough, the cause is usually
                        mundane: insufficient native gas, an expired quote, or slippage set too
                        tight. Refresh the quote, confirm your gas balance, and retry once with a
                        realistic slippage setting on{" "}
                        <InlineLink href={`https://1inch.com/swap?src=1:${ETH}&dst=1:USDT`}>
                          1inch
                        </InlineLink>
                        .
                      </p>
                    </Step>
                  </ol>
                </Card>
              </TabsContent>

              <TabsContent value="quote" className="mt-5">
                <Card>
                  <ol className="space-y-5">
                    <Step n={1} title="Check whether your chain is supported">
                      <p>
                        <InlineLink href="https://bridge.lucidlabs.fi/">Lucid Labs Bridge</InlineLink>{" "}
                        is the official route back to Redbelly Network and supports nine source
                        chains. If your source chain is not one of them, no quote will appear, and
                        that is expected behaviour rather than a wallet fault.
                      </p>
                    </Step>
                    <Step n={2} title="Treat Solana as unresolvable for now">
                      <p>
                        There is no supported route from Solana back to Redbelly Network through the
                        official bridge at the time of checking. This will not resolve by retrying,
                        changing wallets, or adjusting the amount.
                      </p>
                    </Step>
                    <Step n={3} title="Do not repeatedly retry">
                      <p>
                        Repeated attempts cost gas and produce the same result. Check Lucid Labs
                        directly for current chain support, since chains can be added over time.
                      </p>
                    </Step>
                    <Step n={4} title="Never use an unofficial bridge as a workaround">
                      <p>
                        An unsupported route is a limitation. An unofficial bridge is a risk of total
                        loss. If a supported path exists from where you hold funds, move to a working
                        chain first.
                      </p>
                    </Step>
                  </ol>
                </Card>
              </TabsContent>

              <TabsContent value="stable" className="mt-5">
                <Card>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">
                    <InlineLink href="https://www.reddex.io/bridge">reddex</InlineLink> is Redbelly&apos;s
                    official interface for USDC and USDT into Redbelly Network, on Lucid Labs /
                    Polymer, at a flat 1% fee. Treat any other interface offering the same transfer
                    as unverified.
                  </p>
                  <ol className="mt-6 space-y-5">
                    <Step n={1} title="Confirm the source transaction on Etherscan">
                      <p>
                        Confirm the transfer succeeded on Ethereum mainnet, with the correct token
                        contract, amount, and destination. If the source transaction failed, nothing
                        left your wallet and there is nothing to recover.
                      </p>
                    </Step>
                    <Step n={2} title="Give it time">
                      <p>
                        Polymer transfers normally complete in 10 seconds to a few minutes. Anything
                        past 30 minutes is a genuine delay worth investigating.
                      </p>
                    </Step>
                    <Step n={3} title="Check reddex directly for status">
                      <p>
                        Open{" "}
                        <InlineLink href="https://www.reddex.io/bridge">reddex</InlineLink> and check
                        transfer status there rather than judging by your wallet balance alone.
                      </p>
                    </Step>
                    <Step n={4} title="If still stuck, collect evidence and contact support">
                      <p>Gather the transaction hash, amount and asset, timestamp, and destination address before opening a ticket.</p>
                      <p>
                        Never resend the funds, and never click Discord or direct message links
                        offering to unstick the transfer for you.
                      </p>
                    </Step>
                  </ol>
                </Card>
              </TabsContent>

              <TabsContent value="cex" className="mt-5">
                <Card>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">
                    Recovery is possible here, but never guaranteed. Each exchange runs a manual
                    process with its own rules, fees, and limits, and each reserves the right to
                    decline.
                  </p>
                  <ol className="mt-6 space-y-5">
                    <Step n={1} title="Collect your evidence first">
                      <ul className="list-disc space-y-1 pl-5">
                        <li>Transaction hash of the deposit</li>
                        <li>The exact deposit address you sent to</li>
                        <li>The exact asset and network used</li>
                        <li>Amount and timestamp</li>
                        <li>Your account identifier (UID or registered email)</li>
                      </ul>
                    </Step>
                    <Step n={2} title="Use the exchange's own recovery path">
                      <ul className="list-disc space-y-1 pl-5">
                        <li>
                          <InlineLink href={EX_LINK.GATE}>Gate</InlineLink>: self service
                          recovery request tool.
                        </li>
                        <li>
                          <InlineLink href={EX_LINK.MEXC}>MEXC</InlineLink>: wrong deposit
                          return application, processing fee applies, funds return to the sending
                          address.
                        </li>
                        <li>
                          <InlineLink href={EX_LINK.BYDFI}>BYDFi</InlineLink>: support ticket
                          with transaction hash and UID.
                        </li>
                        <li>
                          <InlineLink href={EX_LINK.WHITEBIT}>WhiteBIT</InlineLink>: general support
                          ticket only, no dedicated tool.
                        </li>
                      </ul>
                    </Step>
                    <Step n={3} title="Do not make it worse">
                      <p className="flex gap-2">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                        <span>
                          Never send additional funds to the same address, and never click links
                          claiming to expedite recovery in exchange for a fee or your wallet
                          credentials.
                        </span>
                      </p>
                    </Step>
                  </ol>
                </Card>
              </TabsContent>
            </Tabs>
          </SectionShell>
        </div>
      </main>

      <footer className="border-t border-border bg-secondary py-12">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            This guide reflects live, independently verified data as of August 2026. Always confirm
            current quotes before acting on amounts that matter to you.
          </p>
          <div className="mt-6 flex justify-center">
            <OutLink href={REPO}>GitHub repo</OutLink>
          </div>
        </div>
      </footer>
    </div>
  );
}
