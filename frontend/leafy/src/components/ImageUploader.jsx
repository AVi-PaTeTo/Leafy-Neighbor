import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function ImageUploader({
  isOpen, onClose, images, setImages,
  desiredAspect = 4 / 5, aspectTolerance = 0.03
}) {
  // Aspect ratio check
  const validateAspect = (width, height) =>
    Math.abs(width / height - desiredAspect) <= aspectTolerance;

  // Remove an image by id
  const handleRemoveImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  // Handle file selection/upload
  const onDrop = useCallback(async (acceptedFiles) => {
    for (const file of acceptedFiles) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      await new Promise(res => {
        img.onload = () => res();
      });
      if (validateAspect(img.naturalWidth, img.naturalHeight)) {
        setImages(prev => [
          ...prev,
          { id: img.src, file }
        ]);
      } else {
        alert(`"${file.name}" doesn't match the aspect ratio ${desiredAspect.toFixed(2)}.`);
        URL.revokeObjectURL(img.src);
      }
    }
  }, [setImages, desiredAspect, aspectTolerance]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop, accept: {"image/*": ['.jpeg', '.jpg', '.png']}, multiple: true
  });

  // Handle reordering
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(images);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setImages(reordered);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "rgba(0,0,0,0.30)",
      display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000
    }}>
      <div style={{
        background: "#fff", padding: 18, borderRadius: 10, minWidth: 400, minHeight: 350, position: "relative", boxShadow: "0 4px 30px rgba(0,0,0,0.11)"
      }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute", bottom: 18, right: 18,
            padding: "6px 18px", background: "#fff", border: "1px solid #ccc",
            fontSize: 18, cursor: "pointer", borderRadius: 5
          }}
        >Close</button>
        <div {...getRootProps()} style={{
          border: "2px dashed #333", padding: 30,
          marginBottom: 18, textAlign: 'center', cursor: 'pointer', borderRadius: 8
        }}>
          <input {...getInputProps()} />
          <p style={{ margin: 0, color: "#222", fontSize: 17 }}>
            Drag & Drop or click to select images
          </p>
        </div>

        {/* Drag and drop thumbnails */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="images" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  display: "flex", gap: 12, overflowX: "auto", minHeight: 100,
                  padding: '10px 2px'
                }}
              >
                {images.map((img, index) => (
                  <Draggable key={img.id} draggableId={img.id} index={index}>
                    {(provided2) => (
                      <div
                        ref={provided2.innerRef}
                        {...provided2.draggableProps}
                        {...provided2.dragHandleProps}
                        style={{
                          position: 'relative',
                          borderRadius: 7,
                          minWidth: 85, minHeight: 85,
                          background: "#f5f5f5",
                          margin: "0 9px 0 0",
                          ...provided2.draggableProps.style
                        }}
                      >
                        <img
                          src={img.id}
                          alt={img.file?.name || `preview-${index}`}
                          height={85}
                          width={85}
                          style={{
                            borderRadius: 7,
                            objectFit: "cover",
                            width: "85px", height: "105px"
                          }}
                        />
                        {/* Remove/Cross button */}
                        <button
                          onClick={() => handleRemoveImage(img.id)}
                          className="absolute pb-[5px] -top-2 -right-2 bg-red-500 rounded-4xl w-[30px] h-[30px] hover:cursor-pointer shadow-md text-[28px] flex items-center justify-center"
                          
                          aria-label="Remove"
                        >×</button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="flex justify-center mt-2">
            <p>- - - Hold & Drag to set the ordering - - -</p>
        </div>
      </div>
      
    </div>
  );
}

export default ImageUploader;
