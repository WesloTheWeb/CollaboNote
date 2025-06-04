import Image from 'next/image';
import Banner from '@/components/Banners/Banners';
import classes from './UserCard.module.scss';

interface UserCardProps {
    uuid: number,
    username: string,
    firstName: string,
    lastName: string,
    achievement?: string | null,
    avatar: string, // image
    postDate: Date | string,
    membershipType: string,
    messagePostBody: string,
}

const { userCardContainer, userCardHeaderDisplay, userCardDetailsContainer, userCardDetails } = classes;

const UserCard = ({ uuid, username, avatar, postDate, achievement, membershipType, messagePostBody }: UserCardProps) => {
    return (
        <div className={userCardContainer}>
            <section className={userCardHeaderDisplay}>
                <div className={userCardDetailsContainer}>
                    <figure>
                        <img src={avatar} alt={avatar} width={50} height={50} />
                    </figure>
                    <div className={userCardDetails}>
                        <strong>{username}</strong>
                        {membershipType}
                    </div>
                </div>
                <div>
                    {
                        achievement ? (
                            <Banner type="success" variant="usercard" message="Achievement!" />
                        ) : null
                    }
                    <span>1hr ago</span>
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
