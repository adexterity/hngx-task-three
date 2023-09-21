import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import SortableCard from "./SortableCard";

const GalleryPage = ({ images }) => {
  const [newImages, setNewImages] = useState(images);
  //   console.log(newImages);

  useEffect(() => {
    setNewImages(images);
  }, [images]);

  const mouse = useSensor(MouseSensor),
    touch = useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    });
  const sensors = useSensors(mouse, touch);
  const onDragEnd = (e) => {
    const { active, over } = e;
    if (active.id === over.id) {
      return;
    }
    setNewImages((newImages) => {
      const oldIndex = newImages.findIndex((user) => user.id === active.id);
      const newIndex = newImages.findIndex((user) => user.id === over.id);
      return arrayMove(newImages, oldIndex, newIndex);
    });
  };

  return (
    <div className="container grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 my-10 max-w-7xl mx-auto px-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext items={newImages} strategy={rectSortingStrategy}>
          {newImages.map((data, index) => (
            <SortableCard image={data} key={data.id} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default GalleryPage;
