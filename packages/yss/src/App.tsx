import { useState } from "react";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { useWorkerRef } from "@/hooks/useWorkerRef";
import { useYss } from "./hooks/useYss";
import { IYssWorker, Embedded } from "@/Yss";
import YssWorker from "@/Yss/yss.worker?worker";

export default function App() {
  const [searchResults, setSearchResults] = useState<Embedded[]>([]);
  const [searchPerformance, setSearchPerformance] = useState<number>(-1);
  const workerRef = useWorkerRef<IYssWorker>(YssWorker);
  const yss = useYss(workerRef, setSearchResults, setSearchPerformance);

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto p-4">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-md bg-muted pl-8 pr-4 py-2"
          onChange={(e) => yss(e.target.value)}
        />
        <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      </div>
      {searchPerformance > 0 && (
        <div className="text-sm text-muted-foreground">
          {searchPerformance.toFixed(2)} ms
        </div>
      )}
      <div className="space-y-4">
        {searchResults.map((result, index) => (
          <div key={index} className="bg-muted/50 rounded-md p-4">
            <h3 className="text-base font-medium">{result.text}</h3>
            {/*
            <div className="text-sm text-muted-foreground">
              score: {result.score.toFixed(2)}
            </div>
            */}
          </div>
        ))}
      </div>
    </div>
  );
}
