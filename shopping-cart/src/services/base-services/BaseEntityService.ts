import {BaseService} from "./BaseService";
import IBaseEntity from "../../types/dto/domain/base/IBaseEntity";

interface IBaseEntityService<TEntity extends IBaseEntity> {
    getAll(path: string): Promise<TEntity[] | undefined>,
    findOneById(path: string): Promise<TEntity | undefined>
}

export abstract class BaseEntityService<TEntity extends IBaseEntity> extends BaseService
    implements IBaseEntityService<TEntity> {
    protected constructor(baseUrl: string) {
        super(baseUrl);
    }
    async getAll(path: string): Promise<TEntity[] | undefined> {
        try {
            const response = await this.axios.get<TEntity[]>(path);
            if (response.status === 200) {
                return response.data as TEntity[];
            }
            return undefined;
        } catch (e) {
            console.error("Error retrieving a list of entities from the backend: " + e);
            return undefined;
        }
    }

    async findOneById(path: string): Promise<TEntity | undefined> {
        try {
            const response = await this.axios.get<TEntity>(path);
            if (response.status === 200) {
                return response.data as TEntity;
            }
            return undefined;
        } catch (e) {
            console.error("Error retrieving an entity from the backend: " + e);
            return undefined;
        }
    }
}