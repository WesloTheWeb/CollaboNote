import classes from './UserCard.module.scss';

const {} = classes;

const UserCard = () => {
    return (
        <div>
            <section>
                profile pic, username, time posted, rank
            </section>
            <section>
                body text
            </section>
        </div>
    );
};

export default UserCard;

// TODO - This is iterated. Make a dummy component that takes in information from postgreSQL database.