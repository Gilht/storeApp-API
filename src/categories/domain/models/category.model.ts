export class CategoryModel {
  constructor(
    public id: number,
    public name: string,
    public createdAt: Date,
    public updatedAt: Date | null,
    public deletedAt: Date | null,
    public active: boolean
  ) {}
}
