import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
  useContext,
} from "react";
import type { ICustomerReview, IService, ReviewContextType } from "@/lib/types";
import {
  useGetCompletedServicesByUserMutation,
  useGetAllFeebackMutation,
} from "../apis/service-apis";
import { useAuthContext } from "./auth-context";

const ReviewContext = createContext<ReviewContextType>({
  customersReviews: [],
  completedServices: [],
});

export function ReviewContextProvider({ children }: { children: ReactNode }) {
  const [completedServices, setCompletedServices] = useState<IService[]>([]);
  const [customersReviews, setCustomersReviews] = useState<ICustomerReview[]>(
    [],
  );

  const { isAuthenticated, currentUser } = useAuthContext();

  const [
    getCompletedServicesByUser,
    {
      data: completedData,
      isLoading: completedIsLoading,
      error: completedError,
      isSuccess: completedSuccess,
    },
  ] = useGetCompletedServicesByUserMutation();
  const [
    getAllFeebacks,
    {
      data: feebackData,
      isLoading: feebackLoading,
      error: feebackError,
      isSuccess: feedbackSuccess,
    },
  ] = useGetAllFeebackMutation();

  useEffect(() => {
    if (isAuthenticated && currentUser && currentUser?.role === "user") {
      getCompletedServicesByUser(null);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && currentUser && currentUser?.role === "admin") {
      getAllFeebacks(1);
    }
  }, []);

  useEffect(() => {
    if (completedSuccess && completedData) {
      console.log(completedData);
    }
  }, [completedData, completedSuccess]);

  useEffect(() => {
    if (feedbackSuccess && feebackData) {
      console.log(feebackData);
    }
  }, [feedbackSuccess, feebackData]);

  console.log("feedback error: ", feebackError);
  console.log("completed error: ", completedError);
  console.log("completed data: ", completedData);
  console.log("feedback data: ", feebackData);

  const value = { completedServices, customersReviews };

  return (
    <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
  );
}

export function useReviewContext() {
  return useContext(ReviewContext);
}
