interface IfProps {

  condition: boolean;
  renderIf: JSX.Element;
  renderElse?: JSX.Element | null

}


const If = ({ condition, renderIf, renderElse = null }: IfProps) => {
  return (
    condition
      ? renderIf
      : renderElse
  )
};

export default If