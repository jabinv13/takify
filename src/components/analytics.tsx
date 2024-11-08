import { ProjectAnalyticsResponseType } from "@/features/projects/api/use-get-analytics";
import React from "react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import AnalyticCard from "./analyticCard";
import DottedSeparator from "./dottes-seperator";

// interface AnalyticsProps {
//   data?: {
//     taskCount: number;
//     taskDiffrence: number;
//     projectCount?: number;
//     projectDiffrence?: number;
//     assignedtaskCount?: number;
//     assignedtaskDiffrence?: number;
//     completedTaskCount: number;
//     completedTaskDiffernce: number;
//     inCompletedTaskCount?: number;
//     InCompletedTaskDiffernce?: number;
//     overdueTaskCount: number;
//     overdueTaskDiffrence: number;
//   };
// }

const Ananlytics = ({ data }: ProjectAnalyticsResponseType) => {
  return (
    <ScrollArea className="border rounded-lg w-full whitespace-nowrap shrink-0">
      <div className="w-full flex flex-row">
        <div className="flex items-center flex-1">
          <AnalyticCard
            title="Total tasks"
            value={data.taskCount}
            variant={data.taskDiffrence > 0 ? "up" : "down"}
            increaseValue={data.taskDiffrence}
          />
          <DottedSeparator direction="vertical" />
        </div>

        <div className="flex items-center flex-1">
          <AnalyticCard
            title="Assigned tasks"
            value={data.assignedtaskCount}
            variant={data.assignedtaskDiffrence > 0 ? "up" : "down"}
            increaseValue={data.assignedtaskDiffrence}
          />
          <DottedSeparator direction="vertical" />
        </div>

        <div className="flex items-center flex-1">
          <AnalyticCard
            title="Completed tasks"
            value={data.completedTaskCount}
            variant={data.completedTaskDiffernce > 0 ? "up" : "down"}
            increaseValue={data.completedTaskDiffernce}
          />
          <DottedSeparator direction="vertical" />
        </div>

        <div className="flex items-center flex-1">
          <AnalyticCard
            title="Completed tasks"
            value={data.completedTaskCount}
            variant={data.completedTaskDiffernce > 0 ? "up" : "down"}
            increaseValue={data.completedTaskDiffernce}
          />
          <DottedSeparator direction="vertical" />
        </div>
        <div className="flex items-center flex-1">
          <AnalyticCard
            title="Overdue tasks"
            value={data.overdueTaskCount}
            variant={data.overdueTaskDiffrence > 0 ? "up" : "down"}
            increaseValue={data.overdueTaskDiffrence}
          />
        </div>
        <div className="flex items-center flex-1">
          <AnalyticCard
            title="Incomplete tasks"
            value={data.inCompletedTaskCount}
            variant={data.InCompletedTaskDiffernce > 0 ? "up" : "down"}
            increaseValue={data.InCompletedTaskDiffernce}
          />
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default Ananlytics;
