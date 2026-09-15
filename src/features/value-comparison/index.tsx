"use client";

import {
  Alert,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CloseIcon,
  FieldError,
  Form,
  Input,
  Label,
  NumberField,
} from "@heroui/react";
import React, { useState } from "react";
import { ValueComparisonResult } from "./types";
import { Receipt } from "@gravity-ui/icons";
import ResultCard from "./components/result-card";

type InputKey = "product-one-price" | "product-one-qty" | "product-two-price" | "product-two-qty";

export default function ValueComparison() {
  const [result, setResult] = useState<ValueComparisonResult | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const data: Record<InputKey, number> = {
      "product-one-price": 0,
      "product-one-qty": 0,
      "product-two-price": 0,
      "product-two-qty": 0,
    };

    formData.forEach((value, key) => {
      data[key as InputKey] = Number(value);
    });

    const productOnePrice = data["product-one-price"];
    const productOneQty = data["product-one-qty"];
    const productTwoPrice = data["product-two-price"];
    const productTwoQty = data["product-two-qty"];

    const valuation = (productTwoPrice / productTwoQty) * productOneQty;
    const priceDiff = productOnePrice - valuation;
    const cheapPercentage = ((priceDiff / productOnePrice) * 100).toFixed(2);

    setResult({
      productOnePrice,
      productOneQty,
      productTwoPrice,
      productTwoQty,
      valuation: valuation.toFixed(2),
      priceDiff: priceDiff.toFixed(2),
      cheapPercentage,
    });
  };

  return (
    <div className="flex flex-col gap-3 py-20">
      <Card className="min-w-md">
        <CardHeader>
          <CardTitle>Value Calculator</CardTitle>
          <CardDescription>Compare value of two products</CardDescription>
        </CardHeader>
        <Form className="space-y-6" render={(props) => <form {...props} />} onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="flex gap-4">
              <NumberField name="product-one-price" isRequired>
                <Label>Product 1 Price</Label>
                <Input variant="secondary" placeholder="Enter Price" />
                <FieldError />
              </NumberField>

              <NumberField name="product-one-qty" isRequired>
                <Label>Product 1 Quantity</Label>
                <Input variant="secondary" placeholder="Enter Quantity" />
                <FieldError />
              </NumberField>
            </div>
            <div className="flex gap-4">
              <NumberField name="product-two-price" isRequired>
                <Label>Product 2 Price</Label>
                <Input variant="secondary" placeholder="Enter Price" />
                <FieldError />
              </NumberField>

              <NumberField name="product-two-qty" isRequired>
                <Label>Product 2 Quantity</Label>
                <Input variant="secondary" placeholder="Enter Quantity" />
                <FieldError />
              </NumberField>
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="reset" variant="outline">
              Reset
            </Button>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </Form>
      </Card>
      {result && (
        <Alert>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title />
            <Alert.Description />
            <div className="text-sm space-y-1.5">
              <p>
                Small pack: <strong>{result.productOneQty}</strong> for{" "}
                <strong>₹{result.productOnePrice}</strong>
              </p>
              <p>
                Same quantity in large pack: <strong>₹{result.valuation}</strong>
              </p>
              <p>
                Product 2 is <strong>{result.cheapPercentage}% cheaper</strong> than Product 1.
              </p>
              <p>
                That means Product 2 is <strong>₹{result.priceDiff}</strong> cheaper per
                <strong>{result.productOneQty} units</strong>.
              </p>
            </div>
          </Alert.Content>
          <Button
            variant="secondary"
            className="size-8"
            onClick={() => setShowReceipt((prev) => !prev)}
          >
            {showReceipt ? <CloseIcon /> : <Receipt />}
          </Button>
        </Alert>
      )}
      {result && showReceipt && (
        <div className="flex items-center justify-center py-22 overflow-hidden relative rounded-3xl">
          <img
            src="https://cdn.cosmos.so/5557668b-e30f-4650-bc69-3ad349bf1053?format=webp"
            alt=""
            className="absolute size-full object-cover"
          />
          <ResultCard result={result} />
        </div>
      )}
    </div>
  );
}
