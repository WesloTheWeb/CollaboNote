import Image from 'next/image';
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
                        {achievement}
                        {membershipType}
                    </div>
                </div>
                <div>
                    Achivement
                </div>
            </section>
            <section>
                {messagePostBody}
            </section>
        </div>
    );
};

export default UserCard;
