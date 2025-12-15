import Header from '@/components/Header';
import Link from 'next/link';

// Checkmark Icon for features
const CheckIcon = () => (
  <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default function LandingPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />

      {/* Hero Section */}
      <main className="relative isolate pt-14">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Turn Your Customer Feedback into Growth
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Taqyeem helps you collect valuable reviews, improve your reputation, and understand your customers better. All in one simple platform.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/login">
                <button className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                  Get Started
                </button>
              </Link>
              <Link href="#features" className="text-sm font-semibold leading-6 text-white">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-24 sm:py-32 bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-400">Everything You Need</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              A better way to manage your reputation
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              From collecting reviews to analyzing feedback, Taqyeem gives you the tools to succeed.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <CheckIcon /> Smart Review Links
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">Create unique, shareable links for each of your business locations. Get feedback where it matters most.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <CheckIcon /> Google Maps Integration
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">Automatically redirect happy customers to leave reviews on Google Maps, boosting your public rating.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <CheckIcon /> Powerful Analytics
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">Track clicks, ratings, and sentiment over time. Understand your performance at a glance with our intuitive dashboard.</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 sm:py-32 bg-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-400">Pricing</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Simple plans for businesses of all sizes
            </p>
          </div>
          <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {/* Pricing Plans */}
            <div className="rounded-3xl p-8 ring-1 ring-gray-200/10">
              <h3 className="text-lg font-semibold leading-8 text-white">Starter</h3>
              <p className="mt-4 text-sm leading-6 text-gray-300">For new businesses getting started.</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-white">100</span>
                <span className="text-sm font-semibold leading-6 text-gray-300">SAR/month</span>
              </p>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                <li className="flex gap-x-3"><CheckIcon /> 1 Review Link</li>
                <li className="flex gap-x-3"><CheckIcon /> Unlimited Visits</li>
                <li className="flex gap-x-3"><CheckIcon /> Analytics Dashboard</li>
              </ul>
            </div>
            <div className="rounded-3xl p-8 ring-2 ring-blue-500">
              <h3 className="text-lg font-semibold leading-8 text-white">Growth</h3>
              <p className="mt-4 text-sm leading-6 text-gray-300">For growing businesses with multiple locations.</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-white">750</span>
                <span className="text-sm font-semibold leading-6 text-gray-300">SAR/month</span>
              </p>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                <li className="flex gap-x-3"><CheckIcon /> 10 Review Links</li>
                <li className="flex gap-x-3"><CheckIcon /> Unlimited Visits</li>
                <li className="flex gap-x-3"><CheckIcon /> Multi-location Dashboard</li>
              </ul>
            </div>
            <div className="rounded-3xl p-8 ring-1 ring-gray-200/10">
              <h3 className="text-lg font-semibold leading-8 text-white">Scale</h3>
              <p className="mt-4 text-sm leading-6 text-gray-300">For large businesses and franchises.</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-white">3500</span>
                <span className="text-sm font-semibold leading-6 text-gray-300">SAR/month</span>
              </p>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                <li className="flex gap-x-3"><CheckIcon /> 50 Review Links</li>
                <li className="flex gap-x-3"><CheckIcon /> Unlimited Visits</li>
                <li className="flex gap-x-3"><CheckIcon /> Advanced Analytics</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 text-center">
            <p className="text-gray-400">Get a **30% discount** on annual subscriptions. Contact us for enterprise plans.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Taqyeem. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}