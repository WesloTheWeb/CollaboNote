import { pricingTiers, featureCategories, featureMapping } from '@/config';
import classes from './PricingTable.module.scss';

const { 
  priceTableContainer, 
  tableHeader,
  popularPlan, 
  priceRow,
  period,
  featureRow,
  included,
  notIncluded,
  actionRow,
  ctaButton,
  secondary,
  featureLabel
} = classes;

const PricingTable = () => {
  return (
    <table className={priceTableContainer}>
      <thead className={tableHeader}>
        <tr>
          <th className={featureLabel}>Features</th>
          {pricingTiers.map((tier) => (
            <th 
              key={tier.name}
              className={tier.recommended ? popularPlan : ''}
            >
              {tier.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* Price row */}
        <tr className={priceRow}>
          <td></td>
          {pricingTiers.map((tier) => (
            <td key={`price-${tier.name}`}>
              ${tier.price === 'Free' ? 'Free' : tier.price.replace('$', '')}
              <span className={period}>
                {tier.period === 'forever' ? '/month' : `/${tier.period}`}
              </span>
            </td>
          ))}
        </tr>
        
        {/* Feature rows */}
        {featureCategories.map((category) => (
          <tr key={category} className={featureRow}>
            <td className={featureLabel}>
              {category}
            </td>
            
            {pricingTiers.map((tier) => {
              // Type-safe access using type assertion
              const tierMapping = featureMapping[tier.name as keyof typeof featureMapping];
              const featureData = tierMapping[category as keyof typeof tierMapping];
              
              return (
                <td 
                  key={`${tier.name}-${category}`} 
                  className={featureData.included ? included : notIncluded}
                >
                  {featureData.details}
                </td>
              );
            })}
          </tr>
        ))}
        
        {/* Action row */}
        <tr className={actionRow}>
          <td></td>
          {pricingTiers.map((tier) => (
            <td key={`action-${tier.name}`}>
              <button 
                className={`${ctaButton} ${tier.name === 'Basic' ? secondary : ''}`}
              >
                {tier.buttonText}
              </button>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default PricingTable;