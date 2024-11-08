import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

interface UseGetProjectsProps {
  projectId: string;
}

export type ProjectAnalyticsResponseType = InferResponseType<
  (typeof client.api.projects)[":projectId"]["analytics"]["$get"],
  200
>;
// type RequestType = InferRequestType<
//   (typeof client.api.projects)[":projectId"]["analytics"]["$get"]
// >;
export const useGetProjectAnalytics = ({ projectId }: UseGetProjectsProps) => {
  const query = useQuery({
    queryKey: ["project-analytics", projectId],
    queryFn: async () => {
      const response = await client.api.projects[":projectId"][
        "analytics"
      ].$get({
        param: { projectId },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch project analtytics");
      }
      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
