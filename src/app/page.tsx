"use client";

import { useSheets } from "@/context/sheet-provider";
import { ChevronLeft, ChevronRight } from "@/icons";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useState } from "react";
import DatePreview from "./_components/date-preview";

export default function Home() {
  const reservations = useSheets();

  const [currentDate, setCurrentDate] = useState(new Date())
  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }
  const handlePreviousYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1))
  }
  const handleNextYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1))
  }

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
  const weeks = Math.ceil((daysInMonth + firstDayOfMonth) / 7)



  return (
    <main className="flex min-h-screen flex-col">
      <header className="bg-primary py-4 px-6 flex justify-center items-center">
        <div className="flex items-center gap-4">
          <Button variant="light" isIconOnly onClick={handlePreviousYear}>
            <ChevronLeft className="text-2xl text-background" />
          </Button>
          <Button variant="light" isIconOnly onClick={handlePreviousMonth}>
            <ChevronLeft className="text-2xl text-background" />
          </Button>
          <div className="text-xl font-semibold text-background">
            {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
          </div>
          <Button variant="light" isIconOnly onClick={handleNextMonth}>
            <ChevronRight className="text-2xl text-background" />
          </Button>
          <Button variant="light" isIconOnly onClick={handleNextYear}>
            <ChevronRight className="text-2xl text-background" />
          </Button>
        </div>
      </header>
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-7 gap-4 p-6">
          {Array.from({length: weeks * 7}).map((_, i) => (
            <DatePreview currentDate={currentDate} firstDayOfMonth={firstDayOfMonth} i={i} reservations={reservations} key={i}/>
          ))}
        </div>
      </div>
    </main>
  );
}
