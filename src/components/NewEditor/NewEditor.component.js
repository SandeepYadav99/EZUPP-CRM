import React from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const NewEditor = ({ editorData, handleChangeEditor, type, value,...rest }) => {
  
  const handleChange = (content) => {
    handleChangeEditor && handleChangeEditor(content);
  };

  return (
    <div>
      <SunEditor
        defaultValue={editorData}
        setOptions={{
          height: 400,
          buttonList: [
            [
              "undo",
              "redo",
              "bold",
              "underline",
              "fontColor",
              "table",
              "link",
              "image",
              "indent",
              "outdent",
              "list",
              "align",
              "codeView",
              "video",
              "formatBlock",
            ],
          ],
        }}
        onChange={(text) => {
          handleChange(text);
        }}
        {...rest}
      />
    </div>
  );
};
export default NewEditor;
