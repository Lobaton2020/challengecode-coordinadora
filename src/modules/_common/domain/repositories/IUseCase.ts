export interface IUseCase{
    execute(...arg1: any[]): Promise<any>
}