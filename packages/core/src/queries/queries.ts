import { useQuery } from "@tanstack/react-query";
import { getCategories, getProducts, getRecommendations, getStores, getTeasers, getVariants } from "../db/api.js";

export const useGetStores = () => useQuery({
    queryKey: ["get/stores"],
    queryFn: async () => await getStores(),
    initialData: []
});

export const useGetVariants = () => useQuery({
    queryKey: ["get/variants"],
    queryFn: async () => await getVariants(),
    initialData: []
});

export const useGetProducts = () => useQuery({
    queryKey: ["get/products"],
    queryFn: async () => await getProducts(),
    initialData: []
});

export const useGetTeasers = () => useQuery({
    queryKey: ["get/teasers"],
    queryFn: async () => await getTeasers(),
    initialData: []
});

export const useGetCategories = () => useQuery({
    queryKey: ["get/categories"],
    queryFn: async () => await getCategories(),
    initialData: []
});

export const useGetRecommendations = () => useQuery({
    queryKey: ["get/recommendations"],
    queryFn: async () => await getRecommendations(),
    initialData: {}
});