export interface IDireccion {
    id_tipo_via: number;
    id_ciudad: number;
    via: string
    numero: string;
    detalle: string;
}
export interface ICrearEnvioDto {
    direccion_destino: IDireccion,
    direccion_remitente: IDireccion,
    id_tipo_producto: number;
    peso_g: number;
    alto_cm: number;
    ancho_cm: number;
    largo_cm: number;
    contenido: number;
    es_fragil: boolean;
}