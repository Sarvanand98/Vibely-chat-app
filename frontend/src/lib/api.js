import { AxiosInstance } from "./axios";

export const signup= async (signupData)=>{
      const response=await AxiosInstance.post("/auth/signup",signupData)
      return response.data;
}
export const login= async (loginData)=>{
      const response=await AxiosInstance.post("/auth/login",loginData)
      return response.data;
}
export const logout= async ()=>{
      const response=await AxiosInstance.post("/auth/logout")
      return response.data;
}
export const deleteUser= async ()=>{
      const response=await AxiosInstance.post("/auth/delete")
      return response.data;
}

export const getAuthUser=async ()=>{
      try {
            const res= await AxiosInstance.get("/auth/me")
            return res.data
      } catch (error) {
            console.log("Error in AuthUser",error);
            return null;
      }
}

export const completeOnboard= async(userData)=>{
      const res= await AxiosInstance.post("/auth/onboard",userData)
      return res.data
}
export const getUserFriends= async ()=>{
      const response=await AxiosInstance.get("/users/friends")
      return response.data;
}
export const getRecommendedUsers= async ()=>{
      const response=await AxiosInstance.get("/users")
      return response.data;
}
export const getoutgoingFriendReqs= async ()=>{
      const response=await AxiosInstance.get("/users/outgoing-friends-requests")
      return response.data;
}
export async function sendFriendRequest(userId) {
  const response = await AxiosInstance.post(`/users/friends-request/${userId}`);
  return response.data;
}
export async function getFriendRequests() {
  const response = await AxiosInstance.get("/users/friends-requests");
  return response.data;
}
export async function acceptFriendRequest(requestId) {
  const response = await AxiosInstance.put(`/users/friends-request/${requestId}/accept`);
  return response.data;
}
export async function getStreamToken() {
  const response = await AxiosInstance.get("/chat/token");
  return response.data;
}

export const getpaymentsData = async () =>{
      const response=await AxiosInstance.get("/payment/data");
      return response.data;
}

export const sendpaymentData = async (paymentData) =>{
      const response=await AxiosInstance.post("/payment/paymentmethod",paymentData);
      return response.data;
}
export const getAiHelp = async () =>{
      const response=await AxiosInstance.get("/ai/help");
      return response.data;
}
export const sendHelp = async (data) =>{
      const response=await AxiosInstance.post("/ai/help",data);
      return response.data;
}