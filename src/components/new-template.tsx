"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LanguageSelector from "./language-selector";
import { useRef, useState } from "react";
import { CODE_SNIPPETS } from "@/constants";
import { ModeToggle } from "./toggle-menu";
import { Editor } from "@monaco-editor/react";
import Output from "./output";
import { CodeIcon, PlayIcon, SaveIcon } from "lucide-react";

export default function Component() {
  const editorRef = useRef();

  const [language, setLanguage] = useState("javascript");
  const [value, setValue] = useState<string>("");

  const onMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };
  const onSelect = (language: string) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <CodeIcon className="w-6 h-6" />
            <span className="text-lg font-medium">Code Compiler</span>
          </Link>
          <LanguageSelector lang={language} onSelect={onSelect} />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <PlayIcon className="w-5 h-5" />
            <span className="sr-only">Run</span>
          </Button>
          <Button variant="ghost" size="icon">
            <SaveIcon className="w-5 h-5" />
            <span className="sr-only">Save</span>
          </Button>
          <ModeToggle />
        </div>
      </header>
      <main className="flex-1 flex">
        <div className="flex-1 bg-background border-r p-6">
          <Editor
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            theme="vs-dark"
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value ?? "")}
            className="w-full h-full resize-none"
          />
        </div>

        <Output editorRef={editorRef} language={language} />
      </main>
      <footer className="bg-muted border-t px-4 py-3 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          &copy; 2024 Code Compiler. All rights reserved.
        </div>
        <div className="flex items-center gap-2">
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Privacy Policy
          </Link>
        </div>
      </footer>
    </div>
  );
}
