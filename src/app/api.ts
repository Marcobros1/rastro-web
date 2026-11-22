import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ListingFilters, ListingSummary, Listing, Offer, NewOffer, NewListing } from "./types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["Listing", "Offer"],
  endpoints: (builder) => ({
    // GET /listings?category=Cars&city=Valencia&price:lte=500&_sort=-publishedAt
    getListings: builder.query<ListingSummary[], ListingFilters>({
      query: ({ category, city, maxPrice }) => ({
        url: "/listings",
        params: { category, city, "price:lte": maxPrice, _sort: "-publishedAt" },
      }),
      providesTags: ["Listing"],
    }),
    // GET /listings/:id
    getListing: builder.query<Listing, string>({
      query: (id) => `/listings/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Listing", id }],
    }),
    // GET /listings/:id/offers
    getOffers: builder.query<Offer[], string>({
      query: (listingId) => ({
        url: `/listings/${listingId}/offers`,
      }),
      providesTags: ["Offer"],
    }),
    // POST /offers
    createOffer: builder.mutation<Offer, NewOffer>({
      query: (body) => ({
        url: "/offers",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Offer"],
    }),
    // POST /listings
    createListing: builder.mutation<Listing, NewListing>({
      query: (body) => ({
        url: "/listings",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Listing"],
    }),
    // PATCH /listings/:id  (solo el precio)
    updatePrice: builder.mutation<Listing, { id: string; price: number }>({
      query: ({ id, price }) => ({
        url: `/listings/${id}`,
        method: "PATCH",
        body: { price },
      }),
      invalidatesTags: ["Listing"],
    }),
    // DELETE /listings/:id
    deleteListing: builder.mutation<void, string>({
      query: (id) => ({
        url: `/listings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Listing"],
    }),
    // PATCH /offers/:id  (aceptar oferta)
    acceptOffer: builder.mutation<Offer, { id: string; status: "ACCEPTED" | "REJECTED" }>({
      query: ({ id, status }) => ({
        url: `/offers/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Listing", "Offer"],
    }),
    // GET /listings/stats (estadísticas por categoría)
    getStats: builder.query<{ _id: string; total: number }[], void>({
      query: () => "/listings/stats",
    }),
  }),
});

export const {
  useGetListingsQuery,
  useGetListingQuery,
  useGetOffersQuery,
  useCreateOfferMutation,
  useCreateListingMutation,
  useUpdatePriceMutation,
  useDeleteListingMutation,
  useAcceptOfferMutation,
  useGetStatsQuery,
} = api;
