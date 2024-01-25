import classNames from "classnames";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IProductCreate, IProductCreateError } from "./types";
import ReactLoading from "react-loading";
import * as yup from "yup";
import { useFormik } from "formik";
import { AxiosError } from "axios";
import { IProductItemLookup, http_api } from "../../../app/types";

const ProductCreatePage = () => {
  const navigator = useNavigate();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [initValues] = useState<IProductCreate>({
    title: "",
    description: "",
    price: 0,
  });

  const productCreateSchema = yup.object({
    title: yup.string().required("Enter name"),
    description: yup.string().required("Enter description"), // todo add regex validation
    price: yup.number().required("Enter price"),
  });

  const [responceError, setResponceError] = useState<IProductCreateError>();

  const onSubmitFormikData = async (values: IProductCreate) => {
    try {
      await setIsProcessing(true);
      var resp = await http_api.post(`api/product`, values);
      var created = resp.data as IProductItemLookup;
      console.log("resp = ", created);
      navigator("..");
      await setIsProcessing(false);
    } catch (e: any) {
      const axiosError = e as AxiosError;
      const error = axiosError.response?.data as IProductCreateError;
      console.log("product create server error", error);
      setResponceError(error);
      errors.description = error.description?.join(", ");
      errors.title = error.title?.join(", ");
      errors.price = error.price?.join(", ");
      await setIsProcessing(false);
    }
  };
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: productCreateSchema,
    onSubmit: onSubmitFormikData,
  });
  const { values, errors, touched, handleSubmit, handleChange } = formik;

  return (
    <>
      <h1 className="text-center">Створити товар</h1>
      {isProcessing && (
        <div className="">
          <div className="row">
            <div className="col"></div>
            <div className="col">
              <div className="d-flex justify-content-center">
                <ReactLoading
                  type="bars"
                  color="gray"
                  height={"50%"}
                  width={"50%"}
                ></ReactLoading>
              </div>
            </div>
            <div className="col"></div>
          </div>
        </div>
      )}
      {!isProcessing && (
        <form className="col-md-6 offset-md-3" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Назва
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": errors.title,
              })}
              id="title"
              name="title"
              value={values.title}
              onChange={handleChange}
            />
            {errors.title && (
              <div className="invalid-feedback">{errors.title}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Опис
            </label>
            <input
              type="text"
              id="description"
              className={classNames("form-control", {
                "is-invalid": errors.description,
              })}
              name="description"
              value={values.description}
              onChange={handleChange}
            />
            {errors.description && (
              <div className="invalid-feedback">{errors.description}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Ціна
            </label>
            <input
              type="number"
              className={classNames("form-control", {
                "is-invalid": errors.price,
              })}
              id="price"
              name="price"
              value={values.price}
              onChange={handleChange}
            />
            {errors.price && (
              <div className="invalid-feedback">{errors.price}</div>
            )}
          </div>
          <button type="submit" className="btn btn-success">
            Додати
          </button>
        </form>
      )}
    </>
  );
};
export default ProductCreatePage;
