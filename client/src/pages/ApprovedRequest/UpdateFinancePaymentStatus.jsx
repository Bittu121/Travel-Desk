import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateStatus } from "../../api/checkStatusApi";

function UpdateFinancePaymentStatus({ item }) {
  // console.log("log",item)
  const { authData: user } = useSelector((state) => state.auth);
  const [status, setStatus] = useState(item?.status || "pending");
  const [inputValue, setInputValue] = useState(status);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateClick = async () => {
    const newStatus = inputValue.trim().toLowerCase();
    setIsUpdating(true);
    try {
      const { data } = await updateStatus(item?.id, { status: newStatus });
      if (data?.success) {
        setStatus(newStatus);
        setInputValue(newStatus);
        toast?.success(data?.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update status";
      toast.error(errorMessage);
      setInputValue(status);
    } finally {
      setIsUpdating(false);
    }
  };

  if (user?.user?.role === "finance") {
    return (
      <>
        <div className="flex items-center justify-center gap-2 w-full">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isUpdating}
            placeholder="Enter status"
            className={`px-2 py-1 border rounded-md outline-none w-24 text-sm ${
              isUpdating ? "cursor-wait opacity-50" : "cursor-text"
            }`}
          />
          <button
            onClick={handleUpdateClick}
            disabled={isUpdating}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-800 disabled:opacity-50 cursor-pointer"
          >
            {isUpdating ? "Updating..." : "Update"}
          </button>
        </div>
      </>
    );
  }
  if (["hr", "vender", "admin"].includes(user?.user?.role)) {
    return <div className="px-3 py-1 capitalize">{status}</div>;
  }

  return null;
}

export default UpdateFinancePaymentStatus;

//Payment Status api -> updateStatus  [only finance role can update] but seen -->[hr, finance]
