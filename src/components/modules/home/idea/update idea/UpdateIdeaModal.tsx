"use client";

import React, { useEffect, useState } from "react";
import {
  SubmitHandler,
  useForm,
  Controller,
  FieldValues,
} from "react-hook-form";
import FormFileUpload from "@/components/reUseableComponent/form/FormFileUpload";
import FormRadio from "@/components/reUseableComponent/form/FormRadio";
import { Button } from "@/components/ui/button";
import { CiEdit } from "react-icons/ci";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  // DialogTrigger,
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
import { updateIdeaById } from "@/services/idea";
import { ideaCategories } from "@/services/category";
import { TCategory } from "@/types/category";
import { TIdea } from "@/types/idea";
import Image from "next/image";
import { toast } from "sonner";

interface Inputs {
  title: string;
  problemStatement: string;
  proposedSolution: string;
  description: string;
  isPaid: boolean;
  price?: number | undefined;
  categoryId: string;
  memberId: string;
  files?: File;
}

interface AddIdeaModalProps {
  idea: TIdea;
}

export default function UpdateIdeaModal({ idea }: AddIdeaModalProps) {
  const { user } = useUser();
  const [categories, setCategories] = useState<TCategory[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await ideaCategories();
      setCategories(categories.data);
    };
    fetchCategories();
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: idea.title,
      problemStatement: idea.problemStatement,
      proposedSolution: idea.proposedSolution,
      isPaid: idea.isPaid,
      price: idea.price,
      description: idea.description,
      categoryId: idea.category.id,
    },
  });
  console.log("errors", errors);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const ideaData: Partial<Inputs> = {
      title: data.title,
      problemStatement: data.problemStatement,
      proposedSolution: data.proposedSolution,
      description: data.description,
      isPaid: data.isPaid === "Yes" ? true : false,
      categoryId: data.categoryId,
      memberId: user?.memberId,
    };
    const formData = new FormData();
    if (Array.isArray(data.files)) {
      data.files.forEach((file: File) => {
        formData.append("files", file); // each file is a Blob
      });
    }
    formData.append("data", JSON.stringify(ideaData));
    const res = await updateIdeaById(idea.id, formData);
    if (res.success) {
      toast.success("Idea update successfull");
    }
    console.log(res);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <button className="flex items-center gap-2">
          <span>
            <CiEdit />
          </span>
          <span>Update</span>
        </button>
      </DialogTrigger>
      <DialogContent className="w-3/5 max-h-[80vh] overflow-y-auto">
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
            <div className="grid w-full gap-3">
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
              <div className="flex gap-2">
                {Array.isArray(idea?.imageUrls) &&
                  idea?.imageUrls?.map((url, index) => (
                    <Image
                      key={index}
                      width={50}
                      height={30}
                      alt="image"
                      src={url}
                      className="w-9 rounded-md"
                    />
                  ))}
              </div>
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
                  />
                )}
              />
              <div className="gap-3">
                <Label htmlFor="price">Price</Label>
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <Input type="number" {...field} placeholder="TK 1000" />
                  )}
                />
              </div>
            </div>
          </div>

          {/* <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter> */}

          <Button type="submit" className="w-full mt-5">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
