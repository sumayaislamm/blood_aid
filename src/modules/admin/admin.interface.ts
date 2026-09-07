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

export interface GetAdminBloodRequestsQuery {
  page?: string;
  limit?: string;
  search?: string;
  bloodGroup?: string;
  urgency?: string;
  status?: string;
  city?: string;
  sortBy?: string;
  sortOrder?: string;
}

export interface UpdateBloodRequestStatusInput {
  status:
    | "PENDING"
    | "MATCHED"
    | "FULFILLED"
    | "CANCELLED"
    | "EXPIRED";
}

export interface GetAdminDonationsQuery {
  page?: string;
  limit?: string;
  search?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: string;
}


export interface GetAdminPaymentsQuery {
  page?: string;
  limit?: string;
  search?: string;
  provider?: "STRIPE" | "BKASH";
  status?: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  sortBy?: string;
  sortOrder?: string;
}


//audit logs
export interface GetAdminAuditLogsQuery {
  page?: string;
  limit?: string;
  search?: string;
  action?: string;
  entity?: string;
  userId?: string;
  sortOrder?: string;
}