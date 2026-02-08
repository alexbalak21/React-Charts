interface Agent {
  id: number;
  name: string;
}

interface Priority {
  id: number;
  name: string;
  color: string;
}

interface Ticket {
  assignedTo: number;
  priorityId: number;
}

interface Props {
  title: string;
  agents: Agent[];
  priorities: Priority[];
  tickets: Ticket[];
}

export default function PureGroupedAgentPriorityChart({
  title,
  agents,
  priorities,
  tickets
}: Props) {
  // Build grouped data
  const data = agents.map(agent => {
    const groups = priorities.map(p => ({
      priority: p.name,
      color:
        p.color === "green" ? "#22c55e" :
        p.color === "yellow" ? "#eab308" :
        p.color === "orange" ? "#f97316" :
        p.color === "red" ? "#ef4444" : "#6b7280",
      value: tickets.filter(
        t => t.assignedTo === agent.id && t.priorityId === p.id
      ).length
    }));

    return {
      agent: agent.name,
      groups
    };
  });

  // Find max for scaling
  const max = Math.max(
    ...data.flatMap(d => d.groups.map(g => g.value)),
    1
  );

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        {title}
      </h2>

      {/* FIXED HEIGHT so Tailwind cannot purge it */}
      <div
        className="flex items-end gap-10 px-4 overflow-x-auto"
        style={{ height: "300px" }}
      >
        {data.map(agent => (
          <div
            key={agent.agent}
            className="flex flex-col items-center w-20"
            style={{ height: "100%" }} // FIXED HEIGHT WRAPPER
          >
            {/* GROUPED BARS */}
            <div
              className="flex items-end gap-2"
              style={{ height: "100%" }} // FIXED HEIGHT WRAPPER
            >
              {agent.groups.map(g => (
                <div
                  key={g.priority}
                  className="rounded-t"
                  style={{
                    width: "20px",
                    height: `${(g.value / max) * 100}%`,
                    backgroundColor: g.color
                  }}
                  title={`${g.priority}: ${g.value}`}
                />
              ))}
            </div>

            {/* AGENT NAME */}
            <div className="mt-2 text-xs text-gray-700 dark:text-gray-300 text-center w-full">
              {agent.agent}
            </div>
          </div>
        ))}
      </div>

      {/* LEGEND */}
      <div className="mt-4 flex flex-wrap gap-4">
        {priorities.map(p => (
          <div key={p.id} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-sm"
              style={{
                background:
                  p.color === "green" ? "#22c55e" :
                  p.color === "yellow" ? "#eab308" :
                  p.color === "orange" ? "#f97316" :
                  p.color === "red" ? "#ef4444" : "#6b7280"
              }}
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {p.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
