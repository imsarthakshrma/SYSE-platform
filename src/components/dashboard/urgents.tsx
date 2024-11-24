"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

const urgentRequests = [
  {
    id: 1,
    user: {
      name: "Olivia Martin",
      avatar: "/avatars/olivia.png",
      initials: "OM"
    },
    message: "Deployment failed. Need assistance in troubleshooting",
    time: "2m ago"
  },
  {
    id: 2,
    user: {
      name: "Jackson Lee",
      avatar: "/avatars/jackson.png",
      initials: "JL"
    },
    message: "Found a new bug in the production. Assistance Requested",
    time: "5m ago"
  },
  // Add more requests as needed
];

export function Urgents() {
  return (
    <Card className="w-[400px] h-[472px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Urgent Requests</CardTitle>
          <span className="text-sm text-muted-foreground">
            You have 3 new issues to overlook
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[380px] pr-4">
          <div className="space-y-4">
            {urgentRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-start space-x-4 rounded-lg bg-[#1F1F1F] p-4"
              >
                <Avatar>
                  <AvatarImage src={request.user.avatar} />
                  <AvatarFallback>{request.user.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{request.user.name}</p>
                    <span className="text-xs text-muted-foreground">{request.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {request.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
} 