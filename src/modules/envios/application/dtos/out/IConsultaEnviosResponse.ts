export interface IConsultaEnviosResponse {
    id_orden_envio: number;
    numero_guia: string;
    tipo_producto: string;
    peso_g: number;
    id_estado_envio: number;
    estado_envio: string;
    fecha_estado: string;
    id_creador: number;
    creador: string;
    id_transportista: number | null;
    transportista: string | null;
    vehiculo: string | null;
    fecha_jornada: string;
    hora_inicio: string;
    hora_fin: string;
    id_ruta: number;
    ruta: string;
    tiempo_entrega_estimado_horas: number | null;
}