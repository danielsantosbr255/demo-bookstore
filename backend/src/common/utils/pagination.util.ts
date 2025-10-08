import { PaginationInput, PaginationMetadata, PaginationQueryParams } from '@/@types/pagination';

export function parsePaginationParams(params: PaginationQueryParams) {
  const page = parseInt(params.page ?? '1');
  const pageSize = parseInt(params.limit ?? '10');
  const offset = (page - 1) * pageSize;

  return { page, pageSize, offset };
}

export function createPaginationMetadata(metadataInput: PaginationInput): PaginationMetadata {
  const { page, pageSize, totalItems } = metadataInput;

  const totalPages = Math.ceil(totalItems / pageSize);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  return {
    page,
    pageSize,
    totalItems,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
}
