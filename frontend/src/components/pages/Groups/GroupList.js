import React from 'react';
import GroupListEntry from './GroupListEntry'

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
