import { inject, injectable } from "inversify";
import { IFraseMotivacionalRepository } from "../../../../modules/cronogramas/domain/repositories/IFraseMotivacionalRepository";
import { FraseMotivacionalResponse } from "../../../../modules/cronogramas/domain/dtos/in/FraseMotivacionalResponse";
import { CommonTypes } from "../../../../modules/common/dependencies/Types";
import { AxiosInstance } from "axios";
import { ILogger } from "../../../../modules/common/domain/repositories/ILogger";

@injectable()
export class ApiFraseMoticacionalDao implements IFraseMotivacionalRepository {
  @inject(CommonTypes.HttpClient) httpClient: AxiosInstance;
  @inject(CommonTypes.Logger) logger: ILogger;
  async getPhrase(): Promise<FraseMotivacionalResponse | null> {
    try {
      const { data } = await this.httpClient.get<FraseMotivacionalResponse>("");
      return data;
    } catch (err) {
      this.logger.log("Error al consultar api de frase: " + err.message);
      return null;
    }
  }
}
