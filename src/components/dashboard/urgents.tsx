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
    <div className="rounded-xl border border-[#1F1F1F] bg-[#0C0C0C] p-6 w-[320px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Urgent Requests</h3>
        <div className="text-sm text-[#888888]">
          You have 3 new issues to overlook
        </div>
      </div>
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
    </div>
  );
} 