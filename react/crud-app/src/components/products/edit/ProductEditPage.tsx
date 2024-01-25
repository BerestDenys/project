import classNames from "classnames";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IProductEdit, IProductEditError } from "./types";
import ReactLoading from "react-loading";
import * as yup from "yup";
import { useFormik } from "formik";
import { AxiosError } from "axios";
import { IProductItemLookup, http_api } from "../../../app/types";

const ProductEditPage = () => {
  const navigator = useNavigate();

  const { id } = useParams();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [initValues, setInitValues] = useState<IProductEdit>({
    id: 0,
    title: "",
    description: "",
    price: 0,
  });

  useEffect(() => {
    setIsProcessing(true);
    http_api
      .get<IProductItemLookup>(`/api/product/${id}`)
      .then((resp: any) => {
        let initCategory = resp.data;
        setIsProcessing(false);
        formik.setValues({
          id: initCategory.id,
          title: initCategory.title,
          description: initCategory.description,
          price: initCategory.price,
        });
      })
      .catch((e: any) => {
        setIsProcessing(false);
        console.log("get category by id error: ", e);
      });

    console.log("use Effect working");
  }, []);

  const productCreateSchema = yup.object({
    title: yup.string().min(1),
    description: yup.string().min(1), // todo add regex validation
    price: yup.number(),
  });

  const [responceError, setResponceError] = useState<IProductEditError>();

  const onSubmitFormikData = async (values: IProductEdit) => {
    try {
      await setIsProcessing(true);
      var resp = await http_api.post(`/api/product/${values.id}`, values);
      var edited = resp.data as IProductItemLookup;
      console.log("resp = ", edited);
      navigator("../..");
      await setIsProcessing(false);
    } catch (e: any) {
      const axiosError = e as AxiosError;
      const error = axiosError.response?.data as IProductEditError;
      console.log("product edit server error", error);
      setResponceError(error);
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
      <h1 className="text-center">Edit товар</h1>
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
            Save
          </button>
        </form>
      )}
    </>
  );
};
export default ProductEditPage;
