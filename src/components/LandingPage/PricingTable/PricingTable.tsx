import { pricingTiers } from '@/config';
import classes from './PricingTable.module.scss';

const { priceTableContainer } = classes;

const PricingTable = ({ }) => {

    return (
        <table className={priceTableContainer}>
            <thead>
                <th>Free</th>
                <th>Basic</th>
                <th>Pro</th>
            </thead>
            <tbody>

            </tbody>
        </table>
    );

};

export default PricingTable;