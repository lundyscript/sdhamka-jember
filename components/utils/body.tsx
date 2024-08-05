"use client"
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.bubble.css';

export const BodyPreview = ({body}: {body: string}) => {
  return (
    <>
      <ReactQuill value={body} readOnly theme="bubble" className="-m-4"/>
    </>
  )
}