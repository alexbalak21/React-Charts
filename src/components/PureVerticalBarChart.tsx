interface Bar {
  label: string;
  value: number;
}

interface Props {
  title: string;
  bars: Bar[];
}

export default function PureVerticalBarChart({ title, bars }: Props) {
  const max = Math.max(...bars.map(b => b.value), 1);

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        {title}
      </h2>

      <div className="flex items-end gap-6 h-64 px-4">
        {bars.map(b => {
          const height = (b.value / max) * 100;

          return (
            <div key={b.label} className="flex flex-col items-center w-12">
              {/* BAR */}
              <div
                className="w-6 bg-indigo-500 rounded-t"
                style={{ height: `${height}%` }}
              />

              {/* LABEL */}
              <div className="mt-2 text-xs text-gray-700 dark:text-gray-300 text-center w-full">
                {b.label}
              </div>

              {/* VALUE */}
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {b.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
