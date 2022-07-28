import Card from "components/card/Card";

export const ButtonLoading = function () {
  return (
    <Card
      title="Button Loading"
      html={`
       <button><div></div><span>Loading...</span></button>
      `}
      css={`
        button {
          display: flex;
          align-items: center;
          justify-content: center;
          column-gap: 12px;
          padding: 15px 20px;
          background-color: #f62682;
          border-radius: 8px;
        }
        button > div {
          width: 20px;
          height: 20px;
          border-radius: 100rem;
          border: 2px solid white;
          border-top: 2px solid transparent;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          100% {
            transform: rotate(360deg);
          }
        }
      `}
    ></Card>
  );
};
