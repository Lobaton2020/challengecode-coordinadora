export interface IConsultarOrdenesEnvioDto {
    numero_guia:string,
    id_estado_envio: number,
    id_transportista: number,
    fecha_estado: string, //inicio,fin
    pagina: number
    cantidad_pagina: number;
}