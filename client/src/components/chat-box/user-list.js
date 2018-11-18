import React from 'react';

const UserList = (props) => {
    return (
        <div>
            <ul><b>Users Online:</b>
                {props.users.map((user) => {
                    return (
                        <li key={user.id}>
                            {user}
                        </li>
                    )
                })}
            </ul>
        </div>

    )
}

export { UserList }