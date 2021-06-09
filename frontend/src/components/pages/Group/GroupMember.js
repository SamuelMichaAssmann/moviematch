import React from 'react';
import { RiVipCrownFill } from 'react-icons/ri';

export const GroupMember = ({
    name,
    owner
}) => {

    const nameParagraph = owner
        ? <p className='groupMemberText'><RiVipCrownFill /> {name}</p>
        : <p className='groupMemberText'>{name}</p>;

    return (
        <div className='groupMember darkBg'>
            {nameParagraph}
        </div>
    )
};
