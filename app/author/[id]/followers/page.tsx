import pluralize from 'pluralize';

const AuthorFollowers = () => {
    return (
        <>
            <h1>{pluralize('Follower', 1, true)}</h1>

            <ul>
                <li></li>
            </ul>
        </>
    );
};

export default AuthorFollowers;
