import { Sliders } from "lucide-react";
import { FilterValues } from "../types";

interface FilterControlsProps {
  filters: FilterValues;
  onFilterUpdate: (type: keyof FilterValues, value: number) => void;
}

export function FilterControls({
  filters,
  onFilterUpdate,
}: FilterControlsProps) {
  const getFilterConfig = (key: keyof FilterValues) => {
    const configs = {
      brightness: { min: 0, max: 200, unit: "%" },
      contrast: { min: 0, max: 200, unit: "%" },
      saturate: { min: 0, max: 200, unit: "%" },
      blur: { min: 0, max: 10, unit: "px" },
      hueRotate: { min: 0, max: 360, unit: "°" },
      opacity: { min: 0, max: 100, unit: "%" },
      skewX: { min: -45, max: 45, unit: "°" },
      skewY: { min: -45, max: 45, unit: "°" },
    };
    return configs[key];
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Sliders className="w-5 h-5" />
        調整
      </h2>

      {Object.entries(filters).map(([key, value]) => {
        const config = getFilterConfig(key as keyof FilterValues);
        const japaneseLabels: Record<string, string> = {
          brightness: "明るさ",
          contrast: "コントラスト",
          saturate: "彩度",
          blur: "ぼかし",
          hueRotate: "色相回転",
          opacity: "不透明度",
          skewX: "X軸傾斜",
          skewY: "Y軸傾斜",
        };
        return (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
              {japaneseLabels[key as keyof FilterValues] ||
                key.replace(/([A-Z])/g, " $1").trim()}
            </label>
            <input
              type="range"
              min={config.min}
              max={config.max}
              value={value}
              onChange={(e) =>
                onFilterUpdate(
                  key as keyof FilterValues,
                  Number(e.target.value)
                )
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm text-gray-500">
              {value}
              {config.unit}
            </span>
          </div>
        );
      })}
    </div>
  );
}
