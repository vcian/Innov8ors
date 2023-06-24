import { HttpUtil } from "./HttpUtil";
const { Configuration, OpenAIApi } = require("openai");

export class apiService {
  private static instance: apiService = null;

  private constructor() {}

  public static getInstance(): apiService {
    if (apiService.instance == null) {
      apiService.instance = new apiService();
    }
    return apiService.instance;
  }

  private constructHeaders(config: any) {
    let headers = {};
    headers["Content-Type"] = "application/json";
    return headers;
  }

  private async getMethod(
    metadata: any,
    requestUrl: string,
    requestName: string
  ): Promise<any> {
    const url = metadata.url + requestUrl;
    return await HttpUtil.get(url, this.constructHeaders(metadata));
  }

  private async postMethod(
    payload: any,
    metadata: any,
    requestUrl: string
  ): Promise<any> {
    // const url = metadata.url + requestUrl;
    return await HttpUtil.post(requestUrl, payload, this.constructHeaders(metadata));
  }

  public async recommendCourse(
    payload: any,
    metadata: any
  ): Promise<string> {
    
    let url = "http://127.0.0.1:5000/recommend";
    return await this.postMethod(payload,metadata,url);
  }

  public async opeaiGetResponse(
    prompt: string,
  ): Promise<string> {
    
    const configuration = new Configuration({
        apiKey: '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',
    });

    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 1,
        max_tokens: 2000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    
    return response.data.choices[0]["text"]
  }


}
