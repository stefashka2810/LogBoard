import { createPortal } from "react-dom";
import { ReactNode } from "react";
import { CircleX } from "lucide-react";
import Image from "next/image";

function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!open) return null;

  const portalRoot = document.getElementById("portal-root");
  if (!portalRoot) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "grid",
        placeItems: "center",
        zIndex: 9999,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        style={{
          position: "relative",
          background: "#E4E0FF",
          borderRadius: 12,
          width: "90vw",
          maxWidth: 400,
          pointerEvents: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            position: "absolute",
            left: "18px",
            top: "-22px",
            zIndex: 10000,
            pointerEvents: "none",
          }}
        >
          <Image
            src={"/images/bear.png"}
            alt={"bear"}
            width={30}
            height={40}
            className={"w-auto h-auto"}
          ></Image>
        </div>
        <div
          onClick={onClose}
          style={{
            position: "absolute",
            right: "7px",
            top: "7px",
            zIndex: 10000,
            cursor: "pointer",
          }}
        >
          <CircleX
            stroke={"#F07FE5"}
            className={"opacity-60 hover:opacity-100"}
          />
        </div>
        {children}
      </div>
    </div>,
    portalRoot,
  );
}

export default Modal;
