import { Popup as SPopup } from 'semantic-ui-react';

export default function Popup(props) {
  return (
    <SPopup trigger={props.trigger} on="click" flowing hideOnScroll style={props.style}>
      {props.children}
    </SPopup>
  );
}
