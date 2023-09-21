/* import React, { useContext, useState, useEffect, forwardRef } from "react";
import NavBarGallery from "../components/NavBarGallery";
import Footer from "../components/Footer";
import { ImageContext } from "../App";
import ImageCard from "../components/ImageCard";
import Skeleton from "../components/Skeleton";
import { DndContext, closestCenter } from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableUser = forwardRef(({ data, index }, ref) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: data.id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <ImageCard
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      data={data}
      key={index}
      index={index}
    />
  );
});

const GalleryPage = () => {
  const { response, isLoading, searchImage } = useContext(ImageContext);
  //   console.log(response);
  const onDragEnd = (event) => {
    console.log("onDragEnd", event);
  };

  return (
    <div className="container">
      <NavBarGallery />
      <h3 className="underline text-center my-6">
        Search Result for {searchImage || "dog"}
      </h3>

      <ul className="container grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 my-10 max-w-7xl mx-auto px-4">
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext
            items={response}
            strategy={verticalListSortingStrategy}
          >
            {isLoading ? (
              <Skeleton item={10} />
            ) : (
              response.map((data, index) => {
                return <SortableUser key={index} data={data} index={index} />;
              })
            )}
          </SortableContext>
        </DndContext>
      </ul>

      <Footer />
    </div>
  );
};

export default GalleryPage;
 */
import React, { useContext, useState } from "react";
import NavBarGallery from "../components/NavBarGallery";
import Footer from "./Footer";
import { ImageContext } from "../App";
import ImageCard from "./ImageCard";
import Skeleton from "./Skeleton";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

const GalleryPage = () => {
  const { response, isLoading, searchImage } = useContext(ImageContext);
  const [users, setUsers] = useState(response); // Define and initialize users state

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const onDragEnd = (event) => {
    console.log("onDragEnd", event);
    const { active, over } = event;
    if (active.id === over.id) {
      return;
    }
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      const oldIndex = updatedUsers.findIndex((user) => user.id === active.id);
      const newIndex = updatedUsers.findIndex((user) => user.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        // Swap the elements at oldIndex and newIndex
        const temp = updatedUsers[oldIndex];
        updatedUsers[oldIndex] = updatedUsers[newIndex];
        updatedUsers[newIndex] = temp;
      }
      return updatedUsers;
    });
  };

  return (
    <div className="container">
      <NavBarGallery />
      <h3 className="underline text-center my-6">
        Search Result for {searchImage || "puppy"}
      </h3>

      <ul className="container grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 my-10 max-w-7xl mx-auto px-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={users} // Use the users state instead of response
            strategy={verticalListSortingStrategy}
          >
            {isLoading ? (
              <Skeleton item={10} />
            ) : (
              users.map((data, index) => (
                <ImageCardSortable key={data.id} data={data} index={index} />
              ))
            )}
          </SortableContext>
        </DndContext>
      </ul>

      <Footer />
    </div>
  );
};

const ImageCardSortable = React.forwardRef(({ data, index }, ref) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: data.id,
    });

  const style = {
    transition,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      data-id={data.id}
    >
      <ImageCard ref={ref} data={data} index={index} />
    </div>
  );
});

export default GalleryPage;
