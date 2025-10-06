interface ActionButtonsProps {
  onFix: () => void;
  onReview: () => void;
  isLoading: boolean;
  isFixLoading: boolean;
}

const ActionButtons = ({ onFix, onReview, isLoading, isFixLoading }: ActionButtonsProps) => {
  return (
    <div className="actions">
      <button
        type="button"
        onClick={onFix}
        className="btn-secondary flex items-center"
        disabled={isLoading || isFixLoading}
      >
        {isFixLoading ? (
          <>
            <span className="loader mr-2" />
            Fixing...
          </>
        ) : (
          "Fix"
        )}
      </button>
      <button
        type="button"
        onClick={onReview}
        className="btn-primary flex items-center"
        disabled={isLoading || isFixLoading}
      >
        {isLoading ? (
          <>
            <span className="loader mr-2" />
            Reviewing...
          </>
        ) : (
          "Review"
        )}
      </button>
    </div>
  );
};

export default ActionButtons;