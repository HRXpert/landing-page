import React from 'react';
import { Check, Star, Zap, Crown } from 'lucide-react';

const PricingSection: React.FC = () => {
  const plans = [
    {
      name: "Hero",
      subtitle: "Hiring Essentials",
      price: 75,
      period: "/mo",
      description: "Perfect for small teams getting started with recruitment automation",
      icon: Zap,
      features: [
        "3 active jobs to start, add more jobs for just $9 per job per month",
        "Job posting & syndication",
        "Custom workflows",
        "Basic candidate management",
      ],
      buttonText: "Book a Free Demo",
      popular: false,
      gradient: "from-blue-900/20 to-indigo-900/20",
      borderColor: "border-blue-800/50",
      iconBg: "bg-blue-900/50",
      iconColor: "text-blue-400"
    },
    {
      name: "Plus",
      subtitle: "Power Your Growing Business",
      price: 269,
      period: "/mo",
      description: "Advanced features for scaling teams and enhanced recruitment efficiency",
      icon: Star,
      features: [
        "200 active jobs to start",
        "AI-powered candidate matching",
        "Task automation & workflow helpers",
        "Advanced reporting & analytics",
        "Team collaboration tools",
        "Priority support"
      ],
      buttonText: "Book a Free Demo",
      popular: true,
      gradient: "from-purple-900/30 to-pink-900/30",
      borderColor: "border-purple-600/70",
      iconBg: "bg-purple-900/50",
      iconColor: "text-purple-400"
    },
    {
      name: "Pro",
      subtitle: "Maximize Your Potential",
      price: null,
      period: "",
      description: "Enterprise-grade solution with custom pricing tailored to your workforce",
      icon: Crown,
      features: [
        "200+ active jobs to start",
        "Offer letter generator & eSignature integration",
        "Custom reports builder",
        "Visual reporting & dashboards",
        "Advanced integrations",
        "Dedicated account manager"
      ],
      buttonText: "Book a Free Demo",
      popular: false,
      gradient: "from-gray-800/50 to-gray-900/50",
      borderColor: "border-gray-600/50",
      iconBg: "bg-gray-800/50",
      iconColor: "text-gray-400",
      customPricing: true
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From startups to enterprise, we have the right solution to transform your hiring process
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gradient-to-br ${plan.gradient} border ${plan.borderColor} rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                plan.popular ? 'ring-2 ring-purple-500/50 shadow-purple-500/20' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`w-16 h-16 ${plan.iconBg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <plan.icon className={`w-8 h-8 ${plan.iconColor}`} />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-lg text-gray-300 mb-4">{plan.subtitle}</p>
                
                <div className="mb-4">
                  {plan.customPricing ? (
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">Custom Pricing</div>
                      <div className="text-gray-400">Pricing Tailored to Your Workforce</div>
                    </div>
                  ) : (
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-white">${plan.price}</span>
                      <span className="text-gray-400 ml-2">{plan.period}</span>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="text-white font-semibold mb-3">This plan includes:</div>
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-200 ${
                plan.popular
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg hover:shadow-purple-500/25'
                  : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 hover:border-gray-500'
              }`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">
            All plans include a 7-day free trial • Cancel anytime
          </p>
          {/* <button className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors duration-200">
            Compare all features →
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 