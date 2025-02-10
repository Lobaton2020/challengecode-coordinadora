export interface IEstado {
    id_estado: number,
    nombre: string,
    fecha_creacion: string
}

export interface ICiudad {
    id_ciudad: number,
    nombre_ciudad: string,
    abreviado_departamento: string
}

export interface IRastreoGuiaResponse {
    estados_historial: IEstado[],
    estado_actual: IEstado,
    remitente: ICiudad
    destino: ICiudad
}