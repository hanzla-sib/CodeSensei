import Markdown from "react-markdown";

interface ResponsePanelProps {
  response: string;
  error: string | null;
  isLoading: boolean;
}

const ResponsePanel = ({ response, error, isLoading }: ResponsePanelProps) => {
  const renderContent = () => {
    if (error) {
      return (
        <div className="response-center response-error">
          Error: {error}
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="response-center">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className="loader" />
            <div>Waiting for response...</div>
          </div>
        </div>
      );
    }

    if (response) {
      return (
        <div className="response-body response-scroll" style={{ whiteSpace: "pre-wrap" }}>
          <Markdown>{response}</Markdown>
        </div>
      );
    }

    return (
      <div className="response-center">
        No response yet. Click Review to start.
      </div>
    );
  };

  return (
    <div className="right !p-[10px] h-[100%] w-[50%] bg-zinc-900">
      <div className="toptab border-b-[1px] border-t-[1px] border-[#27272a] flex items-center justify-between h-[60px]">
        <p className="font-[700] text-[17px]">Response</p>
      </div>
      <div className="response-container mt-[10px] h-[88%] p-4 bg-[#070707] rounded">
        {renderContent()}
      </div>
    </div>
  );
};

export default ResponsePanel;