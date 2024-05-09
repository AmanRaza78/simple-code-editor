import React, { RefObject, useState } from "react";
import { Button } from "./ui/button";
import { executeCode } from "@/api";
import { useToast } from "@/components/ui/use-toast";

interface OutputProps {
  editorRef: RefObject<any>; // Change 'any' to the type of your editorRef if possible
  language: string; // Change 'string' to the specific type if you have one
}

const Output: React.FC<OutputProps> = ({ editorRef, language }) => {
  const [output, setOutput] = useState<string[] | null>(null);
  const [isError, setIsError] = useState(false);
  const { toast } = useToast();

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      const { run: result } = await executeCode(language, sourceCode);
      console.log(result.output);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Uh oh! An Error Occured.",
        description: error.message || "Unable to run code",
      });
    }
  };
  return (
    <>
      <div className="flex flex-col w-[50%] m-8 gap-y-4">
        <Button variant="outline" onClick={runCode}>
          Run Code
        </Button>
        <div
          className={`h-[100%] w-full border p-4 ${
            isError ? "border-red-500" : "border-gray-300"
          }`}
        >
          {output
            ? output.map((line: any, i: any) => <p key={i}>{line}</p>)
            : 'Click "Run Code" to see the output here'}
        </div>
      </div>
    </>
  );
};

export default Output;
