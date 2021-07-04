import React from 'react';
import GroupListEntry from './GroupListEntry'

// The GroupList component handles the group list on the "Groups" page.
export const GroupList = ({
    groups
}) => {

    const groupElements = groups.map((group, index) => {
        return (
            <GroupListEntry key={index} {...group} />
        );
    });

    return (
        <ul>{groupElements}</ul>
    );
};
