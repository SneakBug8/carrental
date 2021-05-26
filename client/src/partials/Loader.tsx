export const Loader = ({ show }: { show: boolean } = { show: true }) =>
{
  if (show) {
    return (<div className="loader"></div>);
  }
  else {
    return null;
  }
}