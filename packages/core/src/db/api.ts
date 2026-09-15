import type { Category, Product, ProductVariant, Store, Teaser } from "../api-types.d.ts";
import data from "./db.json" with { type: "json" };

const apiTTR = 2000;

export const getStores = async (): Promise<Store[]> => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(data.stores);
    }, apiTTR);
});

export const getVariants = async (): Promise<ProductVariant[]> => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(data.variants);
    }, apiTTR);
});

export const getProducts = async (): Promise<Product[]> => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(data.products);
    }, apiTTR);
});

export const getTeasers = async (): Promise<Teaser[]> => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(data.teaser);
    }, apiTTR);
});

export const getCategories = async (): Promise<Category[]> => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(data.categories);
    }, apiTTR);
});

export const getRecommendations = async (): Promise<Record<string, ProductVariant>> => new Promise((resolve, reject) => {
    setTimeout(() => {
        const variants = data.variants;
        const recommendations = new Set(variants.filter((v, i) => i <= 6).map(v => [v.sku, v]));
        resolve(Object.fromEntries(recommendations))
    }, apiTTR);
});