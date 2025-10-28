import { PaginationMetadata, PaginationQueryParams } from '@/@types/pagination';
import { IDatabase } from '@/common/database/IDatabase';
import { createPaginationMetadata, parsePaginationParams } from '@/common/utils/pagination.util';
import { HttpError } from '@/core/errors/HttpError';
import { Session } from './session.entity';
import { CreateSessionDTO, ISession } from './sessions.dto';

type GetManyQuery = PaginationQueryParams & {};
type GetManyResponse = Promise<{ data: ISession[]; metadata: PaginationMetadata }>;

export class SessionsService {
  private readonly table = 'sessions';

  constructor(private readonly db: IDatabase) {}

  async create(data: CreateSessionDTO): Promise<ISession> {
    const sessionEntity = Session.create(data);
    return await this.db.table<Session>(this.table).create({ data: sessionEntity });
  }

  async getMany(query: GetManyQuery): GetManyResponse {
    const where: Record<string, string> = {};
    const { page, pageSize, offset } = parsePaginationParams(query);

    const sessions = await this.db.table<ISession>(this.table).findMany({
      where,
      offset,
      limit: pageSize,
    });

    const totalItems = await this.db.table<ISession>(this.table).count({ where });
    const metadata = createPaginationMetadata({ page, pageSize, totalItems });

    return { data: sessions, metadata };
  }

  async getById(id: string): Promise<Session | null> {
    const session = await this.db.table<ISession>(this.table).findUnique({ where: { id } });
    if (!session) return null;

    return Session.fromDatabase(session);
  }

  async getByUserId(user_id: string): Promise<ISession[]> {
    return await this.db.table<ISession>(this.table).findMany({ where: { user_id } });
  }

  async delete(id: string): Promise<void> {
    const session = await this.db.table<ISession>(this.table).findUnique({ where: { id } });
    if (!session) throw HttpError.NotFound('Session not found!');

    await this.db.table<ISession>(this.table).delete({ where: { id } });
  }

  async deleteByUserId(id: string, user_id: string): Promise<void> {
    const session = await this.db.table<ISession>(this.table).findUnique({ where: { id, user_id } });
    if (!session) throw HttpError.NotFound('Session not found!');

    await this.db.table<ISession>(this.table).delete({ where: { id, user_id } });
  }
}
