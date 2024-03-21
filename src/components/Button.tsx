interface IProps {
  label?: string;
}

export const Button: React.FC<IProps> = ({
  label
}) => {
  return (
    <a>{label}</a>
  );
}
