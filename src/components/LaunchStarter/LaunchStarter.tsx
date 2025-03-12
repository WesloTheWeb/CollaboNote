import Image from 'next/image';
import classes from './LaunchStart.module.scss';

const { container } = classes;

const LaunchStarter = () => {
    return (
        <section className={container}>
            <h1>Welcome to CollaboNote</h1>
            <p>
                If you are reading this we are just breaking ground here. Check back for more updates and just star this repo,
                or follow, as this evolves.
            </p>
            <Image src="/assets/buildingAtWork.png" width={300} height={300} alt="temp photo building" />
        </section>
    )
};

export default LaunchStarter;