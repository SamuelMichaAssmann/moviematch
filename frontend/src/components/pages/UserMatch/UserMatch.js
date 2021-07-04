import React from 'react';
import Matching from '../../assets/Matching/Matching'
import { matchingObj } from './Data'

// The UserMatch component handles the Matching page of the website.
// This currently only includes a Matching component, but the page has its own separate component
// in case this needs to be expanded in the future.
function UserMatch() {
  return (
    <>
      <Matching {...matchingObj} />
    </>
  );
}

export default UserMatch;
