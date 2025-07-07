const LoadingButton = ({ isLoading, loadingText, children, ...props }) => {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={`w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded ${
        isLoading ? "opacity-75 cursor-not-allowed" : "hover:bg-blue-700"
      }`}
    >
      {isLoading ? (
        <>
          <div
            className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
          {loadingText || "Loading..."}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;
