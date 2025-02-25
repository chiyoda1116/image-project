import { Presentation } from "lucide-react";
import { FilterValues } from "../types";

interface PresetFiltersProps {
  presets: Record<string, FilterValues>;
  onPresetApply: (preset: FilterValues) => void;
}

export function PresetFilters({ presets, onPresetApply }: PresetFiltersProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Presentation className="w-5 h-5" />
        プリセット
      </h2>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(presets).map(([name, preset]) => {
          const japaneseNames: Record<string, string> = {
            vintage: "ビンテージ",
            dramatic: "ドラマチック",
            fade: "フェード",
            tilt: "傾斜",
          };
          return (
            <button
              key={name}
              onClick={() => onPresetApply(preset)}
              className="px-4 py-2 bg-white rounded-md shadow hover:bg-gray-50 transition-colors capitalize"
            >
              {japaneseNames[name] || name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
