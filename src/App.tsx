import { useState, useRef, ChangeEvent } from "react";
import { Image as ImageIcon, Download } from "lucide-react";
import { ImageUpload } from "./components/ImageUpload";
import { FilterControls } from "./components/FilterControls";
import { PresetFilters } from "./components/PresetFilters";
import { EditHistory } from "./components/EditHistory";
import { CodePreview } from "./components/CodePreview";
import { FilterValues } from "./types";

function App() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [filters, setFilters] = useState<FilterValues>({
    brightness: 100,
    contrast: 100,
    saturate: 100,
    blur: 0,
    hueRotate: 0,
    opacity: 100,
    skewX: 0,
    skewY: 0,
  });
  const [history, setHistory] = useState<FilterValues[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const updateFilter = (type: keyof FilterValues, value: number) => {
    const newFilters = { ...filters, [type]: value };
    setFilters(newFilters);
    setHistory([...history, newFilters]);
  };

  const getFilterStyle = () => {
    return {
      filter: `
        brightness(${filters.brightness}%)
        contrast(${filters.contrast}%)
        saturate(${filters.saturate}%)
        blur(${filters.blur}px)
        hue-rotate(${filters.hueRotate}deg)
        opacity(${filters.opacity}%)
      `,
      transform: `
        skew(${filters.skewX}deg, ${filters.skewY}deg)
      `,
    };
  };

  const presets = {
    vintage: {
      brightness: 120,
      contrast: 90,
      saturate: 80,
      blur: 0,
      hueRotate: 30,
      opacity: 100,
      skewX: 0,
      skewY: 0,
    },
    dramatic: {
      brightness: 110,
      contrast: 150,
      saturate: 120,
      blur: 0,
      hueRotate: 0,
      opacity: 100,
      skewX: 0,
      skewY: 0,
    },
    fade: {
      brightness: 100,
      contrast: 95,
      saturate: 90,
      blur: 0,
      hueRotate: 0,
      opacity: 80,
      skewX: 0,
      skewY: 0,
    },
    tilt: {
      brightness: 100,
      contrast: 100,
      saturate: 100,
      blur: 0,
      hueRotate: 0,
      opacity: 100,
      skewX: 15,
      skewY: 0,
    },
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            <ImageIcon className="w-8 h-8" />
            画像エディター
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Image Area */}
            <div className="lg:col-span-8 space-y-4">
              <ImageUpload
                imageUrl={imageUrl}
                onImageUpload={handleImageUpload}
                fileInputRef={fileInputRef}
                filterStyle={getFilterStyle()}
              />
              {imageUrl && (
                <CodePreview imageUrl={imageUrl} filters={filters} />
              )}
            </div>

            {/* Controls */}
            <div className="lg:col-span-4 space-y-6">
              <FilterControls filters={filters} onFilterUpdate={updateFilter} />

              <PresetFilters presets={presets} onPresetApply={setFilters} />

              {imageUrl && (
                <EditHistory history={history} onHistorySelect={setFilters} />
              )}

              {imageUrl && (
                <button
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  onClick={() => {
                    /* Add download logic */
                  }}
                >
                  <Download className="w-5 h-5" />
                  画像をエクスポート
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
