"use client";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { cn } from "@/lib/utils";

import { useParams, usePathname, useRouter } from "next/navigation";
import { ILang } from "@/types/lang";
import { Languages } from "@/constants/constants";

interface LangDropdownProps {
  className?: string;
  disableReloading?: boolean;
}

function LangDropdown({ className, disableReloading = false }: LangDropdownProps) {
  const { locale } = useParams();
  const pathname = usePathname().slice(3);
  const router = useRouter();
  const [currentLang, setCurrentLang] = React.useState<ILang>(
    Languages[Languages.findIndex((lang) => lang.code == locale)]
  );
  const [isLangMenuOpen, setIsLangMenuOpen] = React.useState<boolean>(false);

  const handleLangChange = (newLang: ILang) => {
    setCurrentLang(newLang);
    // Close the dropdown
    setIsLangMenuOpen(false);
    
    if (!disableReloading) {
      // Force a full navigation to ensure the page reloads with the new language
      window.location.href = `/${newLang.code}/${pathname}`;
    }
  };

  return (
    <>
      <DropdownMenu open={isLangMenuOpen} onOpenChange={(open) => setIsLangMenuOpen(open)}>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            size="sm"
            className={cn(
              "focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-transparent flex  items-center gap-1 sm:gap-2 px-2",
              className
            )}
          >
            <div className="relative h-5 w-6">
              <Image
                src={currentLang?.flag}
                alt={currentLang?.name}
                fill
                priority
              />
            </div>
            <span className="uppercase hidden sm:block">
              {currentLang?.code || locale}
            </span>
            <ChevronDown className={cn(isLangMenuOpen && "rotate-180")} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32 ">
          {Languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLangChange(lang)}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <Image
                src={lang.flag}
                alt={`${lang.name} flag`}
                width={20}
                height={16}
                priority
                loading="eager"
              />
              <span>{lang.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default LangDropdown;
