import * as yup from "yup";

export const schemaFormCreateRoom = yup
  .object({
    name: yup.string().required("Please enter room name"),
    acreage: yup.number().min(1).max(200).required("Please enter acreage"),
    basePrice: yup.number().min(10000).max(1000000000).required("Please enter room price"),
    roomElectric: yup.number().required("Please enter room electric / month or kw"),
    totalNbPeople: yup
      .number()
      .min(1)
      .max(20, "Please enter total number people less than 20")
      .required("Please enter number of people in can stay in room"),
    nbCurrentPeople: yup
      .number()
      .min(0)
      .max(20, "Please enter number people current stay in room less than 20")
      .lessThan(yup.ref("totalNbPeople"), "Please enter number current people less than total people")
      .required("Please enter current number people stay in room"),
    period: yup.number().required("Please enter period"),
    addressDetail: yup.string().required("Please enter address detail"),
    internetPrice: yup.number().required("Please enter internet cost"),
  })
  .required();
