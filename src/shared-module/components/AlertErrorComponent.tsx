const AlertErrorComponent = () => {
  return (
    <div
      role="alert"
      className="alert alert-danger alert-dismissible fade show"
    >
      <i aria-hidden="true" className="gel-icon-error"></i>Error loading data
      <button
        type="button"
        data-dismiss="alert"
        aria-label="Close"
        className="close"
      >
        <i aria-hidden="true" className="gel-icon-close gel-icon-lg"></i>
      </button>
    </div>
  );
};
export default AlertErrorComponent;
