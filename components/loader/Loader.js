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
export const LoadingCircleDashed = () => {
  return (
    <Card
      filter="Loading"
      title="Loading Circle Dashed"
      htmlCode={/*html*/ /*html*/ `<div class="dashed-loading"></div>`}
      cssCode={
        /*css*/ /*css*/ `
        .dashed-loading {
            position: relative;
            height: 50px;
          }
          .dashed-loading:after,
          .dashed-loading:before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 50%;
            width: 50px;
            height: 50px;
          }
          .dashed-loading:before {
            z-index: 5;
            border: 3px dashed #f62682;
            border-left: 3px solid transparent;
            border-bottom: 3px solid transparent;
            -webkit-animation: dashed 1s linear infinite;
            animation: dashed 1s linear infinite;
          }
          .dashed-loading:after {
            z-index: 10;
            border: 3px solid #f62682;
            border-left: 3px solid transparent;
            border-bottom: 3px solid transparent;
            -webkit-animation: dashed 1s ease infinite;
            animation: dashed 1s ease infinite;
          }
          @keyframes dashed {
            to {
              transform: rotate(360deg);
            }
          }
      `
      }
    ></Card>
  );
};
export const LoadingFade = () => {
  return (
    <Card
      filter="Loading"
      title="Loading Fade"
      htmlCode={/*html*/ /*html*/ `<div class="fade-loading"></div>`}
      cssCode={
        /*css*/ /*css*/ `
        .fade-loading {
            width: 4rem;
            height: 4rem;
            background-color: #f62682;
            border-radius: 5rem;
            margin: 2rem auto;
            position: relative;
          }
          .fade-loading:before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: inherit;
            background-color: inherit;
            animation: fade 1s forwards infinite linear;
          }
          @keyframes fade {
            to {
              transform: scale(2);
              opacity: 0;
            }
          }
      `
      }
    ></Card>
  );
};
