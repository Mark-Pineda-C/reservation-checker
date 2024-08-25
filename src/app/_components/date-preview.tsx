"use client";

import { SheetContextProps } from "@/context/sheet-provider";
import {
  Card,
  CardHeader,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  useDisclosure,
  ModalBody,
  Divider,
} from "@nextui-org/react";
import { useEffect, useMemo } from "react";

interface Props {
  firstDayOfMonth: number;
  currentDate: Date;
  reservations: SheetContextProps[];
  i: number;
}

export default function DatePreview({
  firstDayOfMonth,
  currentDate,
  reservations,
  i,
}: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const day = i - firstDayOfMonth + 1;
  const date = useMemo(
    () => new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
    [currentDate, day]
  );
  const isCurrentMonth = date.getMonth() === currentDate.getMonth();
  const dayReservations = reservations.filter(
    (reservation) =>
      new Date(reservation.date).toDateString() === date.toDateString()
  );

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>
            Reservas del{" "}
            {date.toLocaleString("default", {
              dateStyle: "long",
              timeZone: "America/Lima",
            })}
          </ModalHeader>
          <ModalBody className="flex flex-col pb-4">
            {dayReservations.map((reservation, i) => (
              <div
                className="bg-foreground-200 rounded-large flex flex-col items-start p-4 text-small gap-4"
                key={`detail_${i}`}
              >
                <div className="flex items-center space-x-4 h-5">
                  <span className="font-medium">{reservation.zone}</span>
                  <Divider orientation="vertical" />
                  <span className="">Departamento {reservation.apartment}</span>
                </div>
                {reservation.startHour && reservation.endHour && (
                  <>
                    <Divider />
                    <div className="flex items-center space-x-4 h-5">
                      <span className="font-medium">Inicio:</span>
                      <span>{reservation.startHour}</span>
                      <Divider orientation="vertical" />
                      <span className="font-medium">Final:</span>
                      <span>{reservation.endHour}</span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
      <Card
        key={i}
        isPressable={isCurrentMonth && dayReservations.length > 0}
        onPress={onOpen}
        className={`duration-200 ${
          isCurrentMonth ? "" : "text-foreground-300 shadow-none max-lg:hidden"
        }`}
      >
        <CardHeader className="justify-between items-center flex pb-0">
          <span className="font-medium">{date.getDate()}</span>
          {dayReservations.length > 3 && (
            <span className="text-xs bg-primary-500 text-white px-2 py-1 rounded-full">
              {dayReservations.length}
            </span>
          )}
        </CardHeader>
        <CardBody className="flex flex-col items-center gap-3">
          {!dayReservations ||
            (dayReservations.length == 0 && (
              <span className="text-xs w-full text-transparent">
                Sin Reservas.
              </span>
            ))}
          {dayReservations.slice(0, 3).map((reservation, i) => (
            <span
              key={`reservation_${date.getDate}_${i}`}
              className="text-xs w-full "
            >
              {reservation.zone}
            </span>
          ))}
          {dayReservations.length > 3 && "..."}
        </CardBody>
      </Card>
    </>
  );
}
