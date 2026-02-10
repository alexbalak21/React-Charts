import { MatrixTable } from "./MatrixTable";

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
  return (
    <MatrixTable
      title={title}
      rows={agents}
      columns={priorities}
      getRowLabel={a => a.name}
      getColumnLabel={p => p.name}
      getValue={(agent, priority) =>
        tickets.filter(
          t => t.assignedTo === agent.id && t.priorityId === priority.id
        ).length
      }
    />
  );
}
