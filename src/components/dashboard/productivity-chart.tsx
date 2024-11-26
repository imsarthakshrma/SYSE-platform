"use client";

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, defs } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", productivity: 186 },
  { month: "February", productivity: 305 },
  { month: "March", productivity: 237 },
  { month: "April", productivity: 115 },
  { month: "May", productivity: 209 },
  { month: "July", productivity: 150 },
  { month: "August", productivity: 108 },
  { month: "September", productivity: 250 },
  { month: "October", productivity: 265 },
  { month: "November", productivity: 270 },
]

const chartConfig = {
  productivity: {
    label: "Productivity",
    color: "url(#productivityGradient)", // Using gradient
  },
} satisfies ChartConfig

export function ProductivityChart() {
  return (
    <Card className="col-span-2 w-[694px]">
      <CardHeader>
        <CardTitle>Monthly Productivity</CardTitle>
        <CardDescription>January - November 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart 
            data={chartData} 
            width={694}
            height={456}
            accessibilityLayer
          >
            <defs>
              <linearGradient id="productivityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#801DFA" />
                <stop offset="100%" stopColor="#320D60" />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar 
              dataKey="productivity" 
              radius={8}
              fill="url(#productivityGradient)"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Productivity increased by 45% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing productivity metrics for the last 11 months
        </div>
      </CardFooter>
    </Card>
  )
} 