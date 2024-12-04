"use client";

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

interface ProductivityChartProps {
  data: {
    month: string
    prs: number
    merges: number
    issues: number
  }[]
}

export function ProductivityChart({ data }: ProductivityChartProps) {
  return (
    <div className="rounded-xl border border-[#1F1F1F] bg-[#0C0C0C] p-6 flex-1">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-white">Monthly Productivity</h3>
        <div className="text-sm text-[#888888]">January - November 2024</div>
      </div>
      <div className="h-[400px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <XAxis
              dataKey="month"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border border-[#1F1F1F] bg-[#0C0C0C] p-2 shadow-md">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-[#888888]">Pull Requests:</div>
                        <div className="text-white font-medium">{payload[0].value}</div>
                        <div className="text-[#888888]">Merges:</div>
                        <div className="text-white font-medium">{payload[1].value}</div>
                        <div className="text-[#888888]">Issues:</div>
                        <div className="text-white font-medium">{payload[2].value}</div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar
              dataKey="prs"
              fill="#9467FF"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="merges"
              fill="#4ADE80"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="issues"
              fill="#F87171"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
} 