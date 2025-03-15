import { ButtonProps } from '@/interfaces';
import classes from './Button.module.scss';


const Button = ({label, fn}: ButtonProps) => {

    return (
        <button>
            {label}
        </button>
    )
};

export default Button;