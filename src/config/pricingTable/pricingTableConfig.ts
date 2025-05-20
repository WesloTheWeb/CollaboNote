interface PricingTier {
    name: string;
    price: string;
    period: string;
    features: string[];
    buttonText: string;
    recommended?: boolean
};

export const pricingTiers: PricingTier[] = [
    {
      name: 'Basic',
      price: 'Free',
      period: 'forever',
      features: [
        'Personal goal tracking',
        'Up to 3 active goals',
        'Basic journaling tools',
        'Community forum access',
        'Email support',
        'No ads',
        'Mobile app access'
      ],
      buttonText: 'Get Started'
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: 'monthly',
      features: [
        'Everything in Basic',
        'Unlimited active goals',
        'Advanced goal analytics',
        'Accountability partnerships',
        'Priority email support',
        'Custom journal templates',
        'Progress sharing options'
      ],
      recommended: true,
      buttonText: 'Start 14-Day Trial'
    },
    {
      name: 'Team',
      price: '$29.99',
      period: 'monthly',
      features: [
        'Everything in Pro',
        'Up to 10 team members',
        'Team goal setting',
        'Group accountability features',
        'Team analytics dashboard',
        'Dedicated support manager',
        'Custom branding options'
      ],
      buttonText: 'Contact Sales'
    }
  ];