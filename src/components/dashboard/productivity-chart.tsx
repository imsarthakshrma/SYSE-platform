"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar } from "recharts";
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Feb", productivity: 90 },
  { month: "Mar", productivity: 20 },
  { month: "Apr", productivity: 65 },
  { month: "May", productivity: 65 },
  { month: "Jun", productivity: 85 },
  { month: "Jul", productivity: 45 },
  { month: "Aug", productivity: 40 },
  { month: "Sep", productivity: 80 },
  { month: "Oct", productivity: 80 },
  { month: "Nov", productivity: 85 },
  { month: "Dec", productivity: 90 },
  { month: "Jan", productivity: 95 },
];

export function ProductivityChart() {
  return (
    <Card className="w-[695px] h-[472px]">
      <CardHeader>
        <CardTitle>Team Productivity</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <defs>
              <linearGradient id="productivityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#801DFA" />
                <stop offset="100%" stopColor="#320D60" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1F1F1F" />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis 
              ticks={[0, 20, 40, 60, 80, 100]}
              domain={[0, 100]}
              unit="%"
              stroke="#666"
            />
            <Bar
              dataKey="productivity"
              fill="url(#productivityGradient)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 