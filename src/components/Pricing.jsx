import { Zap, Sparkles, Crown, Check, Shield } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    icon: Zap,
    price: '$999',
    period: '/month',
    iconBg: 'bg-navy',
    popular: false,
    features: [
      'Up to 50 staff',
      'Basic patient management',
      '5 departments',
      'Email support',
      '10GB storage',
      'Basic analytics',
    ],
    btnClass: 'bg-navy hover:bg-navy-dark text-white',
    btnText: 'Get Started',
  },
  {
    name: 'Professional',
    icon: Sparkles,
    price: '$2,499',
    period: '/month',
    iconBg: 'bg-magenta',
    popular: true,
    features: [
      'Up to 200 staff',
      'Advanced patient management',
      'Unlimited departments',
      'Priority 24/7 support',
      '100GB storage',
      'Advanced analytics & reporting',
      'Custom integrations',
      'Mobile app access',
    ],
    btnClass: 'bg-magenta hover:bg-magenta-dark text-white',
    btnText: 'Get Started',
  },
  {
    name: 'Enterprise',
    icon: Crown,
    price: 'Custom',
    period: '',
    iconBg: 'bg-navy',
    popular: false,
    features: [
      'Unlimited staff',
      'Enterprise patient management',
      'Multi-facility support',
      'Dedicated account manager',
      'Unlimited storage',
      'Custom analytics & AI insights',
      'API access',
      'White-label options',
      'SLA guarantee',
    ],
    btnClass: 'bg-navy hover:bg-navy-dark text-white',
    btnText: 'Contact Sales',
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-magenta/10 text-magenta text-sm font-semibold rounded-full mb-4">
            Pricing Plans
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Flexible pricing designed to scale with your healthcare facility. All plans include free setup and onboarding.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative p-8 bg-white rounded-3xl border-2 transition-all duration-300 hover:shadow-xl ${
                  plan.popular
                    ? 'scale-105 border-magenta shadow-lg'
                    : 'border-gray-200 hover:border-navy/30'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-magenta text-white text-sm font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}

                <div className={`w-14 h-14 ${plan.iconBg} rounded-2xl flex items-center justify-center mb-6`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-navy mb-2">{plan.name}</h3>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-navy">{plan.price}</span>
                  {plan.period && <span className="text-gray-500">{plan.period}</span>}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-colors cursor-pointer ${plan.btnClass}`}>
                  {plan.btnText}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center flex items-center justify-center gap-2 text-gray-500">
          <Shield className="w-5 h-5" />
          <p>All plans include SSL encryption and are fully HIPAA compliant.</p>
        </div>
      </div>
    </section>
  );
}
