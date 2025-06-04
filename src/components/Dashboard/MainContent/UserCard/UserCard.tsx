import Image from 'next/image';
import Banner from '@/components/Banners/Banners';
import { UserType } from '@/interfaces';
import classes from './UserCard.module.scss';

const { userCardContainer, userCardHeaderDisplay, userCardDetailsContainer, userCardDetails } = classes;

const UserCard = ({ uuid, username, avatar, postDate, achievement, membership, timeOfPost, messagePostBody }: UserType) => {
    return (
        <div className={userCardContainer}>
            <section className={userCardHeaderDisplay}>
                <div className={userCardDetailsContainer}>
                    <figure>
                        <img src={avatar} alt={avatar} width={50} height={50} />
                    </figure>
                    <div className={userCardDetails}>
                        <strong>{username}</strong>
                        {membership}
                    </div>
                </div>
                <div>
                    {
                        achievement ? (
                            <Banner type="success" variant="usercard" message="Achievement!" />
                        ) : null
                    }
                    <span>{timeOfPost}</span>
                </div>
            </section>
            <section>
                {achievement ? (
                    achievement
                ) :
                    messagePostBody
                }
            </section>
        </div>
    );
};

export default UserCard;
