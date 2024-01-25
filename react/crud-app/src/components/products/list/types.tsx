import { LegacyRef, useEffect, useRef, useState } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import classNames from "classnames";
import ReactLoading from "react-loading";
import dayjs from "dayjs";
import {
  IProductGetResult,
  IProductItemLookup,
  http_api,
} from "../../../app/types";

const ProductListPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [list, setList] = useState<IProductItemLookup[]>([]);
  const [data, setData] = useState<IProductGetResult>();

  const { page } = useParams();
  let localpage;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");

  useEffect(() => {
    if (page == undefined || page == null) localpage = 1;
    else localpage = page;

    setIsLoading(true);
    http_api
      .get<IProductGetResult>(`/api/product?page=${localpage}`)
      .then((resp) => {
        setIsLoading(false);
        setList(resp.data.data);
        setData(resp.data);
      })
      .catch((e) => {
        console.log("get products from server error: ", e);
        setIsLoading(false);
      });
  }, [page]);

  const paginationData = data?.links?.map((l) => (
    <li
      key={Math.random()}
      className={classNames("page-item", {
        active: l.active,
        disabled: l.url == null,
      })}
    >
      <Link
        to={
          l.url
            ? `/page/${new URLSearchParams(new URL(l.url as string).search).get(
                "page"
              )}`
            : ""
        }
        className="page-link"
      >
        {l.label.replace("&laquo; ", "").replace(" &raquo;", "")}
      </Link>
    </li>
  ));

  const viewData = list?.map((product) => (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.title}</td>
      <td>{product.description}</td>
      <td>{product.price}</td>
      <td>{dayjs(product.created_at).format("DD/MM/YYYY HH:mm:ss")}</td>
      <td>{dayjs(product.updated_at).format("DD/MM/YYYY HH:mm:ss")}</td>
      <td>
        <Link to={`/edit/${product.id}`} className="btn btn-primary m-1">
          Edit
        </Link>
        <Link to={`/delete/${product.id}`} className="btn btn-danger m-1">
          Delete
        </Link>
      </td>
    </tr>
  ));

  return (
    <>
      <h1 className="text-center">Products list</h1>
      {isLoading && (
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

      {!isLoading && (
        <div className="onLoad">
          <Link to="/create" className="btn btn-success">
            Додати
          </Link>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Назва</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Created at</th>
                <th scope="col">Updated at</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>{viewData}</tbody>
          </table>
          <ul className="pagination justify-content-center">
            {paginationData}
          </ul>
        </div>
      )}
    </>
  );
};

export default ProductListPage;
