import React, { useMemo, type FC } from "react";
import { FlightColumn } from "./columns-flights";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion"
import { FlightSeat } from "@prisma/client";
import { seatMapping } from "@/lib/utils";

interface ColumnSeatPriceProps {
    flight: FlightColumn
}

const ColumnSeatPrice: FC<ColumnSeatPriceProps> = ({ flight }) => {

    const {economy,
        business,
        first,

        totalEconomy,
        totalBusiness,
        totalFirst} = useMemo(() => seatMapping(flight.seats), [flight])
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="w-full">
                <AccordionTrigger>Economy</AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-2">
                        <div className="font-medium">
                            <span className="text-primary">Price: </span>
                            ${flight.price}
                        </div>
                        <div className="font-medium">
                            <span className="text-primary">Seats Left: </span>
                            {economy}/{totalEconomy}
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="w-full">
                <AccordionTrigger>Business</AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-2">
                        <div className="font-medium">
                            <span className="text-primary">Price: </span>
                            ${flight.price + 50}
                        </div>
                        <div className="font-medium">
                            <span className="text-primary">Seats Left: </span>
                            {business}/{totalBusiness}
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="w-full">
                <AccordionTrigger>First Class</AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-2">
                        <div className="font-medium">
                            <span className="text-primary">Price: </span>
                            ${flight.price + 100}
                        </div>
                        <div className="font-medium">
                            <span className="text-primary">Seats Left: </span>
                            {first}/{totalFirst}
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}



export default ColumnSeatPrice;