import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import Image from "next/image";
import React from "react";

export default function RightSidebar() {
  return (
    <div>
      {" "}
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">Daily Mix</p>
          <small className="text-default-500">12 Tracks</small>
          <h4 className="font-bold text-large">Frontend Radio</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src="https://heroui.com/images/hero-card-complete.jpeg"
            width={270}
            height={300}
          />
        </CardBody>
        <Button className="bg-green-300 p-2" color="primary">
          Test button
        </Button>
      </Card>
    </div>
  );
}
