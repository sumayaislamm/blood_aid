export interface GetUsersQuery {
  page?: string;
  limit?: string;
  search?: string;
  role?: "ADMIN" | "DONOR" | "REQUESTER";
  status?: "ACTIVE" | "BLOCKED" | "DELETED";
  sortBy?: string;
  sortOrder?: string;
}

export interface UpdateUserStatusInput {
  status: "ACTIVE" | "BLOCKED" | "DELETED";
}