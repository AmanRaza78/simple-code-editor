import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LANGUAGE_VERSIONS } from "@/constants";

const languages = Object.entries(LANGUAGE_VERSIONS);

interface LanguageSelectorProps {
    lang: string;
    onSelect: (language: string) => void; 
  }
  

const LanguageSelector: React.FC<LanguageSelectorProps> = ({lang, onSelect}) => {
  const [position, setPosition] = React.useState("javascript");
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{lang}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Select Language</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            {languages.map(([language, version]) => (
              <DropdownMenuRadioItem key={language} onClick={()=>onSelect(language)} value={language}>
                {language} {version}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSelector;
