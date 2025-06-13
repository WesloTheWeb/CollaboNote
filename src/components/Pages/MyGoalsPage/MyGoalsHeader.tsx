import MyGoalsTabHeaders from "./MyGoalsTabHeaders/MyGoalsTabHeaders";


const MyGoalsHeader = ({ }) => {

    return (
        <section>
            <h2>My Goals</h2>
            <sub>Day by day, brick by brick...</sub>
            <div>
                This is a place where you may create, edit, update or delete your goals.
            </div>
            <MyGoalsTabHeaders />
        </section>
    )

};

export default MyGoalsHeader;