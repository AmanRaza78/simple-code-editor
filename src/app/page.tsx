"use client";
import LanguageSelector from "@/components/language-selector";
import { ModeToggle } from "@/components/toggle-menu";
import { Editor } from "@monaco-editor/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { CODE_SNIPPETS } from "@/constants";
import Output from "@/components/output";
import { Button } from "@/components/ui/button";

export default function Home() {
  const editorRef = useRef();
  const [value, setValue] = useState<string>("");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language: string) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <>
      <nav className="flex justify-between items-center bg-primary w-full p-3 shadow-lg">
          <div></div>
          <h1 className="font-semibold text-2xl">Simple Code Editor</h1>
          <ModeToggle />
      </nav>

      <div className="flex flex-col sm:flex-row">
        <div className="flex flex-col w-full sm:w-1/2 m-8 gap-y-4">
          <LanguageSelector lang={language} onSelect={onSelect} />
          <Editor
            height="75vh"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            theme="vs-dark"
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value ?? "")}
            className="border shadow-lg rounded-md"
          />
        </div>

        <Output editorRef={editorRef} language={language} />
      </div>
    </>
  );
}
