import type { FormDataA, FormDataB } from "./form";

export interface FormResponseDefault {
  url: string,
  data: FormDataA | FormDataB,
  applicationNumber: string,
  classifier: string,
};
