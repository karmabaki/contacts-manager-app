import { useState } from 'react';

const colorNames = [
  'rose', 'pink', 'fuchsia', 'purple', 'violet',
  'indigo', 'blue', 'sky', 'cyan', 'teal',
  'emerald', 'green', 'lime', 'yellow', 'amber',
  'orange', 'red',
];

const getRandomColorName = () =>
  colorNames[Math.floor(Math.random() * colorNames.length)];

const Colorfull = (WrappedComponent) => {
  return (props) => {
    const [colorName, setColorName] = useState(getRandomColorName);

    return (
      <WrappedComponent
        {...props}
        colorName={colorName}
        onChangeColor={() => setColorName(getRandomColorName())}
      />
    );
  };
};

export default Colorfull;