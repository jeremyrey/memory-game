import { ReactElement } from 'react';

interface ComponentProps {
  handleClick: () => void;
}

export default function StartScreen({handleClick}: ComponentProps): ReactElement {
  return (
    <div onClick={handleClick}>Oui</div>
  );
}
