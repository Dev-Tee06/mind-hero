"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProgressChart() {
  const data = {
    labels: ["Lessons Completed", "Lessons Remaining"],
    datasets: [
      {
        label: "Progress",
        data: [3, 2],
        backgroundColor: ["#A78BFA", "#FBBF24"],
        borderColor: ["#7C3AED", "#F59E0B"],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
}
