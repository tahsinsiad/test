import { Icon } from 'semantic-ui-react';

export default function Top({ showScroll }) {
  return (
    <a href="#top" style={{ display: showScroll ? 'flex' : 'none' }} className="back-to-top">
      <span style={{ fontWeight: '700', marginRight: '10px' }}>Back to top</span>
      <Icon fitted name="caret up" />
    </a>
  );
}
