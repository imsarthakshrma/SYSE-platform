"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function UrgentHelpCenter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Urgent Help Center</CardTitle>
        <CardDescription>
          Request immediate assistance from your team
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select purpose" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technical">Technical Help</SelectItem>
              <SelectItem value="project">Project Delay</SelectItem>
              <SelectItem value="other">Other Issue</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Related to" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="task">Task</SelectItem>
              <SelectItem value="repository">Repository</SelectItem>
              <SelectItem value="team">Team Issue</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select recipient" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="team-lead">Team Lead</SelectItem>
              <SelectItem value="developer">Developer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Textarea
          placeholder="Describe your urgent request..."
          className="min-h-[100px]"
        />

        <Button className="w-full">Send Request</Button>
      </CardContent>
    </Card>
  );
} 