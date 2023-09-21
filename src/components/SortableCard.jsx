import React from "react";
import ImageCard from "./ImageCard";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

const SortableCard = ({ image }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: image.id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div
      className="px-6"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <ImageCard data={image} />
    </div>
  );
};

export default SortableCard;
