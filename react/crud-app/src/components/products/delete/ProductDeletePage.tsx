import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IProductDeleteErrror } from "./types";
import ReactLoading from "react-loading";
import { http_api } from "../../../app/types";
import DangerDialog from "../../../common/DangerDialog";

const ProductDeletePage = () => {
  const { id } = useParams();
  const navigator = useNavigate();
  const [errors, setErrors] = useState<ICategoryDeleteErrror>({
    id: "",
  });
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const onCancelHandler = () => {
    navigator("../..");
  };
  const onSubmitHandler = () => {
    setIsProcessing(true);
    http_api
      .delete(`/api/product/${id}`)
      .then((resp) => {
        console.log(resp);
        setIsProcessing(false);
        navigator("../..");
      })
      .catch((er) => {
        setIsProcessing(false);
        const errors = er.response.data as IProductDeleteErrror;
        setErrors(errors);
        console.log("Server delete error ", errors);
        navigator("../..");
      });
  };
  return (
    <>
      <h1 className="text-center">Видалення товару</h1>
      {isProcessing && (
        <div className="">
          <div className="row">
            <div className="col"></div>
            <div className="col">
              <div className="d-flex justify-content-center">
                <ReactLoading
                  type="bars"
                  color="red"
                  height={"50%"}
                  width={"50%"}
                ></ReactLoading>
              </div>
            </div>
            <div className="col"></div>
          </div>
        </div>
      )}
      <DangerDialog
        onCancel={onCancelHandler}
        onConfirm={onSubmitHandler}
        isShown={true}
      ></DangerDialog>
    </>
  );
};
export default ProductDeletePage;
