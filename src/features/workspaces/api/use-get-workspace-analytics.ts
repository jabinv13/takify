import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

interface UseGetWorkspaceProps {
  workspaceId: string;
}

export type ProjectAnalyticsResponseType = InferResponseType<
  (typeof client.api.projects)[":projectId"]["analytics"]["$get"],
  200
>;
// type RequestType = InferRequestType<
//   (typeof client.api.projects)[":projectId"]["analytics"]["$get"]
// >;
export const useGetWorkspaceAnalytics = ({
  workspaceId,
}: UseGetWorkspaceProps) => {
  const query = useQuery({
    queryKey: ["workspace-analytics", workspaceId],
    queryFn: async () => {
      const response = await client.api.workspaces[":workspaceId"][
        "analytics"
      ].$get({
        param: { workspaceId },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch workspace analtytics");
      }
      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
