const SuccessNoti = ({ success, error }) => {
  if (success === null && error === null) {
    return null;
  }
  if (success !== null) {
    return <div className="success">{success}</div>;
  }
  return <div className="error">{error}</div>;
};

export default SuccessNoti;
