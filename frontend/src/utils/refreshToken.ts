import { refresh } from "@/api/userApi";

export const refreshToken = async () => {
  try {
    const response = await refresh();

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("REFRESH FAILED", error);
  }
};
