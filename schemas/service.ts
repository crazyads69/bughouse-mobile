import * as yup from "yup";

export const schemaServiceDeclare = yup
  .object({
    electricity_cost: yup.number().required(),
    internet_cost: yup.number().required(),
    water_cost: yup.number().required(),
  })
  .required();
