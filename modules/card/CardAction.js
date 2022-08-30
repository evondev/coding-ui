import Card from "components/card/Card";
import FormGroup from "components/form/FormGroup";
import Label from "components/label/Label";
import React from "react";

const CardAction = ({ children, values = {} }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-10 max-w-[1100px] mx-auto relative items-start">
      {children}
      <div className="sticky top-5">
        <FormGroup className="items-stretch w-full ">
          <Label>Preview</Label>
          <Card
            title={values.title}
            filter={values.filter}
            htmlCode={values.htmlCode}
            cssCode={values.cssCode}
            author={values.author}
            preview
          ></Card>
        </FormGroup>
      </div>
    </div>
  );
};

export default CardAction;
