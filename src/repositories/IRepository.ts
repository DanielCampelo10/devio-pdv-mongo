export default interface IRepository {
  create(payload: any): Promise<any>;
  find(payload?: any): Promise<any>;
  findById(id: any): Promise<any>;
  update(id: any, payload: any): Promise<any>;
  delete(id: any): Promise<any>;
  count(payload: any): Promise<any>;
}
