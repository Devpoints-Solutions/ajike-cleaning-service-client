import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
  useContext,
} from "react";
import type {
  ICustomerReview,
  IService,
  ReviewContextType,
  ReviewStatsType,
} from "@/lib/types";
import {
  useGetCompletedServicesByUserMutation,
  useGetAllFeebackMutation,
} from "../apis/service-apis";
import { useAuthContext } from "./auth-context";

const ReviewContext = createContext<ReviewContextType>({
  customersReviews: [],
  completedServices: [],
  reviewStats: {
    averageRating: 0,
    totalFeedbacks: 0,
    totalFiveStars: 0,
    totalFourStars: 0,
    totalOneStar: 0,
    totalThreeStars: 0,
    totalTwoStars: 0,
    completedServices: 0,
  },
});

export function ReviewContextProvider({ children }: { children: ReactNode }) {
  const [completedServices, setCompletedServices] = useState<IService[]>([]);
  const [customersReviews, setCustomersReviews] = useState<ICustomerReview[]>(
    [],
  );
  const [reviewStats, setReviewStats] = useState<ReviewStatsType>({
    averageRating: 0,
    totalFeedbacks: 0,
    totalFiveStars: 0,
    totalFourStars: 0,
    totalOneStar: 0,
    totalThreeStars: 0,
    totalTwoStars: 0,
    completedServices: 0,
  });

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
  }, [isAuthenticated, currentUser]);

  useEffect(() => {
    if (isAuthenticated && currentUser && currentUser?.role === "admin") {
      getAllFeebacks(1);
    }
  }, [isAuthenticated, currentUser]);

  useEffect(() => {
    if (completedSuccess && completedData) {
      setCompletedServices(completedData?.data);
    }
  }, [completedData, completedSuccess]);

  useEffect(() => {
    if (feedbackSuccess && feebackData) {
      setCustomersReviews(feebackData?.data[0]?.feedbacks);
      setReviewStats({
        ...feebackData?.data[0]?.ratingStatistics[0],
        completedServices: feebackData?.data?.completedServices,
      });
    }
  }, [feedbackSuccess, feebackData]);

  const value = { completedServices, customersReviews, reviewStats };

  return (
    <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
  );
}

export function useReviewContext() {
  return useContext(ReviewContext);
}
