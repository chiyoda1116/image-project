import { History } from "lucide-react";
import { FilterValues } from "../types";

interface EditHistoryProps {
  history: FilterValues[];
  onHistorySelect: (filters: FilterValues) => void;
}

export function EditHistory({ history, onHistorySelect }: EditHistoryProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <History className="w-5 h-5" />
        履歴
      </h2>
      <div className="max-h-40 overflow-y-auto">
        {history.map((hist, index) => (
          <button
            key={index}
            onClick={() => onHistorySelect(hist)}
            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded transition-colors text-sm"
          >
            編集 {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
