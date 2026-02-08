import PureDonut from "./PureDonut";

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
  agents: Agent[];
  priorities: Priority[];
  tickets: Ticket[];
}

export default function PureDonutPerAgent({
  agents,
  priorities,
  tickets
}: Props) {
  // Convert priority color names to hex
  const mapColor = (c: string) =>
    c === "green" ? "#22c55e" :
    c === "yellow" ? "#eab308" :
    c === "orange" ? "#f97316" :
    c === "red" ? "#ef4444" : "#6b7280";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {agents.map(agent => {
        // Build slices for this agent
        const slices = priorities.map(p => ({
          label: p.name,
          value: tickets.filter(
            t => t.assignedTo === agent.id && t.priorityId === p.id
          ).length,
          color: mapColor(p.color)
        }));

        return (
          <PureDonut
            key={agent.id}
            title={agent.name}
            slices={slices}
          />
        );
      })}
    </div>
  );
}
