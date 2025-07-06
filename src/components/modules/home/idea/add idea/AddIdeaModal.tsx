/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  SubmitHandler,
  useForm,
  Controller,
  FieldValues,
} from "react-hook-form";
import FormFileUpload from "@/components/reUseableComponent/form/FormFileUpload";
import FormRadio from "@/components/reUseableComponent/form/FormRadio";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/context/UserContext";
import { addIdea } from "@/services/idea";
import { toast } from "sonner";

interface Inputs {
  title: string;
  problemStatement: string;
  proposedSolution: string;
  description: string;
  isPaid: boolean;
  price?: number | null;
  categoryId: string;
  memberId: string;
  files?: File;
}

interface AddIdeaModalProps {
  categories: {
    id: string;
    categoryName: string;
    Idea?: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  defaultValues: Partial<Inputs>;
}

export default function AddIdeaModal({
  categories,
  defaultValues,
}: AddIdeaModalProps) {
  const { user } = useUser();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues,
  });
  console.log("errors", errors);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setButtonLoading(true);

    try {
      const ideaData: Partial<Inputs> = {
        title: data.title,
        problemStatement: data.problemStatement,
        proposedSolution: data.proposedSolution,
        description: data.description,
        isPaid: data.isPaid,
        price: Number(data.price),
        categoryId: data.categoryId,
        memberId: user?.memberId,
      };
      console.log(ideaData);

      const formData = new FormData();
      if (Array.isArray(data.files)) {
        data.files.forEach((file: File) => {
          formData.append("files", file); // each file is a Blob
        });
      }
      formData.append("data", JSON.stringify(ideaData));

      const res = await addIdea(formData);
      if (res.success) {
        setButtonLoading(false);
        reset();
        toast.success(res.message);
      } else {
        setButtonLoading(false);
        toast.error(res.message);
      }
      console.log(res);
    } catch {
      throw new Error();
    } finally {
      setButtonLoading(false);
      setOpenModal(false);
    }
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <button
          className="group cursor-pointer outline-none hover:rotate-90 duration-300"
          title="Add New"
        >
          {/* Add Icon */}
          <svg
            className="stroke-yellow-500 fill-none group-hover:fill-yellow-800 group-active:stroke-yellow-500 group-active:fill-yellow-600 group-active:duration-0 duration-300"
            viewBox="0 0 24 24"
            height="50px"
            width="50px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeWidth="1.5"
              d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
            />
            <path strokeWidth="1.5" d="M8 12H16"></path>
            <path strokeWidth="1.5" d="M12 16V8"></path>
          </svg>
        </button>
      </DialogTrigger>
      <DialogContent className="w-full sm:w-3/5 max-h-[80vh] overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Idea</DialogTitle>
            <DialogDescription>
              Spread your unique idea among us.......
            </DialogDescription>
          </DialogHeader>
          <div className="border-1 border-gray-400 mb-3 mt-3"></div>
          <div className="grid grid-cols-2 gap-4">
            {/* Title */}
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Controller
                name="title"
                control={control}
                rules={{ required: "Title is required" }}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      placeholder="Write your idea title here"
                    />
                  );
                }}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* Problem Statement */}
            <div className="grid gap-3">
              <Label htmlFor="problemStatement">Problem Statement</Label>
              <Controller
                name="problemStatement"
                control={control}
                rules={{ required: "Problem Statement is required" }}
                render={({ field }) => (
                  <Input {...field} placeholder="Problem Statement" />
                )}
              />
              {errors.problemStatement && (
                <p className="text-red-500 text-sm">
                  {errors.problemStatement.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="col-span-2 gap-3">
              <Controller
                name="categoryId"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        {categories?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            <span className="capitalize">
                              {category.categoryName}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.categoryId && (
                <p className="text-red-500 text-sm">
                  {errors.categoryId.message}
                </p>
              )}
            </div>

            {/* Proposed Solution */}
            <div className="grid gap-3">
              <Label htmlFor="proposedSolution">Proposed Solution</Label>
              <Controller
                name="proposedSolution"
                control={control}
                rules={{ required: "Solution is required" }}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder="Write your solution here....."
                  />
                )}
              />
              {errors.proposedSolution && (
                <p className="text-red-500 text-sm">
                  {errors.proposedSolution.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="grid gap-3">
              <Label htmlFor="description">Your description</Label>
              <Controller
                name="description"
                control={control}
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder="Write your description here....."
                  />
                )}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* File Upload */}
            <div className="grid  gap-3 ">
              {/* <Controller
                name="files"
                control={control}
                render={({ field }) => (
                  <FormFileUpload onChange={(file) => field.onChange(file)} />
                )}
              /> */}
              <Controller
                name="files"
                control={control}
                render={({ field }) => (
                  <FormFileUpload
                    value={field.value || []}
                    onChange={(files) => field.onChange(files)}
                  />
                )}
              />
            </div>

            {/* IsPaid + Price */}
            <div className="flex flex-col gap-3">
              <Controller
                name="isPaid"
                control={control}
                render={({ field }) => (
                  <FormRadio
                    label="Is this idea need any payment for viewing details? default 'No'"
                    radioName="isPaid"
                    options={[true, false]}
                    {...field}
                    value={field.value}
                  />
                )}
              />
              <div className="gap-3">
                <Label htmlFor="price">Price</Label>
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      {...field}
                      value={field.value ?? ""}
                      placeholder="TK 1000"
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <Button
            disabled={buttonLoading}
            type="submit"
            className="w-full mt-5"
          >
            {buttonLoading ? "Adding Idea...." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
