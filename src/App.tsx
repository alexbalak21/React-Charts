import users from "../data/users.json";
import tickets from "../data/tickets.json";
import priorities from "../data/priorities.json";
import statuses from "../data/statuses.json";

import PureDonut from "./components/PureDonut";
import PureBarChart from "./components/PureBarChart";
import PureVerticalBarChart from "./components/PureVerticalBarChart";
import PureTicketsPerAgentPriority from "./components/PureTicketsPerAgentPriority";
import PureGroupedAgentPriorityChart from "./components/PureGroupedAgentPriorityChart";
import PureDonutPerAgent from "./components/PureDonutPerAgent";

export default function App() {
  /* -------------------------------------------------------
   *  DATA FILTERING
   * ----------------------------------------------------- */

  const agents = users.filter(u => u.roles.includes("SUPPORT"));
  const normalUsers = users.filter(u => u.roles.includes("USER"));

  /* -------------------------------------------------------
   *  DONUT CHART DATA
   * ----------------------------------------------------- */

  const prioritySlices = priorities.map(p => ({
    label: p.name,
    value: tickets.filter(t => t.priorityId === p.id).length,
    color:
      p.color === "green" ? "#22c55e" :
        p.color === "yellow" ? "#eab308" :
          p.color === "orange" ? "#f97316" :
            p.color === "red" ? "#ef4444" : "#6b7280"
  }));

  const statusSlices = statuses.map(s => ({
    label: s.name,
    value: tickets.filter(t => t.statusId === s.id).length,
    color:
      s.color === "blue" ? "#3b82f6" :
        s.color === "violet" ? "#8b5cf6" :
          s.color === "yellow" ? "#eab308" :
            s.color === "orange" ? "#f97316" :
              s.color === "green" ? "#22c55e" :
                s.color === "gray" ? "#6b7280" :
                  s.color === "brown" ? "#92400e" : "#6b7280"
  }));

  /* -------------------------------------------------------
   *  BAR CHART DATA
   * ----------------------------------------------------- */

  const agentBars = agents.map(a => ({
    label: a.name,
    value: tickets.filter(t => t.assignedTo === a.id).length
  }));

  const userBars = normalUsers.map(u => ({
    label: u.name,
    value: tickets.filter(t => t.createdBy === u.id).length
  }));

  /* -------------------------------------------------------
   *  RENDER
   * ----------------------------------------------------- */

  return (
    <div className="p-8 space-y-8 bg-gray-100 dark:bg-gray-950 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        Manager Dashboard
      </h1>

      {/* ------------------ ROW 1: DONUTS ------------------ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PureDonut title="Tickets by Priority" slices={prioritySlices} />
        <PureDonut title="Tickets by Status" slices={statusSlices} />
      </div>

      {/* ------------------ ROW 2: BARS ------------------ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PureBarChart title="Tickets per Support Agent" bars={agentBars} />
        <PureVerticalBarChart title="Tickets per User" bars={userBars} />
      </div>

      {/* ------------------ ROW 3: 2D MATRIX ------------------ */}
      <PureTicketsPerAgentPriority
        title="Tickets per Agent × Priority"
        agents={agents}
        priorities={priorities}
        tickets={tickets}
      />

      <PureGroupedAgentPriorityChart
        title="Tickets per Agent × Priority"
        agents={agents}
        priorities={priorities}
        tickets={tickets}
      />

      <PureDonutPerAgent
        agents={agents}
        priorities={priorities}
        tickets={tickets}
      />

    </div>
  );
}
