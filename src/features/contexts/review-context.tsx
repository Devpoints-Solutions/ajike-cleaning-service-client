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
  onFetchMoreFeedback: () => {},
  feedbackIsLoading: false,
  hasMore: true,
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

  const [reviewPage, setReviewPage] = useState<number>(1);
  const [firstRequest, setFirstRuest] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { isAuthenticated, currentUser } = useAuthContext();

  const [
    getCompletedServicesByUser,
    {
      data: completedData,
      isLoading: _completedIsLoading,
      isSuccess: completedSuccess,
    },
  ] = useGetCompletedServicesByUserMutation();
  const [
    getAllFeebacks,
    {
      data: feebackData,
      isLoading: feebackLoading,
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
      getAllFeebacks(reviewPage);
    }
  }, [isAuthenticated, currentUser]);

  useEffect(() => {
    if (completedSuccess && completedData) {
      setCompletedServices(completedData?.data);
    }
  }, [completedData, completedSuccess]);

  useEffect(() => {
    if (feedbackSuccess && feebackData && firstRequest) {
      setCustomersReviews(feebackData?.data[0]?.feedbacks);
      setReviewStats({
        ...feebackData?.data[0]?.ratingStatistics[0],
        completedServices: feebackData?.data?.completedServices,
      });

      setFirstRuest(false);
      setReviewPage((prev) => prev + 1);
    }
  }, [feedbackSuccess, feebackData]);

  useEffect(() => {
    if (feedbackSuccess && feebackData && !firstRequest) {
      setCustomersReviews((prev) => [...prev, ...feebackData?.data]);
    }
  }, [feedbackSuccess, feebackData]);

  function onFetchMoreFeedback() {
    if (customersReviews?.length === reviewStats?.totalFeedbacks)
      return setHasMore(false);
    getAllFeebacks(reviewPage);
    setReviewPage((prev) => prev + 1);
  }

  const value = {
    completedServices,
    customersReviews,
    reviewStats,
    onFetchMoreFeedback,
    feedbackIsLoading: feebackLoading,
    hasMore,
  };

  return (
    <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
  );
}

export function useReviewContext() {
  return useContext(ReviewContext);
}
