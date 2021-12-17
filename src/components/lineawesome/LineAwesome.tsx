interface LineAwesomeProps {
  icon: string;
}

export const LineAwesome = (props: LineAwesomeProps) => {
  return (
    <>
      <span className={props.icon}></span>
    </>
  );
};
