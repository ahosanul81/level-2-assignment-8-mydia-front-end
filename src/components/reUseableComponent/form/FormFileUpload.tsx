/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";
import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = {
  value?: File | File[];
  onChange: (file: File | File[]) => void;
};

export default function FormFileUpload({ value, onChange }: Props) {
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024;
  const maxFiles = 6;

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    maxSize,
    multiple: true,
    maxFiles,
  });

  // previewData: { file, url }
  const [previewData, setPreviewData] = useState<{ file: File; url: string }[]>(
    []
  );

  useEffect(() => {
    if (!value) {
      // clear previews and revoke old URLs
      previewData.forEach((item) => URL.revokeObjectURL(item.url));
      setPreviewData([]);
      return;
    }

    const files = Array.isArray(value) ? value : [value];

    // revoke URLs for previews that will be removed
    const removedPreviews = previewData.filter(
      (item) => !files.some((file) => file.name === item.file.name)
    );
    removedPreviews.forEach((item) => URL.revokeObjectURL(item.url));

    // create previewData for files that don't yet have preview
    const newPreviews = files
      .filter(
        (file) => !previewData.some((item) => item.file.name === file.name)
      )
      .map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));

    setPreviewData((prev) => [
      // keep previews for files still present
      ...prev.filter((item) =>
        files.some((file) => file.name === item.file.name)
      ),
      ...newPreviews,
    ]);
  }, [value]);

  // Remove image by index
  const removeImage = (index: number) => {
    const updatedFiles = previewData
      .filter((_, i) => i !== index)
      .map((item) => item.file);
    onChange(updatedFiles);
  };

  return (
    <div className=" flex flex-col gap-2  rounded-lg border-1 border-gray-400 focus:outline-none focus:border-blue-400">
      {/* Drop Area */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        data-files={files.length > 0 || undefined}
        className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed  transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]"
      >
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload image file"
          onChange={(e) => {
            const files = e.target.files ? Array.from(e.target.files) : [];
            onChange(files);
          }}
        />
        <div className="flex flex-col items-center justify-center px-4 py-3 text-center ">
          <div
            className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <ImageIcon className="size-4 opacity-60" />
          </div>
          <p className="mb-1.5 text-sm font-medium">Drop your images here</p>
          <p className="text-muted-foreground text-xs">
            SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-4"
            onClick={openFileDialog}
          >
            <UploadIcon className="-ms-1 opacity-60" aria-hidden="true" />
            Select images
          </Button>
        </div>
      </div>

      {/* Show errors */}
      {errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-1 text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

      {/* Previews */}
      {previewData.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {previewData.map((item, index) => (
            <div key={item.file.name + index} className="relative">
              <Image
                src={item.url}
                alt={`Preview-${index}`}
                width={150}
                height={100}
                className="rounded object-cover w-full h-10"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-white p-1 rounded-full shadow"
                aria-label="Remove image"
              >
                <XIcon className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
