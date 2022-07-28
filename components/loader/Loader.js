import Card from "components/card/Card";

export const LoadingCircle = () => {
  return (
    <Card
      title="Loading Circle"
      filter="Loading"
      htmlCode={`<div></div>`}
      cssCode={
        /*css*/ /*css*/ `
        div {
          width: 50px;
          height: 50px;
          border-radius: 15rem;
          position: relative;
          margin: 0 auto;
        }
        div:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          border: 4px solid transparent;
          border-right-color: #f62682;
          border-bottom-color: #f62682;
          animation: circleLoading 1s forwards infinite linear;
        }
        @keyframes circleLoading {
          to {
            transform: rotate(360deg);
          }
        }
      `
      }
    ></Card>
  );
};
export const LoadingBar = () => {
  return (
    <Card
      filter="Loading"
      title="Loading Bar"
      htmlCode={`<div></div>`}
      cssCode={
        /*css*/ /*css*/ `
        div {
          width: 100%;
          height: 4px;
          position: relative;
          margin: 0 auto;
        }
        div:before {
          content: "";
          position: absolute;
          right: auto;
          left: 0;
          height: 100%;
          background-color: #f62682;
          animation: lineLoading 1s forwards infinite linear;
        }

        @keyframes lineLoading {
          0% {
            right: 100%;
          }
          50% {
            right: 0;
            left: 0;
          }
          100% {
            right: 0;
            left: 100%;
          }
        }
      `
      }
    ></Card>
  );
};
