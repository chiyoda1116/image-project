import { Code } from "lucide-react";
import { FilterValues } from "../types";

interface CodePreviewProps {
  imageUrl: string;
  filters: FilterValues;
}

export function CodePreview({ imageUrl, filters }: CodePreviewProps) {
  const getFilterStyle = () => {
    return `filter: brightness(${filters.brightness}%)
    contrast(${filters.contrast}%)
    saturate(${filters.saturate}%)
    blur(${filters.blur}px)
    hue-rotate(${filters.hueRotate}deg)
    opacity(${filters.opacity}%);
transform: skew(${filters.skewX}deg, ${filters.skewY}deg);`;
  };

  const htmlCode = `<img src="${imageUrl}" style="${getFilterStyle()}" />`;

  const cssCode = `.filtered-image {
  ${getFilterStyle()}
}`;

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Code className="w-5 h-5" />
        コードプレビュー
      </h2>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">HTML</h3>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-md text-sm overflow-x-auto">
            {htmlCode}
          </pre>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">CSS</h3>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-md text-sm overflow-x-auto">
            {cssCode}
          </pre>
        </div>

        <button
          onClick={() => {
            navigator.clipboard.writeText(htmlCode);
          }}
          className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors mr-2"
        >
          HTMLをコピー
        </button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(cssCode);
          }}
          className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          CSSをコピー
        </button>
      </div>
    </div>
  );
}
