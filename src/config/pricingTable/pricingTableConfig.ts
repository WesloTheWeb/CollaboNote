interface PricingTier {
  name: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  recommended?: boolean;
}

// Main pricing tiers with detailed features
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

// Feature categories for display in the pricing table
export const featureCategories = [
  'Personal Goals',
  'Goal Tracking',
  'Community Access',
  'Support',
  'Accountability Partners',
  'Analytics'
];

// Mapping between detailed features and display categories
export const featureMapping = {
  // Basic tier
  'Basic': {
    'Personal Goals': {
      included: true,
      details: '3 goals',
      relatedFeatures: [
        'Personal goal tracking',
        'Up to 3 active goals'
      ]
    },
    'Goal Tracking': {
      included: true,
      details: 'Basic',
      relatedFeatures: [
        'Basic journaling tools'
      ]
    },
    'Community Access': {
      included: true,
      details: 'Standard Forum',
      relatedFeatures: [
        'Community forum access'
      ]
    },
    'Support': {
      included: true,
      details: 'Email',
      relatedFeatures: [
        'Email support'
      ]
    },
    'Accountability Partners': {
      included: false,
      details: '',
      relatedFeatures: []
    },
    'Analytics': {
      included: false,
      details: '',
      relatedFeatures: []
    }
  },
  
  // Pro tier
  'Pro': {
    'Personal Goals': {
      included: true,
      details: 'Unlimited',
      relatedFeatures: [
        'Unlimited active goals'
      ]
    },
    'Goal Tracking': {
      included: true,
      details: 'Advanced',
      relatedFeatures: [
        'Advanced goal analytics',
        'Custom journal templates'
      ]
    },
    'Community Access': {
      included: true,
      details: 'Priority Access',
      relatedFeatures: [
        'Community forum access'
      ]
    },
    'Support': {
      included: true,
      details: 'Priority',
      relatedFeatures: [
        'Priority email support'
      ]
    },
    'Accountability Partners': {
      included: true,
      details: '5 partners',
      relatedFeatures: [
        'Accountability partnerships'
      ]
    },
    'Analytics': {
      included: true,
      details: 'Advanced',
      relatedFeatures: [
        'Advanced goal analytics',
        'Progress sharing options'
      ]
    }
  },
  
  // Team tier
  'Team': {
    'Personal Goals': {
      included: true,
      details: 'Team Goals',
      relatedFeatures: [
        'Everything in Pro',
        'Team goal setting'
      ]
    },
    'Goal Tracking': {
      included: true,
      details: 'Team Analytics',
      relatedFeatures: [
        'Team goal setting'
      ]
    },
    'Community Access': {
      included: true,
      details: 'Team Community',
      relatedFeatures: [
        'Everything in Pro'
      ]
    },
    'Support': {
      included: true,
      details: 'Dedicated Manager',
      relatedFeatures: [
        'Dedicated support manager'
      ]
    },
    'Accountability Partners': {
      included: true,
      details: 'Group Features',
      relatedFeatures: [
        'Group accountability features'
      ]
    },
    'Analytics': {
      included: true,
      details: 'Team Dashboard',
      relatedFeatures: [
        'Team analytics dashboard'
      ]
    }
  }
};