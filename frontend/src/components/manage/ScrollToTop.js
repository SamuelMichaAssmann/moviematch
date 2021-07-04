import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

// The ScrollToTop function forces the page to scroll all the way to the top.
function ScrollToTop({ history }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (null);
}

export default withRouter(ScrollToTop);