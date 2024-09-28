import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function SuccessToaster() {
  const searchParams = useSearchParams();
  const paramValue = searchParams.get("success");

  // Show a success message if the URL contains a success parameter
  useEffect(() => {
    if (paramValue === "true") {
      toast.success(
        "Congratulations! 🎉 Your purchase was successful. Please check your email.",
        {
          duration: 5000,
        }
      );
    }
  });
  return <></>;
}
