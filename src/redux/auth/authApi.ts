import { baseApi } from "@/redux/api/baseApi";
import { setUser, logoutUser } from "@/redux/auth/authSlice";

export type AuthSessionUser = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

type AuthResponse = { user: AuthSessionUser };

export type LoginPayload = { email: string; password: string };
export type RegisterPayload = { name: string; email: string; password: string };

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginPayload>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      invalidatesTags: ["Auth"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setUser(data.user));
      },
    }),

    register: builder.mutation<AuthResponse, RegisterPayload>({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
      invalidatesTags: ["Auth"],
    }),

    /** Called once on app load to restore a session from the auth cookie. */
    refreshSession: builder.query<AuthResponse, void>({
      query: () => "/auth/refresh-token",
      providesTags: ["Auth"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.user));
        } catch {
          dispatch(setUser(null));
        }
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      invalidatesTags: ["Auth"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          // Clear the client-side user regardless of whether the server
          // call succeeded — no reason to leave someone looking "logged in"
          // just because the network blipped.
          dispatch(logoutUser());
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshSessionQuery,
  useLogoutMutation,
} = authApi;
