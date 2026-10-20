import { Wallet, Coins, Send } from 'lucide-react';

/**
 * Three-step "How It Works" grid shown on the Landing page:
 * Connect Freighter → Practice vXLM → Submit prediction.
 */
const STEPS = [
  {
    id: 'connect',
    title: 'Connect Freighter',
    description:
      'Link your Freighter wallet in one click. Xelma never holds your keys — you sign everything yourself.',
    icon: Wallet,
    iconStyle: 'bg-xelma-blue/10 text-xelma-blue',
    badgeStyle: 'border-xelma-blue/30 text-xelma-blue',
  },
  {
    id: 'practice',
    title: 'Practice vXLM',
    description:
      'Get free virtual XLM and learn the markets risk-free before you commit to a real prediction.',
    icon: Coins,
    iconStyle: 'bg-xelma-teal/10 text-xelma-teal',
    badgeStyle: 'border-xelma-teal/30 text-xelma-teal',
  },
  {
    id: 'predict',
    title: 'Submit prediction',
    description:
      'Pick UP or DOWN, or a narrow price range, and submit. Your prediction is recorded on-chain and settles automatically.',
    icon: Send,
    iconStyle: 'bg-xelma-teal-bright/10 text-xelma-teal-bright',
    badgeStyle: 'border-xelma-teal-bright/30 text-xelma-teal-bright',
  },
] as const;

export default function HowItWorks() {
  return (
    <section
      className="px-4 py-20 sm:px-6 lg:px-8"
      aria-labelledby="how-it-works-title"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id="how-it-works-title"
          className="text-center text-3xl font-bold text-white sm:text-4xl"
        >
          How It Works
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-gray-400">
          Start predicting in three simple steps.
        </p>

        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, index) => {
            const Icon = step.icon;

            return (
              <li
                key={step.id}
                className="glass-card group relative flex flex-col rounded-2xl p-6 transition-all duration-300 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex size-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${step.iconStyle}`}
                  >
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
                  <span
                    className={`inline-flex size-8 items-center justify-center rounded-full border font-mono text-sm font-bold ${step.badgeStyle}`}
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">
                  <span className="sr-only">Step {index + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
