import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light" // or "dark" or "system" - choose one
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-900 group-[.toaster]:border-gray-200 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-gray-600",
          actionButton: "group-[.toast]:bg-blue-600 group-[.toast]:text-white",
          cancelButton: "group-[.toast]:bg-gray-200 group-[.toast]:text-gray-800",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };