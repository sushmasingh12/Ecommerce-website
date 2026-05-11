// src/features/Promotions/hooks/usePromotions.js

import { useEffect } from "react";
import { loadPromotions, enableCartRecovery  } from "../store/promotionsSlice";
import { useDispatch, useSelector } from "react-redux";


export const usePromotions = () => {
  const dispatch = useDispatch();
  const { data, status, error, cartRecoveryEnabled } = useSelector(
    (state) => state.promotions
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadPromotions());
    }
  }, [dispatch, status]);

  return {
    data,
    status,
    error,
    cartRecoveryEnabled,
    handleEnableCartRecovery: () => dispatch(enableCartRecovery()),
  };
};