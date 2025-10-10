export type User = {
  id: number;
  name: string;
  email: string;
};

export type UserResponse = {
  data: User[];
  metadata: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};
