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

export default function PureTicketsPerAgentPriority({
  title,
  agents,
  priorities,
  tickets
}: Props) {
  // Build matrix: agent → priority → count
  const matrix = agents.map(agent => {
    const counts = priorities.reduce((acc, p) => {
      acc[p.name] = tickets.filter(
        t => t.assignedTo === agent.id && t.priorityId === p.id
      ).length;
      return acc;
    }, {} as Record<string, number>);

    return {
      agent: agent.name,
      counts
    };
  });

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        {title}
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 border-b text-left text-gray-700 dark:text-gray-300">
                Agent
              </th>

              {priorities.map(p => (
                <th
                  key={p.id}
                  className="p-2 border-b text-center text-gray-700 dark:text-gray-300"
                >
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {matrix.map(row => (
              <tr key={row.agent}>
                <td className="p-2 border-b font-medium text-gray-800 dark:text-gray-200">
                  {row.agent}
                </td>

                {priorities.map(p => (
                  <td
                    key={p.id}
                    className="p-2 border-b text-center text-gray-700 dark:text-gray-300"
                  >
                    {row.counts[p.name]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
